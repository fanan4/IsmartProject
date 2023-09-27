const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const shortid=require('shortid')
function getRandomNumber() {
  return Math.round(Math.random() * 2147483647 + 1000000);
}

exports.createUser = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  // if (req.body.password != req.body.passwordConfirm)
  //   return next(new ApiError("passwords don't match", 400));

  // getting a random id number
  req.body._id = getRandomNumber();

  // encrypting password
  req.body.password = await bcrypt.hash(req.body.password, 12);
  req.body._id=shortid.generate()
  const user = await User.create(req.body);

  res.status(200).json({ status: "success", data: { user } });
});

exports.addManyUsers=catchAsync(async(req,res,next)=>{
   console.log('hello to add many userss ',req.body)
   const UsersToBeAdded=req.body  
   if(req.body.length===0) return res.status(400).json('empty data')
   const insertedChargePoints = await User.insertMany(UsersToBeAdded); 
   return res.status(201).json(insertedChargePoints)    
})

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-password  -__v");

  res.status(200).json({ status: "success", data: { users } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ApiError("no user with that id found", 404));
  }

  res.status(200).json({ status: "success", data: { user } });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  // prevent updating password from this route
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ApiError("nice try, this midleware is not for changing password", 401)
    );
  }

  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ApiError("no user with that id found", 404));
  }

  res.status(200).json({ status: "success", data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ApiError("no user with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);

  // user.password = undefined; 
  delete user.password;
  res.status(200).json({ status: "success", user });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  // prevent updating password from this route
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new ApiError("nice try, this midleware is not for changing password", 401)
    );
  }

  const user = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new ApiError("no user with that id found", 404));
  }

  user.password = undefined;
  delete user.password;
  res.status(200).json({ status: "success", user });
});

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.deleteMany();

  if (!users) {
    return next(new ApiError("no user with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});

