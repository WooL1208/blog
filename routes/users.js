var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  const { user } = req.signedCookies;
  const { error } = req.query;

  res.render("users/login", { title: "登入", user, error });
});

router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  const response = fetch("http://localhost:3000/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      account,
      password,
    }),
  }).then(async (resp) => {
    if (resp.status === 200) {
      res_json = await resp.json();

      if(res_json.status){
        res.cookie("tonken", res_json.token);
        return res.redirect("/");
      }else{
        return res.redirect("/users/register?error=登入失敗");
      }
    } else {
      return res.redirect("/users/register?error=API請求失敗");
    }
  });
});

/* 註冊*/ 
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
