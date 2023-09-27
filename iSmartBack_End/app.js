// external packages
const { RPCServer } = require("ocpp-rpc");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

// local packages
const ocppHandlers = require("./routes/ocppHandlers");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const chargePointRoutes = require("./routes/chargePointRoute");
const sessionRoutes = require("./routes/sessionRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const errorHandler = require("./controllers/error");
const groupRoutes = require("./routes/GroupRoutes"); 
const reservationRoutes=require('./routes/reservation')
const app = express();
const httpServer = app.listen(process.env.PORT, "0.0.0.0");

// handle charge point client
const rpcServer = new RPCServer({
  protocols: ["ocpp1.6"],     
  // strictMode: true,   
});

httpServer.on("upgrade", rpcServer.handleUpgrade);
ocppHandlers.handleOcppRequest(rpcServer);

// handle dashboard client
app.use(express.json({ limit: "10kb" }));
app.use(cors({ origin: true, credentials: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes); 
app.use("/api/chargePoints", chargePointRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/reservations",reservationRoutes);

// handling errors
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB)
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);         
  });
