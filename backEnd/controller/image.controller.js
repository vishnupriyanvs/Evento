const multer = require('multer');
const eventImageDao = require('../dao/image.dao');



const downloadEventImage = async (req, res) => {

    try {

        const data = await eventImageDao.findImageUrl(req.params.eventid);

        console.log("in downloads", data.imageUrl);

        res.download(data.imageUrl, (err) => {

            if (err) {

                res.status(500).send({

                    message: "File can not be downloaded: " + err,

                });

            }

        });

    }catch(err){

        res.status(401).send({message: "No image"})

    }

};

const uploadEventImage = multer({ storage: eventImageDao.eventImagesStorage });

const downloadUserImage = async (req, res) => {

    const data = await eventImageDao.findUserImageUrl(req.params.userid);
    console.log("in downloads", data.imageUrl);
    res.download(data.imageUrl, (err) => {
        if (err) {
            res.status(500).send({
                message: "File can not be downloaded: " + err,
            });
        }
    });

};

const imageController = {
    downloadEventImage,
    uploadEventImage,
    downloadUserImage
}
module.exports = imageController;