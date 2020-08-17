# news-explorer-api
Серверная часть дипломного проекта для Яндекс Практикума

#### Ссылки:
http://84.201.149.81
http://mesto-nodeapp.tk и http://www.mesto-nodeapp.tk
https://mesto-nodeapp.tk и https://www.mesto-nodeapp.tk


#### Что умеет сервер:
Регистрация и авторизация пользователей.
Взаимодействие с MongoDB. Сохранение статей, возвращение списка всех статей, удаление статей.
Выдача авторизационного токена (jwt).
Валидация входящих запросов.

#### Используемые технологии:
Node.js, express, nginx, MongoDB, Mongoose, Joi, Celebrate, JWT, pm2


----------------------------------------------------------------

#### Примеры запросов к API:

* **Регистрация нового пользователя:**   POST https://mesto-nodeapp.tk/signup
```
Тело запроса:
{
    "name": "Test User 14",
    "email": "myemail@yandex.ru",
    "password": "12345678"
}
```

* **Авторизация:**   POST https://mesto-nodeapp.tk/signin
```
Тело запроса:
{
    "email": "myemail@yandex.ru",
    "password": "12345678"
}
```

* **Получить свою юзердату:**     GET https://mesto-nodeapp.tk/users/me (+ токен авторизации)

* **Получить список своих сохранённых статей:**   GET https://mesto-nodeapp.tk/articles (+ токен авторизации)

* **Сохранить новую статью:**   POST https://mesto-nodeapp.tk/articles   (+ токен авторизации)
```
Тело запроса:
{
    "title": "Article title",
    "text": "Content of the article",
    "date": "2020-08-16T03:41:29.071Z",
    "source": "http://www.some.cite",
    "link": "http://www.some.cite/news.jpg",
    "image": "http://www.some.cite/news.jpg",
    "keyword": "keyword"
}
```

* **Удалить статью по её id:**   DELETE https://mesto-nodeapp.tk/articles/5f38c3d2f072ca12cc8fcab5 (+ токен авторизации)


#### Как запустить локально:
1.	Клонируйте репозиторий
2.	$ npm i
3.	Проверьте, установлена ли у вас MongoDB
4.	Запустите локальный сервер одной из этих команд:
```
$ npm run start
$ npm run dev      (тут будет hot reload)
```
