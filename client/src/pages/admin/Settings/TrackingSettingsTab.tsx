import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const trackingSchema = z.object({
  ga4Id: z.string().optional(),
  gtmId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  googleAdsId: z.string().optional(),
});

type TrackingValues = z.infer<typeof trackingSchema>;

interface TrackingSettingsTabProps {
  initialValues: TrackingValues;
  onSave: (values: TrackingValues) => Promise<void>;
  saving: boolean;
}

export default function TrackingSettingsTab({
  initialValues,
  onSave,
  saving,
}: TrackingSettingsTabProps) {
  const form = useForm<TrackingValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: initialValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSave)} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="ga4Id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GA4 Measurement ID</FormLabel>
                <FormControl>
                  <Input placeholder="G-XXXXXXXXXX" {...field} />
                </FormControl>
                <p className="text-xs text-slate-500">
                  Google Analytics 4 追踪 ID
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gtmId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GTM 容器 ID</FormLabel>
                <FormControl>
                  <Input placeholder="GTM-XXXXXXX" {...field} />
                </FormControl>
                <p className="text-xs text-slate-500">
                  Google Tag Manager 容器 ID
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="facebookPixelId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook Pixel ID</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <p className="text-xs text-slate-500">
                  Meta Pixel 像素 ID
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="googleAdsId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Google Ads ID</FormLabel>
                <FormControl>
                  <Input placeholder="AW-123456789" {...field} />
                </FormControl>
                <p className="text-xs text-slate-500">
                  Google Ads 转化追踪 ID
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          <p className="font-medium">💡 提示</p>
          <p className="mt-1 text-blue-700">
            填写相应的 ID 后，系统会自动在网站前端注入对应的追踪代码。
            留空则不注入。保存后约 1-2 分钟生效。
          </p>
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="bg-[#0A2540]" disabled={saving}>
            {saving && <Spinner className="size-4" />}
            保存追踪代码
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { trackingSchema };
export type { TrackingValues };
