import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Spinner } from '@/components/ui/spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const basicSchema = z.object({
  companyName: z.string().min(1, '公司名称必填'),
  companyNameEn: z.string().min(1, '公司英文名称必填'),
  address: z.string().optional(),
  email: z.string().email('请输入有效邮箱'),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  workingHours: z.string().optional(),
});

type BasicValues = z.infer<typeof basicSchema>;

interface BasicSettingsTabProps {
  initialValues: BasicValues;
  onSave: (values: BasicValues) => Promise<void>;
  saving: boolean;
}

export default function BasicSettingsTab({
  initialValues,
  onSave,
  saving,
}: BasicSettingsTabProps) {
  const form = useForm<BasicValues>({
    resolver: zodResolver(basicSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司名称 (中)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyNameEn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公司名称 (英)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>电话</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="whatsapp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作时间</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Mon-Fri 9:00-18:00 GMT+8" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>地址</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="bg-[#0A2540]" disabled={saving}>
            {saving && <Spinner className="size-4" />}
            保存基本信息
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { basicSchema };
export type { BasicValues };
