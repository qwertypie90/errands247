const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://errands247_db:lala1919@ds135486.mlab.com:35486/errands247', { useMongoClient: true });
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String
});
    
var User = mongoose.model('User', userSchema);

// var test = new User({
// username : 'SUHA',
// googleId : 'SUHA@GMAIL.COM',
// thumbnail : '',
// });

// test.save(function (err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('it works');
// 	}
// });


module.exports = User;


