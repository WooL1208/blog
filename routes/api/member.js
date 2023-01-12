var express = require("express");
require('dotenv').config();
var { getUsers, getSingleUser, deleteUser, editUser} = require('../../app/view-model/member');
var router = express.Router();

/*
    取得會員資訊
    get /api/member
*/
router.get('/', async function (req, res, next) {
    const { id, isAdmin, name } = req.query;
    // console.log({'id': id});
    if (id) {
        const user = await getSingleUser(id);
        // console.log({'getSingle': user});
        return res.json(user);
    } else {
        const users = await getUsers(isAdmin, name);
        // console.log({'getUsers': users});
        return res.json(users)
    }
});

/*
    取得現在會員資訊
    get /api/member/now
*/
router.get('/now', async function (req, res, next) {
    if (req.userId) {
        const user = await getSingleUser(req.userId);
        return res.json(user);
    } else {
        return res.json({ status: false, message: "取得失敗" });
    }
});

/*
    刪除會員
    delete /api/member
*/
router.delete("/", async function (req, res, next) {
    const { id } = req.body;
    const ret = await deleteUser(id);
    if (ret) {
        return res.json({ status: true, message: "刪除成功" });
    }else{
        return res.json({ status: false, message: "刪除失敗" });
    }

});

router.put("/", async function (req, res, next) {
    const { id, identity, member } = req.body;

    if(req.isAdmin === false) {
        return res.json({ status: false, message: "修改失敗" });
    }

    const ret = await editUser(id, identity, member);
    if (ret) {
        return res.json({ status: true, message: "修改成功" });
    } else {
        return res.json({ status: false, message: "修改失敗" });
    }
});

module.exports = router;