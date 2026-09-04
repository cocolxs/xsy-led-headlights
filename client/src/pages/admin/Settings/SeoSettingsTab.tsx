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

const seoSchema = z.object({
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

type SeoValues = z.infer<typeof seoSchema>;

interface SeoSettingsTabProps {
  initialValues: SeoValues;
  onSave: (values: SeoValues) => Promise<void>;
  saving: boolean;
}

export default function SeoSettingsTab({
  initialValues,
  onSave,
  saving,
}: SeoSettingsTabProps) {
  const form = useForm<SeoValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
        <FormField
          control={form.control}
          name="seoTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>默认 Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meta Description</FormLabel>
              <FormControl>
                <Textarea rows={3} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seoKeywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>关键词 (逗号分隔)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="bg-[#0A2540]" disabled={saving}>
            {saving && <Spinner className="size-4" />}
            保存 SEO 设置
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { seoSchema };
export type { SeoValues };
