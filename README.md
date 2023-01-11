# 指令

Install dependencies:
> $ npm install

On MacOS or Linux, run the app with this command:
> $ DEBUG=blog:* npm start

On Windows Command Prompt, use this command:
> \>set DEBUG=blog:* & npm start

On Windows PowerShell, use this command:
> PS> $env:DEBUG='blog:*'; npm start

創建資料庫（Deprecated）：
> npx sequelize db:migrate

生成假資料（Deprecated）：
> npx sequelize db:seed:all

生成假資料：
> node .\ajax-services\fake.js