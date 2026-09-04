import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { SeoHead } from '@client/src/components/SeoHead';
import { InquiryForm } from '@client/src/components/InquiryForm';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import {
  trackPageView,
  trackClick,
} from '@client/src/utils/tracking/tracking';
import { UniversalLink } from '@lark-apaas/client-toolkit/components/UniversalLink';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname + location.search;
    const title = document.title || 'Contact Us - XSY LED';
    trackPageView(url, title, language);
  }, [location.pathname, location.search, language]);

  const whatsappUrl = `https://wa.me/${t('contact.whatsappValue').replace(/\s/g, '').replace(/\+/g, '')}`;

  const infoItems = [
    {
      icon: MapPin,
      label: t('contact.addressLabel'),
      value: t('contact.addressValue'),
    },
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: t('contact.emailValue'),
      href: `mailto:${t('contact.emailValue')}`,
    },
    {
      icon: Phone,
      label: t('contact.phoneLabel'),
      value: t('contact.phoneValue'),
      href: `tel:${t('contact.phoneValue').replace(/\s/g, '')}`,
    },
    {
      icon: MessageCircle,
      label: t('contact.whatsappLabel'),
      value: t('contact.whatsappValue'),
      href: whatsappUrl,
      isWhatsApp: true,
    },
    {
      icon: Clock,
      label: t('contact.hoursLabel'),
      value: t('contact.hoursValue'),
    },
  ];

  return (
    <>
      <SeoHead
        title="Contact Us - XSY LED Headlight Manufacturer"
        description={t('contact.subtitle')}
        keywords="contact us, LED headlight manufacturer, XSY contact, LED lighting supplier, automotive lighting factory"
      />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-[#0A2540] to-[#1A365D] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24 lg:px-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-300">
            <Link to="/" className="hover:text-white">
              {t('common.breadcrumbHome')}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{t('contact.breadcrumb')}</span>
          </nav>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {t('contact.title')}
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <div className="grid gap-12 lg:grid-cols-[60%_40%]">
            {/* Left - Inquiry Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-[#0A2540]">
                {t('contact.formTitle')}
              </h2>
              <InquiryForm />
            </div>

            {/* Right - Contact Info */}
            <div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
                <h2 className="mb-6 text-2xl font-bold text-[#0A2540]">
                  {t('contact.infoTitle')}
                </h2>
                <div className="mb-6 border-b border-slate-200 pb-6">
                  <p className="text-sm font-semibold text-[#0A2540]">
                    {t('brand.fullName')}
                  </p>
                </div>
                <div className="space-y-5">
                  {infoItems.map((item, index: number) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0A2540]/10">
                          <Icon className="h-5 w-5 text-[#0A2540]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            {item.label}
                          </p>
                          <p className="mt-1 text-base font-medium text-slate-900">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    if (item.href) {
                      return (
                        <UniversalLink
                          key={index}
                          to={item.href}
                          target={item.isWhatsApp ? '_blank' : undefined}
                          rel={
                            item.isWhatsApp
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          onClick={() => {
                            if (item.isWhatsApp) {
                              trackClick(
                                'whatsapp_click',
                                t('contact.whatsappValue'),
                                'contact_whatsapp',
                                whatsappUrl,
                              );
                            }
                          }}
                          className="block transition-colors hover:text-[#00C2FF]"
                        >
                          {content}
                        </UniversalLink>
                      );
                    }

                    return <div key={index}>{content}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-gradient-to-br from-slate-100 to-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
              <MapPin className="h-10 w-10 text-[#0A2540]" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#0A2540]">
              {t('contact.mapPlaceholder')}
            </h3>
            <p className="max-w-xl text-base text-slate-600">
              {t('contact.addressValue')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
