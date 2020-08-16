/* ***************** ИМПОРТЫ ************************* */

const Article = require('../models/article');

// импорт собственных конструкторов ошибок 400, 401, 404
const BadRequestError = require('../errors/err-bad-req');
// const AuthorizationError = require('../errors/err-auth');
const NotFoundError = require('../errors/err-not-found');

/* **************************************************** */

module.exports.createArticle = (req, res, next) => {
  const {
    title,
    text,
    date,
    source,
    link,
    image,
    keyword,
  } = req.body;

  Article.create({
    title,
    text,
    date,
    source,
    link,
    image,
    keyword,
    owner: req.user._id,
  })
    .then((newArticle) => res.send({
      message: 'Статья успешно сохранена:',
      data: newArticle,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка валидации при добавлении статьи в базу данных. Проверьте тело POST запроса и корректность вводимых данных');
      } else {
        next(err);
      }
    })
    .catch(next); // стандартная ошибка 500; эквивалентно .catch(err => next(err));
};

module.exports.getAllArticles = (req, res, next) => {

  Article.find({ owner: req.user._id })
    .then((articles) => {
      if (!articles) {
        throw new NotFoundError('Не найдены сохранённые статьи у данного пользователя');
      }
      res.send({ data: articles });
    })
    .catch(next);
};
