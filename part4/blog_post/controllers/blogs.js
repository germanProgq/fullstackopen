const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', (req, res) => {
    Blog.find({}).then((response) => {
        res.json(response);
    });
});

blogRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => next(err));
});

module.exports = blogRouter;