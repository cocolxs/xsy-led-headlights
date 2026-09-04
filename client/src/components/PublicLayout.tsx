import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '@client/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@client/src/components/ui/dropdown-menu';
import { useLanguage } from '@client/src/utils/i18n/i18n';
import {
  trackPageView,
  trackClick,
  initTracking,
} from '@client/src/utils/tracking/tracking';
import { useNavigate } from 'react-router-dom';
import { UniversalLink } from '@lark-apaas/client-toolkit/components/UniversalLink';

const navItems = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.products', to: '/products' },
  { key: 'nav.about', to: '/about' },
  { key: 'nav.contact', to: '/contact' },
  { key: 'nav.faq', to: '/faq' },
];

const PublicLayout = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage, languages, currentLanguage, isRTL } =
    useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Initialize tracking once
  useEffect(() => {
    initTracking();
  }, []);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track page view on route change
  useEffect(() => {
    const url = location.pathname + location.search;
    const title = document.title || 'XSY LED';
    trackPageView(url, title, language);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname, location.search, language]);

  const year = new Date().getFullYear();

  return (
    <div
      className={`flex min-h-screen flex-col bg-white text-slate-800 ${
        isRTL ? 'rtl' : 'ltr'
      }`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-slate-200 bg-white/95 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => trackClick('logo', 'XSY LED', 'header_logo', '/')}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A2540] text-white">
              <svg
                className="h-5 w-5"
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
            </div>
            <span className="text-lg font-bold text-[#0A2540]">XSY LED</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#0A2540]'
                      : 'text-slate-600 hover:text-[#0A2540]'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden items-center gap-3 lg:flex">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{currentLanguage.nativeName}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      trackClick(
                        'language_switch',
                        lang.nativeName,
                        lang.code,
                        '',
                      );
                    }}
                    className={
                      language === lang.code ? 'bg-slate-100 font-medium' : ''
                    }
                  >
                    {lang.nativeName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              className="bg-[#0A2540] hover:bg-[#1A365D]"
              onClick={() => {
                trackClick(
                  'button',
                  t('common.getQuote'),
                  'header_quote_btn',
                  '/contact',
                );
                navigate('/contact');
              }}
            >
              {t('common.getQuote')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex items-center justify-center p-2 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="flex flex-col px-6 py-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `py-3 text-base font-medium border-b border-slate-100 ${
                      isActive
                        ? 'text-[#0A2540]'
                        : 'text-slate-600'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.key)}
                </NavLink>
              ))}

              {/* Language selector mobile */}
              <div className="py-3 border-b border-slate-100">
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`rounded-md px-3 py-1.5 text-sm ${
                        language === lang.code
                          ? 'bg-[#0A2540] text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                className="mt-4 w-full bg-[#0A2540] hover:bg-[#1A365D]"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackClick(
                    'button',
                    t('common.getQuote'),
                    'mobile_quote_btn',
                    '/contact',
                  );
                  navigate('/contact');
                }}
              >
                {t('common.getQuote')}
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-[#0A2540] text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Company */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#00C2FF]">
                  <svg
                    className="h-5 w-5"
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
                </div>
                <span className="text-lg font-bold text-white">XSY LED</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {t('footer.aboutText')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="transition-colors hover:text-[#00C2FF]"
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('footer.contactUs')}
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00C2FF]" />
                  <span className="text-slate-400">
                    No.88 Industrial Rd, Chang'an, Dongguan, China
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-[#00C2FF]" />
                  <UniversalLink
                    to="mailto:sales@xsy-led.com"
                    className="transition-colors hover:text-[#00C2FF]"
                  >
                    sales@xsy-led.com
                  </UniversalLink>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-[#00C2FF]" />
                  <UniversalLink
                    to="tel:+8676988886666"
                    className="transition-colors hover:text-[#00C2FF]"
                  >
                    +86 769 8888 6666
                  </UniversalLink>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-[#00C2FF]" />
                  <span className="text-slate-400">
                    Mon-Sat: 9:00-18:00 (GMT+8)
                  </span>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('common.getQuote')}
              </h4>
              <p className="mb-4 text-sm text-slate-400">
                Get a competitive quote for your LED lighting needs. We reply
                within 24 hours.
              </p>
              <Button
                variant="outline"
                className="border-[#00C2FF] text-[#00C2FF] hover:bg-[#00C2FF] hover:text-[#0A2540]"
                onClick={() => {
                  trackClick(
                    'button',
                    t('common.inquireNow'),
                    'footer_inquire',
                    '/contact',
                  );
                  navigate('/contact');
                }}
              >
                {t('common.inquireNow')}
              </Button>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
            <p>{t('footer.copyright', { year })}</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-slate-300">
                {t('footer.privacy')}
              </Link>
              <Link to="/" className="hover:text-slate-300">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
