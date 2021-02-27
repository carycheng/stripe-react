const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});

// We can alternatively export this model class and require this like we
// did previously, however, due to testing issues where mocha or jest
// will try to load in users multiple times causing issues, we will export
// this class a different way.

// When you specify two parameters, model name and the schema defintion. Everytime
// this model is used in creation, this model class is then loaded into mongoose. One
// argument like we do in passport.js means we are trying to load or fetch a model out of mongoose
mongoose.model('users', userSchema);