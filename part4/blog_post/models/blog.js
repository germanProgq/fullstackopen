const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set('toJSON', {
    transform: (document, retrievedObject) => {
        retrievedObject.id = retrievedObject._id.toString();
        delete retrievedObject.__v;
        delete retrievedObject._id;
    }
});

module.exports = mongoose.model('Blog', blogSchema)
