export interface Testimonial {
  documentId: string;
  clientName: string;
  projectType: string;
  quote: string;
}

export interface Project {
  documentId: string;
  title: string;
  description: string;
  status?: string;
  coverImage?: {
    url: string;
  };
}

export interface Faq {
  documentId: string;
  question: string;
  answer: string;
}

export interface Career {
  documentId: string;
  title: string;
  location: string;
  employmentType: string;
  description: string;
}

export interface Certificate {
  documentId: string;
  title: string;
  issuedBy: string;
  issuedDate: string;
  image?: {
    url: string;
  };
}

export interface BlogPost {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  coverImage?: {
    url: string;
  };
}

export const staticTestimonials: Testimonial[] = [
  {
    documentId: 't-1',
    clientName: 'Harishbhai Patel',
    projectType: 'Residential 5kW Rooftop Solar',
    quote: 'Kayvi Solar made the entire transition to solar seamless. Our monthly electricity bill dropped from ₹7,500 to almost zero, and the PM Surya Ghar subsidy was processed without hassle.'
  },
  {
    documentId: 't-2',
    clientName: 'Amit Shah',
    projectType: 'Commercial 100kW Industrial Plant',
    quote: 'The return on investment has exceeded our forecasts. The engineering team at Kayvi Solar executed the 100kW installation on time with outstanding build quality.'
  },
  {
    documentId: 't-3',
    clientName: 'Meenaben Joshi',
    projectType: 'Solar Water Heater 500 LPD',
    quote: 'We installed the solar water heater system for our apartment society. It has been running flawlessly for over two years with zero maintenance issues.'
  }
];

export const staticProjects: Project[] = [
  {
    documentId: 'p-1',
    title: '150 kW Industrial Rooftop Plant',
    description: 'High-efficiency bifacial monocrystalline solar installation at Vatva GIDC, reducing annual carbon emissions by 180 tonnes.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p1_industrial.webp'
    }
  },
  {
    documentId: 'p-2',
    title: '10 kW Residential Grid-Tied System',
    description: 'Premium rooftop system in Gandhinagar featuring tier-1 micro-inverters and smart app energy monitoring.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p2_residential.webp'
    }
  },
  {
    documentId: 'p-3',
    title: '1000 LPD Commercial Water Heater',
    description: 'Pressurized evacuated tube collector (ETC) solar water heating system engineered for a healthcare facility in Ahmedabad.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p3_water_heater.webp'
    }
  },
  {
    documentId: 'p-4',
    title: '50 kW Commercial Warehouse System',
    description: 'Custom tilt-mounted solar array for an export logistics warehouse in Sanand, optimizing peak daylight capture.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p4_commercial.webp'
    }
  },
  {
    documentId: 'p-5',
    title: '6 kW Residential Solar Rooftop',
    description: 'Aesthetically integrated home rooftop solar solution in Surat with zero shadow interruption and net metering approval.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p5_urban_rooftop.webp'
    }
  },
  {
    documentId: 'p-6',
    title: 'Industrial Process Solar Heating',
    description: 'Advanced solar thermal system providing hot water for pre-heating industrial textile boilers.',
    status: 'Upcoming',
    coverImage: {
      url: '/images/projects/p6_solar_thermal.webp'
    }
  }
];

export const staticFaqs: Faq[] = [
  {
    documentId: 'f-1',
    question: 'How much can I save by installing rooftop solar with Kayvi Solar?',
    answer: 'Most residential customers save 80% to 95% on their monthly electricity bills. Commercial and industrial establishments typically achieve full return on investment (ROI) within 3 to 4 years.'
  },
  {
    documentId: 'f-2',
    question: 'How does the PM Surya Ghar: Muft Bijli Yojana subsidy work?',
    answer: 'Under the PM Surya Ghar scheme, eligible households receive up to ₹78,000 direct subsidy for systems up to 3kW. Kayvi Solar handles the complete registration, DISCOM approval, and subsidy disbursement assistance.'
  },
  {
    documentId: 'f-3',
    question: 'What is Net Metering and how do I benefit from it?',
    answer: 'Net metering uses a bi-directional electricity meter that records power consumed from the grid and solar energy exported to the grid. Excess units generated are banked or credited against future bills.'
  },
  {
    documentId: 'f-4',
    question: 'What warranty is provided on solar panels and inverters?',
    answer: 'We provide a 25-year performance warranty on solar panels and a 5 to 10-year manufacturer warranty on inverters, along with dedicated post-installation maintenance and system monitoring.'
  },
  {
    documentId: 'f-5',
    question: 'How long does the installation process take?',
    answer: 'Residential installations are typically completed within 3 to 5 business days once DISCOM approvals are in place. Commercial installations take between 2 to 4 weeks depending on system scale.'
  }
];

