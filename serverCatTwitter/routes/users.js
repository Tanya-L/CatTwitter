const router = require('express').Router()
const {User} = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

router.route('/register')
    .post((req, res) => {
        const {isValid, errors} = validateRegisterInput(req.body)

        if (!isValid) {
            return res.status(404).json(errors)
        }

        User.findByEmail(req.body.email)
            .then(_ => {
                errors.email = 'Email was used!'
                return res.status(404).json(errors)
            })
            .catch(_ => {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        const newUser = new User(
                            User.createId(),
                            req.body.email,
                            req.body.login,
                            hash,
                            req.body.bio,
                            req.body.name
                        )

                        newUser.save()
                            .then(newUser => res.json(newUser))
                            .catch(err => console.log(err))
                    })
                })
            })
    })

router.route('/login')
    .post((req, res) => {
        const {errors, isValid} = validateLoginInput(req.body)

        if (!isValid) {
            return res.status(404).json(errors)
        }

        User.findByEmail(req.body.email)
            .then(({Item: user}) => {
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            jwt.sign({id: user.id},
                                process.env.SECRET,
                                {expiresIn: '1d'},
                                function (err, token) {
                                    return res.json({
                                        success: true,
                                        token: token
                                    })
                                })
                        } else {
                            errors.password = 'Password is incorrect'
                            return res.status(404).json(errors)
                        }
                    })
            })
            .catch(_ => {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            })
    })

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res) => {
        res.json({
            id: req.user.id,
            email: req.user.email,
            login: req.user.login,
            followers: req.user.followers,
            following: req.user.following,
            bio: req.user.bio,
            name: req.user.name
        })
    })

router.route('/follow')
    .post(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            User.findById(req.user.id)
                .then(({Item: followingUser}) => {
                    // Read user who follows, update
                    let user = User.from(followingUser)
                    user.following.push(req.body.userId);
                    return user.save()
                        .then(_ => {
                            // Read user who is followed
                            return User.findById(req.body.userId)
                        })
                        .then(({Item: followedUser}) => {
                            // Update user who is followed
                            let user = User.from(followedUser)
                            user.followers.push(req.user.id);
                            return user.save()
                                .then(user => res.json({userId: req.body.userId}))
                                .catch(err => console.log(err))
                        })
                })
                .catch(err => console.log(err))
        })

router.route('/unfollow')
    .post(
        passport.authenticate('jwt', {session: false}),
        (req, res) => {
            User.findById(req.user.id)
                .then(({Item: followingUser}) => {
                    // Read user who follows, update
                    let user = User.from(followingUser)
                    user.removeFollowing(req.body.userId)
                    user.save()
                        .then(_ => {
                            // Read user who is followed
                            return User.findById(req.body.userId)
                        })
                        .then(({Item: followedUser}) => {
                            let user = User.from(followedUser)
                            user.removeFollower(req.user.id);
                            return user.save()
                                .then(user => res.json({userId: req.body.userId}))
                                .catch(err => console.log(err))
                        })
                })
                .catch(err => console.log(err))
        }
    )

// Find one user by exact full name by email or by login
router.route('/search')
    .post((req, res) => {
        User.scan()
            .then(({Items: items}) => {
                console.info(items)
                // filter from all users
                const items2 = items.filter(
                    i => i.email.indexOf(req.body.text) >= 0
                        || i.login.indexOf(req.body.text) >= 0
                )
                if (items2.length > 0) {
                    return res.json({userId: items2[0].id})
                }
                return res.status(404).json({msg: 'User not found'})
            })
            .catch(err => {
                console.info(err)
                res.status(404).json({msg: 'User not found'})
            })
    })

router.route('/:id')
    .get((req, res) => {
        User.findById(req.params.id)
            .then(({Item: user}) => {
                return res.json({
                    id: user.id,
                    email: user.email,
                    login: user.login,
                    followers: user.followers,
                    following: user.following,
                    bio: user.bio,
                    name: user.name
                })
            })
            .catch(err => {
                console.log(err);
                return res.status(404).json({msg: 'User not found'})
            })
    })

// POST to user, updates password and bio
// { userId, password, bio }
router.route('/:userId')
    .post((req, res) => {
        User.findByEmail(req.body.email)
            .then(({Item: userFound}) => {
                let user = User.from(userFound)
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, function (err, hash) {
                        if (req.body.password.length > 0) {
                            user.password = hash
                        }
                        user.bio = req.body.bio
                        user.save()
                            .then(_ => res.status(204))
                            .catch(err => {
                                console.log(err)
                                return res.status(400)
                            })
                    })
                })
            })
            .catch(_ => res.status(404))
    })

module.exports = router