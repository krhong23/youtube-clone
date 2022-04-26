const {User} = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리

    // 1. 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    // 2. 토큰을 복호화한 후 User를 찾는다.
    User.findByToken(token, (err, user) => {
        // User 가 없으면 인증 No
        if (err) throw err;
        if (!user) return res.json({isAuth: false, err: true})
        // User 가 있으면 인증 Okay
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = {auth};