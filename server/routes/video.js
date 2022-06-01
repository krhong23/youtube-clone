const express = require('express');
const router = express.Router();

const {Video} = require('../models/Video');
const multer = require('multer');
const path = require('path');
var ffmpeg = require('fluent-ffmpeg');

//==================
// Video
//==================

// Storage Multer Config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== 'mp4') {
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({storage: storage}).single('file');

router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        console.log(res.req.file, 'hihihihihi');
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
        .on('error', function (err) {
            console.log(err);
            return res.json({success: false, err});
        })
        .screenshots({
            // Will take screenshots at 20%, 40%, 60% and 80% of the video
            count: 3,    // 3개의 썸네일 생성
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })

});

router.post('/uploadVideo', (req, res) => {
    // 비디오를 서버에 저장한다.
    // console.log(req.body);
    const video = new Video(req.body)
    video.save((err, doc) => {
        if (err) {
            return res.json({success: false, err})
        }
        res.status(200).json({success: true})
    })
})

router.get('/getVideos', (req, res) => {
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, videos})
        })
})

router.post('/getVideoDetail', (req, res) => {
    Video.findOne({"_id": req.body.videoId})
        .populate('writer')
        .exec((err, videoDetail) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, videoDetail})
        })
})

module.exports = router;