const User = require('../Models/User');

const accessAdmin = async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);
    if (user.role === 'admin') {
        next();
    } else {
        res.status(401).json({
            message: 'You are not authorized to access this route'
        });
    }
};

module.exports = accessAdmin;