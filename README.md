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
 3. После установки всех зависимостей пропишите в консоль `npm run serve`.
 4. Если понадобится исправить что либо, откройте вторую консоль и пропишите `tsc` для запуска компиляции TS кода в `--watch` режиме.
