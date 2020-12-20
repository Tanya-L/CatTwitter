const {logError} = require("../routes/serverError");
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const {User} = require('../models/User')

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.SECRET

function checkUser(passport) {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        User.findById(jwt_payload.id)
            .then((reply) => {
                if (reply.Item) {
                    let u = User.from(reply.Item)
                    return done(null, u)
                } else {
                    return done(null, false)
                }
            })
            .catch(err => {
                logError("passport.js", err)
                return done(err, false)
            })
    }))
}

module.exports = checkUser
