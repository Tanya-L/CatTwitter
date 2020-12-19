const router = require('express').Router()
const passport = require('passport')
const Post = require('../models/Post')
const {sendQueueMsg} = require("./sqs_sendmessage");

router.route('/add')
    .post(
        passport.authenticate('jwt', {session: false}),
        async (req, res) => {
            try {
                const text = req.body.text.trim()
                const newPost = new Post({
                    user: {
                        id: req.user.id,
                        login: req.user.login
                    },
                    text
                })

                newPost.save()
                    .then(post => {
                        if (text.indexOf("#email") >= 0) {
                            return sendQueueMsg(req.user.email, text)
                                .then(post => res.json(post))
                        } else {
                            return res.json(post);
                        }
                    })
                    .catch(err => console.log(err))
            } catch (error) {
                return res.status(500).json({error: error.toString()})
            }
        })

router.route('/:postId')
    .delete(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Post.deleteOne({_id: req.params.postId})
                .then(post => res.json(post))
                .catch(err => console.log(err))
        })

router.route('/')
    .get((req, res) => {
        try {
            Post.find()
                .sort({createdAt: -1})
                .then(posts => res.json(posts))
                .catch(err => console.log(err))
        } catch (error) {
            return res.status(500).json({error: error.toString()})
        }
    })

router.route('/following')
    .get(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            Post.find({
                'user.id': {$in: req.user.following}
            })
                .sort({createdAt: -1})
                .then(posts => res.json(posts))
                .catch(err => console.log(err))
        })

router.route('/:userId')
    .get((req, res) => {
        Post.find({'user.id': req.params.userId})
            .sort({createdAt: -1})
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    })

module.exports = router