export function getStaticFaqs(locale: string = 'en'): Faq[] {
  if (locale === 'hi') {
    return [
      {
        documentId: 'f-1',
        question: 'कायवी सोलर से रूफटॉप सोलर लगवाने पर कितनी बचत हो सकती है?',
        answer: 'अधिकांश आवासीय ग्राहक अपने मासिक बिजली बिल में 80% से 95% तक की बचत करते हैं। वाणिज्यिक और औद्योगिक संस्थान आमतौर पर 3 से 4 वर्षों के भीतर निवेश पर पूर्ण रिटर्न (ROI) प्राप्त कर लेते हैं।'
      },
      {
        documentId: 'f-2',
        question: 'पीएम सूर्य घर: मुफ्त बिजली योजना सब्सिडी कैसे काम करती है?',
        answer: 'पीएम सूर्य घर योजना के तहत पात्र परिवारों को 3 किलोवाट तक के सिस्टम के लिए ₹78,000 तक की सीधी सरकारी सब्सिडी मिलती है। कायवी सोलर डिस्कॉम अप्रूवल और सब्सिडी की पूरी प्रक्रिया में सहायता करता है।'
      },
      {
        documentId: 'f-3',
        question: 'नेट मीटरिंग (Net Metering) क्या है और इससे क्या लाभ है?',
        answer: 'नेट मीटरिंग में एक द्वि-दिशात्मक मीटर लगाया जाता है जो ग्रिड से ली गई बिजली और ग्रिड को भेजी गई सोलर बिजली दोनों को रिकॉर्ड करता है। अतिरिक्त यूनिट्स आपके अगले बिल में क्रेडिट हो जाती हैं।'
      },
      {
        documentId: 'f-4',
        question: 'सोलर पैनल और इन्वर्टर पर क्या वारंटी मिलती है?',
        answer: 'हम सोलर पैनलों पर 25 साल की प्रदर्शन वारंटी और इनवर्टर पर 5 से 10 साल की निर्माता वारंटी के साथ समर्पित रखरखाव और सिस्टम मॉनिटरिंग सहायता प्रदान करते हैं।'
      },
      {
        documentId: 'f-5',
        question: 'सोलर इंस्टॉलेशन में कितना समय लगता है?',
        answer: 'डिस्कॉम अप्रूवल मिलने के बाद आवासीय सोलर इंस्टॉलेशन आमतौर पर 3 से 5 दिनों में पूरा हो जाता है। वाणिज्यिक इंस्टॉलेशन में सिस्टम के आकार के आधार पर 2 से 4 सप्ताह का समय लगता है।'
      }
    ];
  }
  if (locale === 'gu') {
    return [
      {
        documentId: 'f-1',
        question: 'કાયવી સોલાર સાથે રૂફટોપ સોલાર લગાવવાથી કેટલી બચત થઈ શકે?',
        answer: 'મોટાભાગના રહેણાંક ગ્રાહકો તેમના માસિક લાઇટ બિલમાં 80% થી 95% સુધીની બચત કરે છે. વ્યાપારી અને ઔદ્યોગિક એકમો સામાન્ય રીતે 3 થી 4 વર્ષમાં રોકાણનું સંપૂર્ણ વળતર (ROI) મેળવે છે.'
      },
      {
        documentId: 'f-2',
        question: 'પીએમ સૂર્ય ઘર: મુફ્ત બિજલી યોજના સબસિડી કેવી રીતે મળે છે?',
        answer: 'પીએમ સૂર્ય ઘર યોજના હેઠળ 3 કિલોવોટ સુધીની સિસ્ટમ માટે ₹78,000 સુધીની સીધી સરકારી સબસિડી મળે છે. કાયવી સોલાર ડિસ્કોમ મંજૂરી અને સબસિડીની સંપૂર્ણ પ્રક્રિયા સંભાળે છે.'
      },
      {
        documentId: 'f-3',
        question: 'નેટ મીટરિંગ (Net Metering) શું છે અને તેનો શું ફાયદો છે?',
        answer: 'નેટ મીટરિંગ એવું મીટર છે જે ગ્રીડમાંથી વપરાયેલી વીજળી અને ગ્રીડમાં મોકલેલી સોલાર વીજળી બંનેને રેકોર્ડ કરે છે. વધારાના યુનિટ્સ તમારા ભવિષ્યના બિલમાં જમા થાય છે.'
      },
      {
        documentId: 'f-4',
        question: 'સોલાર પેનલ અને ઇન્વર્ટર પર શું વોરંટી મળે છે?',
        answer: 'અમે સોલાર પેનલ્સ પર 25 વર્ષની પર્ફોર્મન્સ વોરંટી અને ઇન્વર્ટર પર 5 થી 10 વર્ષની વોરંટી સાથે નિયમિત જાળવણી અને મોનિટરિંગ પ્રદાન કરીએ છીએ.'
      },
      {
        documentId: 'f-5',
        question: 'સોલાર ઇન્સ્ટોલેશનમાં કેટલો સમય લાગે છે?',
        answer: 'ડિસ્કોમની મંજૂરી મળ્યા પછી રહેણાંક સોલાર ઇન્સ્ટોલેશન સામાન્ય રીતે 3 થી 5 દિવસમાં પૂર્ણ થઈ જાય છે. વ્યાપારી ઇન્સ્ટોલેશનમાં 2 થી 4 અઠવાડિયા લાગે છે.'
      }
    ];
  }
  return staticFaqs;
}

