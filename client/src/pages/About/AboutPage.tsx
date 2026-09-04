import {
  Factory,
  Users,
  Warehouse,
  Award,
  Globe2,
  Gauge,
  Wrench,
  Shield,
} from 'lucide-react';
import { Button } from '@client/src/components/ui/button';
import { SeoHead } from '@client/src/components/SeoHead';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import { trackClick } from '@client/src/utils/tracking/tracking';
import {
  factoryInterior,
  qualityLab,
} from '@client/src/utils/img-resources/product-images';
import { useNavigate } from 'react-router-dom';
import { Image } from '@client/src/components/ui/image';

const AboutPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { icon: Factory, value: '2014', labelKey: 'about.stats.established' },
    { icon: Users, value: '30 ppl', labelKey: 'about.stats.employees' },
    { icon: Award, value: 'Multiple', labelKey: 'about.stats.lines' },
    { icon: Warehouse, value: '60-100K/mo', labelKey: 'about.stats.capacity' },
    { icon: Globe2, value: 'Global', labelKey: 'about.stats.countries' },
  ];

  const qcSteps = [
    { stepKey: 'about.qc.step1.title', descKey: 'about.qc.step1.desc' },
    { stepKey: 'about.qc.step2.title', descKey: 'about.qc.step2.desc' },
    { stepKey: 'about.qc.step3.title', descKey: 'about.qc.step3.desc' },
    { stepKey: 'about.qc.step4.title', descKey: 'about.qc.step4.desc' },
  ];

  const oemServices = [
    'about.oem.service1',
    'about.oem.service2',
    'about.oem.service3',
    'about.oem.service4',
  ];

  return (
    <>
      <SeoHead
        title={`${t('about.meta.title')} | XSY LED`}
        description={t('about.meta.description')}
        keywords="about us, LED headlight factory, LED manufacturer, automotive lighting company, Dongguan LED factory"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A365D] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#00C2FF]">
            {t('about.badge')}
          </p>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('about.title')}
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-[#0A2540] md:text-4xl">
                {t('about.intro.title')}
              </h2>
              <p className="mb-4 leading-relaxed text-slate-700">
                {t('about.intro.p1')}
              </p>
              <p className="mb-4 leading-relaxed text-slate-700">
                {t('about.intro.p2')}
              </p>
              <p className="leading-relaxed text-slate-700">
                {t('about.intro.p3')}
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={factoryInterior}
                  alt={t('about.intro.title')}
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-xl bg-[#00C2FF] p-6 text-[#0A2540] md:block">
                <p className="text-3xl font-bold">10+</p>
                <p className="text-sm font-medium">{t('about.yearsExperience')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.labelKey}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0A2540]/10 text-[#0A2540]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-2xl font-bold text-[#0A2540]">{s.value}</p>
                  <p className="text-sm text-slate-600">{t(s.labelKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Factory Show */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
              {t('about.factory.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              {t('about.factory.subtitle')}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <Image
                src={factoryInterior}
                alt={t('about.factory.title')}
                className="w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="mb-4 text-2xl font-bold text-[#0A2540]">
                {t('about.factory.title')}
              </h3>
              <p className="mb-4 leading-relaxed text-slate-700">
                {t('about.factory.p1')}
              </p>
              <p className="leading-relaxed text-slate-700">
                {t('about.factory.p2')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* R&D + QC */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
              {t('about.qc.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              {t('about.qc.subtitle')}
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div className="order-2 lg:order-1 space-y-4">
              {qcSteps.map((step, idx) => (
                <div
                  key={step.stepKey}
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A2540] text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-[#0A2540]">
                      {t(step.stepKey)}
                    </h4>
                    <p className="text-sm text-slate-600">{t(step.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-1 lg:order-2 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
              <Image
                src={qualityLab}
                alt={t('about.qc.title')}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* OEM/ODM */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#00C2FF]">
              {t('about.oem.badge')}
            </p>
            <h2 className="mb-4 text-3xl font-bold text-[#0A2540] md:text-4xl">
              {t('about.oem.title')}
            </h2>
            <p className="mx-auto max-w-2xl text-slate-600">
              {t('about.oem.subtitle')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {oemServices.map((key, idx) => (
              <div
                key={key}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00C2FF]/20 text-[#0A2540]">
                  <Wrench className="h-5 w-5" />
                </div>
                <p className="font-medium text-[#0A2540]">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#0A2540] to-[#1A365D] py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {t('about.cta.title')}
          </h2>
          <p className="mb-8 text-lg text-slate-300">{t('about.cta.subtitle')}</p>
          <Button
            size="lg"
            className="bg-[#00C2FF] text-[#0A2540] hover:bg-white"
            onClick={() => {
              trackClick('button', t('common.getQuote'), 'about_cta', '/contact');
              navigate('/contact');
            }}
          >
            {t('common.getQuote')}
          </Button>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
