import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@client/src/components/ui/badge';
import { Button } from '@client/src/components/ui/button';
import { Image } from '@client/src/components/ui/image';
import { getProductImage } from '@client/src/utils/img-resources/product-images';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick } from '@client/src/utils/tracking/tracking';
import type { Product } from '@shared/api.interface';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const imageSrc = product.images?.[0] ?? getProductImage(product.socketType);

  const handleInquireClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    trackClick(
      'button',
      t('common.inquireNow'),
      `inquire-${product.id}`,
      `/contact?product=${product.id}`,
    );
    navigate(`/contact?product=${product.id}`);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={() =>
        trackClick('card', product.name, product.id, `/products/${product.id}`)
      }
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Image
          src={imageSrc}
          alt={product.name}
          width={400}
          height={400}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge
          variant="default"
          className="absolute left-3 top-3 bg-[#0A2540] px-2.5 py-1 text-white"
        >
          {product.socketType}
        </Badge>
      </div>

      <div className="p-5">
        <h3 className="mb-1 line-clamp-1 text-base font-semibold text-slate-900 group-hover:text-[#0A2540]">
          {product.name}
        </h3>
        <p className="mb-3 text-sm text-slate-500">
          {t('product.spec.model')}: {product.model}
        </p>

        <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 shrink-0 text-[#00C2FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="truncate">
              {t('product.spec.powerStartup')}: <span className="font-medium text-slate-800">{product.powerW}W</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="h-4 w-4 shrink-0 text-[#00C2FF]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="truncate">
              {t('product.spec.lumenStartup')}: <span className="font-medium text-slate-800">{product.lumen.toLocaleString()} lm</span>
            </span>
          </div>
        </div>

        <Button
          variant="default"
          className="w-full bg-[#0A2540] hover:bg-[#1A365D]"
          onClick={handleInquireClick}
        >
          {t('common.inquireNow')}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
