# 指令

Then install dependencies:
> $ npm install

On MacOS or Linux, run the app with this command:
> $ DEBUG=blog:* npm start

On Windows Command Prompt, use this command:
> \>set DEBUG=blog:* & npm start

On Windows PowerShell, use this command:
> PS> $env:DEBUG='blog:*'; npm start

創建資料庫：
> npx sequelize db:migrate

生成假資料：
> npx sequelize db:seed:all
