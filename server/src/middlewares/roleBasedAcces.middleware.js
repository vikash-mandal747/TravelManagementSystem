
const roleBasedAccesControl = (allowedRoles) => {

    return (req, res, next) => {
        //allowedRoles are array of roles
        if (allowedRoles.includes(req.role)) {
            //role matched
            next()
        } else {
            res.status(403).json({ message: "Unauthorize Access" })
        }
    }
}

module.exports = roleBasedAccesControl