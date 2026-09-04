import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@client/src/components/ui/breadcrumb';
import { Button } from '@client/src/components/ui/button';
import { Badge } from '@client/src/components/ui/badge';
import { ProductCard } from '@client/src/components/ProductCard';
import { SeoHead } from '@client/src/components/SeoHead';
import { InquiryForm } from '@client/src/components/InquiryForm';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { getProductImage } from '@client/src/utils/img-resources/product-images';
import { getProductDetail } from '@client/src/utils/img-resources/product-details';
import { trackClick } from '@client/src/utils/tracking/tracking';
import { productsApi } from '@client/src/api';
import type { Product } from '@shared/api.interface';
import { Image } from '@client/src/components/ui/image';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!id) return;
      setLoading(true);
      try {
        // Load current product
        const p = await productsApi.getProduct(id);
        if (mounted) setProduct(p);

        // Load all products for inquiry form and related
        const all = await productsApi.getProducts({ pageSize: 50 });
        if (mounted) {
          setAllProducts(all.items);
          setRelatedProducts(
            all.items
              .filter(
                (item) => item.id !== id && item.socketType === p.socketType,
              )
              .slice(0, 4),
          );
        }
      } catch {
        if (mounted) setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-48 rounded bg-slate-200" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 rounded bg-slate-200" />
              <div className="h-6 w-1/2 rounded bg-slate-200" />
              <div className="h-40 w-full rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center md:px-10 lg:px-16">
        <h2 className="mb-4 text-2xl font-bold text-[#0A2540]">
          {t('product.notFound')}
        </h2>
        <Button onClick={() => navigate('/products')}>
          {t('common.viewProducts')}
        </Button>
      </div>
    );
  }

  const imageSrc = product.images?.[0] ?? getProductImage(product.socketType);
  const detail = getProductDetail(product.model);
  const hasH4 = product.socketType.includes('H4');

  const specFields: [string, string][] = [
    [t('product.spec.model'), product.model],
    [t('product.spec.socketType'), product.socketType],
    [t('product.spec.chipType'), detail?.chipType || 'CSP LED'],
    [t('product.spec.colorTemp'), `${product.colorTempK}K`],
    [t('product.spec.voltage'), product.voltage],
    [t('product.spec.beamAngle'), detail?.beamAngle || '270°'],
    [t('product.spec.ipRate'), detail?.ipRate || product.ipRate],
    [t('product.spec.lifespan'), `${product.lifespanHours.toLocaleString()}h`],
    [t('product.spec.material'), product.material],
  ];

  const powerSpecFields: [string, string][] = [];
  if (detail) {
    powerSpecFields.push([t('product.spec.startupPower'), `${detail.startupPowerW}W`]);
    powerSpecFields.push([t('product.spec.stablePower'), `${detail.stablePowerW}W`]);
    powerSpecFields.push([t('product.spec.startupLumen'), `${detail.startupLumen.toLocaleString()} lm`]);
    powerSpecFields.push([t('product.spec.stableLumen'), `${detail.stableLumen.toLocaleString()} lm`]);
  } else {
    powerSpecFields.push([t('product.spec.powerStartup'), `${product.powerW}W`]);
    powerSpecFields.push([t('product.spec.lumenStartup'), `${product.lumen.toLocaleString()} lm`]);
  }

  const h4SpecFields: [string, string][] = [];
  if (detail && hasH4 && detail.h4StartupPowerW) {
    h4SpecFields.push([t('product.spec.h4StartupPower'), `${detail.h4StartupPowerW}W`]);
    h4SpecFields.push([t('product.spec.h4StablePower'), `${detail.h4StablePowerW}W`]);
    h4SpecFields.push([t('product.spec.h4StartupLumen'), `${detail.h4StartupLumen?.toLocaleString()} lm`]);
    h4SpecFields.push([t('product.spec.h4StableLumen'), `${detail.h4StableLumen?.toLocaleString()} lm`]);
  }

  const dimensionSpecFields: [string, string][] = [];
  if (detail) {
    dimensionSpecFields.push([t('product.spec.diameter'), `${detail.diameterMm}mm`]);
    dimensionSpecFields.push([t('product.spec.heightSingle'), `${detail.heightSingleMm}mm`]);
    if (detail.heightDualMm) {
      dimensionSpecFields.push([t('product.spec.heightDual'), `${detail.heightDualMm}mm`]);
    }
    if (detail.weightSingleG) {
      dimensionSpecFields.push([t('product.spec.weightSingle'), `${detail.weightSingleG}g`]);
    }
    if (detail.weightDualG) {
      dimensionSpecFields.push([t('product.spec.weightDual'), `${detail.weightDualG}g`]);
    }
  }

  const shippingSpecFields: [string, string][] = [
    [t('product.spec.moq'), product.moq.toString()],
    [t('product.spec.packaging'), detail?.packagingBox || product.packaging || '-'],
    [t('product.spec.cartonBox'), detail?.cartonBox || '-'],
    [t('product.spec.deliveryTime'), product.deliveryTime || '-'],
    [t('product.spec.warranty'), product.warranty],
    [t('product.spec.priceRange'), product.priceRange || '-'],
  ];

  const pageTitle = `${product.name} - ${product.model} | XSY LED`;

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={product.description || t('product.meta.description', { model: product.model })}
        keywords={`${product.name}, ${product.model}, ${product.socketType} LED, LED headlight bulb`}
        ogImage={imageSrc}
        ogType="product"
        jsonLds={[
          {
            type: 'Product',
            data: {
              name: product.name,
              model: product.model,
              image: [imageSrc],
              description: product.description || '',
              brand: { '@type': 'Brand', name: 'XSY LED' },
              sku: product.model,
              offers: {
                '@type': 'Offer',
                priceCurrency: 'USD',
                price: product.priceRange || '0',
                availability: 'https://schema.org/InStock',
              },
            },
          },
          {
            type: 'BreadcrumbList',
            data: {
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: window.location.origin + '/' },
                { '@type': 'ListItem', position: 2, name: t('nav.products'), item: window.location.origin + '/products' },
                { '@type': 'ListItem', position: 3, name: product.name },
              ],
            },
          },
        ]}
      />

      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{t('nav.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">
                {t('nav.products')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left: Image + Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Product Image */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#0A2540]">
                {t('product.descriptionTitle')}
              </h2>
              <p className="leading-relaxed text-slate-700">
                {product.description || t('product.descriptionFallback', { model: product.model, socket: product.socketType })}
              </p>
              {product.socketType === 'H4' && (
                <p className="mt-3 text-sm text-slate-500">
                  <span className="font-medium text-[#0A2540]">Note:</span>{' '}
                  {t('product.h4DualNote')}
                </p>
              )}
            </div>

            {/* Specs Tables */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-[#0A2540]">
                  {t('product.spec.basicSpecs')}
                </h3>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {specFields.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="w-1/2 border-r border-slate-200 px-3 py-2.5 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-[#0A2540]">
                  {t('product.spec.performanceSpecs')}
                </h3>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {powerSpecFields.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="w-1/2 border-r border-slate-200 px-3 py-2.5 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                      {hasH4 && h4SpecFields.length > 0 && (
                        <tr className="bg-amber-50">
                          <td colSpan={2} className="px-3 py-2 text-xs font-semibold text-amber-800">
                            {t('product.h4DualNote')}
                          </td>
                        </tr>
                      )}
                      {hasH4 && h4SpecFields.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? 'bg-amber-50/50' : 'bg-white'}
                        >
                          <td className="w-1/2 border-r border-slate-200 px-3 py-2.5 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-[#0A2540]">
                  {t('product.spec.dimensionsTitle')}
                </h3>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {dimensionSpecFields.length > 0 ? dimensionSpecFields.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="w-1/2 border-r border-slate-200 px-3 py-2.5 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{value}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td className="px-3 py-2.5 text-slate-500">{t('product.spec.noData')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-bold text-[#0A2540]">
                  {t('product.spec.shippingSpecs')}
                </h3>
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {shippingSpecFields.map(([label, value], idx) => (
                        <tr
                          key={label}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          <td className="w-1/2 border-r border-slate-200 px-3 py-2.5 font-medium text-slate-700">
                            {label}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold text-[#0A2540]">
                  {t('product.featuresTitle')}
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
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
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Shipping Info */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-[#0A2540]">
                {t('product.shippingTitle')}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-[#0A2540]">
                    {t('product.spec.moq')}
                  </h4>
                  <p className="text-sm text-slate-600">{product.moq} pcs</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-[#0A2540]">
                    {t('product.spec.packaging')}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {product.packaging || t('product.standardPackaging')}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-[#0A2540]">
                    {t('product.spec.deliveryTime')}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {product.deliveryTime || '15-30 days'}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-[#0A2540]">
                    {t('product.paymentTerms')}
                  </h4>
                  <p className="text-sm text-slate-600">T/T, Western Union, L/C</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h4 className="mb-1 text-sm font-semibold text-[#0A2540]">
                    {t('product.spec.warranty')}
                  </h4>
                  <p className="text-sm text-slate-600">{product.warranty}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar Inquiry Form */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Product Summary Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Badge
                variant="default"
                className="mb-3 bg-[#00C2FF] text-[#0A2540]"
              >
                {product.socketType}
              </Badge>
              <h1 className="mb-1 text-2xl font-bold text-[#0A2540]">
                {product.name}
              </h1>
              <p className="mb-4 text-sm text-slate-500">
                {t('product.spec.model')}: {product.model}
              </p>

              <div className="mb-6 space-y-2 border-y border-slate-100 py-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {t('product.spec.power')}
                  </span>
                  <span className="font-medium text-slate-800">
                    {product.powerW}W
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {t('product.spec.lumen')}
                  </span>
                  <span className="font-medium text-slate-800">
                    {product.lumen.toLocaleString()} lm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {t('product.spec.colorTemp')}
                  </span>
                  <span className="font-medium text-slate-800">
                    {product.colorTempK}K
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    {t('product.spec.ipRate')}
                  </span>
                  <span className="font-medium text-slate-800">
                    {product.ipRate}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-[#0A2540] hover:bg-[#1A365D]"
                onClick={() => {
                  trackClick(
                    'button',
                    t('common.getQuote'),
                    `detail_quote_${product.id}`,
                    '',
                  );
                  const el = document.getElementById('inquiry-form-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('common.getQuote')}
              </Button>
            </div>

            {/* Inquiry Form */}
            <div id="inquiry-form-section" className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold text-[#0A2540]">
                {t('inquiry.sidebarTitle')}
              </h3>
              <InquiryForm
                preselectedProductId={product.id}
                products={allProducts}
                compact
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-[#0A2540]">
              {t('product.relatedTitle')}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
