const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    },
    {strict:false}, //So that we can add new feild according to our needs
    { timestamps: true } 
);

const User = mongoose.model("user", userSchema);

module.exports = User;