const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const paths = require('path')

const URL = "http://localhost:4000/images/get-images-list";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './asset/images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        let [filename, extension] = file.originalname.split('.');
        let nameFile = filename + "-" + Date.now() + "." + extension; // --> give "video-1622181268053.mp4"

        cb(null, req.params.eventid + '.' + extension)
    }
})
const upload = multer({ storage: storage });
router.post("/upload/:eventid", upload.single('avatar'), (req, res) => {
    console.log(req.params.eventid);
    res.send("Image Uploaded")
});

const getFilesList = (req, res) => {
    const path = paths.dirname('backEnd');
    // var absoluteBasePath = paths.resolve('backEnd/images');
    console.log(path)

    fs.readdir('./asset/images', function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Files not found.",
            });
        }

        let filesList = [];

        files.forEach((file) => {
            filesList.push({
                name: file,
                url: URL + file,
            });
        });

        res.status(200).send(filesList);
    });
};


router.get("/get-images-list", getFilesList)

const downloadFiles = (req, res) => {
    const fileName = req.params.eventid;
    const path = './asset/images/';
    let fileData = {};

    fs.readdir('./asset/images', function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Files not found.",
            });
        }
        files.forEach((file) => {
            let [filename, extension] = file.split('.');
            if (filename === fileName) {
                fileData.name = fileName;
                fileData.extension = extension
                 
            }

        });
        res.download(path + fileName + '.'+fileData.extension, (err) => {
            if (err) {
                res.status(500).send({
                    message: "File can not be downloaded: " + err,
                });
            }
        });


    });


};

router.get("/download/:eventid", downloadFiles)

module.exports = router;
