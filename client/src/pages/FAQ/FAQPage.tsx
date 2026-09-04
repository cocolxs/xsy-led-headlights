import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '@client/src/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@client/src/components/ui/accordion';
import { SeoHead } from '@client/src/components/SeoHead';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import {
  trackPageView,
  trackClick,
} from '@client/src/utils/tracking/tracking';

const FAQPage = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search;
    const title = document.title || 'FAQ - XSY LED';
    trackPageView(url, title, language);
  }, [location.pathname, location.search, language]);

  const faqItems = Array.from({ length: 13 }, (_, i) => i + 1).map(
    (num: number) => ({
      question: t(`faq.q${num}.q`),
      answer: t(`faq.q${num}.a`),
    }),
  );

  const faqJsonLd = {
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const handleContactClick = () => {
    trackClick(
      'button',
      t('faq.cta.button'),
      'faq_cta_contact',
      '/contact',
    );
  };

  return (
    <>
      <SeoHead
        title={`${t('faq.title')} - XSY LED Headlight Manufacturer`}
        description={t('faq.subtitle')}
        keywords="FAQ, LED headlight FAQ, MOQ, warranty, shipping, OEM, LED lighting questions"
        jsonLds={[{ type: 'FAQPage', data: faqJsonLd }]}
      />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A365D] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-300">
            <Link to="/" className="hover:text-white">
              {t('common.breadcrumbHome')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{t('nav.faq')}</span>
          </nav>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('faq.title')}
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-10 lg:px-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index: number) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-slate-200 bg-white px-6 shadow-sm hover:shadow-md"
              >
                <AccordionTrigger className="py-5 text-base font-semibold text-[#0A2540] hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-slate-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A365D] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:px-10 md:py-20 lg:px-16">
          <MessageCircle className="mx-auto mb-5 h-10 w-10 text-[#00C2FF]" />
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            {t('faq.cta.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
            {t('faq.cta.desc')}
          </p>
          <Link to="/contact" onClick={handleContactClick}>
            <Button
              size="lg"
              className="bg-[#00C2FF] text-[#0A2540] hover:bg-[#00a8e0]"
            >
              {t('faq.cta.button')}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default FAQPage;
