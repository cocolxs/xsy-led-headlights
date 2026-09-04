import { useState, useEffect } from 'react';
import {
  Eye,
  Users,
  MessageSquare,
  TrendingUp,
  Clock,
  UserPlus,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { getDashboard } from '@/api/admin';
import type { DashboardResponse, DashboardStats } from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StatCard from './StatCard';
import TrendChart from './TrendChart';
import SourcePieChart from './SourcePieChart';
import DeviceChart from './DeviceChart';
import FunnelChart from './FunnelChart';

type PeriodKey = 'today' | 'week' | 'month';

const PERIODS: { key: PeriodKey; label: string }[] = [
  { key: 'today', label: '今日' },
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
];

const statusColorMap: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  quoted: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
  lost: 'bg-slate-200 text-slate-600',
};

const statusLabelMap: Record<string, string> = {
  new: '新询盘',
  contacted: '已联系',
  quoted: '已报价',
  converted: '已成交',
  lost: '已流失',
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<PeriodKey>('today');

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDashboard();
      setData(result);
    } catch {
      toast.error('加载仪表盘数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner className="size-8 text-[#0A2540]" />
      </div>
    );
  }

  const stats: DashboardStats[PeriodKey] | null = data
    ? data.stats[period]
    : null;

  const newReturningRatio = stats
    ? stats.returningVisitors > 0
      ? (stats.newVisitors / stats.returningVisitors).toFixed(2)
      : '∞'
    : '0';

  return (
    <div className="space-y-6">
      {/* Period selector + refresh */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
          {PERIODS.map((p) => (
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
        <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
          <RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />
          刷新
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="今日PV"
          value={stats?.pv.toLocaleString() ?? 0}
          icon={Eye}
          color="#0A2540"
        />
        <StatCard
          label="今日UV"
          value={stats?.uv.toLocaleString() ?? 0}
          icon={Users}
          color="#00C2FF"
        />
        <StatCard
          label="今日询盘"
          value={stats?.inquiries.toLocaleString() ?? 0}
          icon={MessageSquare}
          color="#10B981"
        />
        <StatCard
          label="转化率"
          value={`${stats?.conversionRate.toFixed(2) ?? '0.00'}%`}
          icon={TrendingUp}
          color="#8B5CF6"
        />
        <StatCard
          label="平均停留时长"
          value={`${stats?.avgDuration.toFixed(0) ?? 0}s`}
          icon={Clock}
          color="#F59E0B"
        />
        <StatCard
          label="新/回访访客比"
          value={newReturningRatio}
          icon={UserPlus}
          color="#EF4444"
          trendLabel="新 vs 回访"
        />
      </div>

      {/* Charts row 1: Trend + Source */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">30天访问与询盘趋势</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.trend30d?.length ? (
              <TrendChart data={data.trend30d} />
            ) : (
              <div className="flex h-[320px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">来源分布</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.sourceDistribution?.length ? (
              <SourcePieChart data={data.sourceDistribution} />
            ) : (
              <div className="flex h-[280px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts row 2: Device + Funnel */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">设备分布</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.deviceDistribution?.length ? (
              <DeviceChart data={data.deviceDistribution} />
            ) : (
              <div className="flex h-[280px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">转化漏斗</CardTitle>
          </CardHeader>
          <CardContent>
            {data?.funnel?.length ? (
              <FunnelChart data={data.funnel} />
            ) : (
              <div className="flex h-[280px] items-center justify-center text-slate-400">
                暂无数据
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tables row: Top pages + Latest inquiries */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">热门页面 TOP10</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>页面</TableHead>
                  <TableHead className="text-right">PV</TableHead>
                  <TableHead className="text-right">UV</TableHead>
                  <TableHead className="text-right">停留(s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.topPages?.length ? (
                  data.topPages.slice(0, 10).map((page, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="max-w-[220px] truncate font-medium">
                        <div className="truncate text-slate-800">
                          {page.pageTitle || page.url}
                        </div>
                        <div className="truncate text-xs text-slate-400">
                          {page.url}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{page.pv.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{page.uv.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-slate-500">
                        {page.avgDuration.toFixed(0)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-slate-400">
                      暂无数据
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">最新询盘</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>客户</TableHead>
                  <TableHead>产品</TableHead>
                  <TableHead>来源</TableHead>
                  <TableHead>状态</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.latestInquiries?.length ? (
                  data.latestInquiries.slice(0, 5).map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell>
                        <div className="font-medium text-slate-800">{inq.name}</div>
                        <div className="text-xs text-slate-400">{inq.email}</div>
                      </TableCell>
                      <TableCell className="max-w-[120px] truncate text-slate-600">
                        {inq.productName || '-'}
                      </TableCell>
                      <TableCell className="text-slate-500">
                        {inq.utmSource || 'Direct'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            statusColorMap[inq.status] ??
                            'bg-slate-100 text-slate-600'
                          }
                        >
                          {statusLabelMap[inq.status] ?? inq.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-8 text-center text-slate-400">
                      暂无询盘
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
