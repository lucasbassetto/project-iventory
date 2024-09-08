const jwt = require('jsonwebtoken');

const createToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, 'secret')

    res.status(200).json({
        message: 'User logged in',
        token: token,
        userId: user._id,
    })
}

module.exports = createToken;