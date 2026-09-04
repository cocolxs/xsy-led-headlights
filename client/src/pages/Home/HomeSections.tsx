import { Link } from 'react-router-dom';
import {
  Award,
  DollarSign,
  Truck,
  Wrench,
  Zap,
  Shield,
  Lightbulb,
  Droplets,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Button } from '@client/src/components/ui/button';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick } from '@client/src/utils/tracking/tracking';

export const HomeHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A2540] via-[#1A365D] to-[#0A2540] text-white">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#00C2FF] blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#00C2FF] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16 lg:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-sm">
            <Star className="h-4 w-4 text-[#00C2FF]" />
            <span>CE / RoHS / FCC Certified · Export to 80+ Countries</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {t('home.hero.title')}
          </h1>

          <p className="mb-10 text-lg leading-relaxed text-slate-300 md:text-xl">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/products"
              onClick={() =>
                trackClick(
                  'button',
                  t('home.hero.ctaPrimary'),
                  'hero_view_products',
                  '/products',
                )
              }
            >
              <Button
                size="lg"
                className="bg-white text-[#0A2540] hover:bg-slate-100"
              >
                {t('home.hero.ctaPrimary')}
              </Button>
            </Link>
            <Link
              to="/contact"
              onClick={() =>
                trackClick(
                  'button',
                  t('home.hero.ctaSecondary'),
                  'hero_get_quote',
                  '/contact',
                )
              }
            >
              <Button
                size="lg"
                variant="outline"
                className="border-[#00C2FF] text-[#00C2FF] hover:bg-[#00C2FF]/10"
              >
                {t('home.hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:gap-8">
            <div>
              <p className="text-2xl font-bold text-white md:text-3xl">50K+</p>
              <p className="text-sm text-slate-400">50,000h Lifespan</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white md:text-3xl">80+</p>
              <p className="text-sm text-slate-400">Countries Exported</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white md:text-3xl">2Y</p>
              <p className="text-sm text-slate-400">Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HomeAdvantages = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Award,
      titleKey: 'home.advantages.quality.title',
      descKey: 'home.advantages.quality.desc',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: DollarSign,
      titleKey: 'home.advantages.price.title',
      descKey: 'home.advantages.price.desc',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Truck,
      titleKey: 'home.advantages.delivery.title',
      descKey: 'home.advantages.delivery.desc',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: Wrench,
      titleKey: 'home.advantages.oem.title',
      descKey: 'home.advantages.oem.desc',
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
            {t('home.advantages.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            {t('home.advantages.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((adv) => {
            const Icon = adv.icon;
            return (
              <div
                key={adv.titleKey}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${adv.color}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#0A2540]">
                  {t(adv.titleKey)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(adv.descKey)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const HomeSellingPoints = () => {
  const { t } = useLanguage();

  const points = [
    { icon: Zap, titleKey: 'home.sellingPoints.p1.title', descKey: 'home.sellingPoints.p1.desc' },
    { icon: Lightbulb, titleKey: 'home.sellingPoints.p2.title', descKey: 'home.sellingPoints.p2.desc' },
    { icon: Wrench, titleKey: 'home.sellingPoints.p3.title', descKey: 'home.sellingPoints.p3.desc' },
    { icon: Droplets, titleKey: 'home.sellingPoints.p4.title', descKey: 'home.sellingPoints.p4.desc' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
            {t('home.sellingPoints.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            {t('home.sellingPoints.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {points.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.titleKey}
                className="flex gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#0A2540] text-[#00C2FF]">
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-[#0A2540]">
                    {t(p.titleKey)}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {t(p.descKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const HomeCertifications = () => {
  const { t } = useLanguage();
  const certs = ['CE', 'RoHS', 'FCC', 'ISO9001'];

  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold text-[#0A2540] md:text-3xl">
            {t('home.certifications.title')}
          </h2>
          <p className="text-slate-600">{t('home.certifications.subtitle')}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {certs.map((cert) => (
            <div
              key={cert}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-sm"
            >
              <span className="text-lg font-bold text-[#0A2540]">{cert}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomeTestimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    { nameKey: 'home.testimonials.t1.name', roleKey: 'home.testimonials.t1.role', textKey: 'home.testimonials.t1.text' },
    { nameKey: 'home.testimonials.t2.name', roleKey: 'home.testimonials.t2.role', textKey: 'home.testimonials.t2.text' },
    { nameKey: 'home.testimonials.t3.name', roleKey: 'home.testimonials.t3.role', textKey: 'home.testimonials.t3.text' },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
            {t('home.testimonials.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((tm) => (
            <div
              key={tm.nameKey}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                "{t(tm.textKey)}"
              </p>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2540] text-sm font-semibold text-white">
                  {t(tm.nameKey)
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0A2540]">
                    {t(tm.nameKey)}
                  </p>
                  <p className="text-xs text-slate-500">{t(tm.roleKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const HomeCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0A2540] to-[#1A365D] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#00C2FF] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10 lg:px-16">
        <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-[#00C2FF]" />
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
          {t('home.cta.title')}
        </h2>
        <p className="mb-8 text-lg text-slate-300">{t('home.cta.subtitle')}</p>
        <Link
          to="/contact"
          onClick={() =>
            trackClick(
              'button',
              t('home.cta.button'),
              'home_bottom_cta',
              '/contact',
            )
          }
        >
          <Button
            size="lg"
            className="bg-[#00C2FF] text-[#0A2540] hover:bg-white"
          >
            {t('home.cta.button')}
          </Button>
        </Link>
      </div>
    </section>
  );
};
