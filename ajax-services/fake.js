let { promisePool: mysql } = require('../lib/mysql');
let { register } = require('../app/view-model/users');
let {editUser} = require('../app/view-model/member');

async function generateUser() {
    await mysql.execute(`
        DROP TABLE IF EXISTS \`users\`;
    `);
    await mysql.execute(`
        CREATE TABLE \`users\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`is_admin\` int NOT NULL COMMENT '0 : normal, 1 : admin',
            \`name\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`account\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`password\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    await register(`root`, `root`, `root`);
    await editUser(1, 1, `root`);
    for(let i = 0; i < 100; i++) {
        await register(`user${i}`, `user${i}`, `user${i}`);
    }
}

async function main(){
    await generateUser();
    process.exit();
}

main();