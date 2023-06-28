const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        requird: true
    }
})

userSchema.plugin(passportLocalMongoose)// Automatically handles hashing and salting of passwords
// and adds the following properties to the user object:
//   - password
//   - salt
//   - hash

module.exports = mongoose.model('users', userSchema)