import University from '../models/University.js';

// Because the original route had filtering/sorting logic, we'll replicate
export async function listUniversities(req, res, next) {
    try {
        const { country, course, rankingMax, expenditureMax, search, sortBy } = req.query;
        let query = {};
        if (country && country !== 'All Countries') query.country = country;
        if (search) {
            const q = new RegExp(search, 'i');
            query.$or = [
                { name: q },
                { country: q },
                { programs: q }
            ];
        }
        if (rankingMax) query.worldRanking = { $lte: parseInt(rankingMax) };
        if (expenditureMax) query.annualExpenditure = { $lte: parseInt(expenditureMax) };
        if (course && course !== 'All Courses') query.programs = { $regex: new RegExp(course, 'i') };

        let cursor = University.find(query);
        switch (sortBy) {
            case 'ranking-asc': cursor = cursor.sort({ worldRanking: 1 }); break;
            case 'ranking-desc': cursor = cursor.sort({ worldRanking: -1 }); break;
            case 'expenditure-asc': cursor = cursor.sort({ annualExpenditure: 1 }); break;
            case 'expenditure-desc': cursor = cursor.sort({ annualExpenditure: -1 }); break;
            case 'rating-desc': cursor = cursor.sort({ rating: -1 }); break;
            case 'name-asc': cursor = cursor.sort({ name: 1 }); break;
            default: cursor = cursor.sort({ worldRanking: 1 });
        }

        const data = await cursor.exec();
        const total = await University.countDocuments();
        const countries = await University.distinct('country');
        const courses = await University.distinct('programs');

        res.json({ total, filtered: data.length, data, countries, courses });
    } catch (err) {
        next(err);
    }
}

export async function getUniversity(req, res, next) {
    try {
        const uni = await University.findById(req.params.id);
        if (!uni) return res.status(404).json({ error: 'University not found' });
        res.json(uni);
    } catch (err) { next(err); }
}

export async function createUniversity(req, res, next) {
    try {
        const uni = new University(req.body);
        await uni.save();
        res.status(201).json(uni);
    } catch (err) {
        next(err);
    }
}

export async function updateUniversity(req, res, next) {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!uni) return res.status(404).json({ error: 'University not found' });
        res.json(uni);
    } catch (err) {
        next(err);
    }
}

export async function deleteUniversity(req, res, next) {
    try {
        const uni = await University.findByIdAndDelete(req.params.id);
        if (!uni) return res.status(404).json({ error: 'University not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
}
