// Translation dictionary for 8 languages
// Google Translate level translations, covering all frontend pages

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文简体' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true },
];

export type LanguageCode =
  | 'en' | 'zh' | 'es' | 'de' | 'fr' | 'ja' | 'ru' | 'ar';

export const translations: Record<LanguageCode, Record<string, string>> = {
  // ===== English =====
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',

    // Common CTA
    'common.getQuote': 'Get a Quote',
    'common.inquireNow': 'Inquire Now',
    'common.viewProducts': 'View Products',
    'common.learnMore': 'Learn More',
    'common.sendMessage': 'Send Message',
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.all': 'All',
    'common.breadcrumbHome': 'Home',

    // Brand
    'brand.name': 'XSY LED',
    'brand.tagline': 'Premium LED Headlight Manufacturer Since 2014',
    'brand.fullName': 'Dongguan Xingshengyuan Intelligent Technology Co., Ltd.',

    // Home page
    'home.hero.title': 'Premium LED Headlights Manufacturer Since 2014',
    'home.hero.subtitle':
      'Factory Direct | OEM & ODM | 60,000-100,000 Sets/Month | Global Shipping',
    'home.hero.ctaPrimary': 'View Products',
    'home.hero.ctaSecondary': 'Get a Quote',

    'home.featured.title': 'Featured Products',
    'home.featured.subtitle':
      'Our flagship LED headlight series, engineered for performance and reliability',

    'home.advantages.title': 'Why Choose XSY LED?',
    'home.advantages.subtitle':
      'Four core advantages that make us the trusted partner of global buyers',
    'home.advantages.quality.title': 'Factory Direct Since 2014',
    'home.advantages.quality.desc':
      'Over 10 years of LED headlight manufacturing experience. High-tech enterprise with multiple core patents.',
    'home.advantages.price.title': 'OEM & ODM Customization',
    'home.advantages.price.desc':
      'Professional design team with joint R&D capability. Full-chain customization from concept to mass production.',
    'home.advantages.delivery.title': 'Dual-Power Quality Test',
    'home.advantages.delivery.desc':
      'Strict startup power / stable power dual-testing standard ensures genuine product performance.',
    'home.advantages.oem.title': 'Wide Voltage DC10-60V',
    'home.advantages.oem.desc':
      'Wide voltage design compatible with both passenger cars and 24V truck electrical systems.',

    'home.sellingPoints.title': 'X60 Flagship Series Highlights',
    'home.sellingPoints.subtitle':
      'Our flagship die-cast aluminum LED headlight delivers industry-leading performance',
    'home.sellingPoints.p1.title': '12,000lm Startup Brightness',
    'home.sellingPoints.p1.desc':
      '5080 CSP 12 chips deliver 12000lm startup luminous flux with 135W startup power. Exceptional visibility at night.',
    'home.sellingPoints.p2.title': 'Die-Cast Aluminum Housing',
    'home.sellingPoints.p2.desc':
      'Premium die-cast aluminum heat sink housing with dual copper pipe cooling. LED chip temperature ≤120°C for stable output.',
    'home.sellingPoints.p3.title': 'IP68 Waterproof Rate',
    'home.sellingPoints.p3.desc':
      'Fully sealed design withstands rain, dust, and extreme temperatures. Built to perform in any weather condition.',
    'home.sellingPoints.p4.title': '30,000+ Hours Lifespan',
    'home.sellingPoints.p4.desc':
      'Aviation-grade aluminum body + advanced thermal management ensure long service life and consistent performance.',

    'home.certifications.title': 'Certifications & Standards',
    'home.certifications.subtitle':
      'Our products meet international quality and safety standards',

    'home.testimonials.title': 'What Our Clients Say',
    'home.testimonials.subtitle':
      'Trusted by distributors and retailers worldwide',
    'home.testimonials.t1.name': 'Michael Rodriguez',
    'home.testimonials.t1.role': 'CEO, AutoParts USA',
    'home.testimonials.t1.text':
      'XSY has been our LED headlight supplier for 3 years. Product quality ' +
      'is consistently excellent and their OEM service is top-notch.',
    'home.testimonials.t2.name': 'Hans Weber',
    'home.testimonials.t2.role': 'Purchasing Manager, DE Lights GmbH',
    'home.testimonials.t2.text':
      'Fast delivery, great communication, and products that sell themselves. ' +
      'Our customers love the brightness and build quality.',
    'home.testimonials.t3.name': 'Yuki Tanaka',
    'home.testimonials.t3.role': 'Director, JP Auto Trading',
    'home.testimonials.t3.text':
      'The R&D team helped us customize a unique product line. ' +
      'Professional from sample to mass production. Highly recommended.',

    'home.cta.title': 'Get Free Sample & Quote Today',
    'home.cta.subtitle':
      'Contact our sales team for factory-direct pricing. MOQ starts from 10 sets. Sample orders welcome.',
    'home.cta.button': 'Request a Quote Now',

    'home.products.badge': 'Featured Products',
    'home.products.title': 'Our Best Selling Products',
    'home.products.subtitle':
      'High-performance LED headlights engineered for durability and brightness',
    'home.products.viewAll': 'View All Products',

    'home.meta.title': 'Premium LED Headlight Manufacturer',
    'home.meta.description':
      'Factory-direct LED automotive lighting with OEM/ODM capability. ' +
      'CE, RoHS, FCC certified. Export to 80+ countries.',

    // Products page
    'products.title': 'LED Headlight Products',
    'products.subtitle':
      'Browse our full range of LED headlight bulbs for every socket type',
    'products.filterBySocket': 'Filter by Socket Type',
    'products.filter.bySocket': 'By Socket',
    'products.filter.bySeries': 'By Series',
    'products.filter.series.all': 'All Series',
    'products.filter.series.v': 'V Series',
    'products.filter.series.x': 'X Series',
    'products.filter.series.z': 'Z Series',
    'products.showing': 'Showing {count} products',
    'products.noResults': 'No products found',
    'products.breadcrumb': 'Products',

    // Product detail
    'product.detail.breadcrumb': 'Product Detail',
    'product.specifications': 'Specifications',
    'product.description': 'Product Description',
    'product.features': 'Key Features',
    'product.shippingTitle': 'Packaging & Delivery',
    'product.relatedProducts': 'Related Products',
    'product.inquireSidebar.title': 'Quick Inquiry',
    'product.inquireSidebar.desc':
      'Fill in your requirements and we will reply within 24 hours.',
    'product.spec.model': 'Model',
    'product.spec.socketType': 'Socket Type',
    'product.spec.power': 'Power',
    'product.spec.powerStartup': 'Startup Power',
    'product.spec.lumen': 'Lumen',
    'product.spec.lumenStartup': 'Startup Lumen',
    'product.spec.colorTemp': 'Color Temperature',
    'product.spec.voltage': 'Voltage',
    'product.spec.ipRate': 'IP Rate',
    'product.spec.lifespan': 'Lifespan',
    'product.spec.material': 'Material',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'Packaging',
    'product.spec.deliveryTime': 'Delivery Time',
    'product.spec.warranty': 'Warranty',
    'product.spec.priceRange': 'Price Range',
    'product.spec.features': 'Features',
    'product.spec.chipType': 'LED Chip',
    'product.spec.beamAngle': 'Beam Angle',
    'product.spec.startupPower': 'Startup Power (Single)',
    'product.spec.stablePower': 'Stable Power (Single)',
    'product.spec.startupLumen': 'Startup Lumen (Single)',
    'product.spec.stableLumen': 'Stable Lumen (Single)',
    'product.spec.h4StartupPower': 'Startup Power (H4 Dual)',
    'product.spec.h4StablePower': 'Stable Power (H4 Dual)',
    'product.spec.h4StartupLumen': 'Startup Lumen (H4 Dual)',
    'product.spec.h4StableLumen': 'Stable Lumen (H4 Dual)',
    'product.spec.diameter': 'Diameter',
    'product.spec.heightSingle': 'Height (Single)',
    'product.spec.heightDual': 'Height (Dual)',
    'product.spec.weightSingle': 'Weight (Single)',
    'product.spec.weightDual': 'Weight (Dual)',
    'product.spec.cartonBox': 'Carton Box',
    'product.spec.basicSpecs': 'Basic Specifications',
    'product.spec.performanceSpecs': 'Performance Specs',
    'product.spec.dimensionsTitle': 'Dimensions & Weight',
    'product.spec.shippingSpecs': 'Packaging & Shipping',
    'product.spec.noData': 'N/A',
    'product.h4DualNote': 'H4 dual-beam bulbs include both high and low beam filaments; parameters may vary slightly between beams.',

    // About page
    'about.title': 'Your Trusted LED Headlight Manufacturer',
    'about.subtitle': 'Founded in 2014, specializing in R&D and manufacturing of LED automotive headlights',
    'about.introTitle': 'Who We Are',
    'about.introText':
      'Dongguan XSY Intelligent Technology Co., Ltd. is a professional LED ' +
      'automotive lighting manufacturer located in Dongguan, China. We ' +
      'specialize in the R&D, production and sales of LED headlights, fog ' +
      'lights and other automotive LED products. With over 8 years of ' +
      'industry experience, we serve clients in more than 80 countries ' +
      'and regions worldwide.',
    'about.facts.title': 'Company Strength at a Glance',
    'about.facts.est': 'Est. 2015',
    'about.facts.estDesc': 'Years of industry experience',
    'about.facts.factory': '10,000㎡ Factory',
    'about.facts.factoryDesc': 'Modern production facility',
    'about.facts.employees': '200+ Employees',
    'about.facts.employeesDesc': 'Skilled workforce',
    'about.facts.lines': '8 Production Lines',
    'about.facts.linesDesc': 'High capacity output',
    'about.facts.capacity': '2M+ Pairs/Year',
    'about.facts.capacityDesc': 'Annual production capacity',
    'about.facts.countries': 'Export to 80+ Countries',
    'about.facts.countriesDesc': 'Global market presence',

    'about.factory.title': 'Our Production Facilities',
    'about.factory.subtitle':
      'State-of-the-art manufacturing with strict quality control',
    'about.factory.p1':
      'Our factory is equipped with advanced production lines and testing equipment. We implement a strict dual-power testing standard (startup power and stable power) to ensure every product delivers genuine performance.',
    'about.factory.p2':
      'We cover the full range of LED automotive lighting products: LED headlights, fog lights, HID replacement bulbs, and more. Socket types include H series, 900X series, D series, and other mainstream vehicle models.',

    'about.qc.title': 'Quality & Technology Advantage',
    'about.qc.subtitle':
      'Advanced technology and rigorous testing deliver exceptional performance',
    'about.qc.step1.title': 'CSP Chip Technology',
    'about.qc.step1.desc':
      'Using high-quality CSP LED chips (3570/5080 series) for superior brightness, color consistency, and reliability.',
    'about.qc.step2.title': 'Wide Voltage Design',
    'about.qc.step2.desc':
      'DC10-60V wide voltage range (selected models), compatible with both 12V passenger cars and 24V trucks. Stable output under voltage fluctuations.',
    'about.qc.step3.title': 'Graphene & Copper Cooling',
    'about.qc.step3.desc':
      'Graphene heat dissipation, dual copper pipes, and die-cast aluminum housing ensure optimal thermal management and long lifespan.',
    'about.qc.step4.title': 'Dual-Power Quality Test',
    'about.qc.step4.desc':
      'Every product undergoes both startup power and stable power testing, ensuring real-world performance matches specifications.',

    'about.oem.badge': 'OEM / ODM Service',
    'about.oem.title': 'Custom Solutions for Your Business',
    'about.oem.subtitle':
      'From concept to mass production, we support your unique product needs',
    'about.oem.service1': 'Custom Packaging Design',
    'about.oem.service2': 'Private Label & Logo Printing',
    'about.oem.service3': 'Joint R&D & Product Design',
    'about.oem.service4': 'Flexible MOQ & Fast Sampling',

    'about.cta.title': 'Ready to Partner with XSY LED?',
    'about.cta.subtitle': 'Contact us today for factory-direct pricing and custom solutions',

    // Contact page
    'contact.badge': 'Contact Us',
    'contact.title': 'Get in Touch',
    'contact.subtitle':
      'We are here to help with your LED headlight needs',
    'contact.breadcrumb': 'Contact Us',
    'contact.info.title': 'Company Information',
    'contact.info.address': 'No. 141 Qingfeng West Road, Shijie Town, Dongguan, Guangdong, China',
    'contact.info.phone': '+86-0769-86364567',
    'contact.info.mobile': '+86-13592701978 (Mobile / WeChat / WhatsApp)',
    'contact.info.email': 'sales@xsy-led.com',
    'contact.info.hours': 'Monday - Saturday: 9:00 - 18:00 (GMT+8)',
    'contact.form.title': 'Send Us an Inquiry',
    'contact.form.subtitle':
      'Fill out the form below and we will respond within 24 hours',
    'contact.success': 'Thank you! Your inquiry has been sent. We will contact you within 24 hours.',

    // FAQ page
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about our products and services',
    'faq.q1.q': 'What is your MOQ?',
    'faq.q1.a':
      'Our MOQ starts from 10 sets for most models. For Z-series (Z8/Z9/Z10), the MOQ is 50 sets. Sample orders are welcome for quality evaluation.',
    'faq.q2.q': 'Can I get a sample before placing a bulk order?',
    'faq.q2.a':
      'Yes, we offer sample orders. Sample fee is 2x the unit price and ' +
      'will be refunded on bulk orders over 50 pairs.',
    'faq.q3.q': 'What is the delivery time?',
    'faq.q3.a':
      'Standard delivery time is 7-15 days for stock models and 15-25 days for OEM/custom orders. We ship via DHL/FedEx/UPS for samples and sea/air freight for bulk orders.',
    'faq.q4.q': 'Do you offer OEM/ODM services?',
    'faq.q4.a':
      'Yes, we offer comprehensive OEM/ODM services including custom packaging, logo printing, private label, and joint R&D for unique product designs. Our professional design team supports full-chain customization.',
    'faq.q5.q': 'What certifications do your products have?',
    'faq.q5.a':
      'Our products carry CE, RoHS, and FCC certifications, and our factory operates under ISO9001 quality management system. All products undergo dual-power (startup/stable) testing before shipping.',
    'faq.q6.q': 'What is the warranty period?',
    'faq.q6.a':
      'We offer 1-2 years warranty depending on the product series. ' +
      'Racing edition comes with 3 years warranty.',
    'faq.q7.q': 'What payment terms do you accept?',
    'faq.q7.a':
      'We accept T/T, PayPal, Western Union, L/C, and Trade Assurance. ' +
      '30% deposit, 70% before shipment.',
    'faq.q8.q': 'How do you ship the goods?',
    'faq.q8.a':
      'We provide a 2-year warranty for all LED headlight products. If there are any quality issues within the warranty period, we will replace the defective products free of charge.',
    'faq.q9.q': 'How to place an order?',
    'faq.q9.a':
      '1. Send us inquiry with product model and quantity. 2. Receive ' +
      'our quotation. 3. Confirm details and pay deposit. 4. We arrange ' +
      'production. 5. Pay balance before shipping. 6. Goods delivered.',
    'faq.q10.q': 'What about after-sales service?',
    'faq.q10.a':
      'We have a professional after-sales team. If there are any quality ' +
      'issues, we offer free replacement or refund within the warranty ' +
      'period. We provide lifetime technical support.',
    'faq.q11.q': 'Do you offer OEM/ODM services?',
    'faq.q11.a':
      'Yes, we offer comprehensive OEM/ODM services including custom packaging, logo printing, private label, and joint R&D for unique product designs. Our professional design team supports full-chain customization from product concept to mass production. MOQ for custom orders starts at 100 sets.',
    'faq.q12.q': 'Do you have LED headlights suitable for trucks?',
    'faq.q12.a':
      'Yes, our X20 model features DC10-60V wide voltage design, making it compatible with both 12V passenger cars and 24V truck electrical systems. It delivers stable output even under voltage fluctuations, perfect for commercial vehicles and trucks.',
    'faq.q13.q': 'What is the 3-color LED headlight? How does it work?',
    'faq.q13.a':
      'Our X50S model features 3-color temperature LED headlights controlled by a remote. You can switch between 6500K cool white (for clear nights), 4300K warm white (for foggy conditions), and 3000K golden yellow (for heavy rain/fog). The remote allows one-click switching inside the vehicle without any tools.',
    'faq.cta.title': 'Still have questions?',
    'faq.cta.desc':
      'Our team is here to help. Get in touch and we\'ll get back to you within 24 hours.',
    'faq.cta.button': 'Contact Us',

    // Inquiry form
    'inquiry.form.name': 'Name',
    'inquiry.form.company': 'Company',
    'inquiry.form.email': 'Email',
    'inquiry.form.phone': 'Phone',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': 'Country',
    'inquiry.form.product': 'Product',
    'inquiry.form.productPlaceholder': 'Select a product',
    'inquiry.form.productAll': 'All Products / Not Sure',
    'inquiry.form.quantity': 'Quantity',
    'inquiry.form.message': 'Message',
    'inquiry.form.messagePlaceholder':
      'Tell us about your requirements...',
    'inquiry.form.submit': 'Send Inquiry',
    'inquiry.form.submitting': 'Sending...',
    'inquiry.form.success':
      'Thank you! Your inquiry has been sent. We will reply within 24 hours.',
    'inquiry.form.error':
      'Failed to send inquiry. Please try again or email us directly.',
    'inquiry.form.nameRequired': 'Name is required',
    'inquiry.form.emailRequired': 'Email is required',
    'inquiry.form.emailInvalid': 'Please enter a valid email address',

    // Footer
    'footer.about': 'About XSY',
    'footer.aboutText':
      'XSY LED is a professional LED headlight manufacturer founded in 2014. OEM/ODM services available. Contact us for factory-direct pricing.',
    'footer.quickLinks': 'Quick Links',
    'footer.products': 'Products',
    'footer.contactUs': 'Contact Us',
    'footer.followUs': 'Follow Us',
    'footer.copyright':
      '© 2024 Dongguan Xingshengyuan Intelligent Technology Co., Ltd. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },

  // ===== Chinese (Simplified) =====
  zh: {
    'nav.home': '首页',
    'nav.products': '产品中心',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.faq': '常见问题',

    'common.getQuote': '获取报价',
    'common.inquireNow': '立即询盘',
    'common.viewProducts': '查看产品',
    'common.learnMore': '了解更多',
    'common.sendMessage': '发送消息',
    'common.loading': '加载中...',
    'common.submit': '提交',
    'common.all': '全部',
    'common.breadcrumbHome': '首页',

    'brand.name': '星盛源光电',
    'brand.tagline': '专业LED大灯制造商，始于2014年',
    'brand.fullName': '东莞市星盛源智能科技有限公司',

    'home.hero.title': '专业LED车灯制造商，始于2014年',
    'home.hero.subtitle':
      '工厂直供 | OEM/ODM定制 | 月产6-10万套 | 全球发货',
    'home.hero.ctaPrimary': '查看产品',
    'home.hero.ctaSecondary': '获取报价',

    'home.featured.title': '旗舰产品',
    'home.featured.subtitle': '星盛源旗舰系列LED大灯，性能与可靠性兼备',

    'home.advantages.title': '为什么选择星盛源？',
    'home.advantages.subtitle': '四大核心优势，让我们成为全球买家信赖的合作伙伴',
    'home.advantages.quality.title': '10年+工厂直供',
    'home.advantages.quality.desc':
      '2014年成立，高新技术企业，拥有多项核心专利，10年以上LED车灯制造经验。',
    'home.advantages.price.title': 'OEM/ODM定制',
    'home.advantages.price.desc':
      '专业设计团队，具备联合研发能力，支持从产品概念到量产的全链条定制。',
    'home.advantages.delivery.title': '双功率品质测试',
    'home.advantages.delivery.desc': '严格的启动功率/稳定功率双功率测试标准，确保产品真实性能。',
    'home.advantages.oem.title': '宽电压DC10-60V',
    'home.advantages.oem.desc':
      '宽电压设计，同时适配轿车和货车24V电气系统，应用范围更广。',

    'home.sellingPoints.title': 'X60旗舰系列亮点',
    'home.sellingPoints.subtitle': '旗舰级压铸铝LED大灯，带来行业领先的性能表现',
    'home.sellingPoints.p1.title': '12000lm启动亮度',
    'home.sellingPoints.p1.desc':
      '5080 CSP 12颗灯珠，启动功率135W，启动光通量12000lm，夜间行驶视野更清晰。',
    'home.sellingPoints.p2.title': '压铸铝散热壳体',
    'home.sellingPoints.p2.desc':
      '高品质压铸铝散热壳体+双铜管散热，灯珠温度≤120℃，持续稳定高亮度输出。',
    'home.sellingPoints.p3.title': 'IP68防水等级',
    'home.sellingPoints.p3.desc':
      '全密封设计，抵御雨水、灰尘和极端温度，无论何种天气条件都能稳定工作。',
    'home.sellingPoints.p4.title': '30000+小时寿命',
    'home.sellingPoints.p4.desc':
      '航空级铝合金灯体+先进散热管理，确保长使用寿命和稳定性能。',

    'home.certifications.title': '认证与标准',
    'home.certifications.subtitle': '产品符合国际质量与安全标准',

    'home.testimonials.title': '客户评价',
    'home.testimonials.subtitle': '深受全球分销商和零售商信赖',
    'home.testimonials.t1.name': 'Michael Rodriguez',
    'home.testimonials.t1.role': 'CEO，AutoParts USA',
    'home.testimonials.t1.text':
      '星盛源是我们合作三年的LED大灯供应商，产品质量始终稳定，' +
      'OEM服务也非常专业。',
    'home.testimonials.t2.name': 'Hans Weber',
    'home.testimonials.t2.role': '采购经理，DE Lights GmbH',
    'home.testimonials.t2.text':
      '发货快，沟通顺畅，产品本身就有销售力。' +
      '我们的客户非常认可亮度和做工。',
    'home.testimonials.t3.name': 'Yuki Tanaka',
    'home.testimonials.t3.role': '社长，JP Auto Trading',
    'home.testimonials.t3.text':
      '研发团队帮我们定制了一条独特产品线，' +
      '从打样到量产都很专业，强烈推荐。',

    'home.cta.title': '立即获取免费样品与报价',
    'home.cta.subtitle': '联系我们的销售团队获取工厂直供价格，10套起订，支持样品单。',
    'home.cta.button': '立即询价',

    'home.products.badge': '热销产品',
    'home.products.title': '热销产品',
    'home.products.subtitle': '高性能LED大灯，耐用且亮度卓越',
    'home.products.viewAll': '查看全部产品',

    'home.meta.title': '专业LED车灯制造商',
    'home.meta.description':
      '原厂直供LED汽车照明，支持OEM/ODM定制。' +
      'CE、RoHS、FCC认证，出口80+国家。',

    'products.title': 'LED大灯产品',
    'products.subtitle': '浏览全系列LED大灯灯泡，覆盖各种灯座型号',
    'products.filterBySocket': '按灯座筛选',
    'products.filter.bySocket': '按灯座',
    'products.filter.bySeries': '按系列',
    'products.filter.series.all': '全部系列',
    'products.filter.series.v': 'V系列',
    'products.filter.series.x': 'X系列',
    'products.filter.series.z': 'Z系列',
    'products.showing': '共 {count} 个产品',
    'products.noResults': '未找到相关产品',
    'products.breadcrumb': '产品中心',

    'product.detail.breadcrumb': '产品详情',
    'product.specifications': '规格参数',
    'product.description': '产品描述',
    'product.features': '主要特点',
    'product.shippingTitle': '包装与交期',
    'product.relatedProducts': '相关产品',
    'product.inquireSidebar.title': '快速询盘',
    'product.inquireSidebar.desc': '填写您的需求，我们将在24小时内回复。',
    'product.spec.model': '型号',
    'product.spec.socketType': '灯座类型',
    'product.spec.power': '功率',
    'product.spec.powerStartup': '启动功率',
    'product.spec.lumen': '流明',
    'product.spec.lumenStartup': '启动光通量',
    'product.spec.colorTemp': '色温',
    'product.spec.voltage': '电压',
    'product.spec.ipRate': '防水等级',
    'product.spec.lifespan': '寿命',
    'product.spec.material': '材质',
    'product.spec.moq': '最小起订量',
    'product.spec.packaging': '包装',
    'product.spec.deliveryTime': '交期',
    'product.spec.warranty': '保修期',
    'product.spec.priceRange': '价格区间',
    'product.spec.features': '特性',
    'product.spec.chipType': '灯珠型号',
    'product.spec.beamAngle': '发光角度',
    'product.spec.startupPower': '启动功率（单灯）',
    'product.spec.stablePower': '稳定功率（单灯）',
    'product.spec.startupLumen': '启动光通量（单灯）',
    'product.spec.stableLumen': '稳定光通量（单灯）',
    'product.spec.h4StartupPower': '启动功率（H4双灯）',
    'product.spec.h4StablePower': '稳定功率（H4双灯）',
    'product.spec.h4StartupLumen': '启动光通量（H4双灯）',
    'product.spec.h4StableLumen': '稳定光通量（H4双灯）',
    'product.spec.diameter': '直径',
    'product.spec.heightSingle': '高度（单灯）',
    'product.spec.heightDual': '高度（双灯）',
    'product.spec.weightSingle': '重量（单灯）',
    'product.spec.weightDual': '重量（双灯）',
    'product.spec.cartonBox': '外箱规格',
    'product.spec.basicSpecs': '基础参数',
    'product.spec.performanceSpecs': '性能参数',
    'product.spec.dimensionsTitle': '尺寸与重量',
    'product.spec.shippingSpecs': '包装与运输',
    'product.spec.noData': '暂无数据',
    'product.h4DualNote': 'H4 双灯灯泡包含远近光双灯丝，两光束参数略有差异。',

    'about.title': '您值得信赖的LED车灯制造商',
    'about.subtitle': '成立于2014年，专注LED汽车大灯研发与制造',
    'about.introTitle': '公司简介',
    'about.introText':
      '东莞市星盛源智能科技有限公司是一家专业的LED汽车照明制造商，' +
      '位于中国东莞。我们专注于LED大灯、雾灯及其他汽车LED产品的' +
      '研发、生产和销售。凭借8年以上的行业经验，我们的产品畅销全球' +
      '80多个国家和地区。',
    'about.facts.title': '公司实力一览',
    'about.facts.est': '成立于2015',
    'about.facts.estDesc': '多年行业经验',
    'about.facts.factory': '10,000㎡ 工厂',
    'about.facts.factoryDesc': '现代化生产基地',
    'about.facts.employees': '200+ 员工',
    'about.facts.employeesDesc': '专业技术团队',
    'about.facts.lines': '8 条生产线',
    'about.facts.linesDesc': '高产能输出',
    'about.facts.capacity': '年产 200万+ 对',
    'about.facts.capacityDesc': '年生产能力',
    'about.facts.countries': '出口 80+ 国家',
    'about.facts.countriesDesc': '全球市场布局',

    'about.factory.title': '生产实力',
    'about.factory.subtitle': '先进的生产设备与严格的品控体系',
    'about.factory.p1':
      '工厂配备先进的生产线和检测设备，实施严格的启动功率/稳定功率双功率测试标准，确保每一款产品的真实性能。',
    'about.factory.p2':
      '产品涵盖LED汽车前照灯、雾灯、氙气灯替代灯泡等全系列车灯产品，灯座覆盖H系列、900X系列、D系列等主流车型。',

    'about.qc.title': '技术与品质优势',
    'about.qc.subtitle': '先进技术与严格测试，确保卓越性能',
    'about.qc.step1.title': 'CSP灯珠技术',
    'about.qc.step1.desc': '采用高品质CSP LED灯珠（3570/5080系列），亮度更高、颜色一致性更好、可靠性更强。',
    'about.qc.step2.title': '宽电压设计',
    'about.qc.step2.desc': 'DC10-60V宽电压范围（部分型号），兼容12V轿车和24V货车，电压波动下仍能稳定输出。',
    'about.qc.step3.title': '石墨烯+铜管散热',
    'about.qc.step3.desc': '石墨烯散热、双铜管导热、压铸铝壳体，确保最佳热管理效果，延长产品使用寿命。',
    'about.qc.step4.title': '双功率品质测试',
    'about.qc.step4.desc': '每款产品均经过启动功率和稳定功率双重测试，确保实际使用性能与标称参数一致。',

    'about.oem.badge': 'OEM/ODM服务',
    'about.oem.title': '为您的业务提供定制方案',
    'about.oem.subtitle': '从概念到量产，支持您的独特产品需求',
    'about.oem.service1': '定制包装设计',
    'about.oem.service2': '贴牌/Logo印刷',
    'about.oem.service3': '联合研发与产品设计',
    'about.oem.service4': '灵活起订量与快速打样',

    'about.cta.title': '准备好与星盛源合作了吗？',
    'about.cta.subtitle': '立即联系我们，获取工厂直供价格和定制方案',

    'contact.badge': '联系我们',
    'contact.title': '与我们取得联系',
    'contact.subtitle': '我们随时为您的LED车灯需求提供专业服务',
    'contact.breadcrumb': '联系我们',
    'contact.info.title': '公司信息',
    'contact.info.address': '广东省东莞市石碣镇庆丰西路141号',
    'contact.info.phone': '86-0769-86364567',
    'contact.info.mobile': '86-13592701978（手机/微信/WhatsApp）',
    'contact.info.email': 'sales@xsy-led.com',
    'contact.info.hours': '周一至周六：9:00 - 18:00（GMT+8）',
    'contact.form.title': '发送询盘',
    'contact.form.subtitle': '填写下方表单，我们将在24小时内回复您',
    'contact.success': '感谢您的询盘！我们已收到您的信息，将在24小时内与您联系。',

    'faq.title': '常见问题',
    'faq.subtitle': '查找关于我们产品和服务的常见问题解答',
    'faq.q1.q': '最小起订量是多少？',
    'faq.q1.a':
      '大部分型号起订量为10套，Z系列（Z8/Z9/Z10）起订量为50套。支持样品单，方便客户评估产品质量。',
    'faq.q2.q': '可以提供样品测试吗？',
    'faq.q2.a':
      '可以，我们提供样品测试。样品费根据型号而定，' +
      '通常3-5个工作日发货。批量下单时样品费可抵扣。',
    'faq.q3.q': '交货时间是多久？',
    'faq.q3.a':
      '常规型号交货期为7-15天，OEM/定制订单为15-25天。样品单可发DHL/FedEx/UPS快递，大货可发海运或空运。',
    'faq.q4.q': '你们提供OEM/ODM服务吗？',
    'faq.q4.a':
      '是的，我们提供全方位的OEM/ODM服务，包括定制包装、Logo印刷、贴牌生产和联合研发设计。专业设计团队支持全链条产品定制。',
    'faq.q5.q': '产品有哪些认证？',
    'faq.q5.a':
      '产品通过CE、RoHS、FCC认证，工厂通过ISO9001质量管理体系。所有产品出厂前均经过启动/稳定双功率测试。',
    'faq.q6.q': '保修期是多久？',
    'faq.q6.a':
      '正常使用条件下所有LED大灯产品保修2年。有质量问题的产品' +
      '可以更换或退款。OEM客户可申请延长保修。',
    'faq.q7.q': '接受哪些付款方式？',
    'faq.q7.a':
      '我们接受T/T（30%定金，70%发货前付清）、PayPal、西联汇款、' +
      '信保订单和大额订单信用证。长期合作伙伴可协商付款条件。',
    'faq.q8.q': '有哪些运输方式？',
    'faq.q8.a':
      '所有LED大灯产品提供2年质保。在质保期内如出现质量问题，我们将免费更换次品。',
    'faq.q9.q': '如何下单？',
    'faq.q9.a':
      '通过网站或邮件发送询盘，注明产品型号和数量即可。' +
      '我们的销售团队将在24小时内回复详细报价和下单指引。' +
      '同时欢迎预约参观工厂。',
    'faq.q10.q': '售后服务怎么样？',
    'faq.q10.a':
      '我们提供全方位的售后支持，包括技术咨询、保修索赔、' +
      '配件更换和营销物料支持。我们的专属客服团队在工作日' +
      '24小时内响应所有咨询。',
    'faq.q11.q': '你们提供OEM/ODM服务吗？',
    'faq.q11.a':
      '是的，我们提供全方位的OEM/ODM服务，包括定制包装、Logo印刷、贴牌生产和联合研发设计。专业设计团队支持从产品概念到量产的全链条定制。定制订单起订量为100套。',
    'faq.q12.q': '你们有适合货车用的LED大灯吗？',
    'faq.q12.a':
      '有的，我们的X20型号采用DC10-60V宽电压设计，同时兼容12V乘用车和24V货车电气系统。在电压波动下仍能稳定输出，非常适合商用车和货车使用。',
    'faq.q13.q': '什么是三色LED大灯？怎么使用？',
    'faq.q13.a':
      '我们的X50S型号是三色温LED大灯，通过遥控器控制。可以在6500K冷白光（晴天夜间）、4300K暖白光（雾天）和3000K黄金光（大雨/大雾）之间切换。遥控器可在车内一键切换，无需任何工具。',

    'inquiry.form.name': '姓名',
    'inquiry.form.company': '公司',
    'inquiry.form.email': '邮箱',
    'inquiry.form.phone': '电话',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': '国家',
    'inquiry.form.product': '产品',
    'inquiry.form.productPlaceholder': '选择产品',
    'inquiry.form.productAll': '全部产品 / 不确定',
    'inquiry.form.quantity': '数量',
    'inquiry.form.message': '留言',
    'inquiry.form.messagePlaceholder': '请告诉我们您的需求...',
    'inquiry.form.submit': '发送询盘',
    'inquiry.form.submitting': '发送中...',
    'inquiry.form.success': '感谢您的询盘！我们将在24小时内回复。',
    'inquiry.form.error': '发送失败，请重试或直接邮件联系我们。',
    'inquiry.form.nameRequired': '请输入姓名',
    'inquiry.form.emailRequired': '请输入邮箱',
    'inquiry.form.emailInvalid': '请输入有效的邮箱地址',

    'faq.cta.title': '还有问题？',
    'faq.cta.desc':
      '我们的团队随时为您提供帮助。联系我们，我们将在24小时内回复您。',
    'faq.cta.button': '联系我们',

    'footer.about': '关于星盛源',
    'footer.aboutText':
      '星盛源光电是专业的LED车灯制造商，成立于2014年。提供OEM/ODM服务，欢迎联系获取工厂直供价格。',
    'footer.quickLinks': '快速链接',
    'footer.products': '产品中心',
    'footer.contactUs': '联系我们',
    'footer.followUs': '关注我们',
    'footer.copyright': '© 2024 东莞市星盛源智能科技有限公司 版权所有',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
  },

  // ===== Spanish =====
  es: {
    'nav.home': 'Inicio',
    'nav.products': 'Productos',
    'nav.about': 'Sobre Nosotros',
    'nav.contact': 'Contacto',
    'nav.faq': 'FAQ',

    'common.getQuote': 'Solicitar Presupuesto',
    'common.inquireNow': 'Consultar Ahora',
    'common.viewProducts': 'Ver Productos',
    'common.learnMore': 'Saber Más',
    'common.sendMessage': 'Enviar Mensaje',
    'common.loading': 'Cargando...',
    'common.submit': 'Enviar',
    'common.all': 'Todos',
    'common.breadcrumbHome': 'Inicio',

    'brand.name': 'XSY LED',
    'brand.tagline': 'Fabricante Premium de Faros LED',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': 'Faros LED Premium para Mercados Globales',
    'home.hero.subtitle':
      'Iluminación automotriz LED directa de fábrica con capacidad ' +
      'OEM/ODM. Certificados CE, RoHS, FCC. Exportamos a 80+ países.',
    'home.hero.ctaPrimary': 'Ver Productos',
    'home.hero.ctaSecondary': 'Solicitar Presupuesto',

    'home.featured.title': 'Nuestros Productos Más Vendidos',
    'home.featured.subtitle':
      'Faros LED de alto rendimiento diseñados para durabilidad y brillo',

    'home.advantages.title': '¿Por Qué Elegir XSY?',
    'home.advantages.subtitle':
      'Cuatro ventajas clave que nos hacen el socio de confianza de ' +
      'compradores globales',
    'home.advantages.quality.title': 'Productos de Alta Calidad',
    'home.advantages.quality.desc':
      'Estricto proceso de control de calidad, prueba de envejecimiento ' +
      '100%, certificados CE/RoHS/FCC',
    'home.advantages.price.title': 'Precios Competitivos',
    'home.advantages.price.desc':
      'Precio directo de fábrica, sin intermediarios, MOQ flexible ' +
      'para pedidos pequeños',
    'home.advantages.delivery.title': 'Entrega Rápida',
    'home.advantages.delivery.desc':
      '7-15 días para muestras, 20-30 días para producción en masa',
    'home.advantages.oem.title': 'Servicio OEM/ODM',
    'home.advantages.oem.desc':
      'Embalaje personalizado, impresión de logo, marca privada y ' +
      'soporte de diseño completo',

    'home.sellingPoints.title': 'Por Qué Destacan los Faros LED XSY',
    'home.sellingPoints.subtitle':
      'Tecnología avanzada y pruebas rigurosas ofrecen un rendimiento excepcional',
    'home.sellingPoints.p1.title': '300% Más Brillante que Halógeno',
    'home.sellingPoints.p1.desc':
      'Chips CSP de alta potencia ofrecen hasta 20000 lúmenes por par, ' +
      'luz blanca fría de 6500K para máxima visibilidad nocturna.',
    'home.sellingPoints.p2.title': '50,000 Horas de Vida Útil',
    'home.sellingPoints.p2.desc':
      'Cuerpo de aluminio de grado aeronáutico + ventilador turbo + ' +
      'tubos de cobre para rendimiento estable y larga vida.',
    'home.sellingPoints.p3.title': 'Instalación Plug & Play',
    'home.sellingPoints.p3.desc':
      'Diseño 1:1 original, sin polaridad, listo para CANbus, ' +
      'instalación en 10 minutos sin modificaciones.',
    'home.sellingPoints.p4.title': 'Impermeabilidad IP67',
    'home.sellingPoints.p4.desc':
      'Diseño totalmente sellado resiste lluvia, polvo y temperaturas ' +
      'extremas. Funciona en cualquier clima.',

    'home.certifications.title': 'Certificaciones y Normas',
    'home.certifications.subtitle':
      'Nuestros productos cumplen con estándares internacionales de calidad y seguridad',

    'home.testimonials.title': 'Lo Que Dicen Nuestros Clientes',
    'home.testimonials.subtitle':
      'Confiado por distribuidores y minoristas en todo el mundo',
    'home.testimonials.t1.name': 'Michael Rodríguez',
    'home.testimonials.t1.role': 'CEO, AutoParts USA',
    'home.testimonials.t1.text':
      'XSY ha sido nuestro proveedor de faros LED durante 3 años. ' +
      'La calidad del producto es consistentemente excelente y su ' +
      'servicio OEM es de primer nivel.',
    'home.testimonials.t2.name': 'Hans Weber',
    'home.testimonials.t2.role': 'Gerente de Compras, DE Lights GmbH',
    'home.testimonials.t2.text':
      'Entrega rápida, gran comunicación y productos que se venden solos. ' +
      'A nuestros clientes les encanta el brillo y la calidad de construcción.',
    'home.testimonials.t3.name': 'Yuki Tanaka',
    'home.testimonials.t3.role': 'Director, JP Auto Trading',
    'home.testimonials.t3.text':
      'El equipo de I+D nos ayudó a personalizar una línea de productos ' +
      'única. Profesionales desde la muestra hasta la producción en masa. ' +
      'Muy recomendado.',

    'home.cta.title': '¿Listo para Asociarte con XSY?',
    'home.cta.subtitle':
      'Obtén un presupuesto competitivo en 24 horas. Pedidos de muestra bienvenidos.',
    'home.cta.button': 'Solicitar Presupuesto Ahora',

    'home.products.badge': 'Productos Destacados',
    'home.products.title': 'Nuestros Productos Más Vendidos',
    'home.products.subtitle':
      'Faros LED de alto rendimiento diseñados para durabilidad y brillo',
    'home.products.viewAll': 'Ver Todos los Productos',

    'home.meta.title': 'Fabricante Premium de Faros LED',
    'home.meta.description':
      'Iluminación automotriz LED directa de fábrica con capacidad ' +
      'OEM/ODM. Certificados CE, RoHS, FCC. Exportamos a 80+ países.',

    'products.title': 'Productos de Faros LED',
    'products.subtitle':
      'Explore nuestra gama completa de bombillas LED para todo tipo de casquillo',
    'products.filterBySocket': 'Filtrar por Tipo de Casquillo',
    'products.showing': 'Mostrando {count} productos',
    'products.noResults': 'No se encontraron productos',
    'products.breadcrumb': 'Productos',

    'product.detail.breadcrumb': 'Detalle del Producto',
    'product.specifications': 'Especificaciones',
    'product.description': 'Descripción del Producto',
    'product.features': 'Características Principales',
    'product.shippingTitle': 'Embalaje y Entrega',
    'product.relatedProducts': 'Productos Relacionados',
    'product.inquireSidebar.title': 'Consulta Rápida',
    'product.inquireSidebar.desc':
      'Complete sus requisitos y le responderemos en 24 horas.',
    'product.spec.model': 'Modelo',
    'product.spec.socketType': 'Tipo de Casquillo',
    'product.spec.power': 'Potencia',
    'product.spec.powerStartup': 'Potencia de Arranque',
    'product.spec.lumen': 'Lúmenes',
    'product.spec.lumenStartup': 'Lúmenes de Arranque',
    'product.spec.colorTemp': 'Temperatura de Color',
    'product.spec.voltage': 'Voltaje',
    'product.spec.ipRate': 'Grado IP',
    'product.spec.lifespan': 'Vida Útil',
    'product.spec.material': 'Material',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'Embalaje',
    'product.spec.deliveryTime': 'Tiempo de Entrega',
    'product.spec.warranty': 'Garantía',
    'product.spec.priceRange': 'Rango de Precio',
    'product.spec.features': 'Características',
    'product.h4DualNote': 'Las bombillas H4 de doble haz incluyen filamentos de luz alta y baja; los parámetros pueden variar ligeramente entre haces.',

    'about.title': 'Sobre XSY',
    'about.subtitle': 'Su fabricante confiable de faros LED desde 2015',
    'about.introTitle': 'Quiénes Somos',
    'about.introText':
      'Dongguan XSY Intelligent Technology Co., Ltd. es un fabricante ' +
      'profesional de iluminación automotriz LED ubicado en Dongguan, China. ' +
      'Nos especializamos en I+D, producción y venta de faros LED, ' +
      'antinieblas y otros productos LED automotrices. Con más de 8 años ' +
      'de experiencia, servimos a clientes en más de 80 países.',
    'about.facts.title': 'Fortaleza de la Empresa',
    'about.facts.est': 'Fundada en 2015',
    'about.facts.estDesc': 'Años de experiencia',
    'about.facts.factory': 'Fábrica de 10,000㎡',
    'about.facts.factoryDesc': 'Instalación de producción moderna',
    'about.facts.employees': '200+ Empleados',
    'about.facts.employeesDesc': 'Personal calificado',
    'about.facts.lines': '8 Líneas de Producción',
    'about.facts.linesDesc': 'Alta capacidad',
    'about.facts.capacity': '2M+ Pares/Año',
    'about.facts.capacityDesc': 'Capacidad de producción anual',
    'about.facts.countries': 'Exporta a 80+ Países',
    'about.facts.countriesDesc': 'Presencia global',

    'about.factory.title': 'Planta de Fabricación Avanzada',
    'about.factory.desc':
      'Nuestra fábrica de 10,000 metros cuadrados está equipada con ' +
      'líneas SMT automatizadas, centros de mecanizado CNC y líneas de ' +
      'ensamblaje totalmente automáticas. Seguimos estrictos sistemas ' +
      'de gestión 5S e ISO9001.',

    'about.qa.title': 'I+D y Control de Calidad',
    'about.qa.desc':
      'Nuestro equipo de I+D de 20 personas innova continuamente en ' +
      'diseño óptico, gestión térmica y electrónica de controladores. ' +
      'Cada producto pasa por un proceso de QC completo.',

    'about.oem.title': 'Capacidades OEM / ODM',
    'about.oem.desc':
      'Ofrecemos servicios integrales OEM y ODM para ayudarlo a construir ' +
      'su propia marca. Desde diseño de productos y herramientas hasta ' +
      'embalaje y etiquetado.',
    'about.oem.step1': '1. Análisis de Requisitos',
    'about.oem.step1Desc': 'Comprender sus necesidades y mercado objetivo',
    'about.oem.step2': '2. Diseño y Muestra',
    'about.oem.step2Desc': 'Desarrollo de prototipo y confirmación de muestra',
    'about.oem.step3': '3. Producción en Masa',
    'about.oem.step3Desc': 'Producción completa con estricto control de calidad',
    'about.oem.step4': '4. Entrega y Soporte',
    'about.oem.step4Desc': 'Entrega puntual y soporte postventa',

    'about.cta.title': '¿Interesado en la Asociación OEM/ODM?',
    'about.cta.desc': 'Contacte a nuestro equipo para discutir su proyecto',
    'about.cta.button': 'Hable con Nuestro Equipo',
    'about.cta.subtitle': 'Contacte a nuestro equipo para discutir su proyecto',

    'about.meta.title': 'Sobre XSY',
    'about.meta.description':
      'Su fabricante confiable de faros LED desde 2015',
    'about.badge': 'Sobre Nosotros',
    'about.intro.title': 'Quiénes Somos',
    'about.intro.p1':
      'Dongguan XSY Intelligent Technology Co., Ltd. es un fabricante ' +
      'profesional de iluminación automotriz LED ubicado en Dongguan, China.',
    'about.intro.p2':
      'Nos especializamos en I+D, producción y venta de faros LED, ' +
      'antinieblas y otros productos LED automotrices.',
    'about.intro.p3':
      'Con más de 8 años de experiencia, servimos a clientes en más de 80 países.',
    'about.yearsExperience': 'Años de Experiencia',

    'about.stats.established': 'Año de Fundación',
    'about.stats.factory': 'Instalación de producción moderna',
    'about.stats.employees': 'Personal calificado',
    'about.stats.lines': 'Alta capacidad',
    'about.stats.capacity': 'Capacidad de producción anual',
    'about.stats.countries': 'Presencia global',

    'about.factory.subtitle':
      'Nuestra fábrica de 10,000 metros cuadrados está equipada con líneas de producción avanzadas',
    'about.factory.p1':
      'Nuestra fábrica de 10,000 metros cuadrados está equipada con ' +
      'líneas SMT automatizadas, centros de mecanizado CNC y líneas de ' +
      'ensamblaje totalmente automáticas.',
    'about.factory.p2':
      'Seguimos estrictos sistemas de gestión 5S e ISO9001 para ' +
      'asegurar que cada producto cumpla con los más altos estándares.',

    'about.qc.title': 'I+D y Control de Calidad',
    'about.qc.subtitle':
      'Nuestro equipo de I+D de 20 personas y un proceso de QC completo ' +
      'aseguran que cada producto cumpla con estándares internacionales',
    'about.qc.step1.title': 'Inspección de Materias Primas',
    'about.qc.step1.desc':
      'Todos los materiales entrantes se prueban estrictamente por calidad y cumplimiento',
    'about.qc.step2.title': 'Control de Calidad en Producción SMT',
    'about.qc.step2.desc':
      'Inspección SMT automatizada y controles de calidad en línea en cada etapa',
    'about.qc.step3.title': 'Prueba de Envejecimiento y Rendimiento',
    'about.qc.step3.desc':
      'Prueba de envejecimiento 100%, prueba de impermeabilidad y prueba de vibración',
    'about.qc.step4.title': 'Inspección Final',
    'about.qc.step4.desc':
      'Inspección final de embalaje completa antes de cada envío',

    'about.oem.badge': 'Servicio OEM / ODM',
    'about.oem.subtitle':
      'Ofrecemos servicios integrales OEM y ODM para ayudarlo a construir ' +
      'su propia marca. Desde diseño de productos y herramientas hasta ' +
      'embalaje y etiquetado.',
    'about.oem.service1': 'Análisis de Requisitos',
    'about.oem.service2': 'Diseño y Muestra',
    'about.oem.service3': 'Producción en Masa',
    'about.oem.service4': 'Entrega y Soporte',

    'contact.title': 'Contáctenos',
    'contact.subtitle':
      '¿Tiene preguntas o quiere un presupuesto? Le responderemos en 24 horas.',
    'contact.breadcrumb': 'Contáctenos',
    'contact.formTitle': 'Envíenos una Consulta',
    'contact.infoTitle': 'Información de Contacto',
    'contact.addressLabel': 'Dirección',
    'contact.addressValue':
      'Calle Industrial No.88, Distrito Chang\'an, Dongguan, Guangdong, China',
    'contact.emailLabel': 'Correo',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': 'Teléfono',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': 'Horario',
    'contact.hoursValue': 'Lun - Sáb: 9:00 - 18:00 (GMT+8)',
    'contact.mapPlaceholder': 'Mapa de Ubicación de la Fábrica',

    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle':
      'Encuentre respuestas a preguntas comunes sobre nuestros productos y servicios',
    'faq.q1.q': '¿Cuál es su cantidad mínima de pedido (MOQ)?',
    'faq.q1.a':
      'Para productos en stock, nuestro MOQ es de 10 pares por modelo. ' +
      'Para pedidos personalizados OEM/ODM, el MOQ comienza desde 500 ' +
      'pares por modelo. Pedidos de muestra sin MOQ.',
    'faq.q2.q': '¿Ofrecen prueba de muestras?',
    'faq.q2.a':
      'Sí, ofrecemos prueba de muestras. La tarifa de muestra depende ' +
      'del modelo y generalmente se envía en 3-5 días hábiles. La ' +
      'tarifa de muestra se puede reembolsar al realizar un pedido al por mayor.',
    'faq.q3.q': '¿Cuál es el tiempo de entrega?',
    'faq.q3.a':
      'Pedidos de muestra: 3-7 días hábiles. Productos en stock: 7-15 ' +
      'días hábiles. Pedidos OEM/ODM: 25-35 días hábiles según cantidad.',
    'faq.q4.q': '¿Proporcionan servicios OEM/ODM?',
    'faq.q4.a':
      'Sí, ofrecemos servicios integrales OEM y ODM incluyendo impresión ' +
      'de logo personalizada, embalaje personalizado, marca privada y ' +
      'diseño de producto totalmente personalizado.',
    'faq.q5.q': '¿Qué certificaciones tienen sus productos?',
    'faq.q5.a':
      'Todos nuestros faros LED están certificados CE, RoHS y FCC. ' +
      'Modelos seleccionados también tienen certificaciones E-mark y DOT.',
    'faq.q6.q': '¿Cuál es el período de garantía?',
    'faq.q6.a':
      'Ofrecemos una garantía de 2 años para todos los faros LED en ' +
      'condiciones de uso normal. Los productos defectuosos serán ' +
      'reemplazados o reembolsados.',
    'faq.q7.q': '¿Qué condiciones de pago aceptan?',
    'faq.q7.a':
      'Aceptamos T/T (30% depósito, 70% antes del envío), PayPal, ' +
      'Western Union, Trade Assurance y L/C para pedidos grandes.',
    'faq.q8.q': '¿Qué métodos de envío ofrecen?',
    'faq.q8.a':
      'Ofrecemos múltiples opciones de envío: Express (DHL, FedEx, UPS) ' +
      'para muestras y pedidos pequeños, flete aéreo para pedidos ' +
      'medianos, y flete marítimo para envíos a granel.',
    'faq.q9.q': '¿Cómo hago un pedido?',
    'faq.q9.a':
      'Simplemente envíenos una consulta a través de nuestro sitio web ' +
      'o correo electrónico con el modelo y cantidad. Nuestro equipo de ' +
      'ventas responderá en 24 horas.',
    'faq.q10.q': '¿Cuál es su servicio postventa?',
    'faq.q10.a':
      'Brindamos soporte postventa completo que incluye consulta técnica, ' +
      'reclamaciones de garantía, repuestos y materiales de marketing.',
    'faq.cta.title': '¿Aún tienes preguntas?',
    'faq.cta.desc':
      'Nuestro equipo está aquí para ayudarte. Contáctanos y te responderemos en 24 horas.',
    'faq.cta.button': 'Contáctanos',

    'inquiry.form.name': 'Nombre',
    'inquiry.form.company': 'Empresa',
    'inquiry.form.email': 'Correo',
    'inquiry.form.phone': 'Teléfono',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': 'País',
    'inquiry.form.product': 'Producto',
    'inquiry.form.productPlaceholder': 'Seleccione un producto',
    'inquiry.form.productAll': 'Todos los Productos / No Estoy Seguro',
    'inquiry.form.quantity': 'Cantidad',
    'inquiry.form.message': 'Mensaje',
    'inquiry.form.messagePlaceholder': 'Cuéntenos sobre sus requisitos...',
    'inquiry.form.submit': 'Enviar Consulta',
    'inquiry.form.submitting': 'Enviando...',
    'inquiry.form.success':
      '¡Gracias! Su consulta ha sido enviada. Le responderemos en 24 horas.',
    'inquiry.form.error':
      'Error al enviar la consulta. Inténtelo de nuevo o envíenos un correo.',
    'inquiry.form.nameRequired': 'El nombre es obligatorio',
    'inquiry.form.emailRequired': 'El correo es obligatorio',
    'inquiry.form.emailInvalid': 'Por favor ingrese un correo válido',

    'footer.about': 'Sobre XSY',
    'footer.aboutText':
      'Fabricante profesional de iluminación automotriz LED con más de ' +
      '8 años de experiencia en exportación. Certificado CE, RoHS, FCC.',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.contactUs': 'Contáctenos',
    'footer.followUs': 'Síguenos',
    'footer.copyright': '© {year} XSY LED. Todos los derechos reservados.',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
  },

  // ===== German =====
  de: {
    'nav.home': 'Startseite',
    'nav.products': 'Produkte',
    'nav.about': 'Über Uns',
    'nav.contact': 'Kontakt',
    'nav.faq': 'FAQ',

    'common.getQuote': 'Angebot Anfordern',
    'common.inquireNow': 'Jetzt Anfragen',
    'common.viewProducts': 'Produkte Ansehen',
    'common.learnMore': 'Mehr Erfahren',
    'common.sendMessage': 'Nachricht Senden',
    'common.loading': 'Laden...',
    'common.submit': 'Absenden',
    'common.all': 'Alle',
    'common.breadcrumbHome': 'Startseite',

    'brand.name': 'XSY LED',
    'brand.tagline': 'Premium LED Scheinwerfer Hersteller',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': 'Premium LED Scheinwerfer für Weltmärkte',
    'home.hero.subtitle':
      'LED-Autobeleuchtung direkt vom Hersteller mit OEM/ODM-Kapazität. ' +
      'CE, RoHS, FCC zertifiziert. Export in 80+ Länder.',
    'home.hero.ctaPrimary': 'Produkte Ansehen',
    'home.hero.ctaSecondary': 'Angebot Anfordern',

    'home.featured.title': 'Unsere Bestseller',
    'home.featured.subtitle':
      'Hochleistungs-LED-Scheinwerfer für Langlebigkeit und Helligkeit',

    'home.advantages.title': 'Warum XSY Wählen?',
    'home.advantages.subtitle':
      'Vier Kernvorteile, die uns zum vertrauenswürdigen Partner globaler Käufer machen',
    'home.advantages.quality.title': 'Hochwertige Produkte',
    'home.advantages.quality.desc':
      'Strenger QC-Prozess, 100% Alterungstest, CE/RoHS/FCC zertifiziert',
    'home.advantages.price.title': 'Wettbewerbsfähige Preise',
    'home.advantages.price.desc':
      'Direkter Fabrikpreis, kein Zwischenhändler, flexibler MOQ für Kleinbestellungen',
    'home.advantages.delivery.title': 'Schnelle Lieferung',
    'home.advantages.delivery.desc':
      '7-15 Tage für Muster, 20-30 Tage für Massenproduktion',
    'home.advantages.oem.title': 'OEM/ODM Service',
    'home.advantages.oem.desc':
      'Individuelle Verpackung, Logo-Druck, Private Label und vollständiger Design-Support',

    'home.sellingPoints.title': 'Warum XSY LED Scheinwerfer Herausstechen',
    'home.sellingPoints.subtitle':
      'Fortschrittliche Technologie und strenge Tests liefern außergewöhnliche Leistung',
    'home.sellingPoints.p1.title': '300% Heller als Halogen',
    'home.sellingPoints.p1.desc':
      'Hochleistungs-CSP-Chips liefern bis zu 20000 Lumen pro Paar, ' +
      '6500K kaltweißes Licht für maximale Nachtsicht.',
    'home.sellingPoints.p2.title': '50.000 Stunden Lebensdauer',
    'home.sellingPoints.p2.desc':
      'Aluminiumkörper in Luftfahrtqualität + Turbo-Lüfter + ' +
      'Kupferwärmerohre für stabile Leistung und lange Lebensdauer.',
    'home.sellingPoints.p3.title': 'Plug & Play Installation',
    'home.sellingPoints.p3.desc':
      '1:1 Originaldesign, polaritätsfrei, CANbus-fähig, ' +
      'Installation in 10 Minuten ohne Modifikation.',
    'home.sellingPoints.p4.title': 'IP67 Wasserdicht',
    'home.sellingPoints.p4.desc':
      'Vollständig abgedichtetes Design widersteht Regen, Staub und ' +
      'extremen Temperaturen. Für jedes Wetter geeignet.',

    'home.certifications.title': 'Zertifizierungen & Standards',
    'home.certifications.subtitle':
      'Unsere Produkte erfüllen internationale Qualitäts- und Sicherheitsstandards',

    'home.testimonials.title': 'Was Unsere Kunden Sagen',
    'home.testimonials.subtitle':
      'Vertraut von Distributoren und Einzelhändlern weltweit',
    'home.testimonials.t1.name': 'Michael Rodriguez',
    'home.testimonials.t1.role': 'CEO, AutoParts USA',
    'home.testimonials.t1.text':
      'XSY ist seit 3 Jahren unser LED-Scheinwerfer-Lieferant. ' +
      'Die Produktqualität ist durchweg ausgezeichnet und der OEM-Service ist erstklassig.',
    'home.testimonials.t2.name': 'Hans Weber',
    'home.testimonials.t2.role': 'Einkaufsleiter, DE Lights GmbH',
    'home.testimonials.t2.text':
      'Schnelle Lieferung, gute Kommunikation und Produkte, die sich ' +
      'von selbst verkaufen. Unsere Kunden lieben die Helligkeit und Verarbeitungsqualität.',
    'home.testimonials.t3.name': 'Yuki Tanaka',
    'home.testimonials.t3.role': 'Geschäftsführer, JP Auto Trading',
    'home.testimonials.t3.text':
      'Das F&E-Team hat uns geholfen, eine einzigartige Produktlinie zu ' +
      'entwickeln. Professionell vom Muster bis zur Massenproduktion. Sehr empfehlenswert.',

    'home.cta.title': 'Bereit für die Zusammenarbeit mit XSY?',
    'home.cta.subtitle':
      'Erhalten Sie ein wettbewerbsfähiges Angebot innerhalb von 24 Stunden. Musterbestellungen willkommen.',
    'home.cta.button': 'Jetzt Angebot Anfordern',

    'home.products.badge': 'Ausgewählte Produkte',
    'home.products.title': 'Unsere Bestseller',
    'home.products.subtitle':
      'Hochleistungs-LED-Scheinwerfer für Langlebigkeit und Helligkeit',
    'home.products.viewAll': 'Alle Produkte Ansehen',

    'home.meta.title': 'Premium LED Scheinwerfer Hersteller',
    'home.meta.description':
      'LED-Autobeleuchtung direkt vom Hersteller mit OEM/ODM-Kapazität. ' +
      'CE, RoHS, FCC zertifiziert. Export in 80+ Länder.',

    'products.title': 'LED Scheinwerfer Produkte',
    'products.subtitle':
      'Entdecken Sie unser komplettes Sortiment an LED-Scheinwerfern für jeden Sockeltyp',
    'products.filterBySocket': 'Nach Sockeltyp Filtern',
    'products.showing': '{count} Produkte angezeigt',
    'products.noResults': 'Keine Produkte gefunden',
    'products.breadcrumb': 'Produkte',

    'product.detail.breadcrumb': 'Produktdetail',
    'product.specifications': 'Spezifikationen',
    'product.description': 'Produktbeschreibung',
    'product.features': 'Hauptmerkmale',
    'product.shippingTitle': 'Verpackung & Lieferung',
    'product.relatedProducts': 'Verwandte Produkte',
    'product.inquireSidebar.title': 'Schnellanfrage',
    'product.inquireSidebar.desc':
      'Geben Sie Ihre Anforderungen ein und wir antworten innerhalb von 24 Stunden.',
    'product.spec.model': 'Modell',
    'product.spec.socketType': 'Sockeltyp',
    'product.spec.power': 'Leistung',
    'product.spec.powerStartup': 'Startleistung',
    'product.spec.lumen': 'Lumen',
    'product.spec.lumenStartup': 'Start-Lumen',
    'product.spec.colorTemp': 'Farbtemperatur',
    'product.spec.voltage': 'Spannung',
    'product.spec.ipRate': 'IP-Schutzart',
    'product.spec.lifespan': 'Lebensdauer',
    'product.spec.material': 'Material',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'Verpackung',
    'product.spec.deliveryTime': 'Lieferzeit',
    'product.spec.warranty': 'Garantie',
    'product.spec.priceRange': 'Preisspanne',
    'product.spec.features': 'Merkmale',
    'product.h4DualNote': 'H4-Zweistrahlbirnen enthalten Fern- und Abblendlichtfilamente; die Parameter können zwischen den Strahlen leicht variieren.',

    'about.title': 'Über XSY',
    'about.subtitle': 'Ihr vertrauenswürdiger LED-Scheinwerfer-Hersteller seit 2015',
    'about.introTitle': 'Wer Wir Sind',
    'about.introText':
      'Dongguan XSY Intelligent Technology Co., Ltd. ist ein professioneller ' +
      'Hersteller von LED-Autobeleuchtung mit Sitz in Dongguan, China. ' +
      'Wir sind spezialisiert auf F&E, Produktion und Vertrieb von ' +
      'LED-Scheinwerfern, Nebelscheinwerfern und anderen LED-Produkten. ' +
      'Mit über 8 Jahren Erfahrung beliefern wir Kunden in 80+ Ländern.',
    'about.facts.title': 'Unternehmensstärke auf einen Blick',
    'about.facts.est': 'Gegründet 2015',
    'about.facts.estDesc': 'Jahre Branchenerfahrung',
    'about.facts.factory': '10.000㎡ Fabrik',
    'about.facts.factoryDesc': 'Moderne Produktionsstätte',
    'about.facts.employees': '200+ Mitarbeiter',
    'about.facts.employeesDesc': 'Qualifiziertes Personal',
    'about.facts.lines': '8 Produktionslinien',
    'about.facts.linesDesc': 'Hohe Kapazität',
    'about.facts.capacity': '2M+ Paare/Jahr',
    'about.facts.capacityDesc': 'Jahresproduktionskapazität',
    'about.facts.countries': 'Export in 80+ Länder',
    'about.facts.countriesDesc': 'Globale Marktpräsenz',

    'about.factory.title': 'Moderne Fertigungsstätte',
    'about.factory.desc':
      'Unsere 10.000 Quadratmeter große Fabrik ist mit automatisierten SMT-Linien, ' +
      'CNC-Bearbeitungszentren und vollautomatischen Montagelinien ausgestattet. ' +
      'Wir folgen strengem 5S-Management und ISO9001 Qualitätsmanagementsystem.',

    'about.qa.title': 'F&E und Qualitätskontrolle',
    'about.qa.desc':
      'Unser 20-köpfiges F&E-Team innoviert ständig in Optikdesign, ' +
      'Wärmemanagement und Treiberelektronik. Jedes Produkt durchläuft ' +
      'einen umfassenden QC-Prozess.',

    'about.oem.title': 'OEM / ODM Fähigkeiten',
    'about.oem.desc':
      'Wir bieten umfassende OEM- und ODM-Dienstleistungen, um Ihnen beim ' +
      'Aufbau Ihrer eigenen Marke zu helfen. Von Produktdesign und Werkzeugbau ' +
      'bis zu Verpackung und Etikettierung.',
    'about.oem.step1': '1. Anforderungsanalyse',
    'about.oem.step1Desc': 'Ihre Produktanforderungen und Zielmarkt verstehen',
    'about.oem.step2': '2. Design & Muster',
    'about.oem.step2Desc': 'Prototypenentwicklung und Musterbestätigung',
    'about.oem.step3': '3. Massenproduktion',
    'about.oem.step3Desc': 'Volle Produktion mit strenger Qualitätskontrolle',
    'about.oem.step4': '4. Lieferung & Support',
    'about.oem.step4Desc': 'Pünktliche Lieferung und After-Sales-Support',

    'about.cta.title': 'Interessiert an OEM/ODM-Partnerschaft?',
    'about.cta.desc': 'Kontaktieren Sie unser Team, um Ihr Projekt zu besprechen',
    'about.cta.button': 'Mit Unserem Team Sprechen',
    'about.cta.subtitle': 'Kontaktieren Sie unser Team, um Ihr Projekt zu besprechen',

    'about.meta.title': 'Über XSY',
    'about.meta.description':
      'Ihr vertrauenswürdiger LED-Scheinwerfer-Hersteller seit 2015',
    'about.badge': 'Über Uns',
    'about.intro.title': 'Wer Wir Sind',
    'about.intro.p1':
      'Dongguan XSY Intelligent Technology Co., Ltd. ist ein professioneller ' +
      'Hersteller von LED-Autobeleuchtung mit Sitz in Dongguan, China.',
    'about.intro.p2':
      'Wir sind spezialisiert auf F&E, Produktion und Vertrieb von ' +
      'LED-Scheinwerfern, Nebelscheinwerfern und anderen LED-Produkten.',
    'about.intro.p3':
      'Mit über 8 Jahren Erfahrung beliefern wir Kunden in 80+ Ländern.',
    'about.yearsExperience': 'Jahre Erfahrung',

    'about.stats.established': 'Gründungsjahr',
    'about.stats.factory': 'Moderne Produktionsstätte',
    'about.stats.employees': 'Qualifiziertes Personal',
    'about.stats.lines': 'Hohe Kapazität',
    'about.stats.capacity': 'Jahresproduktionskapazität',
    'about.stats.countries': 'Globale Marktpräsenz',

    'about.factory.subtitle':
      'Unsere 10.000 Quadratmeter große Fabrik ist mit fortschrittlichen ' +
      'Produktionslinien ausgestattet',
    'about.factory.p1':
      'Unsere 10.000 Quadratmeter große Fabrik ist mit automatisierten SMT-Linien, ' +
      'CNC-Bearbeitungszentren und vollautomatischen Montagelinien ausgestattet.',
    'about.factory.p2':
      'Wir folgen strengem 5S-Management und ISO9001 Qualitätsmanagementsystem, ' +
      'um sicherzustellen, dass jedes Produkt den höchsten Standards entspricht.',

    'about.qc.title': 'F&E und Qualitätskontrolle',
    'about.qc.subtitle':
      'Unser 20-köpfiges F&E-Team und ein umfassender QC-Prozess ' +
      'stellen sicher, dass jedes Produkt internationalen Standards entspricht',
    'about.qc.step1.title': 'Rohstoffprüfung',
    'about.qc.step1.desc':
      'Alle eingehenden Materialien werden streng auf Qualität und Konformität geprüft',
    'about.qc.step2.title': 'SMT-Produktions-QC',
    'about.qc.step2.desc':
      'Automatisierte SMT-Inspektion und Inline-Qualitätskontrollen in jeder Phase',
    'about.qc.step3.title': 'Alterungs- und Leistungstest',
    'about.qc.step3.desc':
      '100% Alterungstest, Wasserdichtigkeitstest und Vibrations test für alle Produkte',
    'about.qc.step4.title': 'Endkontrolle',
    'about.qc.step4.desc':
      'Umfassende Endverpackungsprüfung vor jedem Versand',

    'about.oem.badge': 'OEM / ODM Service',
    'about.oem.subtitle':
      'Wir bieten umfassende OEM- und ODM-Dienstleistungen, um Ihnen beim ' +
      'Aufbau Ihrer eigenen Marke zu helfen. Von Produktdesign und Werkzeugbau ' +
      'bis zu Verpackung und Etikettierung.',
    'about.oem.service1': 'Anforderungsanalyse',
    'about.oem.service2': 'Design & Muster',
    'about.oem.service3': 'Massenproduktion',
    'about.oem.service4': 'Lieferung & Support',

    'contact.title': 'Kontakt',
    'contact.subtitle':
      'Haben Sie Fragen oder möchten Sie ein Angebot? Wir melden uns innerhalb von 24 Stunden.',
    'contact.breadcrumb': 'Kontakt',
    'contact.formTitle': 'Anfrage Senden',
    'contact.infoTitle': 'Kontaktinformationen',
    'contact.addressLabel': 'Adresse',
    'contact.addressValue':
      'Industriestraße 88, Chang\'an, Dongguan, Guangdong, China',
    'contact.emailLabel': 'E-Mail',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': 'Telefon',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': 'Öffnungszeiten',
    'contact.hoursValue': 'Mo - Sa: 9:00 - 18:00 (GMT+8)',
    'contact.mapPlaceholder': 'Fabrikstandortkarte',

    'faq.title': 'Häufig Gestellte Fragen',
    'faq.subtitle':
      'Antworten auf häufige Fragen zu unseren Produkten und Dienstleistungen',
    'faq.q1.q': 'Was ist Ihre Mindestbestellmenge (MOQ)?',
    'faq.q1.a':
      'Für Lagerprodukte beträgt unser MOQ 10 Paare pro Modell. Für ' +
      'OEM/ODM-Sonderaufträge beginnt der MOQ bei 500 Paaren pro Modell. ' +
      'Musterbestellungen sind ohne MOQ möglich.',
    'faq.q2.q': 'Bieten Sie Mustertests an?',
    'faq.q2.a':
      'Ja, wir bieten Mustertests an. Die Mustermenge hängt vom Modell ab ' +
      'und wird in der Regel innerhalb von 3-5 Werktagen versandt. ' +
      'Die Mustermenge kann bei einer Großbestellung gutgeschrieben werden.',
    'faq.q3.q': 'Wie lange dauert die Lieferung?',
    'faq.q3.a':
      'Musterbestellungen: 3-7 Werktage. Lagerprodukte: 7-15 Werktage. ' +
      'OEM/ODM-Bestellungen: 25-35 Werktage je nach Menge.',
    'faq.q4.q': 'Bieten Sie OEM/ODM-Dienstleistungen an?',
    'faq.q4.a':
      'Ja, wir bieten umfassende OEM- und ODM-Dienstleistungen an, ' +
      'einschließlich individuellem Logo-Druck, individueller Verpackung, ' +
      'Private Label und vollständig angepasstem Produktdesign.',
    'faq.q5.q': 'Welche Zertifizierungen haben Ihre Produkte?',
    'faq.q5.a':
      'Alle unsere LED-Scheinwerfer sind CE-, RoHS- und FCC-zertifiziert. ' +
      'Ausgewählte Modelle haben auch E-mark- und DOT-Zertifizierungen.',
    'faq.q6.q': 'Wie lange ist die Garantiezeit?',
    'faq.q6.a':
      'Wir bieten eine 2-jährige Garantie für alle LED-Scheinwerfer unter ' +
      'normalen Nutzungsbedingungen. Defekte Produkte werden ersetzt oder erstattet.',
    'faq.q7.q': 'Welche Zahlungsbedingungen akzeptieren Sie?',
    'faq.q7.a':
      'Wir akzeptieren T/T (30% Anzahlung, 70% vor Versand), PayPal, ' +
      'Western Union, Trade Assurance und L/C für Großaufträge.',
    'faq.q8.q': 'Welche Versandarten bieten Sie an?',
    'faq.q8.a':
      'Wir bieten mehrere Versandoptionen: Express (DHL, FedEx, UPS) für ' +
      'Muster und Kleinbestellungen, Luftfracht für mittlere Bestellungen ' +
      'und Seefracht für Großmengen.',
    'faq.q9.q': 'Wie bestelle ich?',
    'faq.q9.a':
      'Senden Sie uns einfach eine Anfrage über unsere Website oder per ' +
      'E-Mail mit Modell und Menge. Unser Vertriebsteam antwortet innerhalb von 24 Stunden.',
    'faq.q10.q': 'Wie ist Ihr After-Sales-Service?',
    'faq.q10.a':
      'Wir bieten umfassenden After-Sales-Support einschließlich technischer ' +
      'Beratung, Garantieansprüchen, Ersatzteilen und Marketingmaterialien.',
    'faq.cta.title': 'Noch Fragen?',
    'faq.cta.desc':
      'Unser Team hilft Ihnen gerne. Kontaktieren Sie uns und wir melden uns innerhalb von 24 Stunden.',
    'faq.cta.button': 'Kontaktieren Sie uns',

    'inquiry.form.name': 'Name',
    'inquiry.form.company': 'Unternehmen',
    'inquiry.form.email': 'E-Mail',
    'inquiry.form.phone': 'Telefon',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': 'Land',
    'inquiry.form.product': 'Produkt',
    'inquiry.form.productPlaceholder': 'Produkt auswählen',
    'inquiry.form.productAll': 'Alle Produkte / Nicht Sicher',
    'inquiry.form.quantity': 'Menge',
    'inquiry.form.message': 'Nachricht',
    'inquiry.form.messagePlaceholder': 'Erzählen Sie uns von Ihren Anforderungen...',
    'inquiry.form.submit': 'Anfrage Senden',
    'inquiry.form.submitting': 'Wird gesendet...',
    'inquiry.form.success':
      'Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns innerhalb von 24 Stunden.',
    'inquiry.form.error':
      'Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder senden Sie uns eine E-Mail.',
    'inquiry.form.nameRequired': 'Name ist erforderlich',
    'inquiry.form.emailRequired': 'E-Mail ist erforderlich',
    'inquiry.form.emailInvalid': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',

    'footer.about': 'Über XSY',
    'footer.aboutText':
      'Professioneller Hersteller von LED-Autobeleuchtung mit über ' +
      '8 Jahren Export-Erfahrung. CE, RoHS, FCC zertifiziert.',
    'footer.quickLinks': 'Schnelllinks',
    'footer.contactUs': 'Kontakt',
    'footer.followUs': 'Folgen Sie uns',
    'footer.copyright': '© {year} XSY LED. Alle Rechte vorbehalten.',
    'footer.privacy': 'Datenschutz',
    'footer.terms': 'AGB',
  },

  // ===== French =====
  fr: {
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.faq': 'FAQ',

    'common.getQuote': 'Demander un Devis',
    'common.inquireNow': 'Demander Maintenant',
    'common.viewProducts': 'Voir les Produits',
    'common.learnMore': 'En Savoir Plus',
    'common.sendMessage': 'Envoyer un Message',
    'common.loading': 'Chargement...',
    'common.submit': 'Soumettre',
    'common.all': 'Tous',
    'common.breadcrumbHome': 'Accueil',

    'brand.name': 'XSY LED',
    'brand.tagline': 'Fabricant Premium de Phares LED',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': 'Phares LED Premium pour les Marchés Mondiaux',
    'home.hero.subtitle':
      'Éclairage automobile LED direct usine avec capacité OEM/ODM. ' +
      'Certifié CE, RoHS, FCC. Export dans 80+ pays.',
    'home.hero.ctaPrimary': 'Voir les Produits',
    'home.hero.ctaSecondary': 'Demander un Devis',

    'home.featured.title': 'Nos Produits les Plus Vendus',
    'home.featured.subtitle':
      'Phares LED haute performance conçus pour la durabilité et la luminosité',

    'home.advantages.title': 'Pourquoi Choisir XSY ?',
    'home.advantages.subtitle':
      'Quatre atouts clés qui font de nous le partenaire de confiance des acheteurs mondiaux',
    'home.advantages.quality.title': 'Produits de Haute Qualité',
    'home.advantages.quality.desc':
      'Processus QC strict, test de vieillissement 100%, certifié CE/RoHS/FCC',
    'home.advantages.price.title': 'Prix Compétitifs',
    'home.advantages.price.desc':
      'Prix direct usine, sans intermédiaire, MOQ flexible pour petites commandes',
    'home.advantages.delivery.title': 'Livraison Rapide',
    'home.advantages.delivery.desc':
      '7-15 jours pour échantillons, 20-30 jours pour production de masse',
    'home.advantages.oem.title': 'Service OEM/ODM',
    'home.advantages.oem.desc':
      'Emballage personnalisé, impression logo, marque privée et support design complet',

    'home.sellingPoints.title': 'Pourquoi les Phares LED XSY se Démarquent',
    'home.sellingPoints.subtitle':
      'Technologie de pointe et tests rigoureux pour des performances exceptionnelles',
    'home.sellingPoints.p1.title': '300% Plus Lumineux que l\'Halogène',
    'home.sellingPoints.p1.desc':
      'Puces CSP haute puissance jusqu\'à 20000 lumens par paire, ' +
      'lumière blanche froide 6500K pour une visibilité nocturne maximale.',
    'home.sellingPoints.p2.title': '50 000 Heures de Durée de Vie',
    'home.sellingPoints.p2.desc':
      'Corps en aluminium aéronautique + ventilateur turbo + ' +
      'caloducs en cuivre pour performance stable et longue durée de vie.',
    'home.sellingPoints.p3.title': 'Installation Plug & Play',
    'home.sellingPoints.p3.desc':
      'Design 1:1 original, sans polarité, compatible CANbus, ' +
      'installation en 10 minutes sans modification.',
    'home.sellingPoints.p4.title': 'Étanche IP67',
    'home.sellingPoints.p4.desc':
      'Design entièrement étanche résiste à la pluie, à la poussière ' +
      'et aux températures extrêmes. Fonctionne par tous les temps.',

    'home.certifications.title': 'Certifications et Normes',
    'home.certifications.subtitle':
      'Nos produits répondent aux normes internationales de qualité et de sécurité',

    'home.testimonials.title': 'Ce Que Disent Nos Clients',
    'home.testimonials.subtitle':
      'Approuvé par les distributeurs et détaillants du monde entier',
    'home.testimonials.t1.name': 'Michael Rodriguez',
    'home.testimonials.t1.role': 'PDG, AutoParts USA',
    'home.testimonials.t1.text':
      'XSY est notre fournisseur de phares LED depuis 3 ans. ' +
      'La qualité des produits est constamment excellente et leur service OEM est de premier plan.',
    'home.testimonials.t2.name': 'Hans Weber',
    'home.testimonials.t2.role': 'Responsable Achats, DE Lights GmbH',
    'home.testimonials.t2.text':
      'Livraison rapide, excellente communication et produits qui se vendent bien. ' +
      'Nos clients adorent la luminosité et la qualité de fabrication.',
    'home.testimonials.t3.name': 'Yuki Tanaka',
    'home.testimonials.t3.role': 'Directeur, JP Auto Trading',
    'home.testimonials.t3.text':
      'L\'équipe R&D nous a aidés à créer une gamme unique. ' +
      'Professionnels de l\'échantillon à la production en série. Très recommandé.',

    'home.cta.title': 'Prêt à Partenariat avec XSY ?',
    'home.cta.subtitle':
      'Obtenez un devis compétitif sous 24 heures. Commandes échantillons bienvenues.',
    'home.cta.button': 'Demander un Devis Maintenant',

    'home.products.badge': 'Nos Produits',
    'home.products.title': 'Phares LED les Plus Vendus',
    'home.products.subtitle':
      'Découvrez notre gamme la plus populaire de phares LED haute performance',
    'home.products.viewAll': 'Voir Tous les Produits',

    'home.meta.title': 'XSY LED - Fabricant de Phares LED Professionnels',
    'home.meta.description':
      'XSY LED est un fabricant chinois spécialisé dans les phares LED automobiles. ' +
      'Phare H4 H7 H11 9005 9006 de haute qualité, services OEM/ODM, livraison rapide.',

    'products.title': 'Produits Phares LED',
    'products.subtitle':
      'Découvrez notre gamme complète d\'ampoules LED pour tous types de culot',
    'products.filterBySocket': 'Filtrer par Type de Culot',
    'products.showing': '{count} produits affichés',
    'products.noResults': 'Aucun produit trouvé',
    'products.breadcrumb': 'Produits',

    'product.detail.breadcrumb': 'Détail Produit',
    'product.specifications': 'Spécifications',
    'product.description': 'Description du Produit',
    'product.features': 'Caractéristiques Principales',
    'product.shippingTitle': 'Emballage et Livraison',
    'product.relatedProducts': 'Produits Connexes',
    'product.inquireSidebar.title': 'Demande Rapide',
    'product.inquireSidebar.desc':
      'Remplissez vos besoins et nous répondrons sous 24 heures.',
    'product.spec.model': 'Modèle',
    'product.spec.socketType': 'Type de Culot',
    'product.spec.power': 'Puissance',
    'product.spec.powerStartup': 'Puissance de Démarrage',
    'product.spec.lumen': 'Lumens',
    'product.spec.lumenStartup': 'Lumens de Démarrage',
    'product.spec.colorTemp': 'Température de Couleur',
    'product.spec.voltage': 'Tension',
    'product.spec.ipRate': 'Indice IP',
    'product.spec.lifespan': 'Durée de Vie',
    'product.spec.material': 'Matériau',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'Emballage',
    'product.spec.deliveryTime': 'Délai de Livraison',
    'product.spec.warranty': 'Garantie',
    'product.spec.priceRange': 'Gamme de Prix',
    'product.spec.features': 'Caractéristiques',
    'product.h4DualNote': 'Les ampoules H4 double faisceau incluent des filaments de route et de croisement ; les paramètres peuvent varier légèrement entre les faisceaux.',

    'about.title': 'À Propos de XSY',
    'about.subtitle': 'Votre fabricant de phares LED de confiance depuis 2015',
    'about.introTitle': 'Qui Sommes-Nous',
    'about.introText':
      'Dongguan XSY Intelligent Technology Co., Ltd. est un fabricant ' +
      'professionnel d\'éclairage automobile LED basé à Dongguan, Chine. ' +
      'Nous sommes spécialisés dans la R&D, la production et la vente de ' +
      'phares LED, antibrouillards et autres produits LED automobiles. ' +
      'Avec plus de 8 ans d\'expérience, nous servons des clients dans plus de 80 pays.',
    'about.facts.title': 'Force de l\'Entreprise en un Coup d\'Œil',
    'about.facts.est': 'Créé en 2015',
    'about.facts.estDesc': 'Années d\'expérience',
    'about.facts.factory': 'Usine de 10 000㎡',
    'about.facts.factoryDesc': 'Installation de production moderne',
    'about.facts.employees': '200+ Employés',
    'about.facts.employeesDesc': 'Personnel qualifié',
    'about.facts.lines': '8 Lignes de Production',
    'about.facts.linesDesc': 'Haute capacité',
    'about.facts.capacity': '2M+ Paires/An',
    'about.facts.capacityDesc': 'Capacité de production annuelle',
    'about.facts.countries': 'Export vers 80+ Pays',
    'about.facts.countriesDesc': 'Présence mondiale',

    'about.factory.title': 'Usine de Fabrication Avancée',
    'about.factory.desc':
      'Notre usine de 10 000 mètres carrés est équipée de lignes SMT automatisées, ' +
      'de centres d\'usinage CNC et de lignes d\'assemblage entièrement automatisées. ' +
      'Nous suivons une gestion 5S stricte et le système de management de la qualité ISO9001.',

    'about.qa.title': 'R&D et Contrôle Qualité',
    'about.qa.desc':
      'Notre équipe R&D de 20 personnes innove en permanence dans la conception optique, ' +
      'la gestion thermique et l\'électronique de commande. Chaque produit passe par un processus QC complet.',

    'about.oem.title': 'Capacités OEM / ODM',
    'about.oem.desc':
      'Nous offrons des services OEM et ODM complets pour vous aider à créer votre propre marque. ' +
      'De la conception des produits et de l\'outillage à l\'emballage et à l\'étiquetage.',
    'about.oem.step1': '1. Analyse des Besoins',
    'about.oem.step1Desc': 'Comprendre vos besoins produits et marché cible',
    'about.oem.step2': '2. Conception & Échantillon',
    'about.oem.step2Desc': 'Développement prototype et confirmation échantillon',
    'about.oem.step3': '3. Production de Masse',
    'about.oem.step3Desc': 'Production complète avec contrôle qualité strict',
    'about.oem.step4': '4. Livraison & Support',
    'about.oem.step4Desc': 'Livraison à temps et support après-vente',

    'about.cta.title': 'Intéressé par un Partenariat OEM/ODM ?',
    'about.cta.desc': 'Contactez notre équipe pour discuter de votre projet',
    'about.cta.button': 'Parler à Notre Équipe',
    'about.cta.subtitle':
      'Contactez notre équipe pour discuter de votre projet et obtenir un devis compétitif.',

    'about.badge': 'À Propos de Nous',
    'about.intro.title': 'Qui Sommes-Nous',
    'about.intro.p1':
      'Dongguan XSY Intelligent Technology Co., Ltd. est un fabricant professionnel ' +
      'd\'éclairage automobile LED basé à Dongguan, en Chine.',
    'about.intro.p2':
      'Depuis 2015, nous sommes spécialisés dans la recherche, le développement et la ' +
      'production de phares LED de haute qualité pour les marchés mondiaux.',
    'about.intro.p3':
      'Nos produits sont certifiés CE, RoHS et FCC, et sont exportés dans plus de 80 pays ' +
      'à travers l\'Europe, l\'Amérique du Nord, l\'Océanie et le Moyen-Orient.',

    'about.yearsExperience': 'Années d\'expérience',

    'about.stats.established': 'Établi en 2015',
    'about.stats.factory': 'Usine de 10 000 m²',
    'about.stats.employees': 'Plus de 200 Employés',
    'about.stats.lines': '8 Lignes de Production',
    'about.stats.capacity': 'Capacité de 2M+ Paires/An',
    'about.stats.countries': 'Export dans 80+ Pays',

    'about.factory.subtitle': 'Visitez Notre Installation de Production Moderne',
    'about.factory.p1':
      'Notre usine de 10 000 m² est équipée de machines de production de pointe et de ' +
      'lignes d\'assemblage automatisées pour assurer une qualité et une efficacité constantes.',
    'about.factory.p2':
      'Nous maintenons des normes de contrôle de qualité strictes tout au long du processus ' +
      'de fabrication, de l\'inspection des matières premières au contrôle qualité final.',

    'about.qc.title': 'R&D et Contrôle Qualité',
    'about.qc.subtitle': 'Engagement envers l\'Excellence des Produits',
    'about.qc.step1.title': 'Inspection des Matières Premières',
    'about.qc.step1.desc': 'Chaque composant est testé avant d\'entrer en production',
    'about.qc.step2.title': 'Contrôle Qualité Production SMT',
    'about.qc.step2.desc': 'Inspection à chaque étape du processus d\'assemblage',
    'about.qc.step3.title': 'Test de Vieillissement et de Performance',
    'about.qc.step3.desc': 'Tests de 24 heures dans des conditions extrêmes',
    'about.qc.step4.title': 'Contrôle Qualité Final',
    'about.qc.step4.desc': 'Inspection à 100% avant expédition',

    'about.oem.badge': 'Service OEM / ODM',
    'about.oem.subtitle': 'Solutions Personnalisées pour Votre Marque',
    'about.oem.service1': 'Analyse des Besoins',
    'about.oem.service2': 'Conception & Échantillon',
    'about.oem.service3': 'Production de Masse',
    'about.oem.service4': 'Livraison & Support',

    'about.meta.title': 'À Propos - XSY LED | Fabricant de Phares LED',
    'about.meta.description':
      'Apprenez-en plus sur XSY LED - un fabricant professionnel de phares LED depuis 2015. ' +
      'Usine de 10 000 m², 200+ employés, export dans 80+ pays. Services OEM/ODM disponibles.',

    'contact.title': 'Nous Contacter',
    'contact.subtitle':
      'Vous avez des questions ou voulez un devis ? Nous répondons sous 24 heures.',
    'contact.breadcrumb': 'Nous Contacter',
    'contact.formTitle': 'Envoyer une Demande',
    'contact.infoTitle': 'Informations de Contact',
    'contact.addressLabel': 'Adresse',
    'contact.addressValue':
      'Route Industrielle No.88, Chang\'an, Dongguan, Guangdong, Chine',
    'contact.emailLabel': 'E-mail',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': 'Téléphone',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': 'Heures d\'ouverture',
    'contact.hoursValue': 'Lun - Sam : 9:00 - 18:00 (GMT+8)',
    'contact.mapPlaceholder': 'Carte de Localisation de l\'Usine',

    'faq.title': 'Questions Fréquentes',
    'faq.subtitle':
      'Trouvez des réponses aux questions courantes sur nos produits et services',
    'faq.q1.q': 'Quelle est votre quantité minimum de commande (MOQ) ?',
    'faq.q1.a':
      'Pour les produits en stock, notre MOQ est de 10 paires par modèle. ' +
      'Pour les commandes personnalisées OEM/ODM, le MOQ commence à 500 ' +
      'paires par modèle. Commandes échantillons sans MOQ.',
    'faq.q2.q': 'Proposez-vous des échantillons de test ?',
    'faq.q2.a':
      'Oui, nous proposons des échantillons de test. Les frais dépendant ' +
      'du modèle, expédiés généralement sous 3-5 jours ouvrés. Remboursables ' +
      'sur commande en gros.',
    'faq.q3.q': 'Quel est le délai de livraison ?',
    'faq.q3.a':
      'Échantillons : 3-7 jours ouvrés. Stock : 7-15 jours ouvrés. ' +
      'OEM/ODM : 25-35 jours ouvrés selon la quantité.',
    'faq.q4.q': 'Fournissez-vous des services OEM/ODM ?',
    'faq.q4.a':
      'Oui, nous offrons des services OEM et ODM complets incluant impression ' +
      'logo personnalisée, emballage personnalisé, marque privée et conception produit sur mesure.',
    'faq.q5.q': 'Quelles certifications ont vos produits ?',
    'faq.q5.a':
      'Tous nos phares LED sont certifiés CE, RoHS et FCC. Certains modèles ' +
      'ont également les certifications E-mark et DOT.',
    'faq.q6.q': 'Quelle est la période de garantie ?',
    'faq.q6.a':
      'Nous offrons une garantie de 2 ans pour tous les phares LED dans des ' +
      'conditions d\'utilisation normales. Les produits défectueux sont remplacés ou remboursés.',
    'faq.q7.q': 'Quels modes de paiement acceptez-vous ?',
    'faq.q7.a':
      'Nous acceptons T/T (30% acompte, 70% avant expédition), PayPal, ' +
      'Western Union, Trade Assurance et L/C pour les grosses commandes.',
    'faq.q8.q': 'Quels modes de livraison proposez-vous ?',
    'faq.q8.a':
      'Nous proposons plusieurs options : Express (DHL, FedEx, UPS) pour ' +
      'échantillons et petites commandes, fret aérien pour commandes moyennes, ' +
      'et fret maritime pour les envois en gros.',
    'faq.q9.q': 'Comment passer commande ?',
    'faq.q9.a':
      'Envoyez-nous simplement une demande via notre site web ou par e-mail ' +
      'avec le modèle et la quantité. Notre équipe commerciale répond sous 24 heures.',
    'faq.q10.q': 'Quel est votre service après-vente ?',
    'faq.q10.a':
      'Nous fournissons un support après-vente complet incluant consultation ' +
      'technique, réclamations sous garantie, pièces de rechange et matériel marketing.',
    'faq.cta.title': 'Vous avez encore des questions ?',
    'faq.cta.desc':
      'Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons sous 24 heures.',
    'faq.cta.button': 'Nous contacter',

    'inquiry.form.name': 'Nom',
    'inquiry.form.company': 'Entreprise',
    'inquiry.form.email': 'E-mail',
    'inquiry.form.phone': 'Téléphone',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': 'Pays',
    'inquiry.form.product': 'Produit',
    'inquiry.form.productPlaceholder': 'Sélectionner un produit',
    'inquiry.form.productAll': 'Tous les Produits / Pas Sûr',
    'inquiry.form.quantity': 'Quantité',
    'inquiry.form.message': 'Message',
    'inquiry.form.messagePlaceholder': 'Parlez-nous de vos besoins...',
    'inquiry.form.submit': 'Envoyer la Demande',
    'inquiry.form.submitting': 'Envoi en cours...',
    'inquiry.form.success':
      'Merci ! Votre demande a été envoyée. Nous répondrons sous 24 heures.',
    'inquiry.form.error':
      'Échec de l\'envoi. Veuillez réessayer ou nous envoyer un e-mail.',
    'inquiry.form.nameRequired': 'Le nom est requis',
    'inquiry.form.emailRequired': 'L\'e-mail est requis',
    'inquiry.form.emailInvalid': 'Veuillez entrer une adresse e-mail valide',

    'footer.about': 'À Propos de XSY',
    'footer.aboutText':
      'Fabricant professionnel d\'éclairage automobile LED avec plus ' +
      'de 8 ans d\'expérience à l\'export. Certifié CE, RoHS, FCC.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.contactUs': 'Nous Contacter',
    'footer.followUs': 'Nous Suivre',
    'footer.copyright': '© {year} XSY LED. Tous droits réservés.',
    'footer.privacy': 'Politique de Confidentialité',
    'footer.terms': 'Conditions Générales',
  },

  // ===== Japanese =====
  ja: {
    'nav.home': 'ホーム',
    'nav.products': '製品',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',
    'nav.faq': 'よくある質問',

    'common.getQuote': '見積もり依頼',
    'common.inquireNow': '今すぐ問い合わせ',
    'common.viewProducts': '製品を見る',
    'common.learnMore': '詳しく見る',
    'common.sendMessage': 'メッセージ送信',
    'common.loading': '読み込み中...',
    'common.submit': '送信',
    'common.all': 'すべて',
    'common.breadcrumbHome': 'ホーム',

    'brand.name': 'XSY LED',
    'brand.tagline': 'プレミアムLEDヘッドライトメーカー',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': '世界市場向けプレミアムLEDヘッドライト',
    'home.hero.subtitle':
      'OEM/ODM対応の工場直販LED自動車照明。CE、RoHS、FCC認証取得。80カ国以上に輸出。',
    'home.hero.ctaPrimary': '製品を見る',
    'home.hero.ctaSecondary': '見積もり依頼',

    'home.featured.title': 'ベストセラー製品',
    'home.featured.subtitle':
      '耐久性と明るさを追求した高性能LEDヘッドライト',

    'home.advantages.title': 'XSYを選ぶ理由',
    'home.advantages.subtitle':
      '世界中のバイヤーから信頼される4つのコア強み',
    'home.advantages.quality.title': '高品質製品',
    'home.advantages.quality.desc':
      '厳格なQCプロセス、100%エージングテスト、CE/RoHS/FCC認証取得',
    'home.advantages.price.title': '競争力のある価格',
    'home.advantages.price.desc':
      '工場直販価格、中間マージンなし、小ロット注文も柔軟に対応',
    'home.advantages.delivery.title': '迅速な配送',
    'home.advantages.delivery.desc': 'サンプル7-15日、量産20-30日',
    'home.advantages.oem.title': 'OEM/ODMサービス',
    'home.advantages.oem.desc':
      'カスタムパッケージ、ロゴ印刷、プライベートラベル、完全デザインサポート',

    'home.sellingPoints.title': 'XSY LEDヘッドライトの特長',
    'home.sellingPoints.subtitle':
      '先進技術と厳格な試験がもたらす卓越した性能',
    'home.sellingPoints.p1.title': 'ハロゲン比300%の明るさ',
    'home.sellingPoints.p1.desc':
      '高出力CSPチップ搭載でペア最大20000ルーメン。' +
      '6500Kクールホワイトで夜間視認性を最大化。',
    'home.sellingPoints.p2.title': '50,000時間の寿命',
    'home.sellingPoints.p2.desc':
      '航空グレードアルミボディ + ターボ冷却ファン + 銅製ヒートパイプ' +
      'で安定した性能と長寿命を実現。',
    'home.sellingPoints.p3.title': 'プラグ&プレイ設置',
    'home.sellingPoints.p3.desc':
      '1:1オリジナル設計、無極性、CANbus対応。' +
      '改造不要で10分で取り付け可能。',
    'home.sellingPoints.p4.title': 'IP67防水',
    'home.sellingPoints.p4.desc':
      '完全密封設計で雨、ほこり、極端な温度にも耐えます。' +
      'あらゆる気象条件下で性能を発揮。',

    'home.certifications.title': '認証と規格',
    'home.certifications.subtitle':
      '当社製品は国際的な品質・安全基準を満たしています',

    'home.testimonials.title': 'お客様の声',
    'home.testimonials.subtitle':
      '世界中のディストリビューターと小売業者から信頼されています',
    'home.testimonials.t1.name': 'マイケル・ロドリゲス',
    'home.testimonials.t1.role': 'CEO, AutoParts USA',
    'home.testimonials.t1.text':
      'XSYは3年間のLEDヘッドライトサプライヤーです。製品品質は常に優れており、' +
      'OEMサービスも最高水準です。',
    'home.testimonials.t2.name': 'ハンス・ウェーバー',
    'home.testimonials.t2.role': '購買マネージャー, DE Lights GmbH',
    'home.testimonials.t2.text':
      '配送も速く、コミュニケーションも良好で、製品自体が売れていきます。' +
      '明るさと品質にお客様も大満足です。',
    'home.testimonials.t3.name': '田中 裕樹',
    'home.testimonials.t3.role': '代表取締役, JP Auto Trading',
    'home.testimonials.t3.text':
      '開発チームが独自の製品ライン開発をサポートしてくれました。' +
      'サンプルから量産までプロフェッショナルです。強くお勧めします。',

    'home.cta.title': 'XSYとのパートナーシップをご検討中ですか？',
    'home.cta.subtitle':
      '24時間以内に競争力のある見積もりをご提供します。サンプル注文も歓迎です。',
    'home.cta.button': '今すぐ見積もり依頼',

    'home.products.badge': '当社製品',
    'home.products.title': '最も人気のLEDヘッドライト',
    'home.products.subtitle':
      '高性能LEDヘッドライトの最も人気のあるシリーズをご覧ください',
    'home.products.viewAll': 'すべての製品を見る',

    'home.meta.title': 'XSY LED - プロフェッショナルLEDヘッドライトメーカー',
    'home.meta.description':
      'XSY LEDは中国・東莞に拠点を置くLEDヘッドライトの専門メーカーです。' +
      'H4 H7 H11 9005 9006など高品質LEDヘッドライト、OEM/ODMサービス、迅速な納期。',

    'products.title': 'LEDヘッドライト製品',
    'products.subtitle': 'あらゆるソケットタイプに対応するLEDヘッドライトの全ラインナップ',
    'products.filterBySocket': 'ソケットタイプで絞り込む',
    'products.showing': '{count}件の製品を表示中',
    'products.noResults': '製品が見つかりません',
    'products.breadcrumb': '製品',

    'product.detail.breadcrumb': '製品詳細',
    'product.specifications': '仕様',
    'product.description': '製品説明',
    'product.features': '主な特長',
    'product.shippingTitle': '梱包と配送',
    'product.relatedProducts': '関連製品',
    'product.inquireSidebar.title': 'クイック問い合わせ',
    'product.inquireSidebar.desc':
      'ご要件を入力いただくと、24時間以内にご返信いたします。',
    'product.spec.model': 'モデル',
    'product.spec.socketType': 'ソケットタイプ',
    'product.spec.power': '消費電力',
    'product.spec.powerStartup': '始動消費電力',
    'product.spec.lumen': 'ルーメン',
    'product.spec.lumenStartup': '始動ルーメン',
    'product.spec.colorTemp': '色温度',
    'product.spec.voltage': '電圧',
    'product.spec.ipRate': '防水等級',
    'product.spec.lifespan': '寿命',
    'product.spec.material': '素材',
    'product.spec.moq': '最小ロット',
    'product.spec.packaging': '梱包',
    'product.spec.deliveryTime': '納期',
    'product.spec.warranty': '保証',
    'product.spec.priceRange': '価格帯',
    'product.spec.features': '特長',
    'product.h4DualNote': 'H4デュアルビームバルブにはハイビームとロービームのフィラメントが含まれており、ビーム間でパラメータが若干異なる場合があります。',

    'about.title': 'XSYについて',
    'about.subtitle': '2015年以来の信頼できるLEDヘッドライトメーカー',
    'about.introTitle': '私たちについて',
    'about.introText':
      '東莞市星盛源智能科技有限公司は、中国東莞に拠点を置くLED自動車照明の' +
      '専門メーカーです。LEDヘッドライト、フォグランプ、その他車載LED製品の' +
      '研究開発・生産・販売を専門としています。8年以上の業界経験を活かし、' +
      '80カ国以上の国と地域のお客様にサービスを提供しています。',
    'about.facts.title': '企業強みの概要',
    'about.facts.est': '2015年設立',
    'about.facts.estDesc': '年以上の業界経験',
    'about.facts.factory': '10,000㎡ 工場',
    'about.facts.factoryDesc': '最新鋭の生産施設',
    'about.facts.employees': '200名以上の従業員',
    'about.facts.employeesDesc': '熟練したスタッフ',
    'about.facts.lines': '8 生産ライン',
    'about.facts.linesDesc': '高い生産能力',
    'about.facts.capacity': '年産 200万ペア以上',
    'about.facts.capacityDesc': '年間生産能力',
    'about.facts.countries': '80カ国以上に輸出',
    'about.facts.countriesDesc': 'グローバルな市場展開',

    'about.factory.title': '先進的な製造施設',
    'about.factory.desc':
      '1万平方メートルの工場には、自動化されたSMTライン、CNC加工センター、' +
      '全自動組立ラインが完備されています。厳格な5S管理とISO9001品質管理システムを' +
      '徹底し、すべての製品が最高水準を満たすよう努めています。',

    'about.qa.title': '研究開発と品質管理',
    'about.qa.desc':
      '20人規模の研究開発チームが、光学設計、熱管理、ドライバー電子回路の分野で' +
      '継続的に革新を推進しています。すべての製品は、原材料検査、SMT検査、' +
      'エージング試験、防水試験、振動試験、最終梱包検査を含む' +
      '徹底したQCプロセスを経て出荷されます。',

    'about.oem.title': 'OEM / ODM 対応力',
    'about.oem.desc':
      'お客様のブランド構築を支援する総合的なOEM・ODMサービスを提供しています。' +
      '製品設計・金型製作からパッケージ・ラベリングまで、' +
      '市場ニーズに合わせてあらゆる詳細をカスタマイズ可能です。',
    'about.oem.step1': '1. 要件分析',
    'about.oem.step1Desc': '製品ニーズとターゲット市場の把握',
    'about.oem.step2': '2. 設計・試作',
    'about.oem.step2Desc': 'プロトタイプ開発とサンプル確認',
    'about.oem.step3': '3. 量産',
    'about.oem.step3Desc': '厳格な品質管理のもとでの本生産',
    'about.oem.step4': '4. 納品・サポート',
    'about.oem.step4Desc': '納期厳守とアフターサポート',

    'about.cta.title': 'OEM/ODMパートナーシップにご興味がありますか？',
    'about.cta.desc': 'プロジェクトについてぜひご相談ください',
    'about.cta.button': 'お問い合わせ',
    'about.cta.subtitle':
      'プロジェクトについてご相談いただき、競争力のある見積もりをご提供します。',

    'about.badge': '会社概要',
    'about.intro.title': '私たちについて',
    'about.intro.p1':
      '東莞星盛源インテリジェントテクノロジー株式会社は、中国・東莞に拠点を置く' +
      'LED車載照明の専門メーカーです。',
    'about.intro.p2':
      '2015年の設立以来、世界市場向けに高品質なLEDヘッドライトの研究開発と' +
      '生産に専念してきました。',
    'about.intro.p3':
      '当社製品はCE、RoHS、FCC認証を取得しており、ヨーロッパ、北米、オセアニア、' +
      '中東など80カ国以上に輸出されています。',

    'about.yearsExperience': '年の経験',

    'about.stats.established': '2015年設立',
    'about.stats.factory': '10,000㎡の工場',
    'about.stats.employees': '200名以上の従業員',
    'about.stats.lines': '8つの生産ライン',
    'about.stats.capacity': '年間200万ペア以上の生産能力',
    'about.stats.countries': '80カ国以上に輸出',

    'about.factory.subtitle': '最新の製造施設をご見学ください',
    'about.factory.p1':
      '10,000㎡の工場には、最先端の生産機械と自動組立ラインが完備されており、' +
      '一貫した品質と効率を確保しています。',
    'about.factory.p2':
      '原材料検査から最終品質管理まで、製造プロセス全体を通じて' +
      '厳格な品質管理基準を維持しています。',

    'about.qc.title': '研究開発と品質管理',
    'about.qc.subtitle': '製品の卓越性へのコミットメント',
    'about.qc.step1.title': '原材料検査',
    'about.qc.step1.desc': 'すべての部品は生産前にテストされます',
    'about.qc.step2.title': 'SMT生産品質管理',
    'about.qc.step2.desc': '組立プロセスの各段階で検査を実施',
    'about.qc.step3.title': 'エージング・性能テスト',
    'about.qc.step3.desc': '過酷な条件下で24時間の耐久テスト',
    'about.qc.step4.title': '最終品質検査',
    'about.qc.step4.desc': '出荷前に100%全数検査',

    'about.oem.badge': 'OEM / ODMサービス',
    'about.oem.subtitle': 'ブランド向けカスタマイズソリューション',
    'about.oem.service1': '要件分析',
    'about.oem.service2': '設計・試作',
    'about.oem.service3': '量産',
    'about.oem.service4': '納品・サポート',

    'about.meta.title': '会社概要 - XSY LED | LEDヘッドライトメーカー',
    'about.meta.description':
      '2015年以来のプロフェッショナルLEDヘッドライトメーカー、XSY LEDについてご紹介します。' +
      '10,000㎡工場、200名以上の従業員、80カ国以上への輸出実績。OEM/ODM対応可能。',

    'contact.title': 'お問い合わせ',
    'contact.subtitle':
      'ご質問やお見積もりのご依頼は、24時間以内にご返答いたします。',
    'contact.breadcrumb': 'お問い合わせ',
    'contact.formTitle': 'お問い合わせフォーム',
    'contact.infoTitle': '連絡先情報',
    'contact.addressLabel': '住所',
    'contact.addressValue':
      '中国 広東省 東莞市 長安鎮 工業路88番地',
    'contact.emailLabel': 'メール',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': '電話',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': '営業時間',
    'contact.hoursValue': '月〜土 9:00 - 18:00 (GMT+8)',
    'contact.mapPlaceholder': '工場所在地マップ',

    'faq.title': 'よくある質問',
    'faq.subtitle': '製品とサービスに関するよくある質問への回答',
    'faq.q1.q': '最小ロット（MOQ）はどれくらいですか？',
    'faq.q1.a':
      '在庫製品の場合、モデルごとに10ペアからとなります。' +
      'OEM/ODMカスタムオーダーの場合は、モデルごとに500ペアから承ります。' +
      'サンプル注文にMOQはございません。',
    'faq.q2.q': 'サンプルテストは可能ですか？',
    'faq.q2.a':
      'はい、サンプルテストを提供しています。サンプル料金はモデルにより異なり、' +
      '通常3〜5営業日で発送いたします。バルクオーダー時にサンプル料金は返金可能です。',
    'faq.q3.q': '納期はどれくらいですか？',
    'faq.q3.a':
      'サンプル注文：3〜7営業日。在庫製品：7〜15営業日。' +
      'OEM/ODM注文：数量とカスタマイズ内容により25〜35営業日。',
    'faq.q4.q': 'OEM/ODMサービスは提供していますか？',
    'faq.q4.a':
      'はい、カスタムロゴ印刷、カスタムパッケージ、プライベートラベル、' +
      '完全カスタム設計など、総合的なOEM・ODMサービスを提供しています。',
    'faq.q5.q': '製品の認証について教えてください',
    'faq.q5.a':
      'すべてのLEDヘッドライトはCE、RoHS、FCC認証を取得しています。' +
      '一部のモデルはE-markおよびDOT認証も取得しています。',
    'faq.q6.q': '保証期間はどれくらいですか？',
    'faq.q6.a':
      '通常の使用条件下で、すべてのLEDヘッドライト製品に2年保証を提供しています。' +
      '不良品は交換または返金いたします。OEM顧客向けに延長保証オプションもご用意しています。',
    'faq.q7.q': '支払い方法は何がありますか？',
    'faq.q7.a':
      'T/T（前払い30%、出荷前70%）、PayPal、Western Union、' +
      'Trade Assurance、大口注文の場合はL/Cを受け付けています。',
    'faq.q8.q': '配送方法は何がありますか？',
    'faq.q8.a':
      'サンプル・小口：エクスプレス（DHL、FedEx、UPS）、中量：航空便、' +
      '大口：海上輸送。お客様指定のフォワーダーでの発送も可能です。',
    'faq.q9.q': '注文方法を教えてください',
    'faq.q9.a':
      'ウェブサイトまたはメールで、製品モデルと数量を記載の上お問い合わせください。' +
      '営業チームが24時間以内に詳細な見積もりと注文手順をご案内します。',
    'faq.q10.q': 'アフターサービスについて教えてください',
    'faq.q10.a':
      '技術相談、保証請求、交換部品、マーケティング資料など、' +
      '総合的なアフターサポートを提供しています。',
    'faq.cta.title': 'まだ質問がありますか？',
    'faq.cta.desc':
      '私たちのチームがお手伝いします。お問い合わせいただければ、24時間以内にご返信いたします。',
    'faq.cta.button': 'お問い合わせ',

    'inquiry.form.name': 'お名前',
    'inquiry.form.company': '会社名',
    'inquiry.form.email': 'メールアドレス',
    'inquiry.form.phone': '電話番号',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': '国',
    'inquiry.form.product': '製品',
    'inquiry.form.productPlaceholder': '製品を選択してください',
    'inquiry.form.productAll': '全製品 / 不明',
    'inquiry.form.quantity': '数量',
    'inquiry.form.message': 'メッセージ',
    'inquiry.form.messagePlaceholder': 'ご要件をお聞かせください...',
    'inquiry.form.submit': 'お問い合わせ送信',
    'inquiry.form.submitting': '送信中...',
    'inquiry.form.success':
      'ありがとうございます。お問い合わせを送信しました。24時間以内にご返信いたします。',
    'inquiry.form.error':
      '送信に失敗しました。再度お試しいただくか、直接メールでお問い合わせください。',
    'inquiry.form.nameRequired': 'お名前を入力してください',
    'inquiry.form.emailRequired': 'メールアドレスを入力してください',
    'inquiry.form.emailInvalid': '有効なメールアドレスを入力してください',

    'footer.about': 'XSYについて',
    'footer.aboutText':
      '8年以上の輸出経験を持つプロフェッショナルなLED自動車照明メーカー。' +
      'CE、RoHS、FCC認証取得。',
    'footer.quickLinks': 'クイックリンク',
    'footer.contactUs': 'お問い合わせ',
    'footer.followUs': 'フォローする',
    'footer.copyright': '© {year} XSY LED. All rights reserved.',
    'footer.privacy': 'プライバシーポリシー',
    'footer.terms': '利用規約',
  },

  // ===== Russian =====
  ru: {
    'nav.home': 'Главная',
    'nav.products': 'Продукты',
    'nav.about': 'О нас',
    'nav.contact': 'Контакты',
    'nav.faq': 'FAQ',

    'common.getQuote': 'Получить报价',
    'common.inquireNow': 'Запросить сейчас',
    'common.viewProducts': 'Смотреть продукты',
    'common.learnMore': 'Узнать больше',
    'common.sendMessage': 'Отправить сообщение',
    'common.loading': 'Загрузка...',
    'common.submit': 'Отправить',
    'common.all': 'Все',
    'common.breadcrumbHome': 'Главная',

    'brand.name': 'XSY LED',
    'brand.tagline': 'Премиум производитель LED фар',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': 'Премиум LED фары для глобальных рынков',
    'home.hero.subtitle':
      'LED автомобильное освещение напрямую от производителя с возможностью OEM/ODM. ' +
      'Сертификаты CE, RoHS, FCC. Экспорт в 80+ стран.',
    'home.hero.ctaPrimary': 'Смотреть продукты',
    'home.hero.ctaSecondary': 'Получить报价',

    'home.featured.title': 'Наши бестселлеры',
    'home.featured.subtitle':
      'Высокопроизводительные LED фары, разработанные для долговечности и яркости',

    'home.advantages.title': 'Почему выбирают XSY?',
    'home.advantages.subtitle':
      'Четыре ключевых преимущества, делающие нас надёжным партнёром全球ных покупателей',
    'home.advantages.quality.title': 'Высококачественная продукция',
    'home.advantages.quality.desc':
      'Строгий процесс контроля качества, 100% тест на старение, сертификаты CE/RoHS/FCC',
    'home.advantages.price.title': 'Конкурентные цены',
    'home.advantages.price.desc':
      'Цена напрямую от завода, без посредников, гибкий MOQ для мелких заказов',
    'home.advantages.delivery.title': 'Быстрая доставка',
    'home.advantages.delivery.desc': '7-15 дней на образцы, 20-30 дней на массовое производство',
    'home.advantages.oem.title': 'Сервис OEM/ODM',
    'home.advantages.oem.desc':
      'Индивидуальная упаковка, печать логотипа, частная марка и полная поддержка дизайна',

    'home.sellingPoints.title': 'Чем выделяются LED фары XSY',
    'home.sellingPoints.subtitle':
      'Передовые технологии и строгие испытания обеспечивают исключительную производительность',
    'home.sellingPoints.p1.title': 'На 300% ярче галогена',
    'home.sellingPoints.p1.desc':
      'Мощные чипы CSP выдают до 20000 люмен на пару, ' +
      'холодный белый свет 6500K для максимальной видимости ночью.',
    'home.sellingPoints.p2.title': 'Срок службы 50 000 часов',
    'home.sellingPoints.p2.desc':
      'Корпус из авиационного алюминия + турбовентилятор + ' +
      'медные тепловые трубки для стабильной работы и долгого срока службы.',
    'home.sellingPoints.p3.title': 'Установка Plug & Play',
    'home.sellingPoints.p3.desc':
      'Дизайн 1:1 как оригинал, без полярности, поддержка CANbus, ' +
      'установка за 10 минут без доработок.',
    'home.sellingPoints.p4.title': 'Влагозащита IP67',
    'home.sellingPoints.p4.desc':
      'Полностью герметичная конструкция выдерживает дождь, пыль и ' +
      'экстремальные температуры. Работает в любую погоду.',

    'home.certifications.title': 'Сертификаты и стандарты',
    'home.certifications.subtitle':
      'Наша продукция соответствует международным стандартам качества и безопасности',

    'home.testimonials.title': 'Отзывы наших клиентов',
    'home.testimonials.subtitle':
      'Нам доверяют дистрибьюторы и розничные продавцы по всему миру',
    'home.testimonials.t1.name': 'Михаил Родригес',
    'home.testimonials.t1.role': 'Генеральный директор, AutoParts USA',
    'home.testimonials.t1.text':
      'XSY — наш поставщик LED фар уже 3 года. Качество продукции стабильно ' +
      'отличное, сервис OEM на высшем уровне.',
    'home.testimonials.t2.name': 'Ханс Вебер',
    'home.testimonials.t2.role': 'Менеджер по закупкам, DE Lights GmbH',
    'home.testimonials.t2.text':
      'Быстрая доставка, отличная коммуникация, продукция продаётся сама. ' +
      'Нашим клиентам нравятся яркость и качество сборки.',
    'home.testimonials.t3.name': 'Юки Танака',
    'home.testimonials.t3.role': 'Директор, JP Auto Trading',
    'home.testimonials.t3.text':
      'Команда R&D помогла нам разработать уникальную линейку продуктов. ' +
      'Профессионалы от образца до массового производства. Рекомендую.',

    'home.cta.title': 'Готовы к партнёрству с XSY?',
    'home.cta.subtitle':
      'Получите конкурентоспособное предложение за 24 часа. Заказы на образцы приветствуются.',
    'home.cta.button': 'Запросить предложение сейчас',

    'home.products.badge': 'Наша продукция',
    'home.products.title': 'Самые популярные LED фары',
    'home.products.subtitle':
      'Ознакомьтесь с нашей самой популярной линейкой высокопроизводительных LED фар',
    'home.products.viewAll': 'Смотреть все товары',

    'home.meta.title': 'XSY LED - Профессиональный производитель LED фар',
    'home.meta.description':
      'XSY LED - профессиональный производитель автомобильных LED фар из Дунгуаня, Китай. ' +
      'Высококачественные фары H4 H7 H11 9005 9006, услуги OEM/ODM, быстрая доставка.',

    'products.title': 'LED фары',
    'products.subtitle':
      'Изучите весь ассортимент LED ламп фар для любого типа цоколя',
    'products.filterBySocket': 'Фильтр по типу цоколя',
    'products.showing': 'Показано {count} товаров',
    'products.noResults': 'Товары не найдены',
    'products.breadcrumb': 'Продукты',

    'product.detail.breadcrumb': 'Описание товара',
    'product.specifications': 'Характеристики',
    'product.description': 'Описание товара',
    'product.features': 'Основные особенности',
    'product.shippingTitle': 'Упаковка и доставка',
    'product.relatedProducts': 'Сопутствующие товары',
    'product.inquireSidebar.title': 'Быстрый запрос',
    'product.inquireSidebar.desc':
      'Заполните ваши требования, и мы ответим в течение 24 часов.',
    'product.spec.model': 'Модель',
    'product.spec.socketType': 'Тип цоколя',
    'product.spec.power': 'Мощность',
    'product.spec.powerStartup': 'Пусковая Мощность',
    'product.spec.lumen': 'Люмены',
    'product.spec.lumenStartup': 'Пусковой Люмен',
    'product.spec.colorTemp': 'Цветовая температура',
    'product.spec.voltage': 'Напряжение',
    'product.spec.ipRate': 'Степень защиты IP',
    'product.spec.lifespan': 'Срок службы',
    'product.spec.material': 'Материал',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'Упаковка',
    'product.spec.deliveryTime': 'Срок доставки',
    'product.spec.warranty': 'Гарантия',
    'product.spec.priceRange': 'Ценовой диапазон',
    'product.spec.features': 'Особенности',
    'product.h4DualNote': 'Лампы H4 с двойным лучом содержат нити дальнего и ближнего света; параметры могут незначительно отличаться между лучами.',

    'about.title': 'О компании XSY',
    'about.subtitle': 'Ваш надёжный производитель LED фар с 2015 года',
    'about.introTitle': 'О нас',
    'about.introText':
      'Dongguan XSY Intelligent Technology Co., Ltd. — профессиональный ' +
      'производитель LED автомобильного освещения, расположенный в Дунгуане, Китай. ' +
      'Мы специализируемся на исследованиях, разработке, производстве и продаже ' +
      'LED фар, противотуманных фар и другой автомобильной LED продукции. ' +
      'Более 8 лет опыта в отрасли, обслуживаем клиентов в более чем 80 странах.',
    'about.facts.title': 'Сильные стороны компании',
    'about.facts.est': 'Основан в 2015',
    'about.facts.estDesc': 'лет опыта в отрасли',
    'about.facts.factory': 'Завод 10 000㎡',
    'about.facts.factoryDesc': 'Современное производственное предприятие',
    'about.facts.employees': '200+ сотрудников',
    'about.facts.employeesDesc': 'Квалифицированный персонал',
    'about.facts.lines': '8 производственных линий',
    'about.facts.linesDesc': 'Высокая производительность',
    'about.facts.capacity': '2M+ пар/год',
    'about.facts.capacityDesc': 'Годовая производственная мощность',
    'about.facts.countries': 'Экспорт в 80+ стран',
    'about.facts.countriesDesc': 'Глобальное присутствие',

    'about.factory.title': 'Современное производственное предприятие',
    'about.factory.desc':
      'Наш завод площадью 10 000 квадратных метров оснащён автоматизированными ' +
      'SMT-линиями, станками с ЧПУ и полностью автоматизированными сборочными линиями. ' +
      'Мы следуем строгому менеджменту 5S и системе менеджмента качества ISO9001.',

    'about.qa.title': 'R&D и контроль качества',
    'about.qa.desc':
      'Наша команда R&D из 20 человек постоянно внедряет инновации в оптическом дизайне, ' +
      'тепловом управлении и электронике драйверов. Каждый продукт проходит ' +
      'полный цикл контроля качества.',

    'about.oem.title': 'Возможности OEM / ODM',
    'about.oem.desc':
      'Мы предлагаем комплексные услуги OEM и ODM для помощи в создании собственного бренда. ' +
      'От дизайна продукции и изготовления оснастки до упаковки и маркировки.',
    'about.oem.step1': '1. Анализ требований',
    'about.oem.step1Desc': 'Понимание ваших потребностей и целевого рынка',
    'about.oem.step2': '2. Дизайн и образец',
    'about.oem.step2Desc': 'Разработка прототипа и подтверждение образца',
    'about.oem.step3': '3. Массовое производство',
    'about.oem.step3Desc': 'Полное производство со строгим контролем качества',
    'about.oem.step4': '4. Доставка и поддержка',
    'about.oem.step4Desc': 'Своевременная доставка и послепродажная поддержка',

    'about.cta.title': 'Интересует партнёрство OEM/ODM?',
    'about.cta.desc': 'Свяжитесь с нашей командой для обсуждения вашего проекта',
    'about.cta.button': 'Связаться с нами',
    'about.cta.subtitle':
      'Свяжитесь с нашей командой для обсуждения вашего проекта и получения конкурентного предложения.',

    'about.badge': 'О нас',
    'about.intro.title': 'Кто мы такие',
    'about.intro.p1':
      'Dongguan XSY Intelligent Technology Co., Ltd. - профессиональный производитель ' +
      'светодиодного автомобильного освещения, базирующийся в Дунгуане, Китай.',
    'about.intro.p2':
      'С момента основания в 2015 году мы специализируемся на исследованиях, разработке и ' +
      'производстве высококачественных LED фар для мировых рынков.',
    'about.intro.p3':
      'Наша продукция имеет сертификаты CE, RoHS и FCC и экспортируется более чем в 80 стран ' +
      'Европы, Северной Америки, Океании и Ближнего Востока.',

    'about.yearsExperience': 'лет опыта',

    'about.stats.established': 'Основан в 2015 году',
    'about.stats.factory': 'Завод 10 000 м²',
    'about.stats.employees': 'Более 200 сотрудников',
    'about.stats.lines': '8 производственных линий',
    'about.stats.capacity': 'Мощность 2М+ пар/год',
    'about.stats.countries': 'Экспорт в 80+ стран',

    'about.factory.subtitle': 'Посетите наше современное производство',
    'about.factory.p1':
      'Наш завод площадью 10 000 м² оснащён передовым производственным оборудованием и ' +
      'автоматизированными сборочными линиями для стабильного качества и эффективности.',
    'about.factory.p2':
      'Мы поддерживаем строгие стандарты контроля качества на протяжении всего ' +
      'производственного процесса — от проверки сырья до финального контроля.',

    'about.qc.title': 'R&D и контроль качества',
    'about.qc.subtitle': 'Стремление к совершенству продукции',
    'about.qc.step1.title': 'Проверка сырья',
    'about.qc.step1.desc': 'Каждый компонент тестируется перед запуском в производство',
    'about.qc.step2.title': 'QC на SMT производстве',
    'about.qc.step2.desc': 'Контроль на каждом этапе сборочного процесса',
    'about.qc.step3.title': 'Старение и тестирование производительности',
    'about.qc.step3.desc': '24-часовые испытания в экстремальных условиях',
    'about.qc.step4.title': 'Финальная проверка качества',
    'about.qc.step4.desc': '100% осмотр перед отгрузкой',

    'about.oem.badge': 'Услуги OEM / ODM',
    'about.oem.subtitle': 'Индивидуальные решения для вашего бренда',
    'about.oem.service1': 'Анализ требований',
    'about.oem.service2': 'Дизайн и образец',
    'about.oem.service3': 'Массовое производство',
    'about.oem.service4': 'Доставка и поддержка',

    'about.meta.title': 'О нас - XSY LED | Производитель LED фар',
    'about.meta.description':
      'Узнайте больше о XSY LED — профессиональном производителе LED фар с 2015 года. ' +
      'Завод 10 000 м², 200+ сотрудников, экспорт в 80+ стран. Услуги OEM/ODM.',

    'contact.title': 'Контакты',
    'contact.subtitle':
      'Есть вопросы или хотите получить报价? Мы ответим в течение 24 часов.',
    'contact.breadcrumb': 'Контакты',
    'contact.formTitle': 'Отправить запрос',
    'contact.infoTitle': 'Контактная информация',
    'contact.addressLabel': 'Адрес',
    'contact.addressValue':
      'Ул. Индустриальная, 88, район Чан\'ань, Дунгуань, Гуандун, Китай',
    'contact.emailLabel': 'Email',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': 'Телефон',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'WhatsApp',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': 'Часы работы',
    'contact.hoursValue': 'Пн - Сб: 9:00 - 18:00 (GMT+8)',
    'contact.mapPlaceholder': 'Карта расположения завода',

    'faq.title': 'Часто задаваемые вопросы',
    'faq.subtitle':
      'Ответы на распространённые вопросы о нашей продукции и услугах',
    'faq.q1.q': 'Какой минимальный объём заказа (MOQ)?',
    'faq.q1.a':
      'Для товарной продукции MOQ составляет 10 пар на модель. Для индивидуальных ' +
      'заказов OEM/ODM MOQ начинается от 500 пар на модель. Заказы на образцы без MOQ.',
    'faq.q2.q': 'Предоставляете ли вы образцы для тестирования?',
    'faq.q2.a':
      'Да, мы предоставляем образцы для тестирования. Стоимость образца зависит от модели, ' +
      'отправка обычно за 3-5 рабочих дней. Стоимость образца возвращается при оптовом заказе.',
    'faq.q3.q': 'Каков срок доставки?',
    'faq.q3.a':
      'Образцы: 3-7 рабочих дней. Товарная продукция: 7-15 рабочих дней. ' +
      'OEM/ODM: 25-35 рабочих дней в зависимости от количества.',
    'faq.q4.q': 'Предоставляете ли вы услуги OEM/ODM?',
    'faq.q4.a':
      'Да, мы предлагаем комплексные услуги OEM и ODM, включая индивидуальную печать логотипа, ' +
      'индивидуальную упаковку, частную марку и полностью индивидуальный дизайн продукта.',
    'faq.q5.q': 'Какие сертификаты есть у вашей продукции?',
    'faq.q5.a':
      'Все наши LED фары имеют сертификаты CE, RoHS и FCC. Отдельные модели также ' +
      'имеют сертификаты E-mark и DOT.',
    'faq.q6.q': 'Каков гарантийный срок?',
    'faq.q6.a':
      'Мы предоставляем 2-летнюю гарантию на все LED фары при нормальных условиях эксплуатации. ' +
      'Дефектная продукция подлежит замене или возврату средств.',
    'faq.q7.q': 'Какие условия оплаты вы принимаете?',
    'faq.q7.a':
      'Мы принимаем T/T (30% предоплата, 70% перед отправкой), PayPal, ' +
      'Western Union, Trade Assurance и L/C для крупных заказов.',
    'faq.q8.q': 'Какие способы доставки вы предлагаете?',
    'faq.q8.a':
      'Мы предлагаем несколько вариантов доставки: Экспресс (DHL, FedEx, UPS) для образцов ' +
      'и мелких заказов, авиаперевозки для средних заказов и морская перевозка для оптовых партий.',
    'faq.q9.q': 'Как сделать заказ?',
    'faq.q9.a':
      'Просто отправьте нам запрос через наш веб-сайт или по электронной почте ' +
      'с указанием модели и количества. Наша команда продаж ответит в течение 24 часов.',
    'faq.q10.q': 'Какой у вас сервис после продажи?',
    'faq.q10.a':
      'Мы предоставляем комплексную послепродажную поддержку, включая технические консультации, ' +
      'гарантийные претензии, запасные части и маркетинговые материалы.',
    'faq.cta.title': 'Остались вопросы?',
    'faq.cta.desc':
      'Наша команда готова помочь. Свяжитесь с нами, и мы ответим в течение 24 часов.',
    'faq.cta.button': 'Связаться с нами',

    'inquiry.form.name': 'Имя',
    'inquiry.form.company': 'Компания',
    'inquiry.form.email': 'Email',
    'inquiry.form.phone': 'Телефон',
    'inquiry.form.whatsapp': 'WhatsApp',
    'inquiry.form.country': 'Страна',
    'inquiry.form.product': 'Продукт',
    'inquiry.form.productPlaceholder': 'Выберите продукт',
    'inquiry.form.productAll': 'Все продукты / Не уверен',
    'inquiry.form.quantity': 'Количество',
    'inquiry.form.message': 'Сообщение',
    'inquiry.form.messagePlaceholder': 'Расскажите о ваших требованиях...',
    'inquiry.form.submit': 'Отправить запрос',
    'inquiry.form.submitting': 'Отправка...',
    'inquiry.form.success':
      'Спасибо! Ваш запрос отправлен. Мы ответим в течение 24 часов.',
    'inquiry.form.error':
      'Ошибка отправки. Пожалуйста, попробуйте снова или напишите нам на email.',
    'inquiry.form.nameRequired': 'Требуется указать имя',
    'inquiry.form.emailRequired': 'Требуется указать email',
    'inquiry.form.emailInvalid': 'Пожалуйста, введите корректный адрес email',

    'footer.about': 'О компании XSY',
    'footer.aboutText':
      'Профессиональный производитель LED автомобильного освещения с опытом ' +
      'экспорта более 8 лет. Сертификаты CE, RoHS, FCC.',
    'footer.quickLinks': 'Быстрые ссылки',
    'footer.contactUs': 'Контакты',
    'footer.followUs': 'Подписаться',
    'footer.copyright': '© {year} XSY LED. Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия обслуживания',
  },

  // ===== Arabic =====
  ar: {
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.faq': 'الأسئلة الشائعة',

    'common.getQuote': 'اطلب عرض سعر',
    'common.inquireNow': 'استفسار الآن',
    'common.viewProducts': 'عرض المنتجات',
    'common.learnMore': 'اعرف المزيد',
    'common.sendMessage': 'إرسال رسالة',
    'common.loading': 'جاري التحميل...',
    'common.submit': 'إرسال',
    'common.all': 'الكل',
    'common.breadcrumbHome': 'الرئيسية',

    'brand.name': 'XSY LED',
    'brand.tagline': 'شركة مصنعة لمصابيح LED فاخرة',
    'brand.fullName': 'Dongguan XSY Intelligent Technology Co., Ltd.',

    'home.hero.title': 'مصابيح LED فاخرة للأسواق العالمية',
    'home.hero.subtitle':
      'إضاءة سيارات LED مباشرة من المصنع مع إمكانية OEM/ODM. ' +
      'معتمدة من CE و RoHS و FCC. نصدّر إلى أكثر من 80 دولة.',
    'home.hero.ctaPrimary': 'عرض المنتجات',
    'home.hero.ctaSecondary': 'اطلب عرض سعر',

    'home.featured.title': 'أفضل منتجاتنا مبيعاً',
    'home.featured.subtitle':
      'مصابيح LED عالية الأداء مصممة للمتانة والسطوع',

    'home.advantages.title': 'لماذا تختار XSY؟',
    'home.advantages.subtitle':
      'أربع مزايا أساسية تجعلنا الشريك الموثوق للمشترين العالميين',
    'home.advantages.quality.title': 'منتجات عالية الجودة',
    'home.advantages.quality.desc':
      'عملية مراقبة جودة صارمة، اختبار شيخوخة 100%، معتمد CE/RoHS/FCC',
    'home.advantages.price.title': 'أسعار تنافسية',
    'home.advantages.price.desc':
      'سعر مباشر من المصنع، بدون وسيط، MOQ مرن للطلبات الصغيرة',
    'home.advantages.delivery.title': 'توصيل سريع',
    'home.advantages.delivery.desc':
      '7-15 أيام للعينات، 20-30 يوماً للإنتاج الضخم',
    'home.advantages.oem.title': 'خدمة OEM/ODM',
    'home.advantages.oem.desc':
      'عبوات مخصصة، طباعة شعار، علامة تجارية خاصة ودعم تصميم كامل',

    'home.sellingPoints.title': 'لماذا تبرز مصابيح XSY LED',
    'home.sellingPoints.subtitle':
      'تكنولوجيا متقدمة واختبارات صارمة تقدم أداءً استثنائياً',
    'home.sellingPoints.p1.title': 'أسطع بنسبة 300% من الهالوجين',
    'home.sellingPoints.p1.desc':
      'رقائق CSP عالية الطاقة تقدم حتى 20000 لومن لكل زوج، ' +
      'ضوء أبيض بارد 6500 كلفن لرؤية ليلية قصوى.',
    'home.sellingPoints.p2.title': 'عمر افتراضي 50,000 ساعة',
    'home.sellingPoints.p2.desc':
      'جسم من ألومنيوم درجة طيران + مروحة تبريد توربينية + ' +
      'أنابيب حرارية نحاسية لأداء مستقر وعمر طويل.',
    'home.sellingPoints.p3.title': 'تركيب Plug & Play',
    'home.sellingPoints.p3.desc':
      'تصميم أصلي 1:1، بدون قطبية، جاهز لـ CANbus، ' +
      'تركيب في 10 دقائق بدون تعديل.',
    'home.sellingPoints.p4.title': 'مقاومة للماء IP67',
    'home.sellingPoints.p4.desc':
      'تصميم مغلق تماماً يصمد أمام المطر والغبار ودرجات الحرارة القصوى. ' +
      'يعمل في أي حالة جوية.',

    'home.certifications.title': 'الشهادات والمعايير',
    'home.certifications.subtitle':
      'منتجاتنا تستوفي معايير الجودة والسلامة الدولية',

    'home.testimonials.title': 'ماذا يقول عملاؤنا',
    'home.testimonials.subtitle':
      'يثق به الموزعون وتجار التجزئة في جميع أنحاء العالم',
    'home.testimonials.t1.name': 'مايكل رودريغيز',
    'home.testimonials.t1.role': 'الرئيس التنفيذي، AutoParts USA',
    'home.testimonials.t1.text':
      'XSY هو مورد مصابيح LED لدينا منذ 3 سنوات. جودة المنتج ممتازة باستمرار ' +
      'وخدمة OEM من الطراز الأول.',
    'home.testimonials.t2.name': 'هانز ويبر',
    'home.testimonials.t2.role': 'مدير المشتريات، DE Lights GmbH',
    'home.testimonials.t2.text':
      'توصيل سريع، تواصل رائع، ومنتجات تبيع نفسها. عملاؤنا يحبون السطوع وجودة التصنيع.',
    'home.testimonials.t3.name': 'يوكي تاناكا',
    'home.testimonials.t3.role': 'المدير، JP Auto Trading',
    'home.testimonials.t3.text':
      'ساعدنا فريق البحث والتطوير في تخصيص خط إنتاج فريد. ' +
      'محترفون من العينة إلى الإنتاج الضخم. أوصي به بشدة.',

    'home.cta.title': 'مستعد للشراكة مع XSY؟',
    'home.cta.subtitle':
      'احصل على عرض سعر تنافسي في غضون 24 ساعة. طلبات العينات مرحب بها.',
    'home.cta.button': 'اطلب عرض سعر الآن',

    'home.products.badge': 'منتجاتنا',
    'home.products.title': 'أكثر مصابيح LED مبيعاً',
    'home.products.subtitle':
      'اكتشف مجموعتنا الأكثر شهرة من مصابيح LED عالية الأداء',
    'home.products.viewAll': 'عرض جميع المنتجات',

    'home.meta.title': 'XSY LED - شركة مصنعة لمصابيح LED احترافية',
    'home.meta.description':
      'XSY LED شركة مصنعة لمصابيح LED السيارات في دونغقوان، الصين. ' +
      'مصابيح H4 H7 H11 9005 9006 عالية الجودة، خدمات OEM/ODM، تسليم سريع.',

    'products.title': 'منتجات مصابيح LED',
    'products.subtitle':
      'تصفح مجموعتنا الكاملة من مصابيح LED لجميع أنواع القواعد',
    'products.filterBySocket': 'تصفية حسب نوع القاعدة',
    'products.showing': 'عرض {count} منتج',
    'products.noResults': 'لا توجد منتجات',
    'products.breadcrumb': 'المنتجات',

    'product.detail.breadcrumb': 'تفاصيل المنتج',
    'product.specifications': 'المواصفات',
    'product.description': 'وصف المنتج',
    'product.features': 'الميزات الرئيسية',
    'product.shippingTitle': 'التعبئة والتوصيل',
    'product.relatedProducts': 'منتجات ذات صلة',
    'product.inquireSidebar.title': 'استفسار سريع',
    'product.inquireSidebar.desc':
      'املأ متطلباتك وسنرد خلال 24 ساعة.',
    'product.spec.model': 'الموديل',
    'product.spec.socketType': 'نوع القاعدة',
    'product.spec.power': 'القدرة',
    'product.spec.powerStartup': 'قدرة البدء',
    'product.spec.lumen': 'اللومن',
    'product.spec.lumenStartup': 'لومن البدء',
    'product.spec.colorTemp': 'درجة حرارة اللون',
    'product.spec.voltage': 'الجهد',
    'product.spec.ipRate': 'معدل حماية IP',
    'product.spec.lifespan': 'العمر الافتراضي',
    'product.spec.material': 'المادة',
    'product.spec.moq': 'MOQ',
    'product.spec.packaging': 'التعبئة',
    'product.spec.deliveryTime': 'وقت التسليم',
    'product.spec.warranty': 'الضمان',
    'product.spec.priceRange': 'نطاق السعر',
    'product.spec.features': 'الميزات',
    'product.h4DualNote': 'تتضمن لمبات H4 مزدوجة الشععة خيوط إضاءة عالية ومنخفضة؛ قد تختلف المعلمات قليلاً بين الشععتين.',

    'about.title': 'عن XSY',
    'about.subtitle': 'الشركة المصنعة الموثوقة لمصابيح LED منذ 2015',
    'about.introTitle': 'من نحن',
    'about.introText':
      'شركة Dongguan XSY Intelligent Technology المحدودة هي شركة مصنعة ' +
      'محترفة لإضاءة السيارات LED مقرها في دونغقوان، الصين. نحن متخصصون ' +
      'في البحث والتطوير والإنتاج والبيع لمصابيح LED ومصابيح الضباب وغيرها ' +
      'من منتجات LED السيارات. مع أكثر من 8 سنوات من الخبرة، نخدم العملاء ' +
      'في أكثر من 80 دولة.',
    'about.facts.title': 'نظرة على قوة الشركة',
    'about.facts.est': 'تأسست في 2015',
    'about.facts.estDesc': 'سنوات من الخبرة',
    'about.facts.factory': 'مصنع 10,000 متر مربع',
    'about.facts.factoryDesc': 'منشأة إنتاج حديثة',
    'about.facts.employees': 'أكثر من 200 موظف',
    'about.facts.employeesDesc': 'قوة عاملة ماهرة',
    'about.facts.lines': '8 خطوط إنتاج',
    'about.facts.linesDesc': 'إنتاجية عالية',
    'about.facts.capacity': 'أكثر من مليونين زوج / سنة',
    'about.facts.capacityDesc': 'الطاقة الإنتاجية السنوية',
    'about.facts.countries': 'نصدّر لأكثر من 80 دولة',
    'about.facts.countriesDesc': 'حضور عالمي',

    'about.factory.title': 'مصنع تصنيع متقدم',
    'about.factory.desc':
      'يضم مصنعنا الذي تبلغ مساحته 10000 متر مربع خطوط SMT الآلية، ومراكز ' +
      'معالجة CNC، وخطوط تجميع مؤتمتة بالكامل. نتبع إدارة 5S الصارمة ونظام ' +
      'إدارة الجودة ISO9001.',

    'about.qa.title': 'البحث والتطوير ومراقبة الجودة',
    'about.qa.desc':
      'يقوم فريق البحث والتطوير المكون من 20 شخصاً بالابتكار المستمر في التصميم البصري ' +
      'والإدارة الحرارية وإلكترونيات التشغيل. يمر كل منتج بعملية مراقبة جودة شاملة.',

    'about.oem.title': 'قدرات OEM / ODM',
    'about.oem.desc':
      'نقدم خدمات OEM و ODM شاملة لمساعدتك في بناء علامتك التجارية الخاصة. ' +
      'من تصميم المنتجات والأدوات إلى التعبئة والوسم.',
    'about.oem.step1': '١. تحليل المتطلبات',
    'about.oem.step1Desc': 'فهم احتياجات منتجاتك والسوق المستهدف',
    'about.oem.step2': '٢. التصميم والعينة',
    'about.oem.step2Desc': 'تطوير النموذج الأولي وتأكيد العينة',
    'about.oem.step3': '٣. الإنتاج الضخم',
    'about.oem.step3Desc': 'إنتاج كامل مع مراقبة جودة صارمة',
    'about.oem.step4': '٤. التوصيل والدعم',
    'about.oem.step4Desc': 'التسليم في الوقت المحدد ودعم ما بعد البيع',

    'about.cta.title': 'مهتم بالشراكة OEM/ODM؟',
    'about.cta.desc': 'اتصل بفريقنا لمناقشة مشروعك',
    'about.cta.button': 'تحدث مع فريقنا',
    'about.cta.subtitle':
      'اتصل بفريقنا لمناقشة مشروعك والحصول على عرض سعر تنافسي.',

    'about.badge': 'معلومات عنا',
    'about.intro.title': 'من نحن',
    'about.intro.p1':
      'شركة دونغقوان XSY للتكنولوجيا الذكية هي شركة مصنعة احترافية ' +
      'لإضاءة السيارات LED مقرها في دونغقوان، الصين.',
    'about.intro.p2':
      'تخصصنا منذ عام ٢٠١٥ في البحث والتطوير وإنتاج مصابيح LED عالية الجودة ' +
      'للأسواق العالمية.',
    'about.intro.p3':
      'منتجاتنا حاصلة على شهادات CE و RoHS و FCC، وتصدر إلى أكثر من ٨٠ دولة ' +
      'في أوروبا وأمريكا الشمالية وأوقيانوسيا والشرق الأوسط.',

    'about.yearsExperience': 'سنوات من الخبرة',

    'about.stats.established': 'تأسس عام ٢٠١٥',
    'about.stats.factory': 'مصنع مساحته ١٠٠٠٠ متر مربع',
    'about.stats.employees': 'أكثر من ٢٠٠ موظف',
    'about.stats.lines': '٨ خطوط إنتاج',
    'about.stats.capacity': 'قدرة إنتاجية ٢ مليون+ زوج/سنة',
    'about.stats.countries': 'تصدير إلى ٨٠+ دولة',

    'about.factory.subtitle': 'تفقد مصنعنا الحديث',
    'about.factory.p1':
      'مصنعنا بمساحة ١٠٠٠٠ متر مربع مجهز بأحدث آلات الإنتاج وخطوط التجميع الآلية ' +
      'لضمان الجودة والكفاءة المستمرة.',
    'about.factory.p2':
      'نحافظ على معايير صارمة لمراقبة الجودة طوال عملية التصنيع ' +
      'من فحص المواد الأولية وحتى مراقبة الجودة النهائية.',

    'about.qc.title': 'البحوث والتطوير ومراقبة الجودة',
    'about.qc.subtitle': 'الالتزام بتميز المنتجات',
    'about.qc.step1.title': 'فحص المواد الأولية',
    'about.qc.step1.desc': 'يتم اختبار كل مكون قبل دخول الإنتاج',
    'about.qc.step2.title': 'مراقبة جودة إنتاج SMT',
    'about.qc.step2.desc': 'الفحص في كل مرحلة من مراحل التجميع',
    'about.qc.step3.title': 'اختبار التقدم والأداء',
    'about.qc.step3.desc': 'اختبار لمدة ٢٤ ساعة في ظروف قاسية',
    'about.qc.step4.title': 'فحص الجودة النهائي',
    'about.qc.step4.desc': 'فحص ١٠٠٪ قبل الشحن',

    'about.oem.badge': 'خدمات OEM / ODM',
    'about.oem.subtitle': 'حلول مخصصة لعلامتك التجارية',
    'about.oem.service1': 'تحليل المتطلبات',
    'about.oem.service2': 'التصميم والنموذج',
    'about.oem.service3': 'الإنتاج الضخم',
    'about.oem.service4': 'التوصيل والدعم',

    'about.meta.title': 'معلومات عنا - XSY LED | شركة مصنعة لمصابيح LED',
    'about.meta.description':
      'تعرف على المزيد عن XSY LED - شركة مصنعة احترافية لمصابيح LED منذ عام ٢٠١٥. ' +
      'مصنع ١٠٠٠٠ متر مربع، ٢٠٠+ موظف، تصدير إلى ٨٠+ دولة. خدمات OEM/ODM متوفرة.',

    'contact.title': 'اتصل بنا',
    'contact.subtitle':
      'لديك أسئلة أو تريد عرض سعر؟ سنرد خلال 24 ساعة.',
    'contact.breadcrumb': 'اتصل بنا',
    'contact.formTitle': 'أرسل استفسارك',
    'contact.infoTitle': 'معلومات الاتصال',
    'contact.addressLabel': 'العنوان',
    'contact.addressValue':
      'شارع الصناعي رقم 88، منطقة تشانغآن، دونغقوان، قوانغدونغ، الصين',
    'contact.emailLabel': 'البريد الإلكتروني',
    'contact.emailValue': 'sales@xsy-led.com',
    'contact.phoneLabel': 'الهاتف',
    'contact.phoneValue': '+86 769 8888 6666',
    'contact.whatsappLabel': 'واتساب',
    'contact.whatsappValue': '+86 138 8888 6666',
    'contact.hoursLabel': 'ساعات العمل',
    'contact.hoursValue': 'الإثنين - السبت: ٩:٠٠ - ١٨:٠٠ (GMT+8)',
    'contact.mapPlaceholder': 'خريطة موقع المصنع',

    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'إجابات للأسئلة الشائعة حول منتجاتنا وخدماتنا',
    'faq.q1.q': 'ما هو الحد الأدنى للطلب (MOQ)؟',
    'faq.q1.a':
      'بالنسبة للمنتجات المتوفرة في المخزون، الحد الأدنى 10 زوج لكل موديل. ' +
      'بالنسبة لطلبات OEM/ODM المخصصة، يبدأ MOQ من 500 زوج لكل موديل. ' +
      'طلبات العينات بدون MOQ.',
    'faq.q2.q': 'هل تقدمون عينات للاختبار؟',
    'faq.q2.a':
      'نعم، نقدم عينات للاختبار. تكلفة العينة تعتمد على الموديل، ' +
      'وتُرسل العينات عادةً خلال 3-5 أيام عمل. يمكن استرداد تكلفة العينة عند الطلب بالجملة.',
    'faq.q3.q': 'ما هو وقت التسليم؟',
    'faq.q3.a':
      'طلبات العينات: 3-7 أيام عمل. المنتجات المخزنة: 7-15 يوم عمل. ' +
      'طلبات OEM/ODM: 25-35 يوم عمل حسب الكمية.',
    'faq.q4.q': 'هل تقدمون خدمات OEM/ODM؟',
    'faq.q4.a':
      'نعم، نقدم خدمات OEM و ODM شاملة بما في ذلك طباعة شعار مخصصة، ' +
      'تعبئة مخصصة، علامة خاصة، وتصميم منتج مخصص بالكامل.',
    'faq.q5.q': 'ما الشهادات التي تحملها منتجاتكم؟',
    'faq.q5.a':
      'جميع مصابيح LED لدينا معتمدة من CE و RoHS و FCC. موديلات مختارة لديها ' +
      'شهادات E-mark و DOT أيضاً.',
    'faq.q6.q': 'ما مدة فترة الضمان؟',
    'faq.q6.a':
      'نقدم ضماناً لمدة عامين لجميع مصابيح LED في ظروف الاستخدام العادي. ' +
      'يتم استبدال المنتجات المعيبة أو استرداد أموالها.',
    'faq.q7.q': 'ما شروط الدفع التي تقبلونها؟',
    'faq.q7.a':
      'نقبل T/T (30% دفعة مقدمة، 70% قبل الشحن)، PayPal، Western Union، ' +
      'Trade Assurance، و L/C للطلبات الكبيرة.',
    'faq.q8.q': 'ما طرق الشحن المتوفرة؟',
    'faq.q8.a':
      'نقدم خيارات شحن متعددة: إكسبريس (DHL، FedEx، UPS) للعينات والطلبات الصغيرة، ' +
      'شحن جوي للطلبات المتوسطة، وشحن بحري للشحنات بالجملة.',
    'faq.q9.q': 'كيف أقدم طلباً؟',
    'faq.q9.a':
      'ما عليك سوى إرسال استفسار عبر موقعنا الإلكتروني أو بالبريد الإلكتروني ' +
      'مع موديل المنتج والكمية. سيرد فريق المبيعات خلال 24 ساعة.',
    'faq.q10.q': 'ما هي خدمة ما بعد البيع؟',
    'faq.q10.a':
      'نوفر دعم ما بعد البيع الشامل بما في ذلك الاستشارات الفنية، ومطالبات الضمان، ' +
      'وقطع الغيار، والمواد التسويقية.',
    'faq.cta.title': 'لا تزال لديك أسئلة؟',
    'faq.cta.desc':
      'فريقنا هنا للمساعدة. تواصل معنا وسنرد عليك خلال 24 ساعة.',
    'faq.cta.button': 'اتصل بنا',

    'inquiry.form.name': 'الاسم',
    'inquiry.form.company': 'الشركة',
    'inquiry.form.email': 'البريد الإلكتروني',
    'inquiry.form.phone': 'الهاتف',
    'inquiry.form.whatsapp': 'واتساب',
    'inquiry.form.country': 'الدولة',
    'inquiry.form.product': 'المنتج',
    'inquiry.form.productPlaceholder': 'اختر منتجاً',
    'inquiry.form.productAll': 'جميع المنتجات / لست متأكداً',
    'inquiry.form.quantity': 'الكمية',
    'inquiry.form.message': 'الرسالة',
    'inquiry.form.messagePlaceholder': 'أخبرنا عن متطلباتك...',
    'inquiry.form.submit': 'إرسال الاستفسار',
    'inquiry.form.submitting': 'جاري الإرسال...',
    'inquiry.form.success':
      'شكراً لك! تم إرسال استفسارك. سنرد خلال 24 ساعة.',
    'inquiry.form.error':
      'فشل الإرسال. يرجى المحاولة مرة أخرى أو مراسلتنا عبر البريد الإلكتروني.',
    'inquiry.form.nameRequired': 'الاسم مطلوب',
    'inquiry.form.emailRequired': 'البريد الإلكتروني مطلوب',
    'inquiry.form.emailInvalid': 'يرجى إدخال عنوان بريد إلكتروني صالح',

    'footer.about': 'عن XSY',
    'footer.aboutText':
      'شركة مصنعة محترفة لإضاءة السيارات LED مع خبرة تصدير لأكثر من 8 سنوات. ' +
      'معتمدة من CE و RoHS و FCC.',
    'footer.quickLinks': 'روابط سريعة',
    'footer.contactUs': 'اتصل بنا',
    'footer.followUs': 'تابعنا',
    'footer.copyright': '© {year} XSY LED. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
  },
};

export function getTranslation(lang: string, key: string): string {
  const langDict = translations[lang as LanguageCode] ?? translations.en;
  return langDict[key] ?? translations.en[key] ?? key;
}
