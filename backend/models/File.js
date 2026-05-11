const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    fileName: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    uploadedBy: {
        type: String
    },

    visibility: {
        type: String,
        enum: ["public", "private"],
        default: "private"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("File", fileSchema);