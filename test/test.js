/**
 * Created by happy on 3/14/17.
 */
var glog=require("../glog.js");
var log=glog.log;
it("should be able to run",function(done){
    done();
});

it("should be able to do a regular log",function(done){
    log("hello world!",done);
});

it("should be able to do an error log",function(done){
    try{
        throw new Error('An error occurred')
    }catch(e){
        log(e,done);
    }
});