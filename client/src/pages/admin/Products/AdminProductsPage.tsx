import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { Plus, Search, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProduct,
} from '@/api/admin';
import type { Product } from '@shared/api.interface';
import { SOCKET_TYPES } from '@shared/api.interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Spinner } from '@/components/ui/spinner';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import ProductFormDialog, { type ProductFormValues } from './ProductFormDialog';
import { Image } from '@client/src/components/ui/image';

export default function AdminProductsPage() {
  const [items, setItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [socketType, setSocketType] = useState('');
  const [status, setStatus] = useState<string>('');
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string | number | boolean | undefined> = {
        page,
        pageSize,
      };
      if (socketType) params.socketType = socketType;
      if (status) params.isActive = status === 'active';
      if (search) params.search = search;

      const result = await getProducts(params as { page: number; pageSize: number });
      setItems(result.items);
      setTotal(result.total);
    } catch {
      toast.error('加载产品列表失败');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, socketType, status, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAdd = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        features: values.features
          ? values.features.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
        images: values.images
          ? values.images.split('\n').map((s) => s.trim()).filter(Boolean)
          : [],
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
        toast.success('产品更新成功');
      } else {
        await createProduct(payload as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('产品创建成功');
      }
      setFormOpen(false);
      fetchData();
    } catch {
      toast.error(editingProduct ? '更新失败' : '创建失败');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleProduct(id);
      toast.success('状态已更新');
      fetchData();
    } catch {
      toast.error('更新失败');
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteId);
      toast.success('删除成功');
      setDeleteId(null);
      fetchData();
    } catch {
      toast.error('删除失败');
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Filter bar */}
      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={socketType}
              onValueChange={(v) => {
                setSocketType(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="全部灯座" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">全部灯座</SelectItem>
                {SOCKET_TYPES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="全部状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">全部状态</SelectItem>
                <SelectItem value="active">启用</SelectItem>
                <SelectItem value="inactive">停用</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="搜索产品名称/型号"
                className="w-60 pl-9"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className="ml-auto">
            <Button className="bg-[#0A2540]" onClick={handleAdd}>
              <Plus className="size-4" />
              新增产品
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-3">
          <CardTitle className="text-lg">产品列表</CardTitle>
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
                  <TableHead>图片</TableHead>
                  <TableHead>名称</TableHead>
                  <TableHead>型号</TableHead>
                  <TableHead>灯座</TableHead>
                  <TableHead>功率</TableHead>
                  <TableHead>流明</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>排序</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-12 text-center text-slate-400">
                      暂无产品
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>
                        {p.images?.[0] ? (
                          <Image
                            src={p.images[0]}
                            alt={p.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-100 text-slate-400">
                            无图
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate font-medium text-slate-800">
                        {p.name}
                      </TableCell>
                      <TableCell className="text-slate-600">{p.model}</TableCell>
                      <TableCell className="text-slate-600">{p.socketType}</TableCell>
                      <TableCell className="text-slate-600">{p.powerW}W</TableCell>
                      <TableCell className="text-slate-600">{p.lumen}lm</TableCell>
                      <TableCell>
                        <Switch
                          checked={p.isActive}
                          onCheckedChange={() => handleToggle(p.id)}
                        />
                      </TableCell>
                      <TableCell className="text-slate-500">{p.sortOrder}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(p)}
                          >
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => confirmDelete(p.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}

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

      <ProductFormDialog
        open={formOpen}
        product={editingProduct}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        submitting={submitting}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              删除后无法恢复，确定要删除该产品吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={deleting}
            >
              {deleting && <Spinner className="size-4" />}
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
