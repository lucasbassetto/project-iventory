const getToken = (req) => {

    const authHeader = req.headers.authorization
    return authHeader.split(" ")[1];
}

module.exports = getToken;