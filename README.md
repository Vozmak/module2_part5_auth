# Module 2 Part 5: Gallery Express Server

___

## Цель проекта

 - Проект создан с целью ознакомления с [Express](https://expressjs.com), [Node.js](https://nodejs.org/en/), [Postman](https://www.postman.com), [Swagger(OpenAPI)](https://swagger.io), [MongoDB](https://www.mongodb.com/) и созданию сервера на их основе

___

 - Цель данной части - изучить NoSQL базу данных `MongoDB` и способы работы с ней.
 - Создать возможность фильтровать картинки в зависимости от пользователей, 
 
 1. Для запуска сервера, откройте проект вашем редакторе кода и напишите в консоль `npm install` для установки зависимостей.
 2. В корневой папке создайте папку config `mkdir config`, с файлом `default.json`
    Структура конфига 
``{ "PORT": 8080, "hostname": "you_hostname", "connectDb": "you_url", "saltRounds": 10 }``
 3. Откройте консоль и пропишите `tsc` для запуска компиляции TS кода в `--watch` режиме.
 4. После установки всех зависимостей откройте вторую консоль и пропишите `npm run serve`.
 5. Для запуска проекта с помощью `pm2 start app.js` скопируйте файл `package.json` в папку `build` и пропишите `pm2 start build/server/server.js`
