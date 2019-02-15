var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    require: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    require: true
  },
  passwordConf: {
    type: String,
    required: true
  }
});
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    })
  })
});

// UserSchema.methods.comparePassword = function()

module.exports = mongoose.model('User', UserSchema);
