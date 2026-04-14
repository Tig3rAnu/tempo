import { Router } from 'express';

const router = Router();

const visaSteps = [
    { step: 1, title: 'Check Eligibility', desc: 'Verify requirements', status: 'completed' },
    { step: 2, title: 'Gather Documents', desc: 'Prepare documentation', status: 'current' },
    { step: 3, title: 'Fill Application', desc: 'Complete forms', status: 'upcoming' },
    { step: 4, title: 'Pay Fee', desc: 'Process payment', status: 'upcoming' },
    { step: 5, title: 'Schedule Interview', desc: 'Book slot', status: 'upcoming' },
    { step: 6, title: 'Track Status', desc: 'Monitor application', status: 'upcoming' },
];

const countries = [
    { id: 1, name: 'Russia', flag: '\ud83c\uddf7\ud83c\uddfa', type: 'Student Visa', processing: '2-4 weeks', fee: '$80', description: 'Study in top medical & engineering universities across Russia.' },
    { id: 2, name: 'Kyrgyzstan', flag: '\ud83c\uddf0\ud83c\uddec', type: 'Student Visa', processing: '1-2 weeks', fee: '$50', description: 'Affordable medical education with English-medium programs.' },
    { id: 3, name: 'Uzbekistan', flag: '\ud83c\uddfa\ud83c\uddff', type: 'Student Visa', processing: '1-3 weeks', fee: '$40', description: 'Growing education hub with modern universities and low costs.' },
    { id: 4, name: 'Kazakhstan', flag: '\ud83c\uddf0\ud83c\uddff', type: 'Student Visa', processing: '2-3 weeks', fee: '$60', description: 'Central Asia\'s leading economy with world-class universities.' },
    { id: 5, name: 'Tajikistan', flag: '\ud83c\uddf9\ud83c\uddef', type: 'Student Visa', processing: '1-2 weeks', fee: '$35', description: 'Most affordable study destination with recognized medical degrees.' },
    { id: 6, name: 'Armenia', flag: '\ud83c\udde6\ud83c\uddf2', type: 'Student Visa', processing: '2-3 weeks', fee: '$55', description: 'Rich cultural heritage with quality European-standard education.' },
    { id: 7, name: 'Georgia', flag: '\ud83c\uddec\ud83c\uddea', type: 'Student Visa', processing: '1-3 weeks', fee: '$50', description: 'No visa required for many nationalities. Top medical programs in English.' },
    { id: 8, name: 'Ukraine', flag: '\ud83c\uddfa\ud83c\udde6', type: 'Student Visa', processing: '2-4 weeks', fee: '$65', description: 'WHO & MCI recognized medical universities with affordable tuition.' },
    { id: 9, name: 'United States', flag: '\ud83c\uddfa\ud83c\uddf8', type: 'F-1 Visa', processing: '3-5 weeks', fee: '$185', description: 'World\'s top-ranked universities and research institutions.' },
    { id: 10, name: 'United Kingdom', flag: '\ud83c\uddec\ud83c\udde7', type: 'Tier 4 Visa', processing: '3 weeks', fee: '\u00a3363', description: 'Prestigious universities with globally recognized degrees.' },
    { id: 11, name: 'Canada', flag: '\ud83c\udde8\ud83c\udde6', type: 'Study Permit', processing: '4-8 weeks', fee: 'CAD $150', description: 'Excellent post-study work opportunities and immigration pathways.' },
    { id: 12, name: 'Australia', flag: '\ud83c\udde6\ud83c\uddfa', type: 'Subclass 500', processing: '4-6 weeks', fee: 'AUD $650', description: 'High quality of life with world-class education system.' },
];

router.get('/steps', (req, res) => {
    res.json({ data: visaSteps });
});

router.get('/countries', (req, res) => {
    res.json({ data: countries });
});

export default router;
