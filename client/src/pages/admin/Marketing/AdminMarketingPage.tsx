import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Eye, MessageSquare, TrendingUp, RefreshCw, DollarSign } from 'lucide-react';
import { getMarketing } from '@/api/admin';
import type {
  MarketingAnalyticsResponse,
  MarketingAnalyticsParams,
  ChannelPerformanceItem,
} from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatCard from '../Dashboard/StatCard';
import ChannelTrendChart from './ChannelTrendChart';
import CampaignBarChart from './CampaignBarChart';

type SortField = keyof ChannelPerformanceItem;
type SortDirection = 'asc' | 'desc';

const PERIOD_OPTIONS: { key: MarketingAnalyticsParams['period']; label: string }[] = [
  { key: 'today', label: '今日' },
  { key: '7d', label: '7天' },
  { key: '30d', label: '30天' },
  { key: 'custom', label: '自定义' },
];

export default function AdminMarketingPage() {
  const [data, setData] = useState<MarketingAnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<MarketingAnalyticsParams['period']>('7d');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortField, setSortField] = useState<SortField>('pv');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');

  const fetchData = async () => {
    setLoading(true);
    try {
      const params: MarketingAnalyticsParams = { period };
      if (period === 'custom') {
        if (dateFrom) params.dateFrom = dateFrom;
        if (dateTo) params.dateTo = dateTo;
      }
      const result = await getMarketing(params);
      setData(result);
    } catch {
      toast.error('加载营销数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedChannels = (data?.channelPerformance ?? []).slice().sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
    }
    const aStr = String(aVal ?? '');
    const bStr = String(bVal ?? '');
    return sortDir === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });

  const totalPv = data?.channelPerformance.reduce((s, c) => s + c.pv, 0) ?? 0;
  const totalUv = data?.channelPerformance.reduce((s, c) => s + c.uv, 0) ?? 0;
  const totalInquiries = data?.channelPerformance.reduce((s, c) => s + c.inquiries, 0) ?? 0;
  const overallConversion = totalUv > 0 ? (totalInquiries / totalUv) * 100 : 0;
  const avgDuration =
    data?.channelPerformance.length
      ? data.channelPerformance.reduce((s, c) => s + c.avgDuration, 0) /
        data.channelPerformance.length
      : 0;
  const avgCpl = totalInquiries > 0 ? totalPv / totalInquiries : 0;

  const sortArrow = (field: SortField) =>
    sortField === field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '';

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
            {PERIOD_OPTIONS.map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                  period === p.key
                    ? 'bg-[#0A2540] text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {period === 'custom' && (
            <div className="flex items-center gap-2">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-40"
              />
              <span className="text-slate-400">至</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-40"
              />
              <Button size="sm" onClick={fetchData}>
                应用
              </Button>
            </div>
          )}

          <div className="ml-auto">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="总访问 (PV)" value={totalPv.toLocaleString()} icon={Eye} color="#0A2540" />
        <StatCard label="总询盘" value={totalInquiries.toLocaleString()} icon={MessageSquare} color="#10B981" />
        <StatCard
          label="整体转化率"
          value={`${overallConversion.toFixed(2)}%`}
          icon={TrendingUp}
          color="#00C2FF"
        />
        <StatCard label="平均CPL" value={`${avgCpl.toFixed(0)} PV/询盘`} icon={DollarSign} color="#F59E0B" />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">来源渠道趋势</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.dailyTrend?.length ? (
              <ChannelTrendChart data={data.dailyTrend} />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">广告系列对比</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.campaignComparison?.length ? (
              <CampaignBarChart data={data.campaignComparison} />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Channel performance table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">渠道效果分析</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {loading && !data ? (
            <div className="flex h-40 items-center justify-center">
              <Spinner className="size-6 text-[#0A2540]" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead
                    className="cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('utmSource')}
                  >
                    渠道{sortArrow('utmSource')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('utmMedium')}
                  >
                    媒介{sortArrow('utmMedium')}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('utmCampaign')}
                  >
                    广告系列{sortArrow('utmCampaign')}
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('pv')}
                  >
                    访问量{sortArrow('pv')}
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('uv')}
                  >
                    独立访客{sortArrow('uv')}
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('inquiries')}
                  >
                    询盘数{sortArrow('inquiries')}
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('conversionRate')}
                  >
                    转化率{sortArrow('conversionRate')}
                  </TableHead>
                  <TableHead
                    className="text-right cursor-pointer hover:text-[#0A2540]"
                    onClick={() => handleSort('avgDuration')}
                  >
                    平均停留(s){sortArrow('avgDuration')}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedChannels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="py-12 text-center text-slate-400">
                      暂无渠道数据
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedChannels.map((ch, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium text-slate-800">
                        {ch.utmSource || 'Direct'}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {ch.utmMedium || '-'}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {ch.utmCampaign || '-'}
                      </TableCell>
                      <TableCell className="text-right">{ch.pv.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{ch.uv.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{ch.inquiries.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {ch.conversionRate.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right text-slate-500">
                        {ch.avgDuration.toFixed(0)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Keyword analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">关键词分析 (utm_term)</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>关键词</TableHead>
                <TableHead className="text-right">访问量</TableHead>
                <TableHead className="text-right">询盘数</TableHead>
                <TableHead className="text-right">转化率</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.termAnalysis?.length ? (
                data.termAnalysis.slice(0, 10).map((term, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-slate-800">
                      {term.term || '(not set)'}
                    </TableCell>
                    <TableCell className="text-right">{term.pv.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {term.inquiries.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {term.conversionRate.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-slate-400">
                    暂无关键词数据
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  );
}
