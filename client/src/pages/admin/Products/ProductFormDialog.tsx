import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { SOCKET_TYPES } from '@shared/api.interface';
import type { Product } from '@shared/api.interface';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';

const productSchema = z.object({
  name: z.string().min(1, '产品名称必填'),
  nameEn: z.string().optional(),
  model: z.string().min(1, '型号必填'),
  socketType: z.string().min(1, '灯座类型必填'),
  powerW: z.coerce.number().min(0, '功率不能小于0'),
  lumen: z.coerce.number().min(0, '流明不能小于0'),
  colorTempK: z.coerce.number().min(0, '色温不能小于0'),
  voltage: z.string().optional(),
  ipRate: z.string().optional(),
  lifespanHours: z.coerce.number().min(0, '寿命不能小于0'),
  material: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  features: z.string().optional(),
  images: z.string().optional(),
  moq: z.coerce.number().min(0, 'MOQ不能小于0'),
  packaging: z.string().optional(),
  deliveryTime: z.string().optional(),
  warranty: z.string().optional(),
  priceRange: z.string().optional(),
  sortOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormDialogProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
  submitting: boolean;
}

function productToFormValues(p: Product | null): ProductFormValues {
  if (!p) {
    return {
      name: '',
      nameEn: '',
      model: '',
      socketType: 'H7',
      powerW: 0,
      lumen: 0,
      colorTempK: 6000,
      voltage: '12V',
      ipRate: 'IP67',
      lifespanHours: 50000,
      material: '',
      description: '',
      descriptionEn: '',
      features: '',
      images: '',
      moq: 10,
      packaging: '',
      deliveryTime: '',
      warranty: '2 years',
      priceRange: '',
      sortOrder: 0,
      isActive: true,
    };
  }
  return {
    name: p.name,
    nameEn: p.nameEn ?? '',
    model: p.model,
    socketType: p.socketType,
    powerW: p.powerW,
    lumen: p.lumen,
    colorTempK: p.colorTempK,
    voltage: p.voltage,
    ipRate: p.ipRate,
    lifespanHours: p.lifespanHours,
    material: p.material,
    description: p.description ?? '',
    descriptionEn: p.descriptionEn ?? '',
    features: p.features?.join(', ') ?? '',
    images: p.images?.join('\n') ?? '',
    moq: p.moq,
    packaging: p.packaging ?? '',
    deliveryTime: p.deliveryTime ?? '',
    warranty: p.warranty,
    priceRange: p.priceRange ?? '',
    sortOrder: p.sortOrder,
    isActive: p.isActive,
  };
}

export default function ProductFormDialog({
  open,
  product,
  onClose,
  onSubmit,
  submitting,
}: ProductFormDialogProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: productToFormValues(product),
  });

  useEffect(() => {
    if (open) {
      form.reset(productToFormValues(product));
    }
  }, [open, product, form]);

  const handleSubmit = async (values: ProductFormValues) => {
    await onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? '编辑产品' : '新增产品'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>产品名称 (中)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>产品名称 (英)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>型号</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socketType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>灯座类型</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="选择灯座" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SOCKET_TYPES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="powerW"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>功率 (W)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lumen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>流明 (lm)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="colorTempK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>色温 (K)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="voltage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电压</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ipRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>防护等级</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lifespanHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>寿命 (小时)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>材质</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="moq"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MOQ (起订量)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="packaging"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>包装方式</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>交期</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="warranty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>质保</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>价格区间</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="如 $10-20/pc" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>排序</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-3 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label className="cursor-pointer">启用状态</Label>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>产品描述 (中)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptionEn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>产品描述 (英)</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>产品特点 (逗号分隔)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={2}
                      placeholder="高亮特点1, 特点2, 特点3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>图片 URL (每行一个)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="https://example.com/img1.jpg&#10;https://example.com/img2.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button type="submit" className="bg-[#0A2540]" disabled={submitting}>
                {submitting && <Spinner className="size-4" />}
                {product ? '保存修改' : '创建产品'}
              </Button>
            </div>
          </form>
        </Form>

        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="size-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

export type { ProductFormValues };
