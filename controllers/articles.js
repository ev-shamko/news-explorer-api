/* ***************** ИМПОРТЫ ************************* */

const Article = require('../models/article');

// импорт собственных конструкторов ошибок 400, 401, 404
const BadRequestError = require('../errors/err-bad-req');
const AuthorizationError = require('../errors/err-auth');
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

// DELETE .../DELETE /articles/:_Id
module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .then((article) => {
      // проверяем, совпадает ли id владельца статьи с id пользователя из токена
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) {
        throw new AuthorizationError('Вы не можете удалить эту статью, т.к. её создали не вы');
      }

      // если статью создал авторизированный пользователь, удаляем эту статью
      Article.deleteOne(article)
        .then(() => res.send({
          message: 'Эта статья успешно удалена:',
          data: article,
        }));
    })
    .catch(next); // здесь лучше расписать ошибку про ненайденную статью
};
