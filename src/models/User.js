const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password'))
    {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;