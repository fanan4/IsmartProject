const { validationResult } = require("express-validator");

const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const ChargePoint = require("../models/chargePointsModel");
const Transaction = require("../models/transactionsModel");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeutures");
const { getCountByHours, getcountByDays, getcountByMonth, getCountByYears } = require("../utils/counters");

function getRandomNumber() {
  return Math.round(Math.random() * 2147483647 + 1000000);
}

exports.createSession = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  const id = getRandomNumber();

  const user = await User.findOne({ RFID: req.body.idTag });
  if (!user) {
    return next(new ApiError("no user with that idTag found", 404));
  }

  const chargePoint = await ChargePoint.findOneAndUpdate(
    { chargerName: req.body.chargerName },
    { session: id },
    { new: true }
  );
  if (!chargePoint) {
    return next(
      new ApiError("no charge point with that charger name found", 404)
    );
  }
console.log(req.body.sessionStatus);
  const session = await Session.create({
    _id: id,
    userId: user._id,
    chargerId: chargePoint._id,
    location: chargePoint.location,
    status: req.body.sessionStatus,
    duration: 0,
    totalKlwCharged: 0,
    revenue: 0,
  });

  res.status(200).json({ status: "success", data: { session } });
});

exports.getAllSessions = catchAsync(async (req, res, next) => {
  let data;
  if (req.query.time) {
    const year = req.query.year ? parseInt(req.query.year, 10) : -1;
    const month = req.query.month ? parseInt(req.query.month, 10) - 1 : -1;
    const day = req.query.day ? parseInt(req.query.day, 10) : -1;
 
    if (year >0  ) {
      if (month >=0 ) {
        if (day >0 ) {
          // If there is day, month, and year
          data = await getCountByHours(
            Session,
            year,
            month,
            day,
            "timestamp",
            req.query.countity||1 ,
          );
        } else {
          data = await getcountByDays(
            Session,
             year, 
             month, 
             "timestamp",
            req.query.countity||1 ,  
             );
        }
      } else {
        data = await getcountByMonth(
          Session,
          year,
          "timestamp",
          req.query.countity||1 ,

        );
      }
    } else {
      data = await getCountByYears(Session, "timestamp",   req.query.countity||1);
    }
    return res.status(200).json({ status: "success", data: data });
  }else{
  if (req.query.q) {
    data = Session.find({ $text: { $search: req.query.q } });
  } else data = Session.find().select("-__v -date");

  const filter = new ApiFeatures(data, req.query).filterByChargerId();

  const sessions = await filter.obj;
  if (!sessions.length) return next(new ApiError("there is no sessions", 400));

  res.status(200).json({ status: "success", data: { sessions } });
}});

exports.getSessionsCount = catchAsync(async (req, res, next) => {
  const activeSessions = await Session.find({ status: "Active" }).count();
  const inactiveSessions = await Session.find({ status: "Inactive" }).count();

  res
    .status(200)
    .json({ status: "success", data: { activeSessions, inactiveSessions } });
});

exports.getTotalEnergyAndDuration = catchAsync(async (req, res, next) => {
  const sessions = await Session.find();

  let totalEnergyUsed = 0;
  let totalDuration = 0;

  sessions.forEach((s) => {
    totalEnergyUsed += s.totalKlwCharged;
    totalDuration += s.duration;
  });

  res
    .status(200)
    .json({ status: "success", data: { totalEnergyUsed, totalDuration } });
});

exports.getSession = catchAsync(async (req, res, next) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    return next(new ApiError("no session with that id found", 404));
  }

  res.status(200).json({ status: "success", data: { session } });
});

exports.updateSession = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  console.log("updating Session...");

  const id = parseInt(req.params.id);
  if (!id) return next(new ApiError("id is not valid", 400));

  const session = await Session.findById(id);
  if (!session) {
    return next(new ApiError("no session with that id found", 404));
  }

  if (req.body.endTimestamp) {
    const startDate = new Date(session.timestamp);
    const endDate = new Date(req.body.endTimestamp);
    const timeDiff = (endDate - startDate) / 1000 / 60;
    req.body.duration = timeDiff.toFixed(2);
  }

  req.body.totalKlwCharged = 0;
  for (let i = 0; i < session.transactions[i]; i++) {
    const transaction = await Transaction.findById(session.transactions[i]);
    if (transaction) {
      req.body.totalKlwCharged += transaction.klwCharged;
      console.log(transaction.klwCharged);
    }
  }

  await session.updateOne(req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ status: "success", data: { session } });
});

exports.deleteSession = catchAsync(async (req, res, next) => {
  const session = await Session.findByIdAndDelete(req.params.id);

  if (!session) {
    return next(new ApiError("no session with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});

exports.deleteAllSessions = catchAsync(async (req, res, next) => {
  const sessions = await Session.deleteMany();

  if (!sessions) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});
