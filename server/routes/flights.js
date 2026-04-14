import { Router } from 'express';

const router = Router();

const popularRoutes = [
    // Russia
    { id: 1, from: 'New Delhi', fromCode: 'DEL', to: 'Moscow', toCode: 'SVO', country: 'Russia', price: '$380', priceNum: 380, airline: 'Aeroflot', airlineCode: 'SU', duration: '6h 15m', flightNumber: 'SU-233', departure: '05:00', arrival: '09:15', stops: 'Non-stop', bookingCode: 'SU233-DEL-SVO-2024', aircraft: 'Airbus A330' },
    { id: 2, from: 'Mumbai', fromCode: 'BOM', to: 'Moscow', toCode: 'SVO', country: 'Russia', price: '$420', priceNum: 420, airline: 'Aeroflot', airlineCode: 'SU', duration: '7h 30m', flightNumber: 'SU-235', departure: '03:00', arrival: '08:30', stops: 'Non-stop', bookingCode: 'SU235-BOM-SVO-2024', aircraft: 'Boeing 777' },
    { id: 3, from: 'New Delhi', fromCode: 'DEL', to: 'Saint Petersburg', toCode: 'LED', country: 'Russia', price: '$440', priceNum: 440, airline: 'Turkish Airlines', airlineCode: 'TK', duration: '10h 45m', flightNumber: 'TK-720', departure: '21:00', arrival: '05:45+1', stops: '1 Stop (IST)', bookingCode: 'TK720-DEL-LED-2024', aircraft: 'Boeing 737 MAX' },
    { id: 4, from: 'Chennai', fromCode: 'MAA', to: 'Kazan', toCode: 'KZN', country: 'Russia', price: '$460', priceNum: 460, airline: 'Emirates', airlineCode: 'EK', duration: '12h 20m', flightNumber: 'EK-545', departure: '04:00', arrival: '14:20', stops: '1 Stop (DXB)', bookingCode: 'EK545-MAA-KZN-2024', aircraft: 'Airbus A380' },
    // Georgia
    { id: 5, from: 'New Delhi', fromCode: 'DEL', to: 'Tbilisi', toCode: 'TBS', country: 'Georgia', price: '$350', priceNum: 350, airline: 'Air Arabia', airlineCode: 'G9', duration: '8h 10m', flightNumber: 'G9-460', departure: '02:30', arrival: '08:40', stops: '1 Stop (SHJ)', bookingCode: 'G9460-DEL-TBS-2024', aircraft: 'Airbus A320' },
    { id: 6, from: 'Mumbai', fromCode: 'BOM', to: 'Tbilisi', toCode: 'TBS', country: 'Georgia', price: '$340', priceNum: 340, airline: 'Air Arabia', airlineCode: 'G9', duration: '8h 30m', flightNumber: 'G9-462', departure: '03:00', arrival: '08:30', stops: '1 Stop (SHJ)', bookingCode: 'G9462-BOM-TBS-2024', aircraft: 'Airbus A320' },
    { id: 7, from: 'New Delhi', fromCode: 'DEL', to: 'Batumi', toCode: 'BUS', country: 'Georgia', price: '$390', priceNum: 390, airline: 'Turkish Airlines', airlineCode: 'TK', duration: '11h 00m', flightNumber: 'TK-722', departure: '22:00', arrival: '07:00+1', stops: '1 Stop (IST)', bookingCode: 'TK722-DEL-BUS-2024', aircraft: 'Airbus A321' },
    // Uzbekistan
    { id: 8, from: 'New Delhi', fromCode: 'DEL', to: 'Tashkent', toCode: 'TAS', country: 'Uzbekistan', price: '$290', priceNum: 290, airline: 'Uzbekistan Airways', airlineCode: 'HY', duration: '3h 45m', flightNumber: 'HY-402', departure: '09:00', arrival: '11:45', stops: 'Non-stop', bookingCode: 'HY402-DEL-TAS-2024', aircraft: 'Boeing 767' },
    { id: 9, from: 'Mumbai', fromCode: 'BOM', to: 'Tashkent', toCode: 'TAS', country: 'Uzbekistan', price: '$330', priceNum: 330, airline: 'Uzbekistan Airways', airlineCode: 'HY', duration: '5h 10m', flightNumber: 'HY-404', departure: '06:00', arrival: '10:10', stops: 'Non-stop', bookingCode: 'HY404-BOM-TAS-2024', aircraft: 'Boeing 787' },
    { id: 10, from: 'New Delhi', fromCode: 'DEL', to: 'Samarkand', toCode: 'SKD', country: 'Uzbekistan', price: '$320', priceNum: 320, airline: 'Uzbekistan Airways', airlineCode: 'HY', duration: '4h 30m', flightNumber: 'HY-406', departure: '10:00', arrival: '13:30', stops: 'Non-stop', bookingCode: 'HY406-DEL-SKD-2024', aircraft: 'Airbus A320' },
    // Kyrgyzstan
    { id: 11, from: 'New Delhi', fromCode: 'DEL', to: 'Bishkek', toCode: 'FRU', country: 'Kyrgyzstan', price: '$360', priceNum: 360, airline: 'IndiGo', airlineCode: '6E', duration: '4h 50m', flightNumber: '6E-1845', departure: '06:00', arrival: '09:50', stops: 'Non-stop', bookingCode: '6E1845-DEL-FRU-2024', aircraft: 'Airbus A321neo' },
    { id: 12, from: 'Chennai', fromCode: 'MAA', to: 'Bishkek', toCode: 'FRU', country: 'Kyrgyzstan', price: '$420', priceNum: 420, airline: 'IndiGo', airlineCode: '6E', duration: '9h 20m', flightNumber: '6E-1847', departure: '14:00', arrival: '21:20', stops: '1 Stop (DEL)', bookingCode: '6E1847-MAA-FRU-2024', aircraft: 'Airbus A321neo' },
    { id: 13, from: 'Mumbai', fromCode: 'BOM', to: 'Osh', toCode: 'OSS', country: 'Kyrgyzstan', price: '$410', priceNum: 410, airline: 'FlyDubai', airlineCode: 'FZ', duration: '10h 30m', flightNumber: 'FZ-315', departure: '01:00', arrival: '09:30', stops: '1 Stop (DXB)', bookingCode: 'FZ315-BOM-OSS-2024', aircraft: 'Boeing 737 MAX' },
    // Azerbaijan
    { id: 14, from: 'New Delhi', fromCode: 'DEL', to: 'Baku', toCode: 'GYD', country: 'Azerbaijan', price: '$340', priceNum: 340, airline: 'Azerbaijan Airlines', airlineCode: 'J2', duration: '5h 40m', flightNumber: 'J2-116', departure: '08:00', arrival: '11:40', stops: 'Non-stop', bookingCode: 'J2116-DEL-GYD-2024', aircraft: 'Boeing 757' },
    { id: 15, from: 'Kolkata', fromCode: 'CCU', to: 'Baku', toCode: 'GYD', country: 'Azerbaijan', price: '$360', priceNum: 360, airline: 'Azerbaijan Airlines', airlineCode: 'J2', duration: '7h 10m', flightNumber: 'J2-118', departure: '06:30', arrival: '11:40', stops: 'Non-stop', bookingCode: 'J2118-CCU-GYD-2024', aircraft: 'Boeing 757' },
    // Ukraine
    { id: 16, from: 'New Delhi', fromCode: 'DEL', to: 'Kyiv', toCode: 'KBP', country: 'Ukraine', price: '$410', priceNum: 410, airline: 'Turkish Airlines', airlineCode: 'TK', duration: '11h 45m', flightNumber: 'TK-718', departure: '21:15', arrival: '07:00+1', stops: '1 Stop (IST)', bookingCode: 'TK718-DEL-KBP-2024', aircraft: 'Boeing 737 MAX' },
    { id: 17, from: 'Mumbai', fromCode: 'BOM', to: 'Lviv', toCode: 'LWO', country: 'Ukraine', price: '$450', priceNum: 450, airline: 'Turkish Airlines', airlineCode: 'TK', duration: '13h 00m', flightNumber: 'TK-730', departure: '20:00', arrival: '07:00+1', stops: '1 Stop (IST)', bookingCode: 'TK730-BOM-LWO-2024', aircraft: 'Airbus A321' },
    // Tajikistan
    { id: 18, from: 'New Delhi', fromCode: 'DEL', to: 'Dushanbe', toCode: 'DYU', country: 'Tajikistan', price: '$350', priceNum: 350, airline: 'Somon Air', airlineCode: 'SZ', duration: '3h 30m', flightNumber: 'SZ-200', departure: '07:00', arrival: '09:30', stops: 'Non-stop', bookingCode: 'SZ200-DEL-DYU-2024', aircraft: 'Boeing 737' },
    { id: 19, from: 'Hyderabad', fromCode: 'HYD', to: 'Dushanbe', toCode: 'DYU', country: 'Tajikistan', price: '$380', priceNum: 380, airline: 'Somon Air', airlineCode: 'SZ', duration: '8h 50m', flightNumber: 'SZ-201', departure: '10:30', arrival: '17:20', stops: '1 Stop (DEL)', bookingCode: 'SZ201-HYD-DYU-2024', aircraft: 'Boeing 737' },
    // Western - UK
    { id: 20, from: 'New Delhi', fromCode: 'DEL', to: 'London', toCode: 'LHR', country: 'United Kingdom', price: '$450', priceNum: 450, airline: 'Air India', airlineCode: 'AI', duration: '9h 30m', flightNumber: 'AI-171', departure: '22:30', arrival: '04:00+1', stops: 'Non-stop', bookingCode: 'AI171-DEL-LHR-2024', aircraft: 'Boeing 787' },
    { id: 21, from: 'Mumbai', fromCode: 'BOM', to: 'London', toCode: 'LHR', country: 'United Kingdom', price: '$480', priceNum: 480, airline: 'British Airways', airlineCode: 'BA', duration: '9h 45m', flightNumber: 'BA-138', departure: '21:00', arrival: '02:45+1', stops: 'Non-stop', bookingCode: 'BA138-BOM-LHR-2024', aircraft: 'Boeing 777' },
    // Canada
    { id: 22, from: 'New Delhi', fromCode: 'DEL', to: 'Toronto', toCode: 'YYZ', country: 'Canada', price: '$650', priceNum: 650, airline: 'Air Canada', airlineCode: 'AC', duration: '15h 30m', flightNumber: 'AC-41', departure: '02:00', arrival: '06:30', stops: 'Non-stop', bookingCode: 'AC41-DEL-YYZ-2024', aircraft: 'Boeing 787' },
    { id: 23, from: 'Mumbai', fromCode: 'BOM', to: 'Toronto', toCode: 'YYZ', country: 'Canada', price: '$680', priceNum: 680, airline: 'Air Canada', airlineCode: 'AC', duration: '16h 15m', flightNumber: 'AC-43', departure: '01:45', arrival: '06:00', stops: 'Non-stop', bookingCode: 'AC43-BOM-YYZ-2024', aircraft: 'Boeing 777' },
    // Australia
    { id: 24, from: 'New Delhi', fromCode: 'DEL', to: 'Sydney', toCode: 'SYD', country: 'Australia', price: '$550', priceNum: 550, airline: 'Qantas', airlineCode: 'QF', duration: '12h 40m', flightNumber: 'QF-2', departure: '20:00', arrival: '10:40+1', stops: 'Non-stop', bookingCode: 'QF2-DEL-SYD-2024', aircraft: 'Airbus A380' },
    { id: 25, from: 'Bangalore', fromCode: 'BLR', to: 'Melbourne', toCode: 'MEL', country: 'Australia', price: '$520', priceNum: 520, airline: 'Singapore Air', airlineCode: 'SQ', duration: '14h 45m', flightNumber: 'SQ-545', departure: '18:15', arrival: '10:00+1', stops: '1 Stop (SIN)', bookingCode: 'SQ545-BLR-MEL-2024', aircraft: 'Airbus A350' },
    // USA
    { id: 26, from: 'New Delhi', fromCode: 'DEL', to: 'New York', toCode: 'JFK', country: 'United States', price: '$700', priceNum: 700, airline: 'Air India', airlineCode: 'AI', duration: '15h 40m', flightNumber: 'AI-101', departure: '01:30', arrival: '07:10', stops: 'Non-stop', bookingCode: 'AI101-DEL-JFK-2024', aircraft: 'Boeing 777' },
    { id: 27, from: 'Mumbai', fromCode: 'BOM', to: 'San Francisco', toCode: 'SFO', country: 'United States', price: '$750', priceNum: 750, airline: 'United Airlines', airlineCode: 'UA', duration: '17h 00m', flightNumber: 'UA-949', departure: '23:30', arrival: '04:30', stops: 'Non-stop', bookingCode: 'UA949-BOM-SFO-2024', aircraft: 'Boeing 787' },
    // Singapore
    { id: 28, from: 'New Delhi', fromCode: 'DEL', to: 'Singapore', toCode: 'SIN', country: 'Singapore', price: '$280', priceNum: 280, airline: 'Singapore Airlines', airlineCode: 'SQ', duration: '5h 30m', flightNumber: 'SQ-407', departure: '08:00', arrival: '16:30', stops: 'Non-stop', bookingCode: 'SQ407-DEL-SIN-2024', aircraft: 'Airbus A350' },
    // Switzerland
    { id: 29, from: 'New Delhi', fromCode: 'DEL', to: 'Zurich', toCode: 'ZRH', country: 'Switzerland', price: '$520', priceNum: 520, airline: 'Swiss', airlineCode: 'LX', duration: '8h 30m', flightNumber: 'LX-147', departure: '22:00', arrival: '04:30+1', stops: 'Non-stop', bookingCode: 'LX147-DEL-ZRH-2024', aircraft: 'Airbus A340' },
    // Kazakhstan
    { id: 30, from: 'New Delhi', fromCode: 'DEL', to: 'Almaty', toCode: 'ALA', country: 'Kazakhstan', price: '$310', priceNum: 310, airline: 'Air Astana', airlineCode: 'KC', duration: '4h 00m', flightNumber: 'KC-902', departure: '07:30', arrival: '11:30', stops: 'Non-stop', bookingCode: 'KC902-DEL-ALA-2024', aircraft: 'Airbus A321' },
];

