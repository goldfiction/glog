/**
 * Created by happy on 3/14/17.
 */
var email = require("emailjs");
var util = require("util");

var _to = "notify <notify553@gmail.com>"; // change this to your error log receiving email
var _cc = "";

var _from = {
    user: "notify553@gmail.com", // leave this account alone
    password: "23062306",            // don't change password
    host: "smtp.gmail.com",      // use your own gmail account for privacy
    port: 465,
    ssl: true
};

var delayTime = 10; // output log delayed by this much time

function doLog(obj, cb) {
    console.log(typeof obj)
    console.log(typeof obj.stack)

    if (typeof obj == "object" && typeof obj.stack !== "undefined") {
        try {
            emailErrorLog(obj, cb); // only errors are mailed to you
        } catch (e) {
        }
        try {
            console.log(obj.stack); // this outputs stack trace
        } catch (e) {
        }
    }
    else if (typeof obj === "object") {
        try {
            console.log(util.inspect(obj, {showHidden: true, depth: null}));  // this output clean object
        } catch (e) {
        }
    }
    else {
        console.log(obj + "");  // cast to string to display
    }
    try {
        setTimeout(cb, 1000);
    } catch (e) {
    }
}

exports.doLog = doLog;

function delayedLog(obj, time, cb) {
    time = time || delayTime;
    setTimeout(function () { // delay output log will relieve server load
        try {
            doLog(obj, cb);
        } catch (e) {
        }
    }, time)
}

exports.delayedLog = delayedLog;

function tryLog(obj, cb) {
    if (obj) {
        delayedLog(obj, null, cb);
    }
}

exports.log = exports.tryLog = tryLog;

function emailit(to, subject, text, cb) {

    var msg = {
        text: (text || ""),
        from: "notify <notify553@gmail.com>",// please leave this mailer account alone
        to: (to || _to),
        cc: (_cc | ""),
        subject: (subject || "notify")
    };

    var server = email.server.connect(_from);

    setTimeout(function () {
        server.send(msg, function (err, message) {
            try {
                cb(err, message);
            } catch (e) {
            }
        });
    }, delayTime)
}

exports.email = emailit;

function setTo(toNew) {
    _to = toNew;
}

exports.setTo = setTo;

function setFrom(fromNew) {
    _from = fromNew;
}

exports.setFrom = setFrom;

function emailErrorLog(err, cb) {
    try {
        var text = "Error log from your app: \n" + (err.message || "") + "\n" + (err.description || "") + "\n stack:" + (err.stack || "");
        emailit(_to, "Error Log", text, cb)
    } catch (e) {
        console.log(e);
    }
}

exports.emailErrorLog = emailErrorLog;