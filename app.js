/* **************** Импорт модулей ********************** */

require('dotenv').config();
const express = require('express');
// const { errors } = require('celebrate'); // тестирует запросы в роут '/' и работает с ошибками от celebrate
const cookieParser = require('cookie-parser'); // читает куки и разбирает полученную строку в объект
const mongoose = require('mongoose'); // ODM пакет для взаимодействия с mongoDB
const helmet = require('helmet'); // проставляет заголовки для безопасности: set HTTP response headers
const bodyParser = require('body-parser'); // внимание! обязателен! И ниже его app.use -аем дважды
// const { requestLogger, errorLogger } = require('./middlewares/logger'); // импорт логгеров для запросов и ошибок должен быть последним в этом блоке

/* **************** Сервер ********************* */

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet()); // рекомендуется использовать как можно раньше

// эти две строчки обязательные. Они собираюют из пакетов объект req.body
// без них req.body = undefined
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// без этого пакета сервер не сможет работать с куки и вся авторизация накроется ошибкой
app.use(cookieParser());
// app.use(requestLogger); // логгер реквестов подключаем выше всех обработчиков роутов

/* **************** Соединение с локальной БД ********************** */

// кстати, ссылку на порт тоже можно в .env запихнуть
// https://habr.com/ru/company/ruvds/blog/351254/
mongoose.connect('mongodb://localhost:27017/newsExplorerDB', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true, // убираем бесячее сообщение в консоли
});

/* **************** РОУТЫ ********************** */

const notokenAuth = require('./routes/auth');

app.use('/', notokenAuth); // создание нового пользователя и авторизация для получения токена

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// юзаем notokenAuth
// авторизируйтесь для нижеследующих роутов
// роут юзеров
// роут карточек
// роут общей ошибки сервера

/*  ********* Обработчик ошибок ******* */

// app.use(errorLogger); // подключаем логгер ошибок выше всех ошибок
// app.use(errors()); // обработчик ошибок celebrate, подключаем именно тут

// обработка неучтённых ошибок

/* ********************************************* */

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
