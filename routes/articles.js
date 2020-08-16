/*
# возвращает все сохранённые пользователем статьи
GET /articles

# создаёт статью с переданными в теле
# keyword, title, text, date, source, link и image
POST /articles

# удаляет сохранённую статью  по _id
DELETE /articles/articleId
*/
const articlesRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle } = require('../controllers/articles');

articlesRouter.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required(),
      image: Joi.string().required(),
      keyword: Joi.string().required(),
    }),
  }),
  createArticle,
);

module.exports = articlesRouter;
