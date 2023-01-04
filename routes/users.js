var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  res.render("users/login", { title: "會員中心", user, error });
});

router.get("/register", function (req, res, next) {
  res.render("users/register", { title: "註冊" });
});

router.post("/register", async function (req, res, next) {
  const { name, account, password } = req.body;

  const response = fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      account,
      password,
    }),
  }).then(async (resp) => {
    if (resp.status === 200) {
      res_json = await resp.json();

      if(res_json.status){
        return res.redirect("/");
      }else{
        return res.redirect("/users/register?error=註冊失敗");
      }
    } else {
      return res.redirect("/users/register?error=API請求失敗");
    }
  });
});

module.exports = router;
