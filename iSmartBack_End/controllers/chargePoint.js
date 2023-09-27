const { validationResult } = require("express-validator");

const ChargePoint = require("../models/chargePointsModel");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transactionsModel");
const Session = require("../models/sessionModel");
const { getcountByDays, getCountByHours, getcountByMonth, getCountByYears } = require("../utils/counters");
const { connections } = require("mongoose");

function getRandomNumber() {
  return Math.round(Math.random() * 2147483647 + 1000000);
}

exports.createChargePoint = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  // get random id
  req.body._id = getRandomNumber();

  const chargePoint = await ChargePoint.create(req.body);  

  res.status(200).json({ status: "success", data: { chargePoint } });
});


exports.addManyChargePoints=catchAsync(async(req,res,next)=>{ 
  const chargePointsToAdd = req.body; 
  const newChList= chargePointsToAdd.map((ch)=>({...ch,connectors:JSON.parse(ch.connectors)} ))  
  console.log('connectors are : ',newChList)
  console.log('charge Points to be added ',chargePointsToAdd)
  const insertedChargePoints = await ChargePoint.insertMany(newChList);   
  res.status(201).json({ message: 'Charge points added successfully', insertedChargePoints });

})

exports.getAllChargePoints = catchAsync(async (req, res, next) => {
 
  const chargePoints = await ChargePoint.find().select(
    "chargerName location status chargerModel supportNumber"      
  );

  res.status(200).json({ status: "success", data: { chargePoints } });
});

exports.getCordinates = catchAsync(async (req, res, next) => {
  const cordinates = await ChargePoint.find().select(
    "longitude latitude status chargerName"
  );

  res.status(200).json({ status: "success", data: { cordinates } });    
});

exports.getStatusStats = catchAsync(async (req, res, next) => {
  const chargePoints = await ChargePoint.find().select("status");

  let available = 0,
    charging = 0,
    offline = 0;

  chargePoints.forEach((ch) => {
    switch (ch.status) {
      case "available":
        available++;
        break;
      case "charging":
        charging++;
        break;
      case "offline":
        offline++;
        break;
      default:
    }
  });

  res.status(200).json({
    status: "success",
    data: { available, charging, offline, total: chargePoints.length },
  });
});


exports.getChargePoint = catchAsync(async (req, res, next) => {
  const chargePoint = await ChargePoint.findById(req.params.id);
  
  if (!chargePoint) {
    return next(new ApiError("no charge point with that id found", 404));
  }
  res.status(200).json({ status: "success", data: { chargePoint } });
});

exports.getChargePointStats = catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  const type = req.query.type;
  const chargePoint = await ChargePoint.findById(id);

  if (!chargePoint) {
    return next(new ApiError("no charge point with that id found", 404));
  }
  const year = req.query.year ? parseInt(req.query.year, 10) : -1;
  const month = req.query.month ? parseInt(req.query.month, 10) - 1 : -1;
  const day = req.query.day ? parseInt(req.query.day, 10) : -1;

  let document;
  let counting_what;
  switch (type) {
    case "sessions":
      document = Session;
      counting_what = 1;
      break;
    case "transactions":
      document = Transaction;
      counting_what = 1;
      break;
    case "energy":
      document = Transaction;
      counting_what = "$klwCharged";

      break;

    default:
      break;
  }

  if (year > 0) {
    if (month >= 0) {
      if (day > 0) {
        // If there is day, month, and year
        data = await getCountByHours(
          document,
          year,
          month,
          day,
          "timestamp",
          counting_what,
          id
        );
      } else {
        data = await getcountByDays(
          document,
          year,
          month,
          "timestamp",
          counting_what,
          id
        );
      }
    } else {
      data = await getcountByMonth(document, year, "timestamp", counting_what, id);
    }
  } else {
    data = await getCountByYears(document, "timestamp", counting_what, id);
  }

  res.status(200).json({ status: "success", data });
});

exports.updateChargePoint = catchAsync(async (req, res, next) => {
 
  const id = parseInt(req.params.id);
  if (!id) return next(new ApiError("id is not valid", 400));

  const chargePoint = await ChargePoint.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!chargePoint) {
    return next(new ApiError("no charge point with that id found", 404));
  }

  res.status(200).json({ status: "success", data: { chargePoint } });
});

exports.deleteChargePoint = catchAsync(async (req, res, next) => {
  const chargePoint = await ChargePoint.findByIdAndDelete(req.params.id);

  if (!chargePoint) {
    return next(new ApiError("no charge point with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});

exports.deteAllChargePoints=catchAsync(async(req,res,next)=>{
    const chargePoints=await ChargePoint.deleteMany();
    if (!chargePoints) {
      return next(new ApiError("no user with that id found", 404));
    }
  
    res.status(200).json({ status: "success" });

})