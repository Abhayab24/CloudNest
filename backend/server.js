const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* MongoDB */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* Storage Config */

const storage = multer.diskStorage({

    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

/* Register */

app.post("/register", async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "User registered successfully"
        });

    } catch(error) {

        res.status(500).json(error);
    }
});

/* Login */

app.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.json({
            token,
            user
        });

    } catch(error) {

        res.status(500).json(error);
    }
});

/* Upload */

app.post("/upload", upload.single("file"), (req, res) => {

    res.json({
        message: "File uploaded successfully",
        file: req.file
    });
});

/* Delete */

app.delete("/delete/:filename", (req, res) => {

    const fileName = req.params.filename;

    fs.unlink(`uploads/${fileName}`, (err) => {

        if(err) {
            return res.status(500).json({
                error: err
            });
        }

        res.json({
            message: "File deleted successfully"
        });
    });
});

/* Files */

app.get("/files", (req, res) => {

    fs.readdir("uploads", (err, files) => {

        if(err) {
            return res.status(500).json({
                error: err
            });
        }

        res.json(files);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});