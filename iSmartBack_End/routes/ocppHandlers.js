const { param } = require("express-validator");
const ocppControllers = require("../controllers/ocpp");
const axios = require("axios");

const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const { ResultWithContext } = require("express-validator/src/chain");

function getRandomNumber() {
  return Math.round(Math.random() * 2147483647 + 1000000);
}

const clientsMap = {};

const updateChargePointStatus = async (id, status) => {
  try {
    await axios.patch(`${process.env.URL}api/chargePoints/${id}`, {
      status: status,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.handleOcppRequest = (rpcServer) => {
  rpcServer.on("client", (client) => {
    console.log(`${client.identity} connected!`);
    updateChargePointStatus(client.identity, "available");

    clientsMap[client.identity] = client;

    client
      .call("ClearCache", {})
      .then((r) => console.log("ClearCache RESULT:", r))
      .catch((e) => console.log("ERROR:", e));

    client
      .call("ChangeConfiguration", {
        key: "MeterValueSampleInterval",
        value: "15",
      })
      .then((r) => console.log("MeterValueSampleInterval RESULT:", r))
      .catch((e) => console.log("ERROR:", e));

    // MeterValuesSampledData
    client
      .call("ChangeConfiguration", {
        key: "MeterValuesSampledData",
        value: "Energy.Active.Import.Register",
      })
      .then((r) => console.log("MeterValuesSampledData RESULT:", r))
      .catch((e) => console.log("ERROR:", e));

    // Change heartbeat interval
    client
      .call("ChangeConfiguration", {
        key: "HeartbeatInterval",
        value: "15",
      })
      .then((r) => console.log("RESULT metert v sim:", r))
      .catch((e) => console.log("ERROR:", e));

    // handle BootNotification requests
    client.handle("BootNotification", ({ params }) => {
      console.log(
        `Server got BootNotification from ${client.identity}:`,
        params
      );

      client.chargerName=params.chargePointVendor
      console.log('charger name is :',client.chargerName)

      return {
        status: "Accepted",
        interval: 300,
        currentTime: new Date().toISOString(),
      };
    });

    // handle SecurityEventNotification requests
    client.handle("SecurityEventNotification", ({ params }) => {
      console.log(
        `Server got SecurityEventNotification from ${client.identity}:`,
        params
      );
      return {};
    });

    // handling StatusNotification requests
    client.handle("StatusNotification", async ({ params }) => {
      console.log(
        `Server got StatusNotification from ${client.identity}:`,
        params
      );

      if (params.status === "Available") {
        try {
          await axios.patch(
            `${process.env.URL}api/sessions/${client.sessionId}/`,
            {
              status: "Inactive",
              endTimestamp: new Date(),
            }
          );
        } catch (err) {
          console.log(err.message);
        }
        updateChargePointStatus(client.identity, "available");
      }

      return {};
    });

    // handling Heartbeat request
    // client.handle("Heartbeat", ({ params }) => {
    //   console.log(`Server got Heartbeat from ${client.identity}:`, params);

    //   return {
    //     currentTime: new Date().toISOString(),
    //   };
    // });

    // handle Authorize requests
    client.handle("Authorize", async ({ params }) => {
      console.log(`Server got Authorize from ${client.identity}:`, params);

      console.log("saving Session...");
      try {
        const res = await axios.post(`${process.env.URL}api/sessions/`, {
          idTag: params.idTag, 
          chargerName: client.chargerName,
          sessionStatus: "Active",
          timestamp: new Date(),
        });
        console.log("Session Created");
        client.sessionId = res.data.data.session._id;
      } catch (err) {
        console.log(err.message);
      }

      updateChargePointStatus(client.identity, "charging");

      return {
        idTagInfo: {
          status: "Accepted",
          expiryDate: new Date(),
        },
      };
    });

    // handle StartTransaction requests
    client.handle("StartTransaction", async ({ params }) => {
      console.log(
        `Server got StartTransaction from ${client.identity}:`,
        params
      );

      const id = getRandomNumber();
      console.log("saving Transaction...");
      try {
        await axios.post(`${process.env.URL}api/transactions/`, {
          idTag: "083204802",
          transactionId: id,
          chargerName: "IS_32",
          status: "Charging",
          timestamp: params.timestamp,
          meterStart: params.meterStart,
        });
        console.log("Transaction Created");
      } catch (err) {
        console.log(err.message);
      }

      return {
        transactionId: id,
        idTagInfo: {
          status: "Accepted",
        },
      };
    });

    // handle StopTransation requests
    client.handle("StopTransaction", async ({ params }) => {
      console.log(
        `Server got StopTransaction from ${client.identity}:`,
        params
      );

      console.log("updating transaction...");
      try {
        const res = await axios.patch(
          `${process.env.URL}api/transactions/${params.transactionId}/`,
          {
            status: "Ended",
            endTimestamp: params.timestamp,
            meterValue: params.meterStop,
          }
        );
        console.log("Transaction Updated");
        await axios.patch(
          `${process.env.URL}api/sessions/${client.sessionId}/`,
          {}
        );
      } catch (err) {
        console.log(err.message);
      }

      return { status: "Accepted" };
    });

    // handle meter values requests
    client.handle("MeterValues", async ({ params }) => {
      console.log(`Server got MeterValues from ${client.identity}:`, params);

      const value = parseInt(params.meterValue[0].sampledValue[0].value);
      console.log("updating transaction...");
      try {
        await axios.patch(
          `${process.env.URL}api/transactions/${params.transactionId}/`,
          {
            meterValue: value,
          }
        );
        console.log("Transaction Updated");
        await axios.patch(
          `${process.env.URL}api/sessions/${client.sessionId}/`,
          {}
        );
      } catch (err) {
        console.log(err.message);
      }

      return { status: "Accepted" };
    });

    client.on("close", async () => {
      updateChargePointStatus(client.identity, "offline");
      client.sessionId = null;
      console.log(client.identity + " disconnected");
      delete clientsMap[client.identity];
    });

    // handle any RPC method
    client.handle(({ method, params }) => {
      // console.log("Error handler enterned");
      // console.log(`Server got ${method} from ${client.identity}:`, params);

      // throw createRPCError("NotImplemented");
      return {};
    });
  });
};

exports.clientsMap;
