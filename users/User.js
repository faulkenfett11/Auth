const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userModel = {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
}

const options = {
    timestamps: true
}

const userSchema = new mongoose.Schema(userModel, options);

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    return next();
  });
});

userSchema.methods.isPasswordValid = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;