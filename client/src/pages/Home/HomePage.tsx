import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@client/src/components/ui/button';
import { ProductCard } from '@client/src/components/ProductCard';
import { SeoHead } from '@client/src/components/SeoHead';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick } from '@client/src/utils/tracking/tracking';
import { productsApi } from '@client/src/api';
import {
  HomeHero,
  HomeAdvantages,
  HomeSellingPoints,
  HomeCertifications,
  HomeTestimonials,
  HomeCTA,
} from './HomeSections';
import type { Product } from '@shared/api.interface';

const HomePage = () => {
  const { t, language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      try {
        const data = await productsApi.getProducts({ pageSize: 4 });
        if (mounted) setProducts(data.items);
      } catch {
        // fallback - API may not be ready yet
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProducts();
    return () => {
      mounted = false;
    };
  }, []);

  const siteName = 'XSY LED';
  const pageTitle = `${t('home.meta.title')} | ${siteName}`;
  const pageDescription = t('home.meta.description');

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={pageDescription}
        keywords="LED headlights, LED bulb, car lights, automotive lighting, H4, H7, H11, 9005, 9006, factory, manufacturer"
        ogType="website"
        jsonLds={[
          {
            type: 'Organization',
            data: {
              name: 'XSY LED',
              alternateName: 'Xing Shengyuan LED Technology',
              url: window.location.origin,
              logo: `${window.location.origin}/favicon.svg`,
              description: t('home.meta.description'),
              email: 'sales@xsy-led.com',
              telephone: '+86-769-8888-6666',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No.88 Industrial Road, Chang\'an Town',
                addressLocality: 'Dongguan',
                addressRegion: 'Guangdong',
                postalCode: '523850',
                addressCountry: 'CN',
              },
              sameAs: [
                'https://www.facebook.com/xsy-led',
                'https://www.linkedin.com/company/xsy-led',
              ],
            },
          },
        ]}
      />

      <HomeHero />

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#00C2FF]">
                {t('home.products.badge')}
              </p>
              <h2 className="text-3xl font-bold text-[#0A2540] md:text-4xl">
                {t('home.products.title')}
              </h2>
              <p className="mt-2 text-slate-600">
                {t('home.products.subtitle')}
              </p>
            </div>
            <Link
              to="/products"
              onClick={() =>
                trackClick(
                  'button',
                  t('home.products.viewAll'),
                  'home_view_all_products',
                  '/products',
                )
              }
            >
              <Button
                variant="outline"
                className="border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"
              >
                {t('home.products.viewAll')}
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-slate-200 bg-slate-100"
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
          ) : products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {['H4', 'H7', 'H11', '9005'].map((socket) => (
                <div
                  key={socket}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-gradient-to-br from-[#0A2540] to-[#1A365D] flex items-center justify-center text-white">
                    <span className="text-2xl font-bold">{socket}</span>
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-[#0A2540]">
                    XSY-{socket} LED Headlight
                  </h3>
                  <p className="mb-3 text-sm text-slate-500">
                    Model: XSY-{socket}01
                  </p>
                  <Button
                    variant="default"
                    className="w-full bg-[#0A2540] hover:bg-[#1A365D]"
                  >
                    {t('common.inquireNow')}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeAdvantages />
      <HomeSellingPoints />
      <HomeCertifications />
      <HomeTestimonials />
      <HomeCTA />
    </>
  );
};

export default HomePage;
