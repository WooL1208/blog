require('dotenv').config();
var { getAccount, registerAccount, updateAccountDb, getAccountByIdDb } = require('../model/users');
var argon2 = require('argon2');

/**
 * 註冊帳號
 * @param {string} name 使用者名稱
 * @param {string} account 帳號
 * @param {string} password 密碼
 * @returns {boolean} 是否註冊成功
 */
async function register(name, account, password, isAdmin) {
    const hashedPassword = await argon2.hash(password);

    // 檢查帳號是否重複
    const ret_account = await getAccount(account);
    if (ret_account.length !== 0) {
        return false;
    }

    // 註冊
    if (await registerAccount(name, account, hashedPassword, isAdmin)) {
        return true;
    } else {
        return false;
    }
}

async function updateAccount(id, name, oldPassword, newPassword) {
    // 取得符合的帳戶資料
    let hashedNewPassword = undefined;
    const retAccount = await getAccountByIdDb(id);

    // 判斷有沒有這個帳號
    if (retAccount.length != 1) {
        return false;
    }

    
    if (newPassword !== '' && newPassword !== undefined) {
        // 判斷密碼是否正確
        hashedNewPassword = await argon2.hash(newPassword);

        const user = retAccount[0];
        if (!await argon2.verify(user.password, oldPassword)) {
            return false;
        }
    }
    
    if(await updateAccountDb(id, name, hashedNewPassword)) {
        return true;
    }else {
        return false;
    }
}

module.exports = { register, updateAccount };