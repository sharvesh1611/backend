const router=require('express').Router();
const {to,ReE,ReS}=require('../globalfunction');
const SignLogService=require('../service/signLog.service');



const insertSignIn=async function(req,res){
    let[err,category]=await to(SignLogService.createSignUp(req.body));
    if(err) return ReE(res,err,422);
    return ReS(res,category,200);
}
const loggIn=async function(req,res){
    let[err,category]=await to(SignLogService.logIn(req.body));
    if(err) return ReE(res,err,422);
    return ReS(res,category,200);
}

router.post('/data',insertSignIn);
router.post('/data1',loggIn);

module.exports={router};