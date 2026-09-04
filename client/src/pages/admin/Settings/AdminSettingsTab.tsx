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

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, '请输入旧密码'),
    newPassword: z.string().min(6, '新密码至少6位'),
    confirmPassword: z.string().min(6, '请确认新密码'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '两次输入的新密码不一致',
    path: ['confirmPassword'],
  });

type PasswordValues = z.infer<typeof passwordSchema>;

interface AdminSettingsTabProps {
  onSave: (values: PasswordValues) => Promise<void>;
  saving: boolean;
}

export default function AdminSettingsTab({
  onSave,
  saving,
}: AdminSettingsTabProps) {
  const form = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const handleSubmit = async (values: PasswordValues) => {
    await onSave(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md space-y-5"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>旧密码</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="current-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>新密码</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认新密码</FormLabel>
              <FormControl>
                <Input type="password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="bg-[#0A2540]" disabled={saving}>
            {saving && <Spinner className="size-4" />}
            修改密码
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { passwordSchema };
export type { PasswordValues };
