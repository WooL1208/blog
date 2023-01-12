var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if(req.isLoggedIn === false) {
        return res.redirect("/warning");
    }

    res.render("comments/index", { title: '留言', isLoggedIn: req.isAdmin, isAdmin: req.isAdmin });
});

module.exports = router;