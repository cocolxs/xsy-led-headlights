import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@client/src/components/ui/button';
import { Input } from '@client/src/components/ui/input';
import { Textarea } from '@client/src/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@client/src/components/ui/select';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick, getUtmParams } from '@client/src/utils/tracking/tracking';
import { inquiriesApi } from '@client/src/api';
import type { Product } from '@shared/api.interface';

interface InquiryFormProps {
  preselectedProductId?: string;
  products?: Product[];
  compact?: boolean;
}

const buildSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('inquiry.form.nameRequired')),
    company: z.string().optional(),
    email: z
      .string()
      .min(1, t('inquiry.form.emailRequired'))
      .email(t('inquiry.form.emailInvalid')),
    phone: z.string().optional(),
    whatsapp: z.string().optional(),
    country: z.string().optional(),
    productId: z.string().optional(),
    quantity: z.string().optional(),
    message: z.string().optional(),
  });

type FormData = z.infer<ReturnType<typeof buildSchema>>;

export const InquiryForm = ({
  preselectedProductId,
  products = [],
  compact = false,
}: InquiryFormProps) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const schema = buildSchema(t);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      whatsapp: '',
      country: '',
      productId: preselectedProductId || '',
      quantity: '',
      message: '',
    },
  });

  const selectedProductId = watch('productId');

  useEffect(() => {
    if (preselectedProductId) {
      setValue('productId', preselectedProductId);
    }
  }, [preselectedProductId, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const utm = getUtmParams();
      const selectedProduct = products.find((p) => p.id === data.productId);

      await inquiriesApi.submitInquiry({
        name: data.name,
        company: data.company || undefined,
        email: data.email,
        phone: data.phone || undefined,
        whatsapp: data.whatsapp || undefined,
        country: data.country || undefined,
        productId: data.productId || undefined,
        productName: selectedProduct?.name || undefined,
        quantity: data.quantity ? Number(data.quantity) : undefined,
        message: data.message || undefined,
        ...utm,
      });

      setIsSuccess(true);
      toast.success(t('inquiry.form.success'));
      reset();
      trackClick('form_submit', 'inquiry_form', '', '');
    } catch {
      toast.error(t('inquiry.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess && !compact) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-emerald-900">
          {t('inquiry.form.success')}
        </h3>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsSuccess(false)}
        >
          {t('common.submit')}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      noValidate
    >
      <div className={compact ? '' : 'grid gap-4 md:grid-cols-2'}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.name')} <span className="text-red-500">*</span>
          </label>
          <Input
            {...register('name')}
            className="w-full"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.company')}
          </label>
          <Input {...register('company')} className="w-full" />
        </div>
      </div>

      <div className={compact ? '' : 'grid gap-4 md:grid-cols-2'}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.email')} <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            {...register('email')}
            className="w-full"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.phone')}
          </label>
          <Input {...register('phone')} className="w-full" />
        </div>
      </div>

      <div className={compact ? '' : 'grid gap-4 md:grid-cols-2'}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.whatsapp')}
          </label>
          <Input {...register('whatsapp')} className="w-full" />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.country')}
          </label>
          <Input {...register('country')} className="w-full" />
        </div>
      </div>

      <div className={compact ? '' : 'grid gap-4 md:grid-cols-2'}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.product')}
          </label>
          <Select
            value={selectedProductId || ''}
            onValueChange={(val) => setValue('productId', val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('inquiry.form.productPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {t('inquiry.form.productAll')}
              </SelectItem>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.model})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {t('inquiry.form.quantity')}
          </label>
          <Input
            type="number"
            min="1"
            {...register('quantity')}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          {t('inquiry.form.message')}
        </label>
        <Textarea
          rows={4}
          placeholder={t('inquiry.form.messagePlaceholder')}
          {...register('message')}
          className="w-full resize-none"
        />
      </div>

      <Button
        type="submit"
        size={compact ? 'default' : 'lg'}
        className="w-full bg-[#0A2540] hover:bg-[#1A365D]"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('inquiry.form.submitting') : t('inquiry.form.submit')}
      </Button>
    </form>
  );
};

export default InquiryForm;
