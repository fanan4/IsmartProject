const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const shortid=require('shortid')
const User = require("../models/userModel");
const Group=require('../models/groupModel')
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/apiError");
const { HttpStatusCode } = require("axios");

const createAndSendJWT = (user, res,groupId) => {
  const token = jwt.sign({ id: user._id,role:user.role,groupId }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  }); 
  const userInfo={ 
    _id:user._id,
    role:user.role,
    groupId
  }
  res.status(200).json({ status: "success", token , user:userInfo } ) ;  
};

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  // encrypting password
  req.body.password = await bcrypt.hash(req.body.password, 12);
  req.body.passwordConfirm = undefined;
  req.body._id=shortid.generate()
  // creating user
  const user = await User.create(req.body);

  createAndSendJWT(user, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  const { email, password } = req.body;
  //console.log('email is: ',email,' password: ',password)   
  // find user by email
  const [user] = await User.find({ email });
   console.log('user is :',user)
  // check if there is a user with that email
  if (!user || !(await bcrypt.compare(password, user.password))) { 
    return next(new ApiError("incorect email or passowrd!", 400));
  }
  let group
  if(user.role=='admin'){
     group=await Group.findOne({
      admins:user._id
    })
     if(!group) return res.status(HttpStatusCode.BadRequest).json('group does not exist ')
     createAndSendJWT(user, res,group._id); 
  }

   createAndSendJWT(user, res); 
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  // getting the token from header
  let token;
  if (req.headers.authorization)
    token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return next(
      new ApiError("your not logged in please login to get accessed", 400)
    );
  }
  //console.log('tokenis ',token)  
  // verification
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return next(
        new ApiError("this token has expired please login again", 400)
      );
    } else {
      req.user = decodedToken; 
    
    }
  });

  next();
});

exports.SuperadminMidllware=(req,res,next)=>{
  if(req.user.role!=='Superadmin'){ 
      return res.status(HttpStatusCode.Unauthorized).json({err:'acces denied '}) 
  }
   next() 
}

exports.AdminMidllware=(req,res,next)=>{
   if(req.user.role==='Superadmin' || req.user.role=="admin" ){  
    return next()   
  }
  return res.status(HttpStatusCode.Unauthorized).json({err:'acces denied '}) 
 
} 