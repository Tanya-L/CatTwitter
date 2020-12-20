const {serverError} = require("./serverError");
const router = require('express').Router()
const passport = require('passport')
const {Post} = require('../models/Post')
const {sendQueueMsg} = require("./sqs_sendmessage");

router.route('/add')
    .post(
        passport.authenticate('jwt', {session: false}),
        async (req, res) => {
            try {
                const text = req.body.text.trim()
                const newPost = new Post(
                    Post.createId(),
                    req.user.id,
                    req.user.name,
                    text)
                newPost.save()
                    .then(post => {
                        if (text.indexOf("#email") >= 0) {
                            return sendQueueMsg(req.user.email, text)
                                .then(_ => res.json(post))
                        } else {
                            return res.json(post);
                        }
                    })
                    .catch(error => serverError("posts.js(/add)", res, error))
            } catch (error) {
                return serverError("posts.js(/add)", res, error)
            }
        })

router.route('/:postId')
    .delete(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            // TODO: Can delete any user's posts if logged in
            Post.delete(req.params.postId)
                .then(_ => res.json({}))
                .catch(err => console.log(err))
        })

router.route('/')
    .get((req, res) => {
        try {
            Post.scan()
                .then(({Items: items}) => {
                    return items.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
                })
                // .then(posts => {
                //     return Promise.all(posts.map(p => {
                //         return User.findById(p.)
                //     }));
                // })
                .then(posts => res.json(posts))
                .catch(err => serverError("posts.js(/)", res, err))
        } catch (error) {
            return serverError("posts.js(/)", res, error)
        }
    })

router.route('/following')
    .get(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            // Post.find({
            //     'user.id': {$in: req.user.following}
            // })
            //     .sort({createdAt: -1})
            //     .then(posts => res.json(posts))
            //     .catch(err => console.log(err))
            res.json([])
        })

router.route('/:userId')
    .get((req, res) => {
        Post.scan()
            .then(({Items: posts}) => {
                return posts.filter(p => p.ownerUserid === req.params.userId)
                    .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)
            })
            .then(posts => res.json(posts))
            .catch(err => console.log(err))
    })

module.exports = router