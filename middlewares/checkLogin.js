module.exports = {
    isLoggedin: function isLoggedin(req, res, next) {
        if (!req.session.loginStatus == 1) {
            //Not Logged In Yet!
            res.status(400);
            return res.send("Please go to index and login");
        }
        next();
    },

    isNotLoggedin: function isNotLoggedin(req, res, next) {
        if (req.session.loginStatus == 1) {
            //Logged In Yet!
            return res.sendStatus(400);
        }
        next();
    }
};
