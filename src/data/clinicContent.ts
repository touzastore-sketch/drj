export type Language = 'ar' | 'en';

export type ServiceCategoryId =
  | 'all'
  | 'injectables'
  | 'rejuvenation'
  | 'devices'
  | 'dermatology';

export interface ServiceItem {
  id: string;
  number: string;
  category: Exclude<ServiceCategoryId, 'all'>;
  title: string;
  description: string;
}

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  treatment: string;
  visitContext: string;
  quote: string;
}

export interface ClinicCopy {
  brand: string;
  nav: {
    home: string;
    about: string;
    services: string;
    testimonials: string;
    contact: string;
    bookCta: string;
    langToggle: string;
    langAria: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    cta: string;
    scrollHint: string;
    doctorAlt: string;
  };
  about: {
    eyebrow: string;
    specialty: string;
    heading: string;
    lead: string;
    paragraphs: string[];
    highlightsTitle: string;
    highlights: string[];
    portraitAlt: string;
    signature: string;
  };
  services: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    categories: ServiceCategory[];
    directWhatsappHint: string;
    selectForFormHint: string;
    selectedLabel: string;
    items: ServiceItem[];
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    prevLabel: string;
    nextLabel: string;
    items: TestimonialItem[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    formTitle: string;
    modalTitle: string;
    modalSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    patientPhoneLabel: string;
    patientPhonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    dateLabel: string;
    timeLabel: string;
    timeOptions: string[];
    notesLabel: string;
    notesPlaceholder: string;
    nameRequiredError: string;
    phoneRequiredError: string;
    confirmedTitle: string;
    confirmedBody: string;
    reopenWhatsapp: string;
    editBooking: string;
    selectedServicePrefix: string;
    clearSelection: string;
    addressLabel: string;
    addressValue: string;
    openMapsLabel: string;
    mapTitle: string;
    phoneLabel: string;
    phoneValue: string;
    copyPhone: string;
    copiedPhone: string;
    hoursLabel: string;
    hoursValue: string;
    whatsappCta: string;
    instagramLabel: string;
    instagramHandle: string;
    tiktokLabel: string;
    tiktokHandle: string;
    whatsappPrefillBase: string;
    whatsappPrefillService: string;
  };
  footer: {
    copyright: string;
    tagline: string;
  };
}

export const MEDIA_ASSETS = {
  heroVideo:
    '/assets/aistudio/openart-02179485667270500000000000000000000ffffc0a8a270a5f6f2_1794856801265_f4c2d343_99110d91.mp4',
  heroPoster: '/assets/aistudio/image_db5a8163.png',
  servicesVideo:
    '/assets/aistudio/openart-02179485653277500000000000000000000ffffc0a8b42915895c_1794856662875_37ca1541_a7858150.mp4',
};

export const CLINIC_LINKS = {
  whatsappNumber: '966570560580',
  phoneHref: 'tel:+966570560580',
  mapsUrl: 'https://maps.app.goo.gl/ManQ9EPS6usT5jgA9?g_st=ac',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Touch+medical+clinic,+King+Fahd+Rd,+King+Fahd,+Riyadh+12262&t=&z=16&ie=UTF8&iwloc=&output=embed',
  instagramUrl: 'https://www.instagram.com/dr.juhainah/',
  tiktokUrl: 'https://www.tiktok.com/@juhainahjababili',
};

export function buildWhatsAppBookingUrl(params: {
  language: Language;
  serviceTitle?: string;
  patientName?: string;
  patientPhone?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}): string {
  const {
    language,
    serviceTitle,
    patientName,
    patientPhone,
    preferredDate,
    preferredTime,
    notes,
  } = params;
  const cleanName = patientName?.trim();
  const cleanPhone = patientPhone?.trim();
  const cleanDate = preferredDate?.trim();
  const cleanNotes = notes?.trim();

  if (language === 'ar') {
    const lines = ['مرحباً عيادة د. جهينة جبابلي للتجميل والجلدية، أرغب في حجز موعد:'];
    if (serviceTitle) lines.push(`• الخدمة المطلوبة: ${serviceTitle}`);
    if (cleanName) lines.push(`• اسم المراجع/ة: ${cleanName}`);
    if (cleanPhone) lines.push(`• رقم الجوال: ${cleanPhone}`);
    if (cleanDate) lines.push(`• التاريخ المفضل: ${cleanDate}`);
    if (preferredTime) lines.push(`• الفترة المفضلة: ${preferredTime}`);
    if (cleanNotes) lines.push(`• ملاحظات: ${cleanNotes}`);
    return `https://wa.me/${CLINIC_LINKS.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  const lines = ['Hello Dr. Juhainah Jababili Aesthetic & Dermatology Clinic, I would like to book an appointment:'];
  if (serviceTitle) lines.push(`• Service: ${serviceTitle}`);
  if (cleanName) lines.push(`• Patient Name: ${cleanName}`);
  if (cleanPhone) lines.push(`• Mobile Number: ${cleanPhone}`);
  if (cleanDate) lines.push(`• Preferred Date: ${cleanDate}`);
  if (preferredTime) lines.push(`• Preferred Time: ${preferredTime}`);
  if (cleanNotes) lines.push(`• Notes: ${cleanNotes}`);
  return `https://wa.me/${CLINIC_LINKS.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const CLINIC_CONTENT: Record<Language, ClinicCopy> = {
  ar: {
    brand: 'د. جهينة جبابلي',
    nav: {
      home: 'الرئيسية',
      about: 'عن الدكتورة',
      services: 'الخدمات',
      testimonials: 'آراء المراجعات',
      contact: 'الحجز والتواصل',
      bookCta: 'احجزي استشارتك',
      langToggle: 'EN',
      langAria: 'التبديل إلى اللغة الإنجليزية',
    },
    hero: {
      eyebrow: 'عيادة د. جهينة جبابلي للتجميل والجلدية',
      headline: 'عند جهينة… سر التجميل',
      subheadline: 'عناية تجميلية تبدأ بالاستماع لكِ، وتنتهي بنتيجة تشبهكِ.',
      cta: 'احجزي استشارتك',
      scrollHint: 'اكتشفي العيادة',
      doctorAlt: 'د. جهينة جبابلي — طبيبة جلدية وتجميل متخصصة',
    },
    about: {
      eyebrow: 'عن الدكتورة',
      specialty: 'طبيبة جلدية وتجميل متخصصة · Consultant Dermatologist & Aesthetic Specialist',
      heading: 'أكثر من ٢٠ عاماً من الخبرة في طب الجلدية والتجميل',
      lead: 'طبيبة جلدية وتجميل متخصصة تجمع بين أكثر من ٢٠ عاماً من الخبرة الطبية الدقيقة والحس الجمالي الهادئ لصناعة نتائج طبيعية تشبهكِ.',
      paragraphs: [
        'تؤمن د. جهينة جبابلي أن الجمال الحقيقي يبدأ بالاستماع المتأنّي لاحتياجاتكِ وتشخيص بشرتكِ بدقة علمية، لتقديم خطط علاجية آمنة ومصمّمة خصيصاً لكِ دون مبالغة.',
      ],
      highlightsTitle: 'أبرز مجالات الخبرة والتميز',
      highlights: [
        'أكثر من ٢٠ عاماً من الخبرة المهنية في طب الجلدية والتجميل.',
        'خبرة متقدمة في علاجات الليزر والتجميل الطبي.',
        'حقن البوتوكس والفيلر والميزوثيرابي بدقة وتوازن.',
        'تجديد البشرة ومكافحة علامات التقدم في العمر.',
        'خبرة متخصصة في زراعة الشعر وشفط الدهون وحقن الدهون.',
      ],
      portraitAlt: 'صورة د. جهينة جبابلي — طبيبة جلدية وتجميل متخصصة',
      signature: 'د. جهينة جبابلي',
    },
    services: {
      eyebrow: 'خدمات طب التجميل والجلدية',
      heading: 'رعاية شاملة للبشرة والشعر والجمال الطبيعي',
      subtitle: 'اختاري الخدمة للحجز المباشر عبر واتساب، أو حدديها لإرسال تفاصيل موعدكِ في قسم الحجز.',
      categories: [
        { id: 'all', label: 'جميع الخدمات' },
        { id: 'injectables', label: 'الحقن والتجميل' },
        { id: 'rejuvenation', label: 'النضارة والتقشير' },
        { id: 'devices', label: 'الليزر والأجهزة' },
        { id: 'dermatology', label: 'الجلدية والشعر' },
      ],
      directWhatsappHint: 'احجزي عبر واتساب',
      selectForFormHint: 'تحديد للحجز',
      selectedLabel: 'محددة للحجز',
      items: [
        {
          id: 'fillers',
          number: '01',
          category: 'injectables',
          title: 'الفيلر وتنسيق الملامح',
          description: 'تعزيز توازن الشفاه والخدود وخط الفك بلمسة خفيفة تحافظ على تعبيراتكِ الطبيعية.',
        },
        {
          id: 'botox',
          number: '02',
          category: 'injectables',
          title: 'البوتوكس التجميلي والعلاجي',
          description: 'تخفيف خطوط الجبهة وحول العين وشد نفرتيتي، وعلاج فرط التعرق وصرير الأسنان.',
        },
        {
          id: 'biostimulators',
          number: '03',
          category: 'injectables',
          title: 'محفزات الكولاجين الحيوية',
          description: 'حقن سكلبترا وريديس لتنشيط التجدد الذاتي للأنسجة وشد تدريجي طويل الأمد.',
        },
        {
          id: 'threads',
          number: '04',
          category: 'injectables',
          title: 'الخيوط التجميلية لشد الوجه',
          description: 'رفع فوري ومريح للوجنتين وخط الفك والحاجب دون تدخل جراحي.',
        },
        {
          id: 'lipolysis',
          number: '05',
          category: 'injectables',
          title: 'تذويب الدهون الموضعية',
          description: 'نحت منطقة الذقن المزدوج وتحديد أسفل الوجه بحقن طبية آمنة وموجهة.',
        },
        {
          id: 'skin-boosters',
          number: '06',
          category: 'rejuvenation',
          title: 'إبر النضارة والبروفايلو',
          description: 'ترطيب عميق ومرونة فائقة للبشرة والرقبة واليدين بحمض الهيالورونيك النقي.',
        },
        {
          id: 'prp-meso',
          number: '07',
          category: 'rejuvenation',
          title: 'البلازما والميزوثيرابي والإكسوزوم',
          description: 'تغذية خلوية متقدمة لتجديد البشرة وتقليل الهالات واستعادة الإشراقة الحيوية.',
        },
        {
          id: 'hydrafacial',
          number: '08',
          category: 'rejuvenation',
          title: 'تنظيف البشرة الطبي (الهيدرافيشل)',
          description: 'تنظيف عميق للمسام وإزالة الرؤوس السوداء مع سيرومات مهدئة ومرطبة.',
        },
        {
          id: 'peels-microneedling',
          number: '09',
          category: 'rejuvenation',
          title: 'التقشير الطبي والمايكرونيدلينغ',
          description: 'تجديد سطح البشرة وتصغير المسام وتحسين الملمس ببروتوكولات طبية آمنة.',
        },
        {
          id: 'pigmentation',
          number: '10',
          category: 'rejuvenation',
          title: 'علاج التصبغات والكلف وتوحيد اللون',
          description: 'برامج مخصصة لتفتيح التصبغات السطحية والعميقة واستعادة صفاء البشرة.',
        },
        {
          id: 'laser-hair',
          number: '11',
          category: 'devices',
          title: 'إزالة الشعر بالليزر الطبي',
          description: 'تقنيات تبريد متطورة مناسبة لجميع ألوان البشرة لنتائج ناعمة وآمنة.',
        },
        {
          id: 'fractional-laser',
          number: '12',
          category: 'devices',
          title: 'الليزر الفراكشنال وعلاج الندبات',
          description: 'تحفيز تجدد الطبقات العميقة لمعالجة ندبات حب الشباب وآثار الجروح.',
        },
        {
          id: 'hifu-rf',
          number: '13',
          category: 'devices',
          title: 'شد البشرة بالهايفو والراديوفريكونسي',
          description: 'شد غير جراحي للوجه والرقبة وتحسين تماسك الجلد عبر موجات مركزة.',
        },
        {
          id: 'vascular-laser',
          number: '14',
          category: 'devices',
          title: 'علاج الشعيرات الدموية والاحمرار بالليزر',
          description: 'تخفيف الوردية وتوسع الأوعية الدموية السطحية بدقة وبدون فترة نقاهة.',
        },
        {
          id: 'clinical-derm',
          number: '15',
          category: 'dermatology',
          title: 'استشارات الأمراض الجلدية والتشخيص',
          description: 'تقييم طبي شامل للبشرة وعلاج الإكزيما والصدفية والالتهابات الجلدية.',
        },
        {
          id: 'acne-care',
          number: '16',
          category: 'dermatology',
          title: 'علاج حب الشباب وآثاره',
          description: 'خطط طبية متكاملة للسيطرة على الحبوب النشطة ومنع التندب المستقبلي.',
        },
        {
          id: 'mole-check',
          number: '17',
          category: 'dermatology',
          title: 'فحص الشامات وإزالة الزوائد الجلدية',
          description: 'فحص دقيق للشامات وإزالة الثآليل والزوائد الجلدية بوسائل طبية لطيفة.',
        },
        {
          id: 'hair-scalp',
          number: '18',
          category: 'dermatology',
          title: 'علاج تساقط الشعر وفروة الرأس',
          description: 'تشخيص أسباب التساقط وعلاجها بالبلازما والميزوثيرابي والإكسوزوم.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'آراء المراجعات',
      heading: 'تجارب حقيقية تنعكس ثقةً واطمئناناً',
      subtitle: 'كلمات صادقة من مراجعات العيادة حول العناية والاستماع والنتائج الطبيعية.',
      prevLabel: 'السابق',
      nextLabel: 'التالي',
      items: [
        {
          id: 't1',
          patientName: 'نورة القحطاني',
          treatment: 'الفيلر وتنسيق الملامح',
          visitContext: 'الرياض · بعد الجلسة الأولى',
          quote: 'كنت مترددة جداً قبل الفيلر لأني أخشى المظهر المبالغ فيه، لكن د. جهينة استمعت لكل مخاوفي واقترحت كمية خفيفة جداً أعادت التوازن لوجهي بشكل طبيعي تماماً دون أن يلاحظ أحد سوى أني أبدو أكثر إشراقاً وراحة.',
        },
        {
          id: 't2',
          patientName: 'سارة العتيبي',
          treatment: 'إبر النضارة والبروفايلو',
          visitContext: 'الرياض · متابعة العناية بالبشرة',
          quote: 'الفرق في ملمس بشرتي ومرونتها بعد البروفايلو كان ملموساً خلال أسبوعين. أكثر ما يميز العيادة هو الهدوء والخصوصية وشرح الدكتورة الدقيق لكل خطوة قبل البدء.',
        },
        {
          id: 't3',
          patientName: 'ريم الدوسري',
          treatment: 'علاج التصبغات والكلف',
          visitContext: 'الرياض · برنامج علاجي متكامل',
          quote: 'عانيت لسنوات من التصبغات مع علاجات لم تناسب بشرتي، ومع خطة د. جهينة الطبية المتدرجة تحسّن صفاء لوني بشكل ملحوظ دون تهيج، مع متابعة مستمرة من المنسقة.',
        },
        {
          id: 't4',
          patientName: 'لمياء الحربي',
          treatment: 'علاج تساقط الشعر بالبلازما',
          visitContext: 'الرياض · بعد ٣ جلسات',
          quote: 'بدأت جلسات البلازما والميزوثيرابي بعد استشارة تشخيصية دقيقة، وخفّ التساقط بوضوح مع ظهور شعيرات جديدة صحية. أشعر بالثقة والراحة في كل زيارة للعيادة.',
        },
      ],
    },
    contact: {
      eyebrow: 'الحجز والتواصل',
      heading: 'احجزي خدمتكِ مباشرة عبر واتساب',
      subtitle: 'اختاري الخدمة وأدخلي بياناتكِ ليصل طلب الحجز فوراً إلى فريق العيادة عبر واتساب.',
      formTitle: 'تفاصيل الحجز السريع',
      modalTitle: 'أدخلي بياناتكِ لإتمام الحجز عبر واتساب',
      modalSubtitle: 'ستصل بياناتكِ والخدمة المختارة مباشرة إلى منسقة العيادة لتأكيد الموعد.',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'اكتبي اسمكِ الكريم',
      patientPhoneLabel: 'رقم الجوال *',
      patientPhonePlaceholder: '05X XXX XXXX',
      serviceLabel: 'الخدمة المطلوبة',
      servicePlaceholder: 'استشارة عامة في التجميل والجلدية',
      dateLabel: 'التاريخ المفضل (اختياري)',
      timeLabel: 'الفترة المفضلة',
      timeOptions: ['الفترة الصباحية (١٠ ص – ٢ م)', 'فترة ما بعد الظهر (٢ م – ٦ م)', 'الفترة المسائية (٦ م – ٩ م)'],
      notesLabel: 'ملاحظات إضافية (اختياري)',
      notesPlaceholder: 'أي استفسار أو ملاحظة للمنسقة...',
      nameRequiredError: 'فضلاً اكتبي الاسم لإتمام الحجز',
      phoneRequiredError: 'فضلاً أدخلي رقم جوال صحيح للتواصل',
      confirmedTitle: 'تم تجهيز طلب الحجز لواتساب',
      confirmedBody: 'تم فتح محادثة واتساب مع منسقة العيادة متضمنة بياناتكِ والخدمة المختارة.',
      reopenWhatsapp: 'إعادة فتح واتساب',
      editBooking: 'تعديل البيانات',
      selectedServicePrefix: 'الخدمة المختارة:',
      clearSelection: 'إلغاء التحديد',
      addressLabel: 'موقع العيادة والعنوان',
      addressValue: 'عيادة اللمسة الطبي — طريق الملك فهد، حي الملك فهد (مقابل بوابة ٣ أسواق الرياض غاليري)، الرياض ١٢٢٦٢',
      openMapsLabel: 'افتح الموقع على خرائط جوجل',
      mapTitle: 'موقع عيادة اللمسة الطبي — د. جهينة جبابلي على الخريطة',
      phoneLabel: 'رقم التواصل للمنسقة',
      phoneValue: '+966 57 056 0580',
      copyPhone: 'نسخ الرقم',
      copiedPhone: 'تم النسخ',
      hoursLabel: 'مواعيد العمل',
      hoursValue: 'السبت – الخميس: ١٠:٠٠ صباحاً – ٩:٠٠ مساءً',
      whatsappCta: 'إرسال الحجز عبر واتساب',
      instagramLabel: 'إنستجرام',
      instagramHandle: '@dr.juhainah',
      tiktokLabel: 'تيك توك',
      tiktokHandle: '@juhainahjababili',
      whatsappPrefillBase: 'مرحباً عيادة د. جهينة جبابلي للتجميل والجلدية، أرغب في حجز استشارة.',
      whatsappPrefillService: 'مرحباً عيادة د. جهينة جبابلي، أرغب في حجز موعد لخدمة: ',
    },
    footer: {
      copyright: '© ٢٠٢٦ عيادة د. جهينة جبابلي للتجميل والجلدية. جميع الحقوق محفوظة.',
      tagline: 'عناية طبية راقية بمظهر طبيعي متوازن',
    },
  },
  en: {
    brand: 'Dr. Juhainah Jababili',
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Book & Contact',
      bookCta: 'Book Consultation',
      langToggle: 'عربي',
      langAria: 'Switch language to Arabic',
    },
    hero: {
      eyebrow: 'Dr. Juhainah Jababili Aesthetic & Dermatology Clinic',
      headline: 'With Juhainah… The Secret of Beauty',
      subheadline: 'Aesthetic care that begins by listening to you, and ends with a result that feels truly yours.',
      cta: 'Book Your Consultation',
      scrollHint: 'Explore Clinic',
      doctorAlt: 'Dr. Juhainah Jababili — Consultant Dermatologist & Aesthetic Specialist',
    },
    about: {
      eyebrow: 'About Dr. Juhainah',
      specialty: 'Consultant Dermatologist & Aesthetic Specialist',
      heading: 'Over 20 Years of Clinical Mastery in Dermatology & Aesthetics',
      lead: 'A Consultant Dermatologist and Aesthetic Specialist combining more than two decades of clinical experience with refined artistry for results that feel naturally yours.',
      paragraphs: [
        'Dr. Juhainah Jababili begins every consultation by listening attentively to your goals and assessing your skin with medical precision—crafting safe, tailored protocols without exaggeration.',
      ],
      highlightsTitle: 'Areas of Clinical Distinction',
      highlights: [
        'Over 20 years of professional experience in dermatology and aesthetics.',
        'Extensive expertise in medical laser and aesthetic treatments.',
        'Precision Botox, dermal fillers, and mesotherapy injections.',
        'Comprehensive skin rejuvenation and anti-aging therapies.',
        'Specialized experience in hair transplantation, liposuction, and fat grafting.',
      ],
      portraitAlt: 'Portrait of Dr. Juhainah Jababili, Consultant Dermatologist & Aesthetic Specialist',
      signature: 'Dr. Juhainah Jababili',
    },
    services: {
      eyebrow: 'Aesthetic & Dermatology Services',
      heading: 'Comprehensive Care for Skin, Hair & Natural Harmony',
      subtitle: 'Tap any treatment to book directly via WhatsApp, or pre-fill your consultation details below.',
      categories: [
        { id: 'all', label: 'All Services' },
        { id: 'injectables', label: 'Injectables' },
        { id: 'rejuvenation', label: 'Skin & Glow' },
        { id: 'devices', label: 'Laser & Devices' },
        { id: 'dermatology', label: 'Dermatology & Hair' },
      ],
      directWhatsappHint: 'Book via WhatsApp',
      selectForFormHint: 'Select for booking',
      selectedLabel: 'Selected for booking',
      items: [
        {
          id: 'fillers',
          number: '01',
          category: 'injectables',
          title: 'Dermal Fillers & Facial Balance',
          description: 'Subtle restoration of lips, cheeks, and jawline proportions while keeping natural expression.',
        },
        {
          id: 'botox',
          number: '02',
          category: 'injectables',
          title: 'Aesthetic & Therapeutic Botox',
          description: 'Softening expression lines, Nefertiti neck lift, hyperhidrosis, and bruxism relief.',
        },
        {
          id: 'biostimulators',
          number: '03',
          category: 'injectables',
          title: 'Collagen Biostimulators',
          description: 'Sculptra and Radiesse protocols encouraging gradual, natural skin firmness.',
        },
        {
          id: 'threads',
          number: '04',
          category: 'injectables',
          title: 'Non-Surgical Thread Lift',
          description: 'Gentle lifting and contouring for mid-face, jawline, and brow without surgery.',
        },
        {
          id: 'lipolysis',
          number: '05',
          category: 'injectables',
          title: 'Localized Fat Dissolving',
          description: 'Targeted medical contouring for submental fullness and lower-face definition.',
        },
        {
          id: 'skin-boosters',
          number: '06',
          category: 'rejuvenation',
          title: 'Skin Boosters & Profhilo',
          description: 'Deep hyaluronic micro-infusions restoring suppleness to face, neck, and hands.',
        },
        {
          id: 'prp-meso',
          number: '07',
          category: 'rejuvenation',
          title: 'PRP, Mesotherapy & Exosomes',
          description: 'Cellular revitalization for luminous skin tone and refreshed under-eye contours.',
        },
        {
          id: 'hydrafacial',
          number: '08',
          category: 'rejuvenation',
          title: 'Medical HydraFacial Cleansing',
          description: 'Gentle pore purification, gentle exfoliation, and soothing antioxidant infusion.',
        },
        {
          id: 'peels-microneedling',
          number: '09',
          category: 'rejuvenation',
          title: 'Medical Peels & Microneedling',
          description: 'Refining skin texture, minimizing pores, and renewing dull surface layers safely.',
        },
        {
          id: 'pigmentation',
          number: '10',
          category: 'rejuvenation',
          title: 'Pigmentation & Melasma Therapy',
          description: 'Tailored medical regimens to brighten dark spots and even out complexion clarity.',
        },
        {
          id: 'laser-hair',
          number: '11',
          category: 'devices',
          title: 'Medical Laser Hair Removal',
          description: 'Advanced cooled laser systems calibrated safely for all skin tones.',
        },
        {
          id: 'fractional-laser',
          number: '12',
          category: 'devices',
          title: 'Fractional Laser & Scar Revision',
          description: 'Deep dermal remodeling to smooth acne scars, fine lines, and textural marks.',
        },
        {
          id: 'hifu-rf',
          number: '13',
          category: 'devices',
          title: 'HIFU & RF Microneedling Tightening',
          description: 'Focused ultrasound and radiofrequency lifting for firmer face and neck skin.',
        },
        {
          id: 'vascular-laser',
          number: '14',
          category: 'devices',
          title: 'Vascular & Redness Laser Therapy',
          description: 'Calming rosacea and visible facial capillaries with precision and minimal downtime.',
        },
        {
          id: 'clinical-derm',
          number: '15',
          category: 'dermatology',
          title: 'Clinical Dermatology Consultations',
          description: 'Thorough medical diagnosis and care for eczema, psoriasis, and skin allergies.',
        },
        {
          id: 'acne-care',
          number: '16',
          category: 'dermatology',
          title: 'Acne & Post-Acne Management',
          description: 'Evidence-based regimens to calm active breakouts and prevent future scarring.',
        },
        {
          id: 'mole-check',
          number: '17',
          category: 'dermatology',
          title: 'Mole Screening & Lesion Removal',
          description: 'Careful dermoscopic evaluation and gentle medical removal of skin tags and benign growths.',
        },
        {
          id: 'hair-scalp',
          number: '18',
          category: 'dermatology',
          title: 'Hair Loss & Scalp Revitalization',
          description: 'Diagnostic hair care paired with PRP, mesotherapy, and exosome scalp protocols.',
        },
      ],
    },
    testimonials: {
      eyebrow: 'Patient Testimonials',
      heading: 'Trusted Stories of Quiet, Natural Care',
      subtitle: 'Reflections from our patients on attentive consultations, comfort, and balanced outcomes.',
      prevLabel: 'Previous',
      nextLabel: 'Next',
      items: [
        {
          id: 't1',
          patientName: 'Noura Al-Qahtani',
          treatment: 'Dermal Fillers & Facial Balance',
          visitContext: 'Riyadh · First Aesthetic Visit',
          quote: 'I was hesitant about fillers because I wanted zero exaggeration. Dr. Juhainah listened carefully to my concerns and used a light, balanced touch—people simply noticed I looked rested and radiant.',
        },
        {
          id: 't2',
          patientName: 'Sarah Al-Otaibi',
          treatment: 'Skin Boosters & Profhilo',
          visitContext: 'Riyadh · Skin Rejuvenation',
          quote: 'Within two weeks my skin felt deeply hydrated and supple. What truly sets the clinic apart is the calm privacy and how Dr. Juhainah explains every medical step clearly beforehand.',
        },
        {
          id: 't3',
          patientName: 'Reem Al-Dosari',
          treatment: 'Pigmentation & Melasma Therapy',
          visitContext: 'Riyadh · Tailored Skin Plan',
          quote: 'After years of trying harsh products that irritated my skin, Dr. Juhainah built a gentle clinical protocol that noticeably cleared my tone, with attentive follow-up from her coordinator.',
        },
        {
          id: 't4',
          patientName: 'Lamia Al-Harbi',
          treatment: 'Hair Loss & Scalp PRP',
          visitContext: 'Riyadh · 3-Session Protocol',
          quote: 'Following a thorough scalp diagnosis, the PRP and mesotherapy sessions reduced shedding noticeably and encouraged healthy new growth. Every visit feels unhurried and reassuring.',
        },
      ],
    },
    contact: {
      eyebrow: 'Booking & Contact',
      heading: 'Book Your Service Directly via WhatsApp',
      subtitle: 'Choose your treatment and share your preferred time so your booking reaches our clinic team immediately on WhatsApp.',
      formTitle: 'Quick WhatsApp Booking',
      modalTitle: 'Enter Your Details to Book via WhatsApp',
      modalSubtitle: 'Your details and selected treatment will be sent directly to our clinic coordinator.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Enter your name',
      patientPhoneLabel: 'Mobile Number *',
      patientPhonePlaceholder: '+966 5X XXX XXXX',
      serviceLabel: 'Requested Service',
      servicePlaceholder: 'General Aesthetic & Dermatology Consultation',
      dateLabel: 'Preferred Date (Optional)',
      timeLabel: 'Preferred Time',
      timeOptions: ['Morning (10 AM – 2 PM)', 'Afternoon (2 PM – 6 PM)', 'Evening (6 PM – 9 PM)'],
      notesLabel: 'Additional Notes (Optional)',
      notesPlaceholder: 'Any questions or notes for the coordinator...',
      nameRequiredError: 'Please enter your name to continue',
      phoneRequiredError: 'Please enter a valid mobile number',
      confirmedTitle: 'Booking Ready on WhatsApp',
      confirmedBody: 'WhatsApp has been opened with your details and selected service for our coordinator.',
      reopenWhatsapp: 'Open WhatsApp Again',
      editBooking: 'Edit Details',
      selectedServicePrefix: 'Selected service:',
      clearSelection: 'Clear',
      addressLabel: 'Clinic Address & Location',
      addressValue: 'Touch Medical Clinic — King Fahd Rd, Al Malik Fahd District (Opposite Riyadh Gallery Gate 3), Riyadh 12262',
      openMapsLabel: 'Open in Google Maps',
      mapTitle: 'Touch Medical Clinic — Dr. Juhainah Jababili Location Map',
      phoneLabel: 'Coordinator Direct Line',
      phoneValue: '+966 57 056 0580',
      copyPhone: 'Copy Number',
      copiedPhone: 'Copied',
      hoursLabel: 'Working Hours',
      hoursValue: 'Saturday – Thursday: 10:00 AM – 9:00 PM',
      whatsappCta: 'Send Booking via WhatsApp',
      instagramLabel: 'Instagram',
      instagramHandle: '@dr.juhainah',
      tiktokLabel: 'TikTok',
      tiktokHandle: '@juhainahjababili',
      whatsappPrefillBase: 'Hello Dr. Juhainah Jababili Clinic, I would like to book an aesthetic or dermatology consultation.',
      whatsappPrefillService: 'Hello Dr. Juhainah Jababili Clinic, I would like to book a consultation for: ',
    },
    footer: {
      copyright: '© 2026 Dr. Juhainah Jababili Aesthetic & Dermatology Clinic. All rights reserved.',
      tagline: 'Warm, unhurried aesthetic & dermatology care',
    },
  },
};
