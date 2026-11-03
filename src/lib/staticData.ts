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
  category?: 'savings' | 'installation' | 'technology';
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

export const staticTestimonials: Testimonial[] = [];

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
    category: 'savings',
    question: 'Why should I switch to solar energy for my home or business?',
    answer: 'Electricity tariffs in Gujarat increase regularly, whereas rooftop solar gives you free, predictable power for over 25 years. By generating your own clean electricity, you eliminate up to 90% to 95% of your power bill, shield yourself from future tariff hikes, increase your property value, and significantly reduce your carbon footprint. Kayvi Solar handles the complete turnkey process from DISCOM approvals to lifetime maintenance.'
  },
  {
    documentId: 'f-2',
    category: 'savings',
    question: 'How high does my monthly electricity bill need to be for solar to make financial sense?',
    answer: 'If your bi-monthly bill is ₹2,000 or more (around ₹1,000/month), rooftop solar is already an exceptional investment. With current government subsidies under PM Surya Ghar and accelerated depreciation benefits for businesses, most homeowners recover their entire investment within 2.5 to 3 years, enjoying free electricity for the remaining 22+ years.'
  },
  {
    documentId: 'f-3',
    category: 'savings',
    question: 'How much money can I actually save every month with rooftop solar?',
    answer: 'A standard 3 kW residential rooftop system generates about 360 to 420 units (kWh) per month, saving between ₹2,500 and ₹3,500 every single month (₹30,000 to ₹42,000 annually). Commercial installations (10 kW – 100 kW) typically save tens of thousands to lakhs of rupees each month while drastically reducing operational overheads.'
  },
  {
    documentId: 'f-4',
    category: 'technology',
    question: 'What makes Kayvi Solar different from other solar installers in Surat?',
    answer: 'Unlike sales agencies or brokers, Kayvi Solar is a local, licensed engineering team with our physical headquarters in Navagam/Dindoli, Surat. We exclusively install Tier-1 ALMM-approved bifacial monocrystalline panels, engineer hot-dip galvanized cyclone-resistant elevated structures, handle 100% of DGVCL/Torrent net metering liaisoning, and guarantee rapid local on-site service.'
  },
  {
    documentId: 'f-5',
    category: 'installation',
    question: 'I am not sure if I have enough terrace space. Can I still install solar?',
    answer: 'Yes! Each 1 kW of solar generally requires 80–100 sq.ft. of shadow-free rooftop space. If space is limited or you want to keep your terrace open, Kayvi Solar specializes in Elevated GI Superstructures (raised 8–10 feet). This keeps 100% of your terrace floor free for walking, family gatherings, or sitting areas while generating clean power above.'
  },
  {
    documentId: 'f-6',
    category: 'savings',
    question: 'Do I need to pay a huge amount upfront, or are financing and EMIs available?',
    answer: 'You do not need to pay a huge amount upfront. Kayvi Solar partners with leading banks (SBI, HDFC, Canara, Bank of Baroda) to provide collateral-free solar loans with zero down payment and flexible EMI options up to 7 years. In most cases, your monthly electricity savings are greater than your loan EMI!'
  },
  {
    documentId: 'f-7',
    category: 'savings',
    question: 'How does the PM Surya Ghar: Muft Bijli Yojana subsidy work, and who handles it?',
    answer: 'Under the Central Government\'s PM Surya Ghar scheme, residential homes receive ₹30,000 for 1 kW, ₹60,000 for 2 kW, and a maximum of ₹78,000 for 3 kW and above. The subsidy is deposited directly into your bank account. Kayvi Solar manages the entire process—from national portal registration and DISCOM documentation to site inspection and subsidy release.'
  },
  {
    documentId: 'f-8',
    category: 'installation',
    question: 'How long does it take from site survey to final system energization?',
    answer: 'Once approved by DISCOM, physical rooftop structure fabrication, panel installation, and wiring are completed in just 2 to 3 days! The complete cycle—including DISCOM (DGVCL / Torrent Power) feasibility approval, bi-directional net meter installation, and grid synchronization—typically takes 15 to 25 working days.'
  },
  {
    documentId: 'f-9',
    category: 'technology',
    question: 'What is the lifespan of a rooftop solar plant, and what warranties do I get?',
    answer: 'High-efficiency solar panels have an operational lifespan of 25 to 30+ years. Kayvi Solar provides a 25-year linear performance warranty on solar panels (guaranteeing >80% output at year 25), a 5 to 10-year manufacturer warranty on grid-tie inverters, and heavy-duty GI mounting structures rated to withstand 150+ km/h cyclone wind speeds.'
  },
  {
    documentId: 'f-10',
    category: 'technology',
    question: 'Do solar panels alone guarantee high generation and long-term savings?',
    answer: 'No. Panels are only one component. Real long-term savings depend on precision engineering—correct tilt angle for maximum sun exposure, shadow analysis, high-grade UV-resistant DC cables, low-loss inverters, and dedicated chemical earthing for lightning protection. Kayvi Solar designs end-to-end balanced systems engineered for maximum generation.'
  },
  {
    documentId: 'f-11',
    category: 'technology',
    question: 'How will I know how much power my system is generating every day?',
    answer: 'Every solar plant installed by Kayvi Solar is equipped with a Smart Wi-Fi / IoT Data Logger connected to your home network. Through a dedicated smartphone application, you can view real-time generation, daily units produced, monthly savings, and grid export figures from anywhere in the world.'
  },
  {
    documentId: 'f-12',
    category: 'installation',
    question: 'What maintenance is required, and does solar work during cloudy or monsoon days?',
    answer: 'Solar panels require very little maintenance—simply rinsing them with clean water once or twice a month to clear ambient dust. On cloudy or rainy days, panels continue to generate electricity from diffused ambient sunlight. At night or during high power demand, your bi-directional net meter automatically draws needed units from the grid without interruption.'
  }
];

export function getStaticFaqs(locale: string = 'en'): Faq[] {
  if (locale === 'hi') {
    return [
      {
        documentId: 'f-1',
        category: 'savings',
        question: 'मुझे अपने घर या व्यवसाय के लिए सोलर ऊर्जा क्यों अपनानी चाहिए?',
        answer: 'गुजरात में बिजली की दरें लगातार बढ़ रही हैं, जबकि रूफटॉप सोलर सिस्टम आपको 25 से अधिक वर्षों तक मुफ्त और स्वच्छ बिजली देता है। अपनी बिजली खुद बनाकर आप मासिक बिजली बिल में 90% से 95% तक की कटौती कर सकते हैं, भविष्य की महंगाई से सुरक्षित रह सकते हैं, अपनी प्रॉपर्टी की वैल्यू बढ़ा सकते हैं और पर्यावरण संरक्षण में योगदान दे सकते हैं।'
      },
      {
        documentId: 'f-2',
        category: 'savings',
        question: 'सोलर लगाने के लिए मेरा मासिक बिजली बिल कितना होना चाहिए ताकि यह फायदेमंद रहे?',
        answer: 'यदि आपका दो महीने का बिजली बिल ₹2,000 या उससे अधिक (लगभग ₹1,000/माह) आता है, तो रूफटॉप सोलर आपके लिए एक उत्कृष्ट निवेश है। पीएम सूर्य घर योजना की सब्सिडी के साथ, अधिकांश आवासीय ग्राहकों का पूरा निवेश 2.5 से 3 साल में वसूल (Payback) हो जाता है, जिसके बाद बिजली पूरी तरह मुफ्त होती है।'
      },
      {
        documentId: 'f-3',
        category: 'savings',
        question: 'रूफटॉप सोलर से मैं वास्तव में हर महीने कितने रुपये बचा सकता हूँ?',
        answer: 'एक सामान्य 3 किलोवाट का आवासीय सिस्टम प्रति माह लगभग 360 से 420 यूनिट बिजली पैदा करता है, जिससे हर महीने ₹2,500 से ₹3,500 की सीधी बचत होती है (सालाना ₹30,000 से ₹42,000)। वाणिज्यिक और औद्योगिक संस्थान (10kW - 100kW) हर महीने लाखों रुपये की बिजली बचत करते हैं।'
      },
      {
        documentId: 'f-4',
        category: 'technology',
        question: 'सूरत में अन्य सोलर कंपनियों की तुलना में कायवी सोलर में क्या खास है?',
        answer: 'ब्रोकरों या एजेंटों के विपरीत, कायवी सोलर सूरत (नवागाम/डिंडोली) में स्थित एक प्रामाणिक स्थानीय इंजीनियरिंग कंपनी है। हम केवल टियर-1 ALMM-अनुमोदित बायफेशियल पैनल्स, हॉट-डिप गैल्वनाइज्ड तूफान-रोधी संरचनाएं, DGVCL/टोरेंट नेट मीटरिंग की पूरी कागजी कार्रवाई और सूरत में त्वरित स्थानीय ऑन-साइट सेवा प्रदान करते हैं।'
      },
      {
        documentId: 'f-5',
        category: 'installation',
        question: 'मेरी छत पर सीमित जगह है। क्या मैं फिर भी सोलर सिस्टम लगा सकता हूँ?',
        answer: 'जी हाँ! प्रति 1 किलोवाट सोलर के लिए लगभग 80-100 वर्ग फुट छाया-मुक्त छत की आवश्यकता होती है। यदि छत का उपयोग आप टहलने या बैठने के लिए करना चाहते हैं, तो कायवी सोलर 8-10 फीट ऊंचे एलिवेटेड जीआई सुपरस्ट्रक्चर लगाता है। इससे आपकी पूरी छत खुली रहती है और ऊपर सोलर बिजली बनती रहती है।'
      },
      {
        documentId: 'f-6',
        category: 'savings',
        question: 'क्या मुझे पूरी रकम पहले चुकानी होगी, या लोन और ईएमआई (EMI) की सुविधा उपलब्ध है?',
        answer: 'आपको एकमुश्त बड़ी रकम चुकाने की बिल्कुल आवश्यकता नहीं है। कायवी सोलर प्रमुख बैंकों (SBI, HDFC, केनरा, बैंक ऑफ बड़ौदा) के साथ मिलकर शून्य डाउन पेमेंट और 7 साल तक की आसान किस्तों (EMI) पर सोलर लोन उपलब्ध कराता है। अधिकांश मामलों में, मासिक बिजली बचत आपकी लोन ईएमआई से भी अधिक होती है!'
      },
      {
        documentId: 'f-7',
        category: 'savings',
        question: 'पीएम सूर्य घर: मुफ्त बिजली योजना सब्सिडी कैसे मिलती है, और इसका काम कौन संभालता है?',
        answer: 'केंद्र सरकार की पीएम सूर्य घर योजना के तहत 1kW पर ₹30,000, 2kW पर ₹60,000 और 3kW या अधिक पर ₹78,000 की सीधी सब्सिडी मिलती है। यह राशि सीधे आपके बैंक खाते में जमा होती है। कायवी सोलर राष्ट्रीय पोर्टल पंजीकरण, डिस्कॉम आवेदन और निरीक्षण से लेकर सब्सिडी ट्रांसफर तक की पूरी प्रक्रिया खुद संभालता है।'
      },
      {
        documentId: 'f-8',
        category: 'installation',
        question: 'साइट सर्वे से लेकर सिस्टम चालू होने में कितना समय लगता है?',
        answer: 'डिस्कॉम की मंजूरी मिलने के बाद छत पर स्ट्रक्चर निर्माण, पैनल फिटिंग और वायरिंग का काम सिर्फ 2 से 3 दिनों में पूरा हो जाता है। डिस्कॉम (DGVCL/टोरेंट) अप्रूवल, नेट मीटर टेस्टिंग और ग्रिड चालू होने तक की कुल प्रक्रिया में आमतौर पर 15 से 25 कार्यदिवस लगते हैं।'
      },
      {
        documentId: 'f-9',
        category: 'technology',
        question: 'रूफटॉप सोलर सिस्टम की लाइफ कितनी होती है और क्या वारंटी मिलती है?',
        answer: 'उच्च दक्षता वाले सोलर पैनल्स का जीवनकाल 25 से 30+ वर्ष होता है। कायवी सोलर पैनल्स पर 25 साल की लीनियर परफॉर्मेंस वारंटी (25वें साल में भी 80%+ उत्पादन), इन्वर्टर पर 5 से 10 साल की वारंटी और 150 किमी/घंटा की तूफानी हवाओं को झेलने वाले हेवी-ड्यूटी जीआई स्ट्रक्चर प्रदान करता है।'
      },
      {
        documentId: 'f-10',
        category: 'technology',
        question: 'क्या सिर्फ सोलर पैनल से ही अधिकतम बिजली बचत सुनिश्चित हो जाती है?',
        answer: 'नहीं। केवल पैनल पर्याप्त नहीं हैं। लंबे समय तक अधिकतम बचत के लिए सही झुकाव कोण (Tilt Angle), छाया विश्लेषण, हाई-ग्रेड यूवी-प्रतिरोधी डीसी केबल्स, कुशल इनवर्टर और उचित केमिकल अर्थिंग आवश्यक है। कायवी सोलर अधिकतम यूनिट्स उत्पादन सुनिश्चित करने के लिए सम्पूर्ण सिस्टम को वैज्ञानिक रूप से डिजाइन करता है।'
      },
      {
        documentId: 'f-11',
        category: 'technology',
        question: 'मुझे कैसे पता चलेगा कि मेरा सोलर सिस्टम रोज कितनी बिजली बना रहा है?',
        answer: 'कायवी सोलर द्वारा लगाए गए प्रत्येक सिस्टम में स्मार्ट वाई-फाई / IoT डेटा लॉगर शामिल होता है। आप अपने स्मार्टफोन ऐप पर रीयल-टाइम बिजली उत्पादन, दैनिक बनी यूनिट्स, मासिक बचत और ग्रिड को भेजी गई बिजली का पूरा हिसाब दुनिया में कहीं से भी देख सकते हैं।'
      },
      {
        documentId: 'f-12',
        category: 'installation',
        question: 'सोलर सिस्टम के लिए क्या रखरखाव जरूरी है, और क्या यह बारिश/बादलों में काम करता है?',
        answer: 'सोलर पैनल्स को बहुत कम रखरखाव की जरूरत होती है—महीने में एक या दो बार साफ पानी से धूल धोना ही पर्याप्त है। बादलों या बारिश के दिनों में भी पैनल फैली हुई धूप (Diffused Light) से बिजली बनाते रहते हैं। रात में या अधिक लोड होने पर ग्रिड से सामान्य रूप से बिना किसी रुकावट के बिजली मिलती रहती है।'
      }
    ];
  }
  if (locale === 'gu') {
    return [
      {
        documentId: 'f-1',
        category: 'savings',
        question: 'મારે મારા ઘર કે વેપાર માટે સોલાર ઊર્જા કેમ અપનાવવી જોઈએ?',
        answer: 'ગુજરાતમાં વીજળીના દરો સતત વધી રહ્યા છે, જ્યારે સોલાર તમને 25થી વધુ વર્ષો સુધી મફત અને કુદરતી વીજળી આપે છે. તમારો પોતાનો સોલાર પ્લાન્ટ લગાવીને તમે વીજળી બિલમાં 90% થી 95% સુધીની સીધી બચત કરી શકો છો, ભવિષ્યના વધતા વીજ દરો સામે સુરક્ષિત રહી શકો છો અને મિલકતનું મૂલ્ય વધારી શકો છો.'
      },
      {
        documentId: 'f-2',
        category: 'savings',
        question: 'સોલાર ફાયદાકારક બનવા માટે મારું માસિક વીજળી બિલ કેટલું હોવું જોઈએ?',
        answer: 'જો તમારું બે મહિનાનું લાઇટ બિલ ₹2,000 કે તેથી વધુ (આશરે ₹1,000/મહિને) આવતું હોય, તો રૂફટોપ સોલાર તમારા માટે શ્રેષ્ઠ રોકાણ છે. પીએમ સૂર્ય ઘર સબસિડી સાથે મોટાભાગના પરિવારોનું રોકાણ માત્ર 2.5 થી 3 વર્ષમાં વસૂલ થઈ જાય છે અને પછીના 22+ વર્ષ સુધી વીજળી ફ્રી રહે છે.'
      },
      {
        documentId: 'f-3',
        category: 'savings',
        question: 'રૂફટોપ સોલારથી હું દર મહિને વાસ્તવમાં કેટલા રૂપિયા બચાવી શકું?',
        answer: 'એક સામાન્ય 3 કિલોવોટની સોલાર સિસ્ટમ દર મહિને આશરે 360 થી 420 યુનિટ વીજળી ઉત્પન્ન કરે છે, જેનાથી દર મહિને ₹2,500 થી ₹3,500 ની બચત થાય છે (વાર્ષિક ₹30,000 થી ₹42,000). વ્યાપારી એકમો (10kW - 100kW) દર મહિને હજારોથી લાખો રૂપિયાની વીજળી બચાવે છે.'
      },
      {
        documentId: 'f-4',
        category: 'technology',
        question: 'સુરતમાં અન્ય સોલાર ઇન્સ્ટોલર્સ કરતા કાયવી સોલાર કઈ રીતે અલગ પડે છે?',
        answer: 'બ્રોકરો કે થર્ડ પાર્ટી એજન્ટોથી વિપરીત, કાયવી સોલાર સુરત (નવાગામ/ડિંડોલી) માં ઓફિસ ધરાવતી અધિકૃત સ્થાનિક સોલાર કંપની છે. અમે ફક્ત ટિયર-1 ALMM માન્ય બાયફેશિયલ પેનલ્સ, હોટ-ડીપ ગેલ્વેનાઇઝ્ડ મજબૂત સ્ટ્રક્ચર, DGVCL નેટ મીટરિંગનું સંપૂર્ણ લાયઝનિંગ અને સુરતમાં ઝડપી ઓન-સાઇટ સપોર્ટ આપીએ છીએ.'
      },
      {
        documentId: 'f-5',
        category: 'installation',
        question: 'મારી અગાશીમાં મર્યાદિત જગ્યા છે. શું હું હજુ પણ સોલાર લગાવી શકું?',
        answer: 'હા ચોક્કસ! દર 1 કિલોવોટ સોલાર માટે આશરે 80-100 ચોરસ ફૂટ શેડો-ફ્રી અગાશીની જરૂર પડે છે. જો તમે તમારી અગાશીનો ઉપયોગ ચાલવા કે બેસવા માટે ચાલુ રાખવા માંગતા હો, તો કાયવી સોલાર 8-10 ફૂટ ઊંચા એલિવેટેડ સ્ટ્રક્ચર બનાવે છે જેથી નીચેની 100% અગાશી સંપૂર્ણપણે વપરાશ માટે ખુલ્લી રહે છે.'
      },
      {
        documentId: 'f-6',
        category: 'savings',
        question: 'શું મારે શરૂઆતમાં મોટી રકમ ચૂકવવી પડશે, કે લોન અને EMI સુવિધા ઉપલબ્ધ છે?',
        answer: 'તમારે એક સાથે મોટી રકમ ચૂકવવાની જરૂર નથી. કાયવી સોલાર મુખ્ય બેંકો (SBI, HDFC, Canara, BoB) સાથે મળીને ઝીરો ડાઉન પેમેન્ટ અને 7 વર્ષ સુધીની સરળ EMI પર સોલાર લોન ઉપલબ્ધ કરાવે છે. મોટાભાગના કિસ્સાઓમાં, માસિક વીજળી બિલની બચત તમારી લોન હપ્તા (EMI) કરતાં પણ વધારે હોય છે!'
      },
      {
        documentId: 'f-7',
        category: 'savings',
        question: 'પીએમ સૂર્ય ઘર: મુફ્ત બિજલી યોજના સબસિડી કેવી રીતે મળે છે અને તે કોણ સંભાળે છે?',
        answer: 'કેન્દ્ર સરકારની પીએમ સૂર્ય ઘર યોજના હેઠળ 1kW પર ₹30,000, 2kW પર ₹60,000 અને 3kW કે તેથી વધુ પર ₹78,000 સીધી સબસિડી મળે છે, જે સીધી તમારા બેંક ખાતામાં જમા થાય છે. કાયવી સોલાર નેશનલ પોર્ટલ રજીસ્ટ્રેશન, ડિસ્કોમ મંજૂરી અને ઇન્સ્પેક્શનથી લઈને સબસિડી જમા થવા સુધીની તમામ કાર્યવાહી જાતે સંભાળે છે.'
      },
      {
        documentId: 'f-8',
        category: 'installation',
        question: 'સાઇટ સર્વેથી સિસ્ટમ ચાલુ થવામાં કેટલો સમય લાગે છે?',
        answer: 'ડિસ્કોમની મંજૂરી પછી અગાશી પર સ્ટ્રક્ચર ફેબ્રિકેશન, પેનલ ફિટિંગ અને વાયરિંગનું કામ માત્ર 2 થી 3 દિવસમાં પૂર્ણ થઈ જાય છે. ડિસ્કોમ (DGVCL / ટોરેન્ટ પાવર) ની મંજૂરી, નેટ મીટર ઇન્સ્ટોલેશન અને ગ્રીડ ચાલુ થવા સુધીની સમગ્ર પ્રક્રિયામાં સામાન્ય રીતે 15 થી 25 દિવસનો સમય લાગે છે.'
      },
      {
        documentId: 'f-9',
        category: 'technology',
        question: 'રૂફટોપ સોલાર પ્લાન્ટનું આયુષ્ય કેટલું હોય છે અને શું વોરંટી મળે છે?',
        answer: 'ઉચ્ચ કાર્યક્ષમતા ધરાવતી સોલાર પેનલ્સ 25 થી 30+ વર્ષનું આયુષ્ય ધરાવે છે. કાયવી સોલાર પેનલ પર 25 વર્ષની લિનિયર પર્ફોર્મન્સ વોરંટી (25માં વર્ષે પણ 80%+ વીજ ઉત્પાદન), ઇન્વર્ટર પર 5 થી 10 વર્ષની વોરંટી અને 150 કિમી/કલાકની પવન ગતિ સામે ટકી શકે તેવું હેવી ગેલ્વેનાઇઝ્ડ સ્ટ્રક્ચર પૂરું પાડે છે.'
      },
      {
        documentId: 'f-10',
        category: 'technology',
        question: 'શું માત્ર સોલાર પેનલથી જ લાંબા ગાળાની બચત સુનિશ્ચિત થઈ જાય છે?',
        answer: 'ના, માત્ર પેનલથી બચત સુનિશ્ચિત થતી નથી. લાંબા ગાળાની બચત સાચા એન્જિનિયરિંગ પર આધારિત છે—સૂર્યપ્રકાશનો યોગ્ય એંગલ, શેડો એનાલિસિસ, ઉચ્ચ ગુણવત્તાવાળા ડીસી વાયરો, કાર્યક્ષમ ઇન્વર્ટર અને યોગ્ય કેમિકલ અર્થિંગ. કાયવી સોલાર વધુમાં વધુ વીજ ઉત્પાદન માટે સંપૂર્ણ સિસ્ટમ યોગ્ય રીતે ડિઝાઇન કરે છે.'
      },
      {
        documentId: 'f-11',
        category: 'technology',
        question: 'મને કેવી રીતે ખબર પડશે કે મારી સિસ્ટમ રોજે કેટલી વીજળી ઉત્પન્ન કરે છે?',
        answer: 'કાયવી સોલાર દ્વારા લગાવવામાં આવતી દરેક સિસ્ટમમાં સ્માર્ટ વાઇ-ફાઇ / IoT ડેટા લોગર સામેલ હોય છે. તમે તમારા સ્માર્ટફોન એપ દ્વારા રિયલ-ટાઇમ વીજ ઉત્પાદન, રોજના યુનિટ્સ, માસિક બચત અને ગ્રીડમાં જમા થયેલ યુનિટ્સ ગમે ત્યાંથી સરળતાથી જોઈ શકો છો.'
      },
      {
        documentId: 'f-12',
        category: 'installation',
        question: 'સોલાર પેનલ માટે શું જાળવણી જરૂરી છે, અને શું તે વાદળછાયા/ચોમાસામાં કામ કરે છે?',
        answer: 'સોલાર પેનલ્સને ખૂબ જ ઓછા મેન્ટેનન્સની જરૂર હોય છે—મહિનામાં એક કે બે વાર સાદા પાણીથી ધૂળ સાફ કરવી પૂરતી છે. વાદળછાયા કે ચોમાસાના દિવસોમાં પણ આડકતરા સૂર્યપ્રકાશથી વીજળી બને છે. રાત્રે કે વધારાની જરૂરિયાત વખતે નેટ મીટર આપમેળે ગ્રીડમાંથી વીજળી સપ્લાય ચાલુ રાખે છે.'
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
