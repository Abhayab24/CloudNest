const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const File = require("./models/File");
const auth = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

/* MongoDB */

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

/* Storage */

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

        const existingUser = await User.findOne({ email });

        if(existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });
        }

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

        res.status(500).json({
            message: error.message
        });
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

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

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

        res.status(500).json({
            message: error.message
        });
    }
});

/* Upload File */

app.post(
    "/upload",
    auth,
    upload.single("file"),

    async (req, res) => {

        try {

const visibility = req.body.visibility;

const user = await User.findById(req.user.id);

console.log(user.username);

const newFile = new File({

    fileName: req.file.filename,

    owner: req.user.id,

    uploadedBy: user.username,

    visibility
});

console.log(newFile);

await newFile.save();

            res.json({
                message: "File uploaded successfully"
            });

        } catch(error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);

/* Get Files */

app.get("/files", auth, async (req, res) => {

    try {

        const files = await File.find();

        const filteredFiles = files.filter((file) => {

            if(file.visibility === "public") {

                return true;
            }

            return file.owner.toString() === req.user.id;
        });

        res.json(filteredFiles);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
});

/* Secure Download */

app.get("/download/:filename", async (req, res) => {

    try {

        const token = req.query.token;

        if(!token) {

            return res.status(401).json({
                message: "No token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const file = await File.findOne({
            fileName: req.params.filename
        });

        if(!file) {

            return res.status(404).json({
                message: "File not found"
            });
        }

        if(
            file.visibility === "private" &&
            file.owner.toString() !== decoded.id
        ) {

            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.download(`uploads/${file.fileName}`);

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
});

/* Delete File */

app.delete("/delete/:filename", auth, async (req, res) => {

    try {

        const file = await File.findOne({
            fileName: req.params.filename
        });

        if(!file) {

            return res.status(404).json({
                message: "File not found"
            });
        }

        if(file.owner.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Access denied"
            });
        }

        fs.unlinkSync(`uploads/${file.fileName}`);

        await File.deleteOne({
            _id: file._id
        });

        res.json({
            message: "File deleted successfully"
        });

    } catch(error) {

        res.status(500).json({
            message: error.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});