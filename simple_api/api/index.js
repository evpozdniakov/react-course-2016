var router = require('express').Router();
var comments = require('./comments')
var news = require('./news')
var assign = require('object-assign');

router.get('/news', function (req, res, next) {
    var articles = withComments(news).map(function (article) {
            return assign({}, article, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || articles.length,
        offset = Number(req.query.offset) || 0;

    res.json(articles.slice(offset, limit + offset))
});

router.get('/news/:id', function (req, res, next) {
    var article = withComments(news).filter(function (article) {
        return article.id == req.params.id
    })[0];
    if (article) return res.json(article);

    res.status(404).json({error: "not found"});
});

router.post('/news', function (req, res, next) {
    var body = req.body;
    var article = {
        text: body.text,
        id: news.length + 1,
        user: body.user,
        timeStamp: new Date()
    };
    news.push(article);
    res.json(article)
});

router.get('/comment', function (req, res, next) {
    var aid = req.query.article;
    if (aid) return res.json(comments.filter(function (comment) {
        return comment.article == aid
    }))

    var limit = Number(req.query.limit) || comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: comments.length,
        records: comments.slice(offset, limit + offset)
    })
});

router.post('/comment', function (req, res, next) {
    var comment = {
        id : comments.length + 1,
        text : req.body.text,
        timeStamp: new Date(),
        user: req.body.user,
        article : req.body.article
    };
    comments.push(comment);
    res.json(comment)
});

router.post('/report', function (req, res) {
    res.json({})
})

module.exports = router;

function withComments(articles) {
    return articles.map(function (q) {
        q.comments = comments.filter(function (comment) {
            return comment.article == q.id
        }).map(function (comment) {
            return comment.id
        });
        return q
    })
}