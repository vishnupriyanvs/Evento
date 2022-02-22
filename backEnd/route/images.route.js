const express = require('express');
const router = express.Router();
const imageController = require('../controller/image.controller');




router.post("/upload/:eventid", imageController.uploadEventImage.single('avatar'), (req, res) =>res.send("Image Uploaded"));
router.get("/download/:eventid", imageController.downloadEventImage)
router.get("/profile/user/:userid", imageController.downloadUserImage);

module.exports = router;

//Image whole logic

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './asset/event-images')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         let [filename, extension] = file.originalname.split('.');
//         eventDao.addImageUrl(req.params.eventid, `./asset/event-images/${req.params.eventid}.${extension}`).then((data)=>{
//             console.log(data)
//         }).catch(error=>{
//             console.log(error)
//         })
       
//         // let nameFile = filename + "-" + Date.now() + "." + extension; // --> give "video-1622181268053.mp4"

//         cb(null, req.params.eventid + '.' + extension)
//     }
// })
// const upload = multer({ storage: storage });




// const findImageUrl = async(eventid)=> await Event.findByPk(eventid);
// const downloadFiles = async (req, res) => {
  
//     const data = await findImageUrl(req.params.eventid);
//     console.log("in downloads", data.imageUrl);
//     res.download(data.imageUrl, (err) => {
//         if (err) {
//             res.status(500).send({
//                 message: "File can not be downloaded: " + err,
//             });
//         }
//     });

// };

// const fs = require('fs');
// const paths = require('path');
// const URL = "http://localhost:4000/images/get-images-list";

//////// Function to use when path is not stored in database
    // const fileName = req.params.eventid;
    // const path = './asset/images/';
    // let fileData = {};

    // fs.readdir('./asset/images', function (err, files) {
    //     if (err) {
    //         res.status(500).send({
    //             message: "Files not found.",
    //         });
    //     }
    //     files.forEach((file) => {
    //         let [filename, extension] = file.split('.');
    //         if (filename === fileName) {
    //             fileData.name = fileName;
    //             fileData.extension = extension
                 
    //         }

    //     });

        
    //     res.download(path + fileName + '.'+fileData.extension, (err) => {
    //         if (err) {
    //             res.status(500).send({
    //                 message: "File can not be downloaded: " + err,
    //             });
    //         }
    //     });


    // });




// const getFilesList = (req, res) => {
//     const path = paths.dirname('backEnd');
//     // var absoluteBasePath = paths.resolve('backEnd/images');
//     console.log(path)

//     fs.readdir('./asset/images', function (err, files) {
//         if (err) {
//             res.status(500).send({
//                 message: "Files not found.",
//             });
//         }

//         let filesList = [];

//         files.forEach((file) => {
//             filesList.push({
//                 name: file,
//                 url: URL + file,
//             });
//         });

//         res.status(200).send(filesList);
//     });
// };


// router.get("/get-images-list", getFilesList);


