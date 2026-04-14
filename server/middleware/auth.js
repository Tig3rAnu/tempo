// placeholder auth middleware -- in a real app verify JWT or session
export function requireRole(role) {
    return (req, res, next) => {
        // assume req.user set earlier by authentication middleware
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