export function getStaticProjects(locale: string = 'en'): Project[] {
  if (locale === 'hi') {
    return [
      {
        documentId: 'p-1',
        title: '150 kW औद्योगिक रूफटॉप सोलर प्लांट',
        description: 'सूरत और गुजरात के प्रमुख औद्योगिक क्षेत्र में उच्च दक्षता वाले बायोफेशियल मोनोक्रिस्टलाइन सोलर इंस्टॉलेशन।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p1_industrial.webp' }
      },
      {
        documentId: 'p-2',
        title: '10 kW आवासीय ग्रिड-टाइड सिस्टम',
        description: 'स्मार्ट ऐप एनर्जी मॉनिटरिंग और टियर-1 इनवर्टर के साथ प्रीमियम रूफटॉप सोलर सिस्टम।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p2_residential.webp' }
      },
      {
        documentId: 'p-3',
        title: '1000 LPD वाणिज्यिक सोलर वॉटर हीटर',
        description: 'अस्पतालों और होटलों के लिए अत्यधिक कुशल प्रेशराइज्ड सोलर वॉटर हीटिंग सिस्टम।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p3_water_heater.webp' }
      },
      {
        documentId: 'p-4',
        title: '50 kW वेयरहाउस सोलर सिस्टम',
        description: 'अधिकतम धूप एकत्र करने के लिए कस्टम टिल्ट-माउंटेड सोलर एरे।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p4_commercial.webp' }
      },
      {
        documentId: 'p-5',
        title: '6 kW आवासीय सोलर रूफटॉप',
        description: 'सूरत में शून्य शैडो और नेट मीटरिंग अप्रूवल के साथ खूबसूरती से एकीकृत घरेलू रूफटॉप सोलर।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p5_urban_rooftop.webp' }
      },
      {
        documentId: 'p-6',
        title: 'औद्योगिक प्रोसेस सोलर हीटिंग',
        description: 'औद्योगिक बॉयलरों के लिए गर्म पानी प्रदान करने वाला उन्नत सोलर थर्मल सिस्टम।',
        status: 'आगामी',
        coverImage: { url: '/images/projects/p6_solar_thermal.webp' }
      }
    ];
  }
  if (locale === 'gu') {
    return [
      {
        documentId: 'p-1',
        title: '150 kW ઔદ્યોગિક રૂફટોપ સોલાર પ્લાન્ટ',
        description: 'ગુજરાતના અગ્રણી ઔદ્યોગિક વિસ્તારમાં ઉચ્ચ કાર્યક્ષમતા ધરાવતી બાયફેસિયલ મોનોક્રિસ્ટલાઇન સોલાર સિસ્ટમ.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p1_industrial.webp' }
      },
      {
        documentId: 'p-2',
        title: '10 kW રહેણાંક ગ્રીડ-ટાઇડ સિસ્ટમ',
        description: 'સ્માર્ટ એપ એનર્જી મોનિટરિંગ અને પ્રીમિયમ ટાયર-1 ઇન્વર્ટર સાથેનું આધુનિક રૂફટોપ સોલાર.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p2_residential.webp' }
      },
      {
        documentId: 'p-3',
        title: '1000 LPD વાણિજ્યિક સોલાર વોટર હીટર',
        description: 'હોસ્પિટલો અને વાણિજ્યિક સંકુલો માટે તૈયાર કરેલી અત્યંત કાર્યક્ષમ સોલાર વોટર હીટિંગ સિસ્ટમ.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p3_water_heater.webp' }
      },
      {
        documentId: 'p-4',
        title: '50 kW વેરહાઉસ સોલાર સિસ્ટમ',
        description: 'મહત્તમ તડકો મેળવવા માટે કસ્ટમ ટિલ્ટ-માઉન્ટેડ સોલાર એરે.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p4_commercial.webp' }
      },
      {
        documentId: 'p-5',
        title: '6 kW રહેણાંક સોલાર રૂફટોપ',
        description: 'સુરતમાં નેટ મીટરિંગ મંજૂરી સાથે સંપૂર્ણ સુંદરતાપૂર્વક ઇન્સ્ટોલ કરેલ ઘરગથ્થુ રૂફટોપ સોલાર.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p5_urban_rooftop.webp' }
      },
      {
        documentId: 'p-6',
        title: 'ઔદ્યોગિક પ્રોસેસ સોલાર હીટિંગ',
        description: 'ઔદ્યોગિક બોઇલરો માટે ગરમ પાણી પૂરું પાડતી અત્યાધુનિક સોલાર થર્મલ સિસ્ટમ.',
        status: 'આગામી',
        coverImage: { url: '/images/projects/p6_solar_thermal.webp' }
      }
    ];
  }
  return staticProjects;
}

