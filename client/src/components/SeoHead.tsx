import { useEffect } from 'react';

interface JsonLdProps {
  type: 'Organization' | 'Product' | 'FAQPage' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

interface SeoHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'product' | 'article';
  jsonLds?: JsonLdProps[];
}

function setMeta(name: string, content: string, property = false) {
  if (typeof document === 'undefined') return;
  const attr = property ? 'property' : 'name';
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${name}"]`,
  );
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href: string) {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(id: string, data: unknown) {
  if (typeof document === 'undefined') return;
  let script = document.head.querySelector<HTMLScriptElement>(
    `script[data-jsonld-id="${id}"]`,
  );
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-jsonld-id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export const SeoHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLds,
}: SeoHeadProps) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
      setMeta('twitter:description', description);
    }

    if (keywords) {
      setMeta('keywords', keywords);
    }

    setMeta('og:title', title, true);
    setMeta('og:type', ogType, true);
    setMeta('twitter:title', title);

    if (ogImage) {
      setMeta('og:image', ogImage, true);
      setMeta('twitter:image', ogImage);
      setMeta('twitter:card', 'summary_large_image');
    }

    if (canonicalUrl) {
      setCanonical(canonicalUrl);
    }

    if (jsonLds && jsonLds.length > 0) {
      // Clean up any previously injected ones that aren't in current set
      const existingIds = Array.from(
        document.head.querySelectorAll<HTMLScriptElement>(
          'script[data-jsonld-id]',
        ),
      ).map((s) => s.getAttribute('data-jsonld-id'));
      const newIds = new Set<string>(jsonLds.map((j) => j.type));
      existingIds.forEach((id) => {
        if (id && !newIds.has(id)) {
          document.head
            .querySelector(`script[data-jsonld-id="${id}"]`)
            ?.remove();
        }
      });

      jsonLds.forEach((item) => {
        upsertJsonLd(item.type, {
          '@context': 'https://schema.org',
          '@type': item.type,
          ...item.data,
        });
      });
    }
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, jsonLds]);

  return null;
};

export default SeoHead;
