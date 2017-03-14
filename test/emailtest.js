/**
 * Created by happy on 3/14/17.
 */
var email   = require("emailjs");
var server=null;

var msg={
    text:    "i hope this works",
    from:    "notify5 <notify553@gmail.com>",// please leave this mailer account alone
    to:      "glidev5 <glidev5@gmail.com>",
    cc:      "",
    subject: "testing emailjs"
}

before(function(){
    server  = email.server.connect({
        user:    "notify553@gmail.com",
        password:"23062306",
        host:    "smtp.gmail.com",
        port:   465,
        ssl:     true
    });
})

it("should be able to send email",function(done){
    server.send(msg, function(err, message) {
        console.log(err || message);
        done(err);
    });
});