export const staticCareers: Career[] = [
  {
    documentId: 'c-1',
    title: 'Solar PV Design Engineer',
    location: 'Ahmedabad, Gujarat',
    employmentType: 'Full-time',
    description: 'Responsible for AutoCAD 2D/3D solar layout design, PVsyst energy yield simulation, single-line diagrams (SLD), and structural assessment.'
  },
  {
    documentId: 'c-2',
    title: 'Site Execution & Quality Supervisor',
    location: 'Gandhinagar / Surat, Gujarat',
    employmentType: 'Full-time',
    description: 'Oversee on-site civil and electrical installation of residential and commercial rooftop solar projects, ensuring safety and BIS standards.'
  },
  {
    documentId: 'c-3',
    title: 'Technical Sales Specialist',
    location: 'Vadodara / Rajkot, Gujarat',
    employmentType: 'Full-time',
    description: 'Engage with residential and industrial clients, conduct preliminary site visits, calculate solar potential and present ROI proposals.'
  }
];

export const staticCertificates: Certificate[] = [
  {
    documentId: 'cert-1',
    title: 'MNRE Channel Partner & System Integrator',
    issuedBy: 'Ministry of New and Renewable Energy (Govt. of India)',
    issuedDate: 'Valid through 2028',
    image: {
      url: '/images/hero_bg.jpg'
    }
  },
  {
    documentId: 'cert-2',
    title: 'ISO 9001:2015 Quality Management Certification',
    issuedBy: 'International Organization for Standardization',
    issuedDate: 'Certified 2024',
    image: {
      url: '/images/commercial_solar.jpg'
    }
  },
  {
    documentId: 'cert-3',
    title: 'GEDA Registered Solar Rooftop Vendor',
    issuedBy: 'Gujarat Energy Development Agency',
    issuedDate: 'Active Empathized Vendor',
    image: {
      url: '/images/residential_solar.jpg'
    }
  },
  {
    documentId: 'cert-4',
    title: 'BIS Certified Solar Module Compliance',
    issuedBy: 'Bureau of Indian Standards',
    issuedDate: 'Certified Standards IS 14286 / IEC 61215',
    image: {
      url: '/images/solar_water_heater.jpg'
    }
  }
];

