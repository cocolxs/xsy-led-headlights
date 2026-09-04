import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { login } from '@/api/admin';
import { useAdminAuth, isLoggedIn } from '@/utils/admin-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login: saveAuth } = useAdminAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await login(values.username, values.password);
      saveAuth(result.token, result.admin);
      toast.success('登录成功');
      navigate('/admin/dashboard', { replace: true });
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? '登录失败，请检查用户名和密码';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0A2540] via-[#1A365D] to-[#0A2540] px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-[#00C2FF] blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00C2FF] blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
            <Lightbulb className="size-8 text-[#00C2FF]" />
          </div>
          <h1 className="text-2xl font-bold text-white">XSY LED Admin</h1>
          <p className="mt-2 text-sm text-white/60">
            东莞市星盛源智能科技有限公司 - 管理后台
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
          <h2 className="mb-6 text-xl font-semibold text-slate-800">管理员登录</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="请输入用户名"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="请输入密码"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-[#0A2540] hover:bg-[#1A365D]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    登录中...
                  </>
                ) : (
                  '登录'
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} XSY LED. All rights reserved.
        </p>
      </div>
    </div>
  );
}
