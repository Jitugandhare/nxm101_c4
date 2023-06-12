const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, 'jitu')
            if (decoded) {
                req.body.ownerID = decoded.ownerID
                next();
            }
        } catch (err) {
            res.json({msg:"not authorized"})
        }
    } else {
        res.json({msg:'please login'})
    }
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
    auth,
    limiter
}