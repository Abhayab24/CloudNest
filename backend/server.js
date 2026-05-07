const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

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

/* Upload API */

app.post("/upload", upload.single("file"), (req, res) => {

    res.json({
        message: "File uploaded successfully",
        file: req.file
    });
});

/* Get Files */

const fs = require("fs");

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