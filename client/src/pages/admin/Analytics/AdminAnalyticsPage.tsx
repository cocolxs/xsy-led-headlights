import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Users, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAnalytics } from '@/api/admin';
import type { AnalyticsResponse, AnalyticsListParams } from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
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
import DevicePieChart from './DevicePieChart';

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: AnalyticsListParams = { page, pageSize };
      if (dateFrom) params.dateFrom = dateFrom;
      if (dateTo) params.dateTo = dateTo;
      const result = await getAnalytics(params);
      setData(result);
    } catch {
      toast.error('加载分析数据失败');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, dateFrom, dateTo]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = data?.pageViews
    ? Math.ceil(data.pageViews.total / pageSize)
    : 0;

  return (
    <div className="space-y-6">
      {/* Date filter */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <span className="text-sm font-medium text-slate-700">时间范围:</span>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="w-40"
            />
            <span className="text-slate-400">至</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="w-40"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="realtime">
        <TabsList className="mb-4">
          <TabsTrigger value="realtime">实时访问</TabsTrigger>
          <TabsTrigger value="detail">访问明细</TabsTrigger>
          <TabsTrigger value="performance">页面性能</TabsTrigger>
          <TabsTrigger value="geo">地域分布</TabsTrigger>
          <TabsTrigger value="device">设备与浏览器</TabsTrigger>
        </TabsList>

        {/* Realtime */}
        <TabsContent value="realtime">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="size-5 text-[#00C2FF]" />
                  当前在线人数
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#0A2540]">
                      {data?.realtime?.onlineUsers ?? 0}
                    </div>
                    <p className="mt-3 text-sm text-slate-500">人正在浏览网站</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="size-5 text-[#10B981]" />
                  最近10分钟访问
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-[#10B981]">
                      {data?.realtime?.recent10minViews ?? 0}
                    </div>
                    <p className="mt-3 text-sm text-slate-500">次页面浏览</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Detail */}
        <TabsContent value="detail">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">访问明细</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {loading && !data ? (
                <div className="flex h-64 items-center justify-center">
                  <Spinner className="size-6 text-[#0A2540]" />
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>时间</TableHead>
                        <TableHead>页面</TableHead>
                        <TableHead>设备</TableHead>
                        <TableHead>浏览器</TableHead>
                        <TableHead>操作系统</TableHead>
                        <TableHead>地区</TableHead>
                        <TableHead className="text-right">停留(s)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.pageViews?.items?.length === 0 || !data ? (
                        <TableRow>
                          <TableCell colSpan={7} className="py-12 text-center text-slate-400">
                            暂无访问数据
                          </TableCell>
                        </TableRow>
                      ) : (
                        data.pageViews.items.map((pv) => (
                          <TableRow key={pv.id}>
                            <TableCell className="text-xs text-slate-500">
                              {new Date(pv.createdAt).toLocaleString()}
                            </TableCell>
                            <TableCell className="max-w-[240px]">
                              <div className="truncate font-medium text-slate-800">
                                {pv.pageTitle || pv.url}
                              </div>
                              <div className="truncate text-xs text-slate-400">
                                {pv.url}
                              </div>
                            </TableCell>
                            <TableCell className="text-slate-600">{pv.device}</TableCell>
                            <TableCell className="text-slate-600">{pv.browser}</TableCell>
                            <TableCell className="text-slate-600">{pv.os}</TableCell>
                            <TableCell className="text-slate-600">{pv.countryGuess || '-'}</TableCell>
                            <TableCell className="text-right text-slate-500">
                              {pv.durationSeconds}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                  {totalPages > 0 && (
                    <div className="mt-4 flex items-center justify-between border-t pt-4">
                      <span className="text-sm text-slate-500">
                        第 {page} / {totalPages} 页 · 共 {data?.pageViews.total} 条
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={page <= 1 || loading}
                          onClick={() => setPage((p) => p - 1)}
                        >
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          disabled={page >= totalPages || loading}
                          onClick={() => setPage((p) => p + 1)}
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance */}
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">页面性能</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>页面</TableHead>
                    <TableHead className="text-right">PV</TableHead>
                    <TableHead className="text-right">UV</TableHead>
                    <TableHead className="text-right">平均停留(s)</TableHead>
                    <TableHead className="text-right">跳出率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.pagePerformance?.length ? (
                    data.pagePerformance.map((p, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="max-w-[320px]">
                          <div className="truncate font-medium text-slate-800">
                            {p.pageTitle || p.url}
                          </div>
                          <div className="truncate text-xs text-slate-400">{p.url}</div>
                        </TableCell>
                        <TableCell className="text-right">{p.pv.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{p.uv.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{p.avgDuration.toFixed(1)}</TableCell>
                        <TableCell className="text-right">{p.bounceRate.toFixed(1)}%</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-8 text-center text-slate-400">
                        暂无数据
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geography */}
        <TabsContent value="geo">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">地域分布（按国家）</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>国家 / 地区</TableHead>
                    <TableHead className="text-right">PV</TableHead>
                    <TableHead className="text-right">UV</TableHead>
                    <TableHead className="text-right">询盘数</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.countryStats?.length ? (
                    data.countryStats.map((c, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-slate-800">
                          <span className="mr-2 text-lg">🌐</span>
                          {c.country || 'Unknown'}
                        </TableCell>
                        <TableCell className="text-right">{c.pv.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{c.uv.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{c.inquiries.toLocaleString()}</TableCell>
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
        </TabsContent>

        {/* Device/Browser/OS */}
        <TabsContent value="device">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">设备分布</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {data?.deviceStats?.length ? (
                  <DevicePieChart data={data.deviceStats} />
                ) : (
                  <div className="flex h-[260px] items-center justify-center text-slate-400">
                    暂无数据
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">浏览器分布</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {data?.browserStats?.length ? (
                  <DevicePieChart data={data.browserStats} />
                ) : (
                  <div className="flex h-[260px] items-center justify-center text-slate-400">
                    暂无数据
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">操作系统</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {data?.osStats?.length ? (
                  <DevicePieChart data={data.osStats} />
                ) : (
                  <div className="flex h-[260px] items-center justify-center text-slate-400">
                    暂无数据
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
