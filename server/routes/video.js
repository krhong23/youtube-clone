const express = require('express');
const router = express.Router();

const {Video} = require('../models/Video');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

//==================
// Video
//==================
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // 파일 저장 위
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // ex) 20220502_hi.png
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png') {
            return cb(res.status(400).end('only png is allowed'), false);
        }
        cb(null, true)
    }
})

const upload = multer({storage: storage}).single("file");

router.post('/uploadfiles', (req, res) => {

    upload(req, res, err => {
        if (err) {
            return res.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })

});

router.post('/thumbnail', (req, res) => {
    // 썸네일 생성하고 비디오 러닝 타임도 가져오기.
    let thumbFilePath = "";
    let fileDuration = "";
    console.log('hi!!! thumbnail')

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    // 썸네일 생성
    ffmpeg(req.body.filePath)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            thumbFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({success: true, thumbFilePath: thumbFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        });

});

router.post('/uploadVideo', (req, res) => {
    // 비디오를 서버에 저장한다.

    const video = new Video(req.body)
    video.save((err, doc) => {
        if (err) {
            return res.json({
                success: false, err
            })
        }
        res.status(200).json({success: true})
    })
})

module.exports = router;