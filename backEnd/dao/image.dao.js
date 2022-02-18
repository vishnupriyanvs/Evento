const multer = require('multer');
const eventDao = require('../dao/event.dao');
const Event = require('../model/event');
const User = require('../model/user');


const eventImagesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './asset/event-images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        let [filename, extension] = file.originalname.split('.');
        eventDao.addImageUrl(req.params.eventid, `./asset/event-images/${req.params.eventid}.${extension}`).then((data) => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
        cb(null, req.params.eventid + '.' + extension)
    }
})

const findImageUrl = async (eventid) => await Event.findByPk(eventid);
const findUserImageUrl = async (userid) => await User.findByPk(userid)

const eventImageDao = {
    eventImagesStorage,
    findImageUrl,
    findUserImageUrl

}
module.exports = eventImageDao;