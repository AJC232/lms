const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

      firstName: {
          type: String,
          required: [true, 'Please Enter First Name'],
          lowercase: true
      },
      lastName: {
        type: String,
        required: [true, 'Please Enter Last Name'],
        lowercase: true
      },
      email: {
          type: String,
          required: [true, 'Please Enter an Email'],
          unique: true,
          lowercase: true,
          validate: [isEmail, 'Please, Enter a valid Email'] 
      },
      password: {
        type: String,
        required: [true, 'Please Enter an Password'],
        minlength: [6, 'Please enter atleast 6 characters']
      },
      // profilepic:
      // {
      //   data: Buffer,
      //   contentType: String
      // }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user;
      }
      throw Error('Incorrect Password');
    }
    throw Error('Email does not exists');
}

const User = mongoose.model('user', userSchema);

module.exports = User;