const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false});

let bookSchema = new mongoose.Schema({
  title: String,
  comments: [String]
});

//Glitch is giving errors in the next line but is working as it should!
module.exports = Book = mongoose.model('Book', bookSchema);