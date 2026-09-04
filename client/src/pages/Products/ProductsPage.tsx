import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@client/src/components/ui/breadcrumb';
import { ProductCard } from '@client/src/components/ProductCard';
import { SeoHead } from '@client/src/components/SeoHead';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick } from '@client/src/utils/tracking/tracking';
import { productsApi } from '@client/src/api';
import type { Product } from '@shared/api.interface';

const SOCKET_OPTIONS = [
  'All',
  'H1',
  'H4',
  'H7',
  'H11',
  '9005',
  '9006',
  '9012',
  '9004/9007',
  'D Series',
];

const SOCKET_API_MAP: Record<string, string> = {
  '9004/9007': '9004',
  'D Series': 'D2S',
};

const SERIES_OPTIONS = ['All', 'V Series', 'X Series', 'Z Series'];

const ProductsPage = () => {
  const { t, language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const socketParam = searchParams.get('socket') || 'All';
  const seriesParam = searchParams.get('series') || 'All';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      setLoading(true);
      try {
        const data = await productsApi.getProducts({
          socketType:
            socketParam === 'All'
              ? undefined
              : SOCKET_API_MAP[socketParam] ?? socketParam,
          pageSize: 50,
        });
        if (mounted) setProducts(data.items);
      } catch {
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      mounted = false;
    };
  }, [socketParam]);

  const handleSocketChange = (socket: string) => {
    trackClick('filter', socket, 'socket_filter', '');
    const params = new URLSearchParams(searchParams);
    if (socket === 'All') {
      params.delete('socket');
    } else {
      params.set('socket', socket);
    }
    setSearchParams(params);
  };

  const handleSeriesChange = (series: string) => {
    trackClick('filter', series, 'series_filter', '');
    const params = new URLSearchParams(searchParams);
    if (series === 'All') {
      params.delete('series');
    } else {
      params.set('series', series);
    }
    setSearchParams(params);
  };

  const getSeriesLabel = (series: string): string => {
    if (series === 'All') return t('products.filter.series.all');
    if (series === 'V Series') return t('products.filter.series.v');
    if (series === 'X Series') return t('products.filter.series.x');
    if (series === 'Z Series') return t('products.filter.series.z');
    return series;
  };

  const filteredProducts = products.filter((product: Product) => {
    if (seriesParam === 'All') return true;
    const model = product.model || '';
    if (seriesParam === 'V Series') return /^(V|PD-V)/i.test(model);
    if (seriesParam === 'X Series') return /^(X|PD-X)/i.test(model);
    if (seriesParam === 'Z Series') return /^(Z|PD-Z)/i.test(model);
    return true;
  });

  const siteName = 'XSY LED';
  const pageTitle = `${t('products.meta.title')} | ${siteName}`;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={t('products.meta.description')}
        keywords="LED headlights, H4, H7, H11, 9005, 9006, LED bulb, automotive lighting"
        ogType="website"
      />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('nav.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('nav.products')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-10">
          <h1 className="mb-2 text-3xl font-bold text-[#0A2540] md:text-4xl">
            {t('products.title')}
          </h1>
          <p className="text-slate-600">{t('products.subtitle')}</p>
        </div>

        {/* Socket Filter */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">
            {t('products.filter.bySocket')}
          </p>
          <div className="flex flex-wrap gap-2">
            {SOCKET_OPTIONS.map((socket) => (
              <button
                key={socket}
                onClick={() => handleSocketChange(socket)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  socketParam === socket
                    ? 'bg-[#0A2540] text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#0A2540] hover:text-[#0A2540]'
                }`}
              >
                {socket === 'All' ? t('common.all') : socket}
              </button>
            ))}
          </div>
        </div>

        {/* Series Filter */}
        <div className="mb-8">
          <p className="mb-3 text-sm font-medium text-slate-700">
            {t('products.filter.bySeries')}
          </p>
          <div className="flex flex-wrap gap-2">
            {SERIES_OPTIONS.map((series) => (
              <button
                key={series}
                onClick={() => handleSeriesChange(series)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  seriesParam === series
                    ? 'bg-[#0A2540] text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-[#0A2540] hover:text-[#0A2540]'
                }`}
              >
                {getSeriesLabel(series)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
              >
                <div className="aspect-square bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-10 w-full rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <svg
                className="h-8 w-8 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-slate-500">{t('products.noResults')}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsPage;
