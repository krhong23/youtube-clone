const express = require('express');
const router = express.Router();

const {Like} = require('../models/Like');
const {Dislike} = require('../models/Dislike');

//==================
// Like
//==================

router.post("/getLikes", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId}
        } else {
            variable = {commentId: req.body.commentId}
        }
        Like.find(variable)
            .exec((err, likes) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success: true, likes})
            })
    }
)

router.post("/getDislikes", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId}
        } else {
            variable = {commentId: req.body.commentId}
        }
        Like.find(variable)
            .exec((err, dislikes) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success: true, dislikes})
            })
    }
)

router.post("/upLike", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        // Like Collection 에다가 클릭 정보 추가
        const like = new Like(variable)

        like.save((err, result) => {
            if (err) return res.json({success: false, err})

            // 만약에 DisLike 이 이미 클릭되어 있다며, Dislike을 1 줄여주기
            Dislike.findOneAndDelete(variable)
                .exec((err, result) => {
                    if (err) return res.status(400).json({success: false, err})
                    res.status(200).json({success: true})
                })
        })
    }
)
router.post("/unLike", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        Like.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    }
)

router.post("/upDislike", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        // Like Collection 에다가 클릭 정보 추가
        const dislike = new Dislike(variable)

        dislike.save((err, result) => {
            if (err) return res.status(400).json({success: false, err})

            // 만약에 Like 이 이미 클릭되어 있다며, like을 1 줄여주기
            Like.findOneAndDelete(variable)
                .exec((err, result) => {
                    if (err) return res.status(400).json({success: false, err})
                    res.status(200).json({success: true})
                })
        })
    }
)
router.post("/unDislike", (req, res) => {
        let variable = {}

        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        Dislike.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    }
)

module.exports = router;