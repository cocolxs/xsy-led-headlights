import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { getInquiries, exportInquiries } from '@/api/admin';
import type {
  Inquiry,
  InquiryStatus,
  InquiryListParams,
} from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import InquiryDetailDialog from './InquiryDetailDialog';

const STATUS_OPTIONS: { value: string; label: string; color: string }[] = [
  { value: '', label: '全部状态', color: '' },
  { value: 'new', label: '新询盘', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: '已联系', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'quoted', label: '已报价', color: 'bg-purple-100 text-purple-700' },
  { value: 'converted', label: '已成交', color: 'bg-green-100 text-green-700' },
  { value: 'lost', label: '已流失', color: 'bg-slate-200 text-slate-600' },
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

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [filters, setFilters] = useState({
    status: '' as string,
    utmSource: '' as string,
    country: '' as string,
    dateFrom: '' as string,
    dateTo: '' as string,
    search: '' as string,
  });

  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: InquiryListParams = {
        page,
        pageSize,
      };
      if (filters.status) params.status = filters.status as InquiryStatus;
      if (filters.utmSource) params.utmSource = filters.utmSource;
      if (filters.country) params.country = filters.country;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;
      if (filters.search) params.search = filters.search;

      const result = await getInquiries(params);
      setItems(result.items);
      setTotal(result.total);
    } catch {
      toast.error('加载询盘列表失败');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleViewDetail = (id: string) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const params: InquiryListParams = {};
      if (filters.status) params.status = filters.status as InquiryStatus;
      if (filters.utmSource) params.utmSource = filters.utmSource;
      if (filters.country) params.country = filters.country;
      if (filters.dateFrom) params.dateFrom = filters.dateFrom;
      if (filters.dateTo) params.dateTo = filters.dateTo;
      if (filters.search) params.search = filters.search;

      await exportInquiries(params);
      toast.success('导出成功');
    } catch {
      toast.error('导出失败');
    } finally {
      setExporting(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Select
              value={filters.status}
              onValueChange={(v) => {
                setFilters((f) => ({ ...f, status: v }));
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="状态" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="来源渠道"
              value={filters.utmSource}
              onChange={(e) =>
                setFilters((f) => ({ ...f, utmSource: e.target.value }))
              }
            />
            <Input
              placeholder="国家"
              value={filters.country}
              onChange={(e) =>
                setFilters((f) => ({ ...f, country: e.target.value }))
              }
            />
            <div className="flex items-center gap-1">
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-1">
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dateTo: e.target.value }))
                }
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索姓名/邮箱"
                className="pl-9"
                value={filters.search}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, search: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? (
                <Spinner className="size-4" />
              ) : (
                <Download className="size-4" />
              )}
              导出 CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg">询盘列表</CardTitle>
          <span className="text-sm text-slate-500">共 {total} 条</span>
        </CardHeader>
        <CardContent className="pt-0">
          {loading && items.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner className="size-6 text-[#0A2540]" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>时间</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>公司</TableHead>
                  <TableHead>邮箱</TableHead>
                  <TableHead>国家</TableHead>
                  <TableHead>产品</TableHead>
                  <TableHead>来源</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-12 text-center text-slate-400">
                      暂无询盘数据
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((inq) => (
                    <TableRow
                      key={inq.id}
                      className="cursor-pointer"
                      onClick={() => handleViewDetail(inq.id)}
                    >
                      <TableCell className="text-xs text-slate-500">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">
                        {inq.name}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {inq.company || '-'}
                      </TableCell>
                      <TableCell className="text-slate-600">{inq.email}</TableCell>
                      <TableCell className="text-slate-600">
                        {inq.country || inq.countryGuess || '-'}
                      </TableCell>
                      <TableCell className="max-w-[140px] truncate text-slate-600">
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
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail(inq.id);
                          }}
                        >
                          查看
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-slate-500">
                第 {page} / {totalPages} 页
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
        </CardContent>
      </Card>

      <InquiryDetailDialog
        open={detailOpen}
        inquiryId={selectedId}
        onClose={() => setDetailOpen(false)}
        onUpdated={fetchData}
      />
    </div>
  );
}
