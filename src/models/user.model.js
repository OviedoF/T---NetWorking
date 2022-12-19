const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    userImage: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    cellphone: String,

    email: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: Number,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    
    wishList: [{
        ref: "Product",
        type: Schema.Types.ObjectId
    }],

    shoppingCart: [{
        ref: "Product",
        type: Schema.Types.ObjectId
    }],

    shoppingHistory: [{
        ref: "Purchase",
        type: Schema.Types.ObjectId
    }],

    notifications: [{
        subject: String,
        message: String,
        redirect: String
    }],

    directions: [{
        name: String,
        region: String,
        commune: String,
        street: String,
        number: String,
        departament: String,
        details: String,
    }]
}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

module.exports = model('User', userSchema);