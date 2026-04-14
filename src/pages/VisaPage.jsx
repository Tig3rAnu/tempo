import React, { useState, useEffect } from 'react';
import { getSteps as fetchVisaSteps, getCountries as fetchVisaCountries } from '../services/visaService.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, ArrowRight, Globe, Clock, DollarSign, FileText,
  Search, X, MapPin, Info, ChevronDown, ChevronUp, ExternalLink, Building2,
  Shield, AlertCircle, BookOpen, Plane, Users, CreditCard, Calendar,
  Phone, Mail, Landmark, ClipboardList, Award
} from 'lucide-react';

const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] } }
};

const REGION_TABS = [
  { id: 'all', label: 'All Countries' },
  { id: 'cis', label: 'CIS & Central Asia' },
  { id: 'western', label: 'Western Countries' },
];

const CIS_COUNTRIES = ['Russia', 'Kyrgyzstan', 'Uzbekistan', 'Kazakhstan', 'Tajikistan', 'Armenia', 'Georgia', 'Ukraine'];

// Detailed visa information for each country
const VISA_DETAILS = {
  'Russia': {
    eligibility: [
      'Valid passport with at least 18 months validity',
      'Confirmed admission letter from a Russian university',
      'Invitation letter issued by the Russian Ministry of Internal Affairs (MVD)',
      'Medical certificate (HIV test required)',
      'No criminal record certificate',
      'Proof of financial support (min $500/month)',
      'Age: No upper limit for student visa'
    ],
    documentsRequired: [
      'Original passport + 2 photocopies',
      'Visa application form (filled online)',
      '2 passport-size photos (3.5x4.5 cm, white background)',
      'Original invitation letter from MVD',
      'Admission letter from university',
      'HIV test certificate (not older than 3 months)',
      'Medical insurance valid in Russia',
      'Proof of accommodation',
      'Bank statement (last 6 months)',
      'Education certificates (10th, 12th marksheets)',
      'NEET scorecard (for medical students from India)'
    ],
    eVisa: {
      available: true,
      details: 'Russia offers e-visa for citizens of 55 countries. However, for student visas, you must apply through the embassy/consulate or VFS. E-visa is only for short-term visits (up to 16 days).',
      url: 'https://electronic-visa.kdmid.ru/'
    },
    embassyApplication: {
      process: [
        'Step 1: Receive invitation letter from university (2-4 weeks)',
        'Step 2: Fill visa application at visa.kdmid.ru',
        'Step 3: Book appointment at Russian Embassy/VFS',
        'Step 4: Submit documents in person',
        'Step 5: Pay visa fee',
        'Step 6: Collect passport with visa (5-20 working days)'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Russian Federation, Shantipath, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-2611-0640/41/42',
        email: 'indrusembassy@mid.ru',
        website: 'https://india.mid.ru/',
        hours: 'Mon-Fri: 9:30 AM - 1:00 PM (Visa Section)'
      },
      consulates: [
        { city: 'Mumbai', address: 'Consulate General of Russia, 42 Jagmohandas Marg, Mumbai - 400006', phone: '+91-22-2363-3627' },
        { city: 'Kolkata', address: 'Consulate General of Russia, 22A Raja Santosh Roy Road, Kolkata - 700027', phone: '+91-33-2479-7006' },
        { city: 'Chennai', address: 'Consulate General of Russia, 14 Santhome High Road, Chennai - 600004', phone: '+91-44-2498-2320' }
      ]
    },
    vfsMediators: [
      {
        name: 'VFS Global (Russia Visa)',
        cities: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Jaipur', 'Chandigarh', 'Kochi'],
        website: 'https://visa.vfsglobal.com/ind/en/rus/',
        phone: '+91-22-6786-6012',
        email: 'info.ruin@vfsglobal.com',
        services: ['Visa application submission', 'Document verification', 'Biometric collection', 'Passport tracking', 'SMS notifications', 'Courier return service']
      }
    ],
    cost: {
      visaFee: '$80 (₹6,600 approx)',
      vfsServiceCharge: '₹1,980 + GST',
      insuranceCost: '$50-150/year',
      invitationLetterCost: 'Free (issued by university)',
      totalEstimate: '$130-230 (₹10,800-19,000)',
      paymentMethods: ['Cash', 'Demand Draft', 'Online Payment at VFS']
    },
    duration: {
      processingTime: '5-20 working days',
      expressProcessing: '1-3 working days (additional $40)',
      visaValidity: '90 days (single entry, extendable in Russia)',
      multipleEntry: 'Available after registration in Russia',
      extensionProcess: 'University assists with visa extension every year'
    },
    tips: [
      'Apply at least 45 days before travel date',
      'Invitation letter takes 2-4 weeks from university',
      'Keep original documents - photocopies not accepted',
      'Medical insurance must cover the entire stay period',
      'Register at local migration office within 7 days of arrival'
    ]
  },
  'Georgia': {
    eligibility: [
      'Valid passport with at least 6 months validity',
      'Admission confirmation from Georgian university',
      'No visa required for Indian citizens for 1 year stay',
      'For stays over 1 year: residence permit required',
      'Proof of sufficient funds ($3,000 minimum)',
      'Medical insurance coverage'
    ],
    documentsRequired: [
      'Valid passport',
      'Admission letter from university',
      'Proof of tuition fee payment',
      'Bank statement showing sufficient funds',
      'Medical insurance',
      'Accommodation proof',
      'Return flight ticket (optional but recommended)',
      'Passport-size photographs'
    ],
    eVisa: {
      available: true,
      details: 'Indian citizens do NOT need a visa for Georgia for stays up to 1 year! You can enter visa-free. For longer stays, apply for a residence permit after arrival.',
      url: 'https://www.evisa.gov.ge/'
    },
    embassyApplication: {
      process: [
        'Step 1: Get admission from Georgian university',
        'Step 2: Book flight ticket',
        'Step 3: Carry required documents',
        'Step 4: Enter Georgia visa-free (Indian passport)',
        'Step 5: Register at university',
        'Step 6: Apply for residence permit if staying >1 year'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Georgia, E-7/6, Vasant Vihar, New Delhi - 110057',
        phone: '+91-11-4600-5720',
        email: 'delhi.emb@mfa.gov.ge',
        website: 'https://www.geoconsul.gov.ge/',
        hours: 'Mon-Fri: 10:00 AM - 1:00 PM'
      },
      consulates: []
    },
    vfsMediators: [
      {
        name: 'Direct Entry (No Visa Required)',
        cities: ['All Indian airports with international flights'],
        website: 'https://www.geoconsul.gov.ge/',
        phone: '+91-11-4600-5720',
        email: 'delhi.emb@mfa.gov.ge',
        services: ['Visa-free entry for Indian citizens', 'Residence permit assistance through university']
      }
    ],
    cost: {
      visaFee: 'FREE (Visa-free entry for Indians)',
      vfsServiceCharge: 'N/A',
      insuranceCost: '$40-100/year',
      invitationLetterCost: 'Free from university',
      totalEstimate: '$40-100 (insurance only)',
      paymentMethods: ['N/A - Visa free']
    },
    duration: {
      processingTime: 'Instant (visa-free entry)',
      expressProcessing: 'N/A',
      visaValidity: '1 year visa-free stay',
      multipleEntry: 'Yes, multiple entries allowed',
      extensionProcess: 'Apply for residence permit through university'
    },
    tips: [
      'No visa needed! Just carry your admission letter and passport',
      'Register at university within first week',
      'Apply for residence permit if staying more than 1 year',
      'Medical insurance is highly recommended',
      'One of the easiest countries for Indian students'
    ]
  },
  'Uzbekistan': {
    eligibility: [
      'Valid passport with at least 6 months validity',
      'Admission letter from Uzbek university',
      'Invitation letter from university/Ministry of Foreign Affairs',
      'Medical fitness certificate',
      'Proof of financial support',
      'No criminal record'
    ],
    documentsRequired: [
      'Original passport + copies',
      'Visa application form',
      '2 passport-size photos (3.5x4.5 cm)',
      'Invitation/admission letter from university',
      'Medical certificate',
      'HIV test report',
      'Bank statement (last 6 months)',
      'Travel insurance',
      '10th and 12th marksheets',
      'NEET scorecard (for medical students)'
    ],
    eVisa: {
      available: true,
      details: 'Uzbekistan offers e-visa for Indian citizens. Student visa requires embassy application, but short-term e-visa (30 days) is available online for initial entry.',
      url: 'https://e-visa.gov.uz/'
    },
    embassyApplication: {
      process: [
        'Step 1: Get admission and invitation letter from university',
        'Step 2: Apply online at e-visa.gov.uz for initial entry OR',
        'Step 3: Submit documents at Uzbekistan Embassy in Delhi',
        'Step 4: Pay visa fee',
        'Step 5: Collect visa (3-7 working days)',
        'Step 6: Convert to student visa after arrival'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Uzbekistan, EP-40, Dr. S. Radhakrishnan Marg, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-2467-8052',
        email: 'embassy@uzbekistan.co.in',
        website: 'https://www.uzbekembassy.in/',
        hours: 'Mon-Fri: 9:30 AM - 5:30 PM'
      },
      consulates: []
    },
    vfsMediators: [
      {
        name: 'Embassy of Uzbekistan (Direct)',
        cities: ['New Delhi'],
        website: 'https://www.uzbekembassy.in/',
        phone: '+91-11-2467-8052',
        email: 'embassy@uzbekistan.co.in',
        services: ['Direct visa application', 'Document attestation', 'Student visa processing']
      }
    ],
    cost: {
      visaFee: '$40 (₹3,300 approx)',
      vfsServiceCharge: 'N/A (Direct embassy)',
      insuranceCost: '$30-80/year',
      invitationLetterCost: 'Free from university',
      totalEstimate: '$70-120 (₹5,800-10,000)',
      paymentMethods: ['Cash', 'Demand Draft']
    },
    duration: {
      processingTime: '3-7 working days',
      expressProcessing: '1-2 working days (additional $20)',
      visaValidity: '30 days (extendable)',
      multipleEntry: 'Available after registration',
      extensionProcess: 'University assists with annual extension'
    },
    tips: [
      'E-visa available for short-term entry',
      'Very affordable visa and living costs',
      'University handles most paperwork',
      'Simple and fast processing',
      'Growing education hub with modern facilities'
    ]
  },
  'Kyrgyzstan': {
    eligibility: [
      'Valid passport with at least 6 months validity',
      'Admission letter from Kyrgyz university',
      'Invitation letter from university',
      'Medical fitness certificate',
      'Proof of financial support',
      'No criminal record'
    ],
    documentsRequired: [
      'Original passport + copies',
      'Visa application form',
      '2 passport-size photos',
      'Invitation/admission letter',
      'Medical certificate & HIV test',
      'Bank statement',
      'Travel insurance',
      'Education certificates',
      'NEET scorecard (for medical)'
    ],
    eVisa: {
      available: true,
      details: 'Kyrgyzstan offers e-visa for Indian citizens. 30-day e-visa available online. Student visa can be obtained at embassy or converted after arrival.',
      url: 'https://www.evisa.e-gov.kg/'
    },
    embassyApplication: {
      process: [
        'Step 1: Get admission from Kyrgyz university',
        'Step 2: Receive invitation letter',
        'Step 3: Apply for e-visa online or at embassy',
        'Step 4: Submit documents',
        'Step 5: Pay visa fee',
        'Step 6: Collect visa and travel'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Kyrgyz Republic, D-1/108, Vasant Kunj, New Delhi - 110070',
        phone: '+91-11-2613-9852',
        email: 'kgembassy.in@mfa.gov.kg',
        website: 'https://mfa.gov.kg/',
        hours: 'Mon-Fri: 9:00 AM - 5:00 PM'
      },
      consulates: []
    },
    vfsMediators: [
      {
        name: 'Embassy of Kyrgyzstan (Direct)',
        cities: ['New Delhi'],
        website: 'https://mfa.gov.kg/',
        phone: '+91-11-2613-9852',
        email: 'kgembassy.in@mfa.gov.kg',
        services: ['Direct visa application', 'Student visa processing', 'Document verification']
      }
    ],
    cost: {
      visaFee: '$50 (₹4,100 approx)',
      vfsServiceCharge: 'N/A',
      insuranceCost: '$30-70/year',
      invitationLetterCost: 'Free from university',
      totalEstimate: '$80-120 (₹6,600-10,000)',
      paymentMethods: ['Cash', 'Bank Transfer']
    },
    duration: {
      processingTime: '5-10 working days',
      expressProcessing: '2-3 working days',
      visaValidity: '30 days (extendable)',
      multipleEntry: 'Available after registration',
      extensionProcess: 'Annual extension through university'
    },
    tips: [
      'E-visa makes it very convenient',
      'Affordable destination for medical education',
      'University provides full assistance',
      'Direct flights available from Delhi',
      'English-medium programs available'
    ]
  },
  'Kazakhstan': {
    eligibility: [
      'Valid passport with at least 6 months validity',
      'Admission letter from Kazakh university',
      'Visa-free entry for up to 30 days (can convert)',
      'Medical certificate',
      'Proof of financial support'
    ],
    documentsRequired: [
      'Valid passport',
      'Admission letter',
      'Medical insurance',
      'Bank statement',
      'Photos',
      'Education certificates'
    ],
    eVisa: {
      available: true,
      details: 'Indian citizens can enter Kazakhstan visa-free for up to 30 days. For student stays, apply for a student visa/residence permit after arrival.',
      url: 'https://www.vmp.gov.kz/'
    },
    embassyApplication: {
      process: [
        'Step 1: Get admission from university',
        'Step 2: Enter Kazakhstan visa-free (up to 30 days)',
        'Step 3: University assists with student visa/permit',
        'Step 4: Submit documents at migration office',
        'Step 5: Receive residence permit'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Kazakhstan, 61, Poorvi Marg, Vasant Vihar, New Delhi - 110057',
        phone: '+91-11-4600-9700',
        email: 'delhi@mfa.kz',
        website: 'https://www.gov.kz/memleket/entities/mfa-delhi',
        hours: 'Mon-Fri: 9:00 AM - 6:00 PM'
      },
      consulates: []
    },
    vfsMediators: [],
    cost: {
      visaFee: '$60 (₹5,000 approx)',
      vfsServiceCharge: 'N/A',
      insuranceCost: '$40-100/year',
      invitationLetterCost: 'Free from university',
      totalEstimate: '$100-160 (₹8,300-13,300)',
      paymentMethods: ['Cash', 'Bank Transfer']
    },
    duration: {
      processingTime: '5-15 working days',
      expressProcessing: 'Available',
      visaValidity: '30 days visa-free, then student permit',
      multipleEntry: 'Yes with residence permit',
      extensionProcess: 'Annual extension through university'
    },
    tips: [
      '30-day visa-free entry makes initial travel easy',
      'Convert to student visa after arrival',
      'Growing education sector',
      'Affordable living costs'
    ]
  },
  'Tajikistan': {
    eligibility: [
      'Valid passport with at least 6 months validity',
      'Admission letter from Tajik university',
      'Invitation letter from university',
      'Medical certificate',
      'Proof of financial support'
    ],
    documentsRequired: [
      'Original passport + copies',
      'Visa application form',
      '2 passport-size photos',
      'Invitation letter from university',
      'Medical certificate',
      'Bank statement',
      'Education certificates'
    ],
    eVisa: {
      available: true,
      details: 'Tajikistan offers e-visa for Indian citizens. Processing takes 1-3 business days.',
      url: 'https://www.evisa.tj/'
    },
    embassyApplication: {
      process: [
        'Step 1: Get admission from university',
        'Step 2: Apply for e-visa online',
        'Step 3: Or apply at embassy in Delhi',
        'Step 4: Submit documents and pay fee',
        'Step 5: Collect visa',
        'Step 6: Travel and register at university'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Embassy of Tajikistan, B-14/14, Vasant Vihar, New Delhi - 110057',
        phone: '+91-11-2614-4651',
        email: 'tajemb.delhi@gmail.com',
        website: 'https://mfa.tj/',
        hours: 'Mon-Fri: 9:00 AM - 5:00 PM'
      },
      consulates: []
    },
    vfsMediators: [],
    cost: {
      visaFee: '$35 (₹2,900 approx)',
      vfsServiceCharge: 'N/A',
      insuranceCost: '$25-60/year',
      invitationLetterCost: 'Free from university',
      totalEstimate: '$60-95 (₹5,000-7,900)',
      paymentMethods: ['Cash', 'Online (e-visa)']
    },
    duration: {
      processingTime: '1-5 working days',
      expressProcessing: '1-2 days (e-visa)',
      visaValidity: '30-90 days (extendable)',
      multipleEntry: 'Available',
      extensionProcess: 'University assists with extension'
    },
    tips: [
      'Most affordable study destination',
      'E-visa makes it very easy',
      'Direct flights from Delhi available',
      'University handles most formalities',
      'WHO-recognized medical degrees'
    ]
  },
  'United States': {
    eligibility: [
      'Valid passport with at least 6 months validity beyond intended stay',
      'Form I-20 from SEVP-certified school',
      'SEVIS fee payment receipt (I-901)',
      'Proof of financial support for entire program',
      'Strong ties to home country',
      'English proficiency (TOEFL/IELTS scores)',
      'No immigration intent'
    ],
    documentsRequired: [
      'Valid passport',
      'DS-160 confirmation page',
      'Visa fee receipt',
      'SEVIS I-901 fee receipt',
      'Form I-20 from university',
      'Passport-size photo (2x2 inches, US specs)',
      'Financial documents (bank statements, sponsor letters)',
      'Academic transcripts and certificates',
      'Standardized test scores (GRE/GMAT/TOEFL/IELTS)',
      'Admission letter',
      'SOP (Statement of Purpose)',
      'Resume/CV',
      'Previous visa stamps (if any)'
    ],
    eVisa: {
      available: false,
      details: 'The US does not offer e-visa. All F-1 student visa applicants must attend an in-person interview at the US Embassy/Consulate.',
      url: 'https://ceac.state.gov/ceac/'
    },
    embassyApplication: {
      process: [
        'Step 1: Receive I-20 from university',
        'Step 2: Pay SEVIS fee ($350) at fmjfee.com',
        'Step 3: Complete DS-160 online application',
        'Step 4: Pay visa application fee ($185)',
        'Step 5: Schedule interview at US Embassy/Consulate',
        'Step 6: Attend visa interview with all documents',
        'Step 7: Receive passport with visa (3-5 days after approval)'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'US Embassy, Shantipath, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-2419-8000',
        email: 'support-india@ustraveldocs.com',
        website: 'https://www.ustraveldocs.com/in/',
        hours: 'Mon-Fri: 8:00 AM - 5:00 PM'
      },
      consulates: [
        { city: 'Mumbai', address: 'US Consulate General, C-49, G-Block, BKC, Mumbai - 400051', phone: '+91-22-2672-4000' },
        { city: 'Chennai', address: 'US Consulate General, 220 Anna Salai, Chennai - 600006', phone: '+91-44-2857-4000' },
        { city: 'Kolkata', address: 'US Consulate General, 5/1 Ho Chi Minh Sarani, Kolkata - 700071', phone: '+91-33-3984-2400' },
        { city: 'Hyderabad', address: 'US Consulate General, Paigah Palace, Hyderabad - 500032', phone: '+91-40-4033-8300' }
      ]
    },
    vfsMediators: [
      {
        name: 'US Travel Docs (CGI Federal)',
        cities: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Hyderabad'],
        website: 'https://www.ustraveldocs.com/in/',
        phone: '+91-120-484-4444',
        email: 'support-india@ustraveldocs.com',
        services: ['Interview scheduling', 'Document delivery', 'Visa status tracking', 'Passport return via courier']
      }
    ],
    cost: {
      visaFee: '$185 (₹15,300 approx)',
      vfsServiceCharge: 'Included in visa fee',
      insuranceCost: '$500-2000/year',
      invitationLetterCost: 'Free (I-20 from university)',
      totalEstimate: '$535-2,185+ (₹44,400-181,000)',
      paymentMethods: ['Online payment', 'Cash at designated banks']
    },
    duration: {
      processingTime: '3-5 weeks (including interview wait time)',
      expressProcessing: 'Emergency appointments available in limited cases',
      visaValidity: 'Duration of study program (up to 5 years)',
      multipleEntry: 'Yes, multiple entry',
      extensionProcess: 'Through university DSO and USCIS'
    },
    tips: [
      'Apply at least 120 days before program start',
      'Prepare thoroughly for visa interview',
      'Show strong ties to home country',
      'Financial documents are critical - show full funding',
      'Be honest and confident during interview',
      'Carry all original documents'
    ]
  },
  'United Kingdom': {
    eligibility: [
      'Valid passport',
      'CAS (Confirmation of Acceptance for Studies) from licensed sponsor',
      'English language proficiency (IELTS 6.0+)',
      'Proof of funds (tuition + £1,334/month for London)',
      'TB test certificate (for stays >6 months)',
      'ATAS certificate (for certain subjects)'
    ],
    documentsRequired: [
      'Valid passport',
      'CAS number from university',
      'Proof of English language proficiency',
      'Financial documents (28 consecutive days)',
      'TB test results',
      'Academic certificates',
      'Passport-size photographs',
      'IHS (Immigration Health Surcharge) payment receipt'
    ],
    eVisa: {
      available: false,
      details: 'UK does not offer e-visa for student visas. Apply online and visit VFS center for biometrics.',
      url: 'https://www.gov.uk/student-visa'
    },
    embassyApplication: {
      process: [
        'Step 1: Receive CAS from university',
        'Step 2: Apply online at gov.uk/student-visa',
        'Step 3: Pay visa fee (£363) and IHS (£470/year)',
        'Step 4: Book VFS appointment for biometrics',
        'Step 5: Submit documents at VFS center',
        'Step 6: Receive decision (3 weeks standard)'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'British High Commission, Shantipath, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-2419-2100',
        email: 'web.newdelhi@fco.gov.uk',
        website: 'https://www.gov.uk/world/organisations/british-high-commission-new-delhi',
        hours: 'Mon-Fri: 8:30 AM - 5:00 PM'
      },
      consulates: [
        { city: 'Mumbai', address: 'British Deputy High Commission, Naman Chambers, BKC, Mumbai', phone: '+91-22-6650-2222' },
        { city: 'Chennai', address: 'British Deputy High Commission, 20 Anderson Road, Chennai', phone: '+91-44-4219-2151' }
      ]
    },
    vfsMediators: [
      {
        name: 'VFS Global (UK Visa)',
        cities: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad', 'Chandigarh', 'Kochi', 'Pune', 'Ahmedabad', 'Jaipur', 'Jalandhar'],
        website: 'https://visa.vfsglobal.com/ind/en/gbr/',
        phone: '+91-22-6786-6000',
        email: 'info.ukin@vfsglobal.com',
        services: ['Biometric enrollment', 'Document scanning', 'Priority visa service', 'Passport tracking', 'Walk-in without appointment (select centers)']
      }
    ],
    cost: {
      visaFee: '£363 (₹38,000 approx)',
      vfsServiceCharge: '£55-110 additional services',
      insuranceCost: '£470/year (IHS mandatory)',
      invitationLetterCost: 'Free (CAS from university)',
      totalEstimate: '£833+ (₹87,000+)',
      paymentMethods: ['Online payment (required)', 'Debit/Credit card']
    },
    duration: {
      processingTime: '3 weeks (standard)',
      expressProcessing: '5 working days (Priority - £500 extra)',
      visaValidity: 'Duration of course + 4 months',
      multipleEntry: 'Yes',
      extensionProcess: 'Apply online from within UK'
    },
    tips: [
      'Apply as soon as you receive CAS',
      'Financial documents must show funds held for 28 consecutive days',
      'IHS payment is mandatory before visa application',
      'Priority processing available for faster results',
      'Post-study work visa (Graduate Route) available for 2 years'
    ]
  },
  'Canada': {
    eligibility: [
      'Valid passport',
      'Letter of acceptance from DLI (Designated Learning Institution)',
      'Proof of sufficient funds (CAD $20,635 + tuition for first year)',
      'No criminal record',
      'Medical exam (if required)',
      'English/French proficiency'
    ],
    documentsRequired: [
      'Valid passport',
      'Acceptance letter from DLI',
      'Proof of financial support',
      'Passport photographs',
      'Immigration medical exam results',
      'Police clearance certificate',
      'SOP/Letter of explanation',
      'Academic transcripts',
      'English test scores (IELTS)'
    ],
    eVisa: {
      available: true,
      details: 'Canada study permits are applied online. No in-person visit needed for application, but biometrics must be given at VFS/VAC.',
      url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html'
    },
    embassyApplication: {
      process: [
        'Step 1: Get acceptance from DLI',
        'Step 2: Apply online at IRCC portal',
        'Step 3: Pay application fee (CAD $150)',
        'Step 4: Give biometrics at VFS/VAC (CAD $85)',
        'Step 5: Medical exam if requested',
        'Step 6: Receive study permit (4-8 weeks)'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'High Commission of Canada, 7/8 Shantipath, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-4178-2000',
        email: 'delhi-cs@international.gc.ca',
        website: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
        hours: 'Mon-Thu: 8:00 AM - 4:30 PM, Fri: 8:00 AM - 1:00 PM'
      },
      consulates: [
        { city: 'Chandigarh', address: 'Canada Visa Office, SCO 54-56, Sector 17A, Chandigarh', phone: '+91-172-505-0300' }
      ]
    },
    vfsMediators: [
      {
        name: 'VFS Global (Canada VAC)',
        cities: ['New Delhi', 'Chandigarh', 'Jalandhar', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune'],
        website: 'https://visa.vfsglobal.com/ind/en/can/',
        phone: '+91-22-6786-6000',
        email: 'info.canin@vfsglobal.com',
        services: ['Biometric collection', 'Document submission', 'Passport tracking', 'Courier service', 'Photo service']
      }
    ],
    cost: {
      visaFee: 'CAD $150 (₹9,300 approx)',
      vfsServiceCharge: 'CAD $85 (biometrics)',
      insuranceCost: 'CAD $600-900/year',
      invitationLetterCost: 'Free (acceptance letter)',
      totalEstimate: 'CAD $835-1,135 (₹52,000-70,000)',
      paymentMethods: ['Online payment', 'Credit/Debit card']
    },
    duration: {
      processingTime: '4-8 weeks',
      expressProcessing: 'SDS (Student Direct Stream) - 20 calendar days',
      visaValidity: 'Duration of study + 90 days',
      multipleEntry: 'Yes',
      extensionProcess: 'Apply online from within Canada'
    },
    tips: [
      'Apply through SDS for faster processing',
      'GIC certificate speeds up processing significantly',
      'PGWP (Post-Graduation Work Permit) available',
      'Pathway to Permanent Residency',
      'Part-time work allowed during studies'
    ]
  },
  'Australia': {
    eligibility: [
      'Valid passport',
      'CoE (Confirmation of Enrolment) from registered institution',
      'Genuine Temporary Entrant (GTE) requirement',
      'OSHC (Overseas Student Health Cover)',
      'English proficiency (IELTS 5.5+)',
      'Sufficient funds for first year',
      'Character and health requirements'
    ],
    documentsRequired: [
      'Valid passport',
      'CoE from institution',
      'OSHC policy',
      'Financial evidence (AUD $21,041/year + tuition)',
      'English test results',
      'GTE statement',
      'Academic transcripts',
      'Health examination results',
      'Police clearance',
      'Passport photographs'
    ],
    eVisa: {
      available: true,
      details: 'Australia student visa (subclass 500) is applied online through ImmiAccount. No paper application.',
      url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500'
    },
    embassyApplication: {
      process: [
        'Step 1: Get CoE from Australian institution',
        'Step 2: Purchase OSHC',
        'Step 3: Create ImmiAccount and apply online',
        'Step 4: Pay visa fee (AUD $650)',
        'Step 5: Complete biometrics at VFS',
        'Step 6: Health examination',
        'Step 7: Receive visa grant (4-6 weeks)'
      ],
      embassyAddress: {
        city: 'New Delhi',
        address: 'Australian High Commission, 1/50G Shantipath, Chanakyapuri, New Delhi - 110021',
        phone: '+91-11-4139-9900',
        email: 'immigration.newdelhi@dfat.gov.au',
        website: 'https://india.highcommission.gov.au/',
        hours: 'Mon-Fri: 8:30 AM - 5:00 PM'
      },
      consulates: [
        { city: 'Mumbai', address: 'Australian Consulate General, 36 Maker Chambers VI, Mumbai - 400021', phone: '+91-22-6757-4900' },
        { city: 'Chennai', address: 'Australian Consulate General, 6th Floor, ASV Suntech, Chennai', phone: '+91-44-4592-5400' }
      ]
    },
    vfsMediators: [
      {
        name: 'VFS Global (Australia)',
        cities: ['New Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chandigarh', 'Pune', 'Kochi', 'Jaipur'],
        website: 'https://visa.vfsglobal.com/ind/en/aus/',
        phone: '+91-22-6786-6000',
        email: 'info.auin@vfsglobal.com',
        services: ['Biometric collection', 'Document submission', 'Health examination referrals', 'Passport tracking']
      }
    ],
    cost: {
      visaFee: 'AUD $650 (₹35,000 approx)',
      vfsServiceCharge: 'Included',
      insuranceCost: 'AUD $500-600/year (OSHC)',
      invitationLetterCost: 'Free (CoE from institution)',
      totalEstimate: 'AUD $1,150-1,250 (₹62,000-67,000)',
      paymentMethods: ['Online payment', 'Credit/Debit card']
    },
    duration: {
      processingTime: '4-6 weeks',
      expressProcessing: 'Not available for student visas',
      visaValidity: 'Duration of course + 2 months',
      multipleEntry: 'Yes',
      extensionProcess: 'Apply online through ImmiAccount'
    },
    tips: [
      'Apply online only - no paper applications',
      'OSHC is mandatory before visa application',
      'GTE statement is crucial - explain genuine intent',
      'Post-study work visa available (2-4 years)',
      'Part-time work allowed (48 hrs/fortnight during studies)'
    ]
  }
};

// Add default details for countries without specific data
const getVisaDetails = (countryName) => {
  return VISA_DETAILS[countryName] || null;
};

function DetailSection({ icon: Icon, title, children, gradient = 'from-gray-500 to-gray-700' }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-lg bg-linear-to-br ${gradient} flex items-center justify-center shadow-sm`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h5 className="text-sm font-bold text-gray-900">{title}</h5>
      </div>
      {children}
    </div>
  );
}

function VisaDetailPanel({ country, details, onClose }) {
  const [activeDetailTab, setActiveDetailTab] = useState('eligibility');

  const detailTabs = [
    { id: 'eligibility', label: 'Eligibility', icon: Shield },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'evisa', label: 'E-Visa', icon: Globe },
    { id: 'embassy', label: 'Embassy', icon: Building2 },
    { id: 'vfs', label: 'VFS / Mediators', icon: Landmark },
    { id: 'cost', label: 'Cost', icon: CreditCard },
    { id: 'duration', label: 'Duration', icon: Calendar },
    { id: 'tips', label: 'Tips', icon: Award },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
      className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="bg-linear-to-r from-orange-500 via-red-500 to-pink-600 p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h3 className="text-xl font-bold">{country.name} Student Visa</h3>
              <p className="text-white/70 text-sm">{country.type} \u2022 {country.processing} \u2022 {country.fee}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/20 transition-colors duration-150" aria-label="Close">
            <X className="w-5 h-5 text-white/80" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-100 px-4 overflow-x-auto custom-scrollbar">
        <div className="flex gap-0.5 py-2">
          {detailTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeDetailTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDetailTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${isActive ? 'bg-orange-50 text-orange-700 shadow-xs' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
              >
                <Icon className="w-3.5 h-3.5" />{tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5 max-h-[60vh] overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDetailTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {/* ELIGIBILITY */}
            {activeDetailTab === 'eligibility' && (
              <DetailSection icon={Shield} title="Eligibility Requirements" gradient="from-emerald-500 to-teal-600">
                <div className="space-y-2">
                  {details.eligibility.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* DOCUMENTS */}
            {activeDetailTab === 'documents' && (
              <DetailSection icon={FileText} title="Documents Required" gradient="from-blue-500 to-indigo-600">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {details.documentsRequired.map((doc, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</div>
                      <p className="text-sm text-gray-700">{doc}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}

            {/* E-VISA */}
            {activeDetailTab === 'evisa' && (
              <DetailSection icon={Globe} title="Online E-Visa" gradient="from-purple-500 to-indigo-600">
                <div className={`p-4 rounded-xl border ${details.eVisa.available ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {details.eVisa.available ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-amber-500" />}
                    <p className={`text-sm font-bold ${details.eVisa.available ? 'text-emerald-800' : 'text-amber-800'}`}>
                      {details.eVisa.available ? 'E-Visa Available' : 'E-Visa Not Available for Student Visa'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{details.eVisa.details}</p>
                  {details.eVisa.url && (
                    <a href={details.eVisa.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-white rounded-lg text-sm font-semibold text-purple-600 border border-purple-200 hover:bg-purple-50 transition-colors duration-150">
                      <ExternalLink className="w-3.5 h-3.5" />Visit Official E-Visa Portal
                    </a>
                  )}
                </div>
              </DetailSection>
            )}

            {/* EMBASSY */}
            {activeDetailTab === 'embassy' && (
              <div className="space-y-5">
                <DetailSection icon={ClipboardList} title="Application Process" gradient="from-orange-500 to-red-600">
                  <div className="space-y-2">
                    {details.embassyApplication.process.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">{i + 1}</div>
                        <p className="text-sm text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </DetailSection>

                <DetailSection icon={Building2} title="Embassy Address" gradient="from-blue-600 to-indigo-700">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 space-y-2">
                    <p className="text-sm font-bold text-gray-900">{details.embassyApplication.embassyAddress.city}</p>
                    <p className="text-sm text-gray-700">{details.embassyApplication.embassyAddress.address}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-600"><Phone className="w-3.5 h-3.5 text-blue-500" />{details.embassyApplication.embassyAddress.phone}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-600"><Mail className="w-3.5 h-3.5 text-blue-500" />{details.embassyApplication.embassyAddress.email}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-600"><Clock className="w-3.5 h-3.5 text-blue-500" />{details.embassyApplication.embassyAddress.hours}</div>
                      <a href={details.embassyApplication.embassyAddress.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-600 font-semibold hover:underline"><ExternalLink className="w-3.5 h-3.5" />Official Website</a>
                    </div>
                  </div>
                </DetailSection>

                {details.embassyApplication.consulates.length > 0 && (
                  <DetailSection icon={MapPin} title="Consulates" gradient="from-teal-500 to-cyan-600">
                    <div className="space-y-2">
                      {details.embassyApplication.consulates.map((cons, i) => (
                        <div key={i} className="p-3 bg-gray-50 rounded-xl">
                          <p className="text-sm font-bold text-gray-900 mb-1">{cons.city}</p>
                          <p className="text-xs text-gray-600">{cons.address}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><Phone className="w-3 h-3" />{cons.phone}</p>
                        </div>
                      ))}
                    </div>
                  </DetailSection>
                )}
              </div>
            )}

            {/* VFS / MEDIATORS */}
            {activeDetailTab === 'vfs' && (
              <DetailSection icon={Landmark} title="VFS / Visa Mediators" gradient="from-amber-500 to-orange-600">
                {details.vfsMediators.length === 0 ? (
                  <div className="p-4 bg-gray-50 rounded-xl text-center">
                    <Landmark className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Apply directly at the embassy. No VFS/mediator required.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {details.vfsMediators.map((vfs, i) => (
                      <div key={i} className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <h6 className="text-sm font-bold text-gray-900 mb-2">{vfs.name}</h6>
                        <div className="space-y-3">
                          <div>
                            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Available Centers</p>
                            <div className="flex flex-wrap gap-1.5">
                              {vfs.cities.map(city => (
                                <span key={city} className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-gray-700 border border-amber-100">{city}</span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600"><Phone className="w-3.5 h-3.5 text-amber-500" />{vfs.phone}</div>
                            <div className="flex items-center gap-2 text-xs text-gray-600"><Mail className="w-3.5 h-3.5 text-amber-500" />{vfs.email}</div>
                          </div>
                          <a href={vfs.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors duration-150">
                            <ExternalLink className="w-3 h-3" />Visit Website
                          </a>
                          {vfs.services.length > 0 && (
                            <div>
                              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Services</p>
                              <div className="flex flex-wrap gap-1.5">
                                {vfs.services.map(service => (
                                  <span key={service} className="inline-flex items-center gap-1 px-2 py-1 bg-white rounded-lg text-xs text-gray-600 border border-gray-100">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />{service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DetailSection>
            )}

            {/* COST */}
            {activeDetailTab === 'cost' && (
              <DetailSection icon={CreditCard} title="Visa Cost Breakdown" gradient="from-green-500 to-emerald-600">
                <div className="space-y-2">
                  {[
                    { label: 'Visa Application Fee', value: details.cost.visaFee, icon: DollarSign },
                    { label: 'VFS Service Charge', value: details.cost.vfsServiceCharge, icon: Landmark },
                    { label: 'Medical Insurance', value: details.cost.insuranceCost, icon: Shield },
                    { label: 'Invitation Letter', value: details.cost.invitationLetterCost, icon: FileText },
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2.5">
                          <ItemIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{item.value}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between p-4 bg-linear-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-200">
                    <span className="text-sm font-bold text-emerald-800">Total Estimated Cost</span>
                    <span className="text-lg font-black text-emerald-700">{details.cost.totalEstimate}</span>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Payment Methods</p>
                    <div className="flex flex-wrap gap-1.5">
                      {details.cost.paymentMethods.map(method => (
                        <span key={method} className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-gray-700 border border-blue-100">{method}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </DetailSection>
            )}

            {/* DURATION */}
            {activeDetailTab === 'duration' && (
              <DetailSection icon={Calendar} title="Processing Time & Duration" gradient="from-indigo-500 to-purple-600">
                <div className="space-y-2">
                  {[
                    { label: 'Standard Processing', value: details.duration.processingTime, icon: Clock },
                    { label: 'Express Processing', value: details.duration.expressProcessing, icon: Plane },
                    { label: 'Visa Validity', value: details.duration.visaValidity, icon: Calendar },
                    { label: 'Multiple Entry', value: details.duration.multipleEntry, icon: ArrowRight },
                    { label: 'Extension Process', value: details.duration.extensionProcess, icon: ClipboardList },
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl gap-4">
                        <div className="flex items-center gap-2.5 shrink-0">
                          <ItemIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 text-right">{item.value}</span>
                      </div>
                    );
                  })}
                </div>
              </DetailSection>
            )}

            {/* TIPS */}
            {activeDetailTab === 'tips' && (
              <DetailSection icon={Award} title="Important Tips" gradient="from-yellow-500 to-orange-600">
                <div className="space-y-2">
                  {details.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <div className="w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">\u2605</div>
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </DetailSection>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function VisaPage() {
  const [steps, setSteps] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [stepsLoading, setStepsLoading] = useState(false);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState('all');
  const [expandedCountry, setExpandedCountry] = useState(null);

  useEffect(() => {
    let canceled = false;
    setStepsLoading(true);
    fetchVisaSteps()
      .then(res => { if (!canceled) setSteps(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setStepsLoading(false); });
    setCountriesLoading(true);
    fetchVisaCountries()
      .then(res => { if (!canceled) setAllCountries(res.data || []); })
      .catch(() => {})
      .finally(() => { if (!canceled) setCountriesLoading(false); });
    return () => { canceled = true; };
  }, []);


  const filteredCountries = allCountries.filter(country => {
    const matchesSearch = !searchQuery || country.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = activeRegion === 'all'
      || (activeRegion === 'cis' && CIS_COUNTRIES.includes(country.name))
      || (activeRegion === 'western' && !CIS_COUNTRIES.includes(country.name));
    return matchesSearch && matchesRegion;
  });

  const getStepIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-6 h-6 text-emerald-500" />;
    if (status === 'current') return <div className="w-6 h-6 rounded-full border-[3px] border-orange-500 flex items-center justify-center"><div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" /></div>;
    return <Circle className="w-6 h-6 text-gray-300" />;
  };

  const getStepLineColor = (status) => {
    if (status === 'completed') return 'bg-emerald-500';
    if (status === 'current') return 'bg-linear-to-b from-orange-500 to-gray-200';
    return 'bg-gray-200';
  };

  const expandedDetails = expandedCountry ? getVisaDetails(allCountries.find(c => c.id === expandedCountry)?.name) : null;
  const expandedCountryData = allCountries.find(c => c.id === expandedCountry);

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Visa Assistance</h2>
        <p className="text-gray-500 text-sm mt-0.5">Complete visa guide with eligibility, documents, costs & more \u2022 {allCountries.length} destinations</p>
      </motion.div>

      {/* Visa Steps Timeline */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Application Progress</h3>
        {stepsLoading ? (
          <div className="text-center py-8 text-gray-400">Loading steps...</div>
        ) : (
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  {getStepIcon(step.status)}
                  {index < steps.length - 1 && (
                    <div className={`w-0.5 h-12 mt-1 ${getStepLineColor(step.status)} rounded-full`} />
                  )}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-bold ${
                      step.status === 'completed' ? 'text-emerald-700' :
                      step.status === 'current' ? 'text-orange-700' :
                      'text-gray-400'
                    }`}>
                      Step {step.step}: {step.title}
                    </h4>
                    {step.status === 'completed' && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[10px] font-bold uppercase">Done</span>
                    )}
                    {step.status === 'current' && (
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md text-[10px] font-bold uppercase">In Progress</span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${
                    step.status === 'upcoming' ? 'text-gray-300' : 'text-gray-500'
                  }`}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Country Search & Filter */}
      <motion.div variants={staggerItem} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search countries..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500/50 focus:border-orange-300 shadow-xs transition-all duration-200"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-150" aria-label="Clear">
                <X className="w-3.5 h-3.5 text-gray-400" />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 bg-gray-100 p-1.5 rounded-2xl">
            {REGION_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveRegion(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${activeRegion === tab.id ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{filteredCountries.length}</span> destination{filteredCountries.length !== 1 ? 's' : ''} available
          {expandedCountry && <span className="text-orange-600 font-semibold ml-2">\u2022 Viewing detailed visa info</span>}
        </p>
      </motion.div>

      {/* Expanded Visa Detail Panel */}
      <AnimatePresence>
        {expandedCountry && expandedDetails && expandedCountryData && (
          <motion.div variants={staggerItem}>
            <VisaDetailPanel
              country={expandedCountryData}
              details={expandedDetails}
              onClose={() => setExpandedCountry(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Country Cards */}
      <motion.div variants={staggerItem}>
        {countriesLoading ? (
          <div className="text-center py-8 text-gray-400">Loading countries...</div>
        ) : filteredCountries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No countries found</h3>
            <p className="text-sm text-gray-500">Try a different search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCountries.map((country) => {
              const isCIS = CIS_COUNTRIES.includes(country.name);
              const hasDetails = !!getVisaDetails(country.name);
              const isExpanded = expandedCountry === country.id;
              return (
                <motion.div
                  key={country.id}
                  variants={staggerItem}
                  whileHover={{ y: -3 }}
                  className={`bg-white rounded-2xl border shadow-xs hover:shadow-lg transition-all duration-300 group overflow-hidden ${isExpanded ? 'border-orange-300 ring-2 ring-orange-200' : 'border-gray-100/80'}`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h4 className="text-base font-bold text-gray-900">{country.name}</h4>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">{country.type}</p>
                            {isCIS && (
                              <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded-sm text-[9px] font-bold uppercase">Popular</span>
                            )}
                          </div>
                        </div>
                      </div>
                      {hasDetails && (
                        <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-sm text-[9px] font-bold uppercase">Detailed</span>
                      )}
                    </div>

                    {country.description && (
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{country.description}</p>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-xl">
                        <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="font-medium">{country.processing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-xl">
                        <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="font-medium">{country.fee}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {hasDetails ? (
                        <button
                          onClick={() => setExpandedCountry(isExpanded ? null : country.id)}
                          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 active:scale-[0.97] flex items-center justify-center gap-2 ${isExpanded ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25' : 'bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20 hover:opacity-90'}`}
                        >
                          {isExpanded ? <><ChevronUp className="w-4 h-4" />Hide Details</> : <><Info className="w-4 h-4" />View Full Details</>}
                        </button>
                      ) : (
                        <button className="flex-1 py-2.5 bg-linear-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl hover:opacity-90 active:scale-[0.97] transition-all duration-200 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                          <FileText className="w-4 h-4" />Start Application
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Quick Comparison Banner */}
      <motion.div variants={staggerItem} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-orange-500" />Quick Visa Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Fee</th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Processing</th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">E-Visa</th>
                <th className="text-left py-3 px-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Georgia', flag: '\ud83c\uddec\ud83c\uddea', fee: 'FREE', processing: 'Instant', evisa: 'Visa-Free', difficulty: 'Easiest', color: 'emerald' },
                { name: 'Tajikistan', flag: '\ud83c\uddf9\ud83c\uddef', fee: '$35', processing: '1-5 days', evisa: 'Available', difficulty: 'Easy', color: 'emerald' },
                { name: 'Uzbekistan', flag: '\ud83c\uddfa\ud83c\uddff', fee: '$40', processing: '3-7 days', evisa: 'Available', difficulty: 'Easy', color: 'emerald' },
                { name: 'Kyrgyzstan', flag: '\ud83c\uddf0\ud83c\uddec', fee: '$50', processing: '5-10 days', evisa: 'Available', difficulty: 'Easy', color: 'emerald' },
                { name: 'Kazakhstan', flag: '\ud83c\uddf0\ud83c\uddff', fee: '$60', processing: '5-15 days', evisa: 'Visa-Free 30d', difficulty: 'Easy', color: 'blue' },
                { name: 'Russia', flag: '\ud83c\uddf7\ud83c\uddfa', fee: '$80', processing: '5-20 days', evisa: 'Short-term only', difficulty: 'Medium', color: 'amber' },
                { name: 'Canada', flag: '\ud83c\udde8\ud83c\udde6', fee: 'CAD $150', processing: '4-8 weeks', evisa: 'Online apply', difficulty: 'Medium', color: 'amber' },
                { name: 'USA', flag: '\ud83c\uddfa\ud83c\uddf8', fee: '$185', processing: '3-5 weeks', evisa: 'No', difficulty: 'Hard', color: 'red' },
                { name: 'UK', flag: '\ud83c\uddec\ud83c\udde7', fee: '\u00a3363', processing: '3 weeks', evisa: 'No', difficulty: 'Medium', color: 'amber' },
                { name: 'Australia', flag: '\ud83c\udde6\ud83c\uddfa', fee: 'AUD $650', processing: '4-6 weeks', evisa: 'Online only', difficulty: 'Medium', color: 'amber' },
              ].map(row => (
                <tr key={row.name} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-2.5 px-3 font-semibold text-gray-900"><span className="mr-1.5">{row.flag}</span>{row.name}</td>
                  <td className="py-2.5 px-3 font-bold text-gray-900">{row.fee}</td>
                  <td className="py-2.5 px-3 text-gray-600">{row.processing}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-sm text-xs font-semibold ${row.evisa.includes('Free') || row.evisa === 'Available' || row.evisa === 'Online only' || row.evisa === 'Online apply' ? 'bg-emerald-50 text-emerald-700' : row.evisa === 'No' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                      {row.evisa}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded-sm text-xs font-bold bg-${row.color}-50 text-${row.color}-700`}>{row.difficulty}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* CIS Highlight Banner */}
      <motion.div variants={staggerItem} className="bg-linear-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Why Study in CIS & Central Asia?</h3>
            <p className="text-sm text-gray-600 mb-3">Countries like Russia, Georgia, Uzbekistan, and Kyrgyzstan offer WHO/MCI recognized medical degrees at a fraction of the cost. English-medium programs, no entrance exams for many universities, and simple visa processes make these ideal destinations for Indian students.</p>
            <div className="flex flex-wrap gap-2">
              {CIS_COUNTRIES.map(name => {
                const c = allCountries.find(cc => cc.name === name);
                return c ? (
                  <span key={name} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/80 rounded-lg text-xs font-medium text-gray-700 border border-blue-100">
                    {c.flag} {name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Help Section */}
      <motion.div variants={staggerItem} className="bg-linear-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-linear-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">Our visa experts are available 24/7 to guide you through the application process for any country. Click on any country above to see complete visa details including eligibility, documents, costs, and VFS center locations.</p>
            <button className="px-5 py-2.5 bg-white text-orange-600 text-sm font-bold rounded-xl hover:bg-orange-50 active:scale-[0.97] transition-all duration-200 shadow-xs border border-orange-200">
              Talk to an Expert
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
