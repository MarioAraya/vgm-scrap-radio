const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    username: String,
    email: String,
    creationDate: Date
})

UserSchema.pre('save', function (next) {
    var self = this;
    users.find({ _id: self._id }, function (err, result) {
        if (!result.length) {
            next();
        } else {
            console.log('user exists: ', self.name);
            next(new Error("User exists!"));
        }
    });
});

module.exports = UserSchema