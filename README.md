# news-explorer-api
Серверная часть дипломного проекта для Яндекс Практикума

#### Ссылки:

#### Что умеет сервер:

#### Используемые технологии:
Node.js, express, MongoDB, Mongoose, Joi, Celebrate, JWT, pm2

#### Примеры запросов к API ():

* **Регистрация нового пользователя:**   POST .../signup
```
Тело запроса:
{
    "name": "Test User 14",
    "email": "myemail@yandex.ru",
    "password": "12345678"
}
```

* **Авторизация:**   POST .../signin
```
Тело запроса:
{
    "email": "myemail@yandex.ru",
    "password": "12345678"
}
```

* **Получить свою юзердату:**     GET .../users/me (+ токен авторизации)

* **Получить список своих сохранённых статей:**   GET .../articles (+ токен авторизации)

* **Сохранить новую статью:**   POST .../articles   (+ токен авторизации)
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

* **Удалить статью по её id:**   DELETE .../articles/5f38c3d2f072ca12cc8fcab5 (+ токен авторизации)
