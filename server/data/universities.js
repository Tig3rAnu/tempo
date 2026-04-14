export const UNIVERSITIES = [
    // ==================== RUSSIA ====================
    {
        id: 1,
        name: 'Lomonosov Moscow State University',
        country: 'Russia',
        countryCode: '🇷🇺',
        image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&h=600&fit=crop',
        programs: ['Medicine', 'Physics', 'Mathematics'],
        tuition: '$4,000 - $8,000',
        tuitionMin: 4000,
        language: 'Russian',
        type: 'Graduate',
        rating: 4.6,
        worldRanking: 75,
        countryRanking: 1,
        annualExpenditure: 8000,
        bankDetails: { bankName: 'Sberbank of Russia', accountName: 'Lomonosov MSU Finance Dept', accountNumber: 'RU40 7810 0000 0000 1234 5678', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'msu.finance@sbi', gpayNumber: '+7-495-939-1000', phonePeNumber: '+7-495-939-1000' },
        // Detailed Info
        about: {
            history: 'Established in 1755 by Mikhail Lomonosov, a prominent Russian scientist, MSU is the oldest and most prestigious university in Russia. The university has a rich history of academic excellence and has produced numerous Nobel laureates and Fields Medal winners.',
            today: 'Today, MSU is a comprehensive university with 41 faculties and over 40,000 students. It boasts the tallest educational building in the world and houses cutting-edge research facilities, museums, and botanical gardens. It remains the center of Russian higher education.',
            description: 'Lomonosov Moscow State University offers a world-class education with a strong emphasis on fundamental research and interdisciplinary studies.'
        },
        rector: {
            name: 'Victor Sadovnichiy',
            message: 'Welcome to Moscow State University. We are committed to fostering a spirit of inquiry and innovation. Our students are the future leaders of science and society.',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop'
        },
        gallery: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae6f?w=600&h=400&fit=crop', caption: 'Main Building' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', caption: 'Library Hall' },
            { type: 'certificate', url: 'https://images.unsplash.com/photo-1589330694653-2182863e3709?w=600&h=400&fit=crop', caption: 'WHO Recognition' }
        ],
        cityDetails: {
            name: 'Moscow',
            climate: {
                summer: '18°C to 30°C',
                winter: '-10°C to -5°C',
                description: 'Humid continental climate with warm summers and long, cold winters.'
            },
            currency: {
                code: 'RUB',
                name: 'Russian Ruble',
                symbol: '₽',
                rateToUSD: 0.011
            },
            costOfLiving: [
                { item: 'Bread (Loaf)', price: '$0.50' },
                { item: 'Milk (1L)', price: '$1.10' },
                { item: 'Internet (Month)', price: '$8.00' },
                { item: 'Metro Ticket', price: '$0.65' },
                { item: 'Coffee', price: '$2.50' }
            ]
        },
        transport: {
            options: ['Metro', 'Bus', 'Taxi'],
            details: 'The university has its own Metro station "Universitet". Hostels are located within 10-15 minutes walking distance or a short bus ride from the main campus.',
            cost: '$20/month student pass'
        },
        hostel: {
            availability: 'Guaranteed for International Students',
            costPerYear: '$800 - $1,500',
            studentsPerRoom: '2-3',
            description: 'Fully furnished rooms with shared kitchen and laundry facilities. 24/7 security and Wi-Fi access.',
            images: [
                'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop',
                'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop'
            ]
        },
        accreditation: ['WHO', 'NMC (India)', 'UNESCO', 'EUA'],
        contact: {
            address: 'Leninskie Gory, 1, Moscow, 119991, Russia',
            phone: '+7 (495) 939-10-00',
            email: 'info@rector.msu.ru',
            website: 'https://www.msu.ru/en/'
        }
    },
    {
        id: 2,
        name: 'Sechenov University',
        country: 'Russia',
        countryCode: '🇷🇺',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
        programs: ['Medicine', 'Pharmacy', 'Dentistry', 'Pediatrics'],
        tuition: '$5,000 - $9,000',
        tuitionMin: 5000,
        language: 'English',
        type: 'Graduate',
        rating: 4.5,
        worldRanking: 180,
        countryRanking: 2,
        annualExpenditure: 9000,
        bankDetails: { bankName: 'VTB Bank', accountName: 'Sechenov University Admissions', accountNumber: 'RU51 7810 0000 0000 5678 9012', swiftCode: 'VTBRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'sechenov.pay@sbi', gpayNumber: '+7-499-248-0553', phonePeNumber: '+7-499-248-0553' },
        about: {
            history: 'Founded in 1758 as the medical faculty of Moscow Imperial University, Sechenov University is the oldest leading medical university in Russia. It was named after the outstanding Russian physiologist Ivan Sechenov.',
            today: 'It is the flagship of medical education in Russia with a strong emphasis on clinical practice. The university has its own Clinical Center, one of the largest in Europe, with 4,000 beds.',
            description: 'Sechenov First Moscow State Medical University offers high-quality training in medicine, biology, and biotechnology.'
        },
        rector: {
            name: 'Petr Glybochko',
            message: 'Sechenov University is an internationally recognized center of excellence in medical education. We invite you to join our community of future healthcare leaders.',
            image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop'
        },
        gallery: [
            { type: 'image', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop', caption: 'Clinical Center' },
            { type: 'image', url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=400&fit=crop', caption: 'Laboratories' },
            { type: 'certificate', url: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=600&h=400&fit=crop', caption: 'NMC Recognition' }
        ],
        cityDetails: {
            name: 'Moscow',
            climate: {
                summer: '18°C to 30°C',
                winter: '-10°C to -5°C',
                description: 'Humid continental climate with warm summers and long, cold winters.'
            },
            currency: {
                code: 'RUB',
                name: 'Russian Ruble',
                symbol: '₽',
                rateToUSD: 0.011
            },
            costOfLiving: [
                { item: 'Bread', price: '$0.50' },
                { item: 'Milk (1L)', price: '$1.10' },
                { item: 'Internet', price: '$8.00' },
                { item: 'Transport Pass', price: '$20.00' }
            ]
        },
        transport: {
            options: ['Metro', 'Bus'],
            details: 'Located near "Frunzenskaya" and "Sportivnaya" metro stations. Easy access to all clinical bases via public transport.',
            cost: '$20/month student pass'
        },
        hostel: {
            availability: 'Available',
            costPerYear: '$1,000 - $1,500',
            studentsPerRoom: '2-3',
            description: 'Modern hostels with renovated rooms, gym facilities, and study halls.',
            images: [
                'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop'
            ]
        },
        accreditation: ['WHO', 'NMC', 'ECFMG', 'WFME'],
        contact: {
            address: 'Trubetskaya St., 8, bld. 2, Moscow, 119991',
            phone: '+7-499-248-05-53',
            email: 'admission@sechenov.ru',
            website: 'https://www.sechenov.ru/eng/'
        }
    },
    // ... other universities with default data structure spread if needed
    // To save space, remaining universities will use default fallback in UI if data is missing
    {
        id: 3,
        name: 'Pirogov Russian National Research Medical University',
        country: 'Russia',
        countryCode: '🇷🇺',
        image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&h=600&fit=crop',
        programs: ['Medicine', 'Pediatrics', 'Dentistry', 'Surgery'],
        tuition: '$4,500 - $8,500',
        tuitionMin: 4500,
        language: 'English',
        type: 'Graduate',
        rating: 4.4,
        worldRanking: 220,
        annualExpenditure: 8500,
        bankDetails: { bankName: 'Gazprombank', accountName: 'RNRMU Finance Office', accountNumber: 'RU62 7810 0000 0000 3456 7890', swiftCode: 'GAZPRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'pirogov.admissions@sbi', gpayNumber: '+7-495-434-1174', phonePeNumber: '+7-495-434-1174' },
        about: {
            history: 'Founded in 1906, Pirogov University was the first medical institution in Russia to allow women to study medicine.',
            today: 'It is a leading medical and research center, specializing in biomedicine, medical cybernetics, and biophysics.',
            description: 'Known for its rigorous academic standards and strong emphasis on research.'
        },
        rector: {
            name: 'Sergey Lukyanov',
            message: 'We train doctors who are ready to face the challenges of modern medicine with knowledge and compassion.',
            image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=200&h=200&fit=crop'
        },
        cityDetails: {
            name: 'Moscow',
            climate: { summer: '18-30°C', winter: '-10 to -5°C', description: 'Continental' },
            currency: { code: 'RUB', symbol: '₽', rateToUSD: 0.011 },
            costOfLiving: [{ item: 'Meal', price: '$5' }, { item: 'Transport', price: '$0.60' }]
        },
        hostel: {
            availability: 'Yes',
            costPerYear: '$800',
            studentsPerRoom: '2-3',
            description: 'Comfortable dormitories on campus.',
            images: ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop']
        },
        accreditation: ['WHO', 'NMC', 'GMC'],
        contact: { address: 'Ostrovitianov str. 1, Moscow', phone: '+7-495-434-11-74', email: 'rsmu@rsmu.ru', website: 'https://rsmu.ru/' }
    },
    { id: 4, name: 'Kazan Federal University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Medicine', 'Geology', 'Chemistry'], tuition: '$2,800 - $6,000', tuitionMin: 2800, language: 'Russian', type: 'Graduate', rating: 4.2, worldRanking: 322, annualExpenditure: 6000, bankDetails: { bankName: 'Ak Bars Bank', accountName: 'KFU Payments', accountNumber: 'RU73 7810 0000 0000 4567 8901', swiftCode: 'AKBRRU2K', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'kfu.pay@sbi', gpayNumber: '+7-843-233-7109', phonePeNumber: '+7-843-233-7109' } },
    { id: 5, name: 'Saint Petersburg State Medical University (Pavlov)', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae6f?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pediatrics', 'Pharmacy'], tuition: '$4,500 - $8,000', tuitionMin: 4500, language: 'English', type: 'Graduate', rating: 4.4, worldRanking: 190, annualExpenditure: 8500, bankDetails: { bankName: 'Sberbank of Russia', accountName: 'Pavlov First SMU', accountNumber: 'RU84 7810 0000 0000 6789 0123', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'pavlov.smu@sbi', gpayNumber: '+7-812-338-6600', phonePeNumber: '+7-812-338-6600' } },
    { id: 6, name: 'Kazan State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing'], tuition: '$3,500 - $6,500', tuitionMin: 3500, language: 'English', type: 'Graduate', rating: 4.2, worldRanking: 310, annualExpenditure: 7000, bankDetails: { bankName: 'Ak Bars Bank', accountName: 'KSMU Finance', accountNumber: 'RU95 7810 0000 0000 7890 1234', swiftCode: 'AKBRRU2K', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'ksmu.pay@sbi', gpayNumber: '+7-843-236-0652', phonePeNumber: '+7-843-236-0652' } },
    { id: 7, name: 'Bashkir State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', programs: ['Medicine', 'Pediatrics', 'Dentistry', 'Pharmacy'], tuition: '$3,000 - $5,500', tuitionMin: 3000, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 380, annualExpenditure: 6000, bankDetails: { bankName: 'Sberbank', accountName: 'BSMU Admissions', accountNumber: 'RU06 7810 0000 0000 8901 2345', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'bsmu.pay@sbi', gpayNumber: '+7-347-272-5371', phonePeNumber: '+7-347-272-5371' } },
    { id: 8, name: 'Orenburg State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', programs: ['Medicine', 'Pediatrics', 'Dentistry'], tuition: '$2,800 - $5,000', tuitionMin: 2800, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 420, annualExpenditure: 5500, bankDetails: { bankName: 'Sberbank', accountName: 'OSMU Finance', accountNumber: 'RU17 7810 0000 0000 9012 3456', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'osmu.pay@sbi', gpayNumber: '+7-3532-40-3044', phonePeNumber: '+7-3532-40-3044' } },
    { id: 9, name: 'Volgograd State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop', programs: ['Medicine', 'Pharmacy', 'Dentistry', 'Public Health'], tuition: '$3,200 - $6,000', tuitionMin: 3200, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 370, annualExpenditure: 6200, bankDetails: { bankName: 'VTB Bank', accountName: 'VolgSMU Payments', accountNumber: 'RU28 7810 0000 0000 0123 4567', swiftCode: 'VTBRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'volgsmu.pay@sbi', gpayNumber: '+7-8442-38-5005', phonePeNumber: '+7-8442-38-5005' } },
    { id: 10, name: 'Kursk State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', programs: ['Medicine', 'Pharmacy', 'Dentistry', 'Nursing'], tuition: '$3,500 - $6,500', tuitionMin: 3500, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 360, annualExpenditure: 6500, bankDetails: { bankName: 'Sberbank', accountName: 'KSMU Finance Dept', accountNumber: 'RU39 7810 0000 0000 1234 5679', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'kursk.smu@sbi', gpayNumber: '+7-4712-58-8137', phonePeNumber: '+7-4712-58-8137' } },
    { id: 11, name: 'Tver State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pediatrics'], tuition: '$3,000 - $5,500', tuitionMin: 3000, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 410, annualExpenditure: 5800, bankDetails: { bankName: 'Sberbank', accountName: 'Tver SMU', accountNumber: 'RU40 7810 0000 0000 2345 6780', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'tver.smu@sbi', gpayNumber: '+7-4822-35-4414', phonePeNumber: '+7-4822-35-4414' } },
    { id: 12, name: 'Rostov State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Pediatrics'], tuition: '$3,200 - $6,000', tuitionMin: 3200, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 350, annualExpenditure: 6300, bankDetails: { bankName: 'Sberbank', accountName: 'RostSMU Finance', accountNumber: 'RU51 7810 0000 0000 3456 7891', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'rostsmu.pay@sbi', gpayNumber: '+7-863-250-4100', phonePeNumber: '+7-863-250-4100' } },
    { id: 13, name: 'Samara State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Nursing'], tuition: '$3,000 - $5,800', tuitionMin: 3000, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 400, annualExpenditure: 6000, bankDetails: { bankName: 'Sberbank', accountName: 'SamSMU Payments', accountNumber: 'RU62 7810 0000 0000 4567 8902', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'samsmu.pay@sbi', gpayNumber: '+7-846-332-1634', phonePeNumber: '+7-846-332-1634' } },
    { id: 14, name: 'Saratov State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', programs: ['Medicine', 'Pediatrics', 'Dentistry', 'Public Health'], tuition: '$2,800 - $5,500', tuitionMin: 2800, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 430, annualExpenditure: 5800, bankDetails: { bankName: 'Sberbank', accountName: 'Saratov SMU', accountNumber: 'RU73 7810 0000 0000 5678 9013', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'saratov.smu@sbi', gpayNumber: '+7-8452-66-9710', phonePeNumber: '+7-8452-66-9710' } },
    { id: 15, name: 'Smolensk State Medical University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy'], tuition: '$2,500 - $5,000', tuitionMin: 2500, language: 'English', type: 'Graduate', rating: 3.9, worldRanking: 450, annualExpenditure: 5500, bankDetails: { bankName: 'Sberbank', accountName: 'Smolensk SMU', accountNumber: 'RU84 7810 0000 0000 6789 0124', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'smolensk.smu@sbi', gpayNumber: '+7-4812-27-0302', phonePeNumber: '+7-4812-27-0302' } },
    { id: 16, name: 'Crimea Federal University (Medical Academy)', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Pediatrics'], tuition: '$2,500 - $5,000', tuitionMin: 2500, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 440, annualExpenditure: 5200, bankDetails: { bankName: 'RNCB', accountName: 'CFU Medical Academy', accountNumber: 'RU95 7810 0000 0000 7890 1235', swiftCode: 'RNCBRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'cfu.med@sbi', gpayNumber: '+7-3652-27-4424', phonePeNumber: '+7-3652-27-4424' } },
    { id: 17, name: 'Peoples Friendship University of Russia (RUDN)', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=400&h=300&fit=crop', programs: ['Medicine', 'Engineering', 'Economics', 'Law'], tuition: '$3,000 - $7,500', tuitionMin: 3000, language: 'English', type: 'Graduate', rating: 4.3, worldRanking: 295, annualExpenditure: 7000, bankDetails: { bankName: 'VTB Bank', accountName: 'RUDN University Finance', accountNumber: 'RU06 7810 0000 0000 8901 2346', swiftCode: 'VTBRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'rudn.pay@sbi', gpayNumber: '+7-495-787-3803', phonePeNumber: '+7-495-787-3803' } },
    { id: 18, name: 'Saint Petersburg State University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1548834925-e48f8a27ae6f?w=400&h=300&fit=crop', programs: ['Law', 'International Relations', 'Economics', 'Physics'], tuition: '$3,500 - $7,000', tuitionMin: 3500, language: 'Russian', type: 'Graduate', rating: 4.5, worldRanking: 95, annualExpenditure: 7500, bankDetails: { bankName: 'Sberbank', accountName: 'SPbSU Finance', accountNumber: 'RU17 7810 0000 0000 9012 3457', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'spbsu.pay@sbi', gpayNumber: '+7-812-363-6633', phonePeNumber: '+7-812-363-6633' } },
    { id: 19, name: 'Novosibirsk State University', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', programs: ['Physics', 'Computer Science', 'Mathematics'], tuition: '$2,500 - $5,500', tuitionMin: 2500, language: 'Russian', type: 'Graduate', rating: 4.3, worldRanking: 246, annualExpenditure: 5500, bankDetails: { bankName: 'Sberbank', accountName: 'NSU Finance', accountNumber: 'RU28 7810 0000 0000 0123 4568', swiftCode: 'SABRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'nsu.pay@sbi', gpayNumber: '+7-383-363-4000', phonePeNumber: '+7-383-363-4000' } },
    { id: 20, name: 'National Research Nuclear University MEPhI', country: 'Russia', countryCode: '🇷🇺', image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop', programs: ['Nuclear Physics', 'Engineering', 'Computer Science'], tuition: '$3,200 - $6,500', tuitionMin: 3200, language: 'Russian', type: 'Graduate', rating: 4.2, worldRanking: 350, annualExpenditure: 6500, bankDetails: { bankName: 'VTB Bank', accountName: 'MEPhI Finance', accountNumber: 'RU39 7810 0000 0000 1234 5670', swiftCode: 'VTBRRUMM', ifscCode: 'N/A', currency: 'RUB/USD', upiId: 'mephi.pay@sbi', gpayNumber: '+7-495-324-7401', phonePeNumber: '+7-495-324-7401' } },
    { id: 31, name: 'Bogomolets National Medical University', country: 'Ukraine', countryCode: '🇺🇦', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Pediatrics'], tuition: '$4,000 - $6,000', tuitionMin: 4000, language: 'English', type: 'Graduate', rating: 4.3, worldRanking: 350, annualExpenditure: 7000, bankDetails: { bankName: 'PrivatBank', accountName: 'Bogomolets NMU', accountNumber: 'UA21 3223 1300 0002 6007 2336 7146 1', swiftCode: 'PBANUA2X', ifscCode: 'N/A', currency: 'UAH/USD', upiId: 'bogomolets@upi', gpayNumber: '+380-44-234-6064', phonePeNumber: '+380-44-234-6064' } },
    { id: 47, name: 'Tbilisi State Medical University', country: 'Georgia', countryCode: '🇬🇪', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Public Health'], tuition: '$5,000 - $8,000', tuitionMin: 5000, language: 'English', type: 'Graduate', rating: 4.3, worldRanking: 350, annualExpenditure: 8000, bankDetails: { bankName: 'Bank of Georgia', accountName: 'TSMU Finance', accountNumber: 'GE29 TB00 0000 0040 1721 00', swiftCode: 'BAGAGE22', ifscCode: 'N/A', currency: 'GEL/USD', upiId: 'tsmu.georgia@upi', gpayNumber: '+995-32-254-2467', phonePeNumber: '+995-32-254-2467' } },
    { id: 59, name: 'Azerbaijan Medical University', country: 'Azerbaijan', countryCode: '🇦🇿', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Public Health'], tuition: '$4,000 - $6,500', tuitionMin: 4000, language: 'English', type: 'Graduate', rating: 4.2, worldRanking: 380, annualExpenditure: 7000, bankDetails: { bankName: 'Kapital Bank', accountName: 'AMU Finance', accountNumber: 'AZ21 GABA 0000 0000 0040 1721', swiftCode: 'AIIBAZ2X', ifscCode: 'N/A', currency: 'AZN/USD', upiId: 'amu.baku@upi', gpayNumber: '+994-12-595-6900', phonePeNumber: '+994-12-595-6900' } },
    { id: 68, name: 'Tashkent Medical Academy', country: 'Uzbekistan', countryCode: '🇺🇿', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Medicine', 'Pediatrics', 'Dentistry', 'Pharmacy'], tuition: '$3,000 - $5,000', tuitionMin: 3000, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 420, annualExpenditure: 5500, bankDetails: { bankName: 'National Bank of Uzbekistan', accountName: 'Tashkent Medical Academy', accountNumber: 'UZ00 0000 0400 0000 1721 0000 0000', swiftCode: 'NBFAUZ2X', ifscCode: 'N/A', currency: 'UZS/USD', upiId: 'tma.tashkent@upi', gpayNumber: '+998-71-256-2370', phonePeNumber: '+998-71-256-2370' } },
    { id: 82, name: 'International School of Medicine (ISM)', country: 'Kyrgyzstan', countryCode: '🇰🇬', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', programs: ['Medicine', 'Surgery', 'Pediatrics', 'Public Health'], tuition: '$3,500 - $4,500', tuitionMin: 3500, language: 'English', type: 'Graduate', rating: 4.1, worldRanking: 450, annualExpenditure: 5500, bankDetails: { bankName: 'Commercial Bank Kyrgyzstan', accountName: 'ISM Bishkek', accountNumber: 'KG00 1900 0000 0040 1721 00', swiftCode: 'KCBKKG22', ifscCode: 'N/A', currency: 'KGS/USD', upiId: 'ism.bishkek@upi', gpayNumber: '+996-312-541-010', phonePeNumber: '+996-312-541-010' } },
    { id: 94, name: 'Avicenna Tajik State Medical University', country: 'Tajikistan', countryCode: '🇹🇯', image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=300&fit=crop', programs: ['Medicine', 'Dentistry', 'Pharmacy', 'Pediatrics'], tuition: '$2,500 - $4,000', tuitionMin: 2500, language: 'English', type: 'Graduate', rating: 4.0, worldRanking: 470, annualExpenditure: 4500, bankDetails: { bankName: 'National Bank of Tajikistan', accountName: 'Avicenna TSMU', accountNumber: 'TJ00 0000 0000 0040 1721 0000', swiftCode: 'NBOTJT22', ifscCode: 'N/A', currency: 'TJS/USD', upiId: 'avicenna.tsmu@upi', gpayNumber: '+992-37-224-5031', phonePeNumber: '+992-37-224-5031' } },
    { id: 104, name: 'Stanford University', country: 'United States', countryCode: '🇺🇸', image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop', programs: ['Computer Science', 'Business', 'Engineering'], tuition: '$50,000 - $60,000', tuitionMin: 50000, language: 'English', type: 'Graduate', rating: 4.9, worldRanking: 3, annualExpenditure: 58000, bankDetails: { bankName: 'Wells Fargo', accountName: 'Stanford University Bursar', accountNumber: 'US00 0000 0000 0040 1721 0000', swiftCode: 'WFBIUS6S', ifscCode: 'N/A', currency: 'USD', upiId: 'stanford.bursar@upi', gpayNumber: '+1-650-723-2300', phonePeNumber: '+1-650-723-2300' } },
    { id: 105, name: 'University of Oxford', country: 'United Kingdom', countryCode: '🇬🇧', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=300&fit=crop', programs: ['Law', 'Philosophy', 'Medicine'], tuition: '£20,000 - £35,000', tuitionMin: 25000, language: 'English', type: 'Both', rating: 4.8, worldRanking: 1, annualExpenditure: 35000, bankDetails: { bankName: 'Barclays', accountName: 'University of Oxford', accountNumber: 'GB29 BARC 2013 8515 5000 23', swiftCode: 'BARCGB22', ifscCode: 'N/A', currency: 'GBP', upiId: 'oxford.bursar@upi', gpayNumber: '+44-1865-270000', phonePeNumber: '+44-1865-270000' } },
];
