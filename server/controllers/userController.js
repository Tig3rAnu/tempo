import User from '../models/User.js';

export async function listUsers(req, res, next) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send({ message: 'Not found' });
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export async function updateUser(req, res, next) {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (err) {
        next(err);
    }
}
