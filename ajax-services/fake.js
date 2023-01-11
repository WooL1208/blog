let { promisePool: mysql } = require('../lib/mysql');
let { register } = require('../app/view-model/users');
let { addArticle } = require('../app/view-model/articles');
const { faker } = require('@faker-js/faker');

const authorAmount = 5;
const userAmount = 50;
const articleAmount = 50;

async function generateUsers(authorAmount, userAmount) {
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
    await register(`root`, `root`, `root`, 1);
    for (let i = 0; i < authorAmount; ++i) {
        await register(`author${i}`, `author${i}`, `author${i}`, 1);
    }
    await register(`author`, `author`, `author`, 1);
    for (let i = 0; i < userAmount; ++i) {
        await register(`user${i}`, `user${i}`, `user${i}`, 0);
    }
}

async function generateArticles(authorAmount) {
    const categories = ['生活', '科技', '美食', '理財'];
    await mysql.execute(`
        CREATE TABLE \`articles\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`user_id\` int NOT NULL,
            \`category\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`title\` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`content\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            KEY \`user_id\` (\`user_id\`),
            CONSTRAINT \`article_ibfk_4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    for (let i = 0; i < articleAmount; ++i) {
        let title = faker.lorem.sentence();
        let category = categories[Math.floor(Math.random() * 4)];
        let userId = Math.floor(Math.random() * authorAmount + 2);
        let content = faker.lorem.paragraphs();
        await addArticle(title, category, userId, content);
    }
}

async function generateMessages() {
    await mysql.execute(`
        CREATE TABLE \`messages\` (
            \`id\` int NOT NULL AUTO_INCREMENT,
            \`user_id\` int NOT NULL,
            \`article_id\` int NOT NULL,
            \`content\` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`),
            KEY \`user_id\` (\`user_id\`),
            KEY \`article_id\` (\`article_id\`),
            CONSTRAINT \`message_ibfk_4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT \`message_ibfk_5\` FOREIGN KEY (\`article_id\`) REFERENCES \`articles\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
}

async function dropAllTable(){
    await mysql.execute(`
        DROP TABLE IF EXISTS \`messages\`;
    `);
    await mysql.execute(`
        DROP TABLE IF EXISTS \`articles\`;
    `);
    await mysql.execute(`
        DROP TABLE IF EXISTS \`users\`;
    `);
}

async function main() {
    await dropAllTable();
    await generateUsers(authorAmount, userAmount);
    await generateArticles(authorAmount);
    await generateMessages(); 
    process.exit();
}

main();