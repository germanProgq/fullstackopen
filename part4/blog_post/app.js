const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const blogRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware')
const app = express();

logger.info('Connecting to database');
mongoose.connect(config.MONGODB_URL, { family: 4 })
.then(() => {
  logger.info("Established MongoDB connection");
})
.catch((err) => {
  logger.error('Issues while connecting to database: ', err);
});


app.use(express.json());
app.use(middleware.requestLogger);
app.use('/api/blogs', blogRouter);

app.use(middleware.unknownPathHandler);
app.use(middleware.errorHandler);

module.exports = app;

// app.get('/api/blogs', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs)
//   })
// })

// app.post('/api/blogs', (request, response) => {
//   const blog = new Blog(request.body)

//   blog.save().then((result) => {
//     response.status(201).json(result)
//   })
// })

// const PORT = 3003
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })