const mongoose     = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)
mongoose.connect(process.env.MLAB_URI, {useNewUrlParser: true});

let Schema = mongoose.Schema;
let stockSchema = new Schema({
  stock: {type: String, required: true, unique: true},
  price: {type: Number, required: true},
  likes: {type: String, required: true}
});

//Glitch is giving errors in the next line but is working as it should!
module.exports = Stock = mongoose.model('Stock', stockSchema);