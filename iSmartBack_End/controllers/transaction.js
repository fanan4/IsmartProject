const { validationResult } = require("express-validator");

const Transaction = require("../models/transactionsModel");
const User = require("../models/userModel");
const ChargePoint = require("../models/chargePointsModel");
const Session = require("../models/sessionModel");
const ApiError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeutures");
const {
  getCountByYears,
  getcountByMonth,
  getcountByDays,
  getCountByHours,
} = require("../utils/counters");

function getRandomNumber() {
  return Math.round(Math.random() * 2147483647 + 1000000);
}

exports.createTransaction = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  const id = req.body.transactionId;
  console.log("id value: ", id);

  const user = await User.findOne({ RFID: req.body.idTag });
  if (!user) {
    return next(new ApiError("no user with that idTag found", 404));
  }

  const chargePoint = await ChargePoint.findOne({
    chargerName: req.body.chargerName,
  });
  if (!chargePoint) {
    return next(
      new ApiError("no charge point with that charger name found", 404)
    );
  }

  const transaction = await Transaction.create({
    _id: id,
    userId: user._id,
    chargerId: chargePoint._id,
    status: req.body.status,
    meterStart: req.body.meterStart,
    duration: req.body.duration,
    klwCharged: req.body.klwCharged,
    timestamp: new Date(req.body.timestamp),
  });

  const session = await Session.findByIdAndUpdate(
    chargePoint.session,
    { $addToSet: { transactions: id } },
    { new: true }
  );

  console.log("session trasactions: ", session.transactions);

  res.status(200).json({ status: "success", data: { transaction } });
});
// the original getAll Transactions

exports.getAllTransactions = catchAsync(async (req, res, next) => {
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
            Transaction,
            year,
            month,
            day,
            "timestamp",
            1
          );
        } else {
          data = await getcountByDays(Transaction, year, month, "timestamp", 1);
        }
      } else {
        data = await getcountByMonth(
          Transaction,
          year,
          "timestamp",
          1
        );
      }
    } else {
      data = await getCountByYears(Transaction, "timestamp", 1);
    }
    return res.status(200).json({ status: "success", data: data });
  } else {
    if (req.query.q) {
      data = Transaction.find({ $text: { $search: req.query.q } });
    } else data = Transaction.find().select("-__v -meterStart");

    const filter = new ApiFeatures(data, req.query).filterByChargerId();

    const transactions = await filter.obj;
    if (!transactions.length)
      return next(new ApiError("there is no transactions", 400));
    res.status(200).json({ status: "success", data: { transactions } });
  }
});

 
exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);

  if (!transaction) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  res.status(200).json({ status: "success", data: { transaction } });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new ApiError(errors.array(), 400));

  const id = parseInt(req.params.id);
  if (!id) return next(new ApiError("id is not valid", 400));

  const transaction = await Transaction.findById(id);

  if (!transaction) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  // updating duration
  if (req.body.endTimestamp) {
    const startDate = new Date(transaction.timestamp);
    const endDate = new Date(req.body.endTimestamp);
    const timeDiff = (endDate - startDate) / 1000 / 60;
    console.log("time diff ", timeDiff);
    req.body.duration = timeDiff.toFixed(2);
  }

  // updating klw Charged
  if (req.body.meterValue) {
    console.log("meter value: ", req.body.meterValue);
    req.body.klwCharged = req.body.meterValue - transaction.meterStart;
    console.log("klw charged ", req.body.klwCharged);
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTransaction) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  res
    .status(200)
    .json({ status: "success", data: { transaction: updatedTransaction } });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const id = parseInt(req.params.id);
  if (!id) return next(new ApiError("id is not valid", 400));

  const transaction = await Transaction.findByIdAndDelete(id);

  if (!transaction) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});

exports.deleteAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = await Transaction.deleteMany();

  if (!transactions) {
    return next(new ApiError("no transaction with that id found", 404));
  }

  res.status(200).json({ status: "success" });
});