let bookings = [];
let bookingIdCounter = 1000;

router.get('/popular', (req, res) => {
    res.json({ data: popularRoutes });
});

// Get all destinations (countries)
router.get('/destinations', (req, res) => {
    const countriesMap = new Map();
    popularRoutes.forEach(r => {
        if (!countriesMap.has(r.country)) {
            countriesMap.set(r.country, {
                country: r.country,
                destinations: [],
                cheapest: r.priceNum,
                routeCount: 0
            });
        }
        const entry = countriesMap.get(r.country);
        if (!entry.destinations.find(d => d.toCode === r.toCode)) {
            entry.destinations.push({ city: r.to, toCode: r.toCode });
        }
        if (r.priceNum < entry.cheapest) entry.cheapest = r.priceNum;
        entry.routeCount++;
    });
    const destinations = Array.from(countriesMap.values()).sort((a, b) => a.cheapest - b.cheapest);
    res.json({ data: destinations });
});

// Get routes by country
router.get('/country/:country', (req, res) => {
    const country = decodeURIComponent(req.params.country);
    const routes = popularRoutes.filter(r => r.country.toLowerCase() === country.toLowerCase());
    res.json({ data: routes });
});

router.post('/search', (req, res) => {
    const { from, to, date, passengers } = req.body;
    let results = [...popularRoutes];
    if (from) {
        const q = from.toLowerCase();
        results = results.filter(r => r.from.toLowerCase().includes(q) || r.fromCode.toLowerCase().includes(q));
    }
    if (to) {
        const q = to.toLowerCase();
        results = results.filter(r => r.to.toLowerCase().includes(q) || r.toCode.toLowerCase().includes(q) || r.country.toLowerCase().includes(q));
    }
    if (results.length === 0) {
        return res.json({ data: popularRoutes.slice(0, 8), message: 'No exact matches. Showing popular routes.' });
    }
    res.json({ data: results });
});

