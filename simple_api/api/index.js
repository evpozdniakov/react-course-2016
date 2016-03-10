var router = require('express').Router();
var allComments = require('./comments')
var allNews = require('./news')
var assign = require('object-assign');

router.get('/news', function (req, res, next) {
    var news = allNews.map(function (newsItem) {
            return assign({}, newsItem, {
                content: undefined
            })
        }),
        limit = Number(req.query.limit) || news.length,
        offset = Number(req.query.offset) || 0;

    res.json(news.slice(offset, limit + offset))
});

router.get('/news/:id', function (req, res, next) {
    var newsItem = allNews.filter(function (newsItem) {
        return newsItem.id == req.params.id
    })[0];

    if (newsItem) return res.json(newsItem);

    res.status(404).json({error: "not found"});
});

/*router.post('/news', function (req, res, next) {
    var body = req.body;
    var newsItem = {
        text: body.text,
        id: allNews.length + 1,
        user: body.user,
        timeStamp: new Date()
    };
    allNews.push(newsItem);
    res.json(newsItem)
});*/

router.get('/comment/:newsId', function (req, res, next) {
    const newsItem = allNews.filter(newsItem => newsItem.id == req.params.newsId)[0];
    const commentIds = newsItem && newsItem.comments || [1002,1003,1004];

    res.json(allComments.filter(function (comment) {
        return commentIds.indexOf(comment.id) >= 0
    }))

    /*var limit = Number(req.query.limit) || comments.length,
        offset = Number(req.query.offset) || 0;
    res.json({
        total: comments.length,
        records: comments.slice(offset, limit + offset)
    })*/
});

/*router.post('/comment', function (req, res, next) {
    var comment = {
        id : comments.length + 1,
        text : req.body.text,
        timeStamp: new Date(),
        user: req.body.user,
    };

    comments.push(comment);
    res.json(comment)
});*/

/*router.post('/report', function (req, res) {
    res.json({})
})*/

module.exports = router;

/*function withComments(articles) {
    return articles.map(function (q) {
        q.comments = comments.filter(function (comment) {
            return comment.article == q.id
        }).map(function (comment) {
            return comment.id
        });
        return q
    })
}*/
