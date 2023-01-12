var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("comments/index", { title: '留言', isLoggedIn: req.isLoggedIn, isAdmin: req.isAdmin });
});

module.exports = router;