export const staticBlogPosts: BlogPost[] = [
  {
    documentId: 'b-1',
    title: 'Complete Guide to PM Surya Ghar Muft Bijli Yojana Subsidy 2026',
    slug: 'pm-surya-ghar-subsidy-guide',
    excerpt: 'Everything you need to know about claiming up to ₹78,000 subsidy on residential rooftop solar under the government initiative.',
    publishedAt: '2026-03-15',
    coverImage: {
      url: '/images/residential_solar.jpg'
    },
    content: `
# Complete Guide to PM Surya Ghar: Muft Bijli Yojana Subsidy

The PM Surya Ghar: Muft Bijli Yojana is one of the most ambitious renewable energy initiatives launched in India, aimed at providing free or near-zero electricity to 1 crore households.

## Subsidy Structure Overview
Under the revised framework:
- **1 kW System**: ₹30,000 central financial assistance (CFA).
- **2 kW System**: ₹60,000 central financial assistance.
- **3 kW & Above**: ₹78,000 flat central financial assistance.

## Key Eligibility Criteria
1. The applicant must own a residential property with clear rooftop rights.
2. Valid electricity consumer number with the local DISCOM (e.g., UGVCL, DGVCL, MGVCL, PGVCL, Torrent Power).
3. The solar modules used must be compliant with the ALMM (Approved List of Models and Manufacturers).

## How Kayvi Solar Assists You
From feasibility assessment and application submission on the national portal to DISCOM inspection and net meter synchronization, Kayvi Solar delivers end-to-end turnkey support.
    `
  },
  {
    documentId: 'b-2',
    title: 'Commercial & Industrial Solar ROI: Slashing Operational Power Costs by 80%',
    slug: 'commercial-solar-roi-explained',
    excerpt: 'How commercial enterprises and factories in Gujarat are leveraging accelerated depreciation and high solar yields to achieve payback in under 3 years.',
    publishedAt: '2026-02-28',
    coverImage: {
      url: '/images/commercial_solar.jpg'
    },
    content: `
# Commercial & Industrial Solar ROI: Slashing Operational Power Costs

With commercial grid electricity tariffs hovering between ₹7.50 to ₹9.50 per unit in many industrial clusters, electricity is one of the largest ongoing operational expenses for factories and commercial properties.

## Financial Advantages of Commercial Solar
1. **Accelerated Depreciation**: Businesses can claim 40% accelerated depreciation under Section 32 of the Income Tax Act in the first year alone.
2. **Predictable Energy Pricing**: Solar provides 25+ years of fixed-cost energy, hedging against rising utility grid tariffs.
3. **Short Payback Window**: An optimally designed rooftop solar system pays for itself within 32 to 42 months.

## Environmental and ESG Credentials
Transitioning to clean energy enhances ESG ratings, satisfies export client sustainability compliance, and substantially curtails Scope 2 greenhouse gas emissions.
    `
  },
  {
    documentId: 'b-3',
    title: 'Top 7 Financial & Environmental Benefits of Installing Rooftop Solar',
    slug: 'top-benefits-of-solar-energy',
    excerpt: 'Discover why switching to solar is one of the safest high-yield investments for homeowners today.',
    publishedAt: '2026-01-20',
    coverImage: {
      url: '/images/hero_bg.jpg'
    },
    content: `
# Top 7 Financial & Environmental Benefits of Installing Rooftop Solar

Solar energy is no longer just an eco-conscious alternative—it is a financially rewarding decision that delivers guaranteed annual returns exceeding traditional fixed deposits.

## 1. Drastic Reduction in Electricity Bills
By producing your own clean power, you drastically cut down grid energy imports and shield your household from recurring tariff hikes.

## 2. High Return on Investment (ROI)
A typical residential rooftop system generates internal rates of return (IRR) between 25% to 35% per annum.

## 3. Increase in Property Value
Homes equipped with modern solar installations command higher market value and attract quality buyers seeking energy-efficient residences.

## 4. Minimal Maintenance Requirements
Solar PV systems feature no moving parts. Routine periodic washing with water is all that is required to sustain peak generation.

## 5. 25-Year Long-Term Reliability
Premium tier-1 solar panels are engineered to endure extreme weather, heavy winds, and high UV radiation for over two and a half decades.
    `
  },
  {
    documentId: 'b-4',
    title: 'Solar Water Heaters vs Electric Geysers: Comparison and Savings Guide',
    slug: 'how-to-choose-solar-water-heater',
    excerpt: 'Analyze energy consumption, installation costs, and long-term savings between solar thermal systems and traditional electric heaters.',
    publishedAt: '2026-01-10',
    coverImage: {
      url: '/images/solar_water_heater.jpg'
    },
    content: `
# Solar Water Heaters vs Electric Geysers: Comparison and Savings Guide

Water heating accounts for roughly 20% to 30% of a typical household's winter electricity bill. Choosing the right water heating technology can save thousands of rupees every year.

## Evacuated Tube Collectors (ETC) vs Flat Plate Collectors (FPC)
- **ETC Systems**: Highly economical, optimal for areas with soft to medium water hardness, and efficient in colder weather.
- **FPC Systems**: Extremely durable copper tubes and metallic construction, recommended for pressurized and rugged applications.

## Payback Period
A 200 LPD solar water heating system typically saves around 1,500 to 2,000 units of electricity annually, paying for itself in approximately 2 years.
    `
  }
];
