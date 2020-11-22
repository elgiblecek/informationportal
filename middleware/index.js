var middlewareObj = {};

middlewareObj.checkdataisvalid = function(req,res,next){
    var n =  req.body['email'].indexOf("@");
  
    var mob = /^[1-9]{1}[0-9]{9}$/;

    if(req.body.name =='' || n== -1 || req.body.email == '' || 
    req.body.gender == '' || mob.test(req.body['mobile']) == false ||
     req.body.mobile.length != 10 || req.body.mobile == ''){
        res.send('Submitted data is not valid')
    }
    else{
        next()
    }
   
    
    
}

module.exports = middlewareObj;