// Book a flight
router.post('/book', (req, res) => {
    const { flightId, bookingCode, passengerName, passengerEmail, passengerPhone, passengers, travelDate } = req.body;
    if (!flightId || !passengerName || !passengerEmail) {
        return res.status(400).json({ error: 'Flight ID, passenger name, and email are required' });
    }
    const flight = popularRoutes.find(r => r.id === parseInt(flightId));
    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    const booking = {
        id: 'BK-' + (++bookingIdCounter),
        flightId: flight.id,
        bookingCode: flight.bookingCode,
        confirmationCode: 'SHK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase(),
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        from: flight.from,
        fromCode: flight.fromCode,
        to: flight.to,
        toCode: flight.toCode,
        country: flight.country,
        departure: flight.departure,
        arrival: flight.arrival,
        duration: flight.duration,
        price: flight.price,
        priceNum: flight.priceNum,
        aircraft: flight.aircraft,
        stops: flight.stops,
        passengerName,
        passengerEmail,
        passengerPhone: passengerPhone || '',
        passengers: parseInt(passengers) || 1,
        travelDate: travelDate || 'TBD',
        status: 'confirmed',
        bookedAt: new Date().toISOString(),
        totalPrice: flight.priceNum * (parseInt(passengers) || 1)
    };
    bookings.push(booking);
    res.status(201).json({ message: 'Flight booked successfully!', booking });
});

// Get all bookings
router.get('/bookings', (req, res) => {
    const { email } = req.query;
    let results = [...bookings];
    if (email) results = results.filter(b => b.passengerEmail === email);
    results.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
    res.json({ total: results.length, data: results });
});

// Cancel booking
router.post('/bookings/:id/cancel', (req, res) => {
    const booking = bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    booking.status = 'cancelled';
    res.json({ message: 'Booking cancelled', booking });
});

export default router;
