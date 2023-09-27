const express = require("express");

// boot notification

const methods = {
  bootNotification: ({ params }) => {
    console.log(`Server got BootNotification from ${client.identity}:`, params);

    return {
      status: "Accepted",
      interval: 300,
      currentTime: new Date().toISOString(),
    };
  },

  // SecurityEventNotification
  SecurityEventNotification: ({ params }) => {
    console.log(
      `Server got SecurityEventNotification from ${client.identity}:`,
      params
    );
    return {};
  },

  // StatusNotification
  StatusNotification: ({ params }) => {
    console.log(
      `Server got StatusNotification from ${client.identity}:`,
      params
    );

    return {};
  },

  // Heartbeat
  Heartbeat: ({ params }) => {
    console.log(`Server got Heartbeat from ${client.identity}:`, params);

    return {
      currentTime: new Date().toISOString(),
    };
  },

  // authorise
  Authorize: ({ params }) => {
    console.log(`Server got Authorize from ${client.identity}:`, params);
    return {
      idInfoTag: {
        expiryDate: new Date().toISOString(),
        status: "Accepted",
        parentIdTag: "3242423523523",
      },
    };
  },

  // start transaction
  startTransaction: ({ params }) => {
    console.log(`Server got StartTransaction from ${client.identity}:`, params);

    return {
      idInfoTag: {
        expiryDate: new Date().toISOString(),
        status: "Accepted",
        parentIdTag: "3028409238493",
      },
      transactionId: "02340234923",
    };
  },

  // Stop transaction
  StopTransaction: ({ params }) => {
    console.log(`Server got StopTransation from ${client.identity}:`, params);
    return {
      idInfoTag: {
        expiryDate: new Date().toISOString(),
        status: "Accepted",
        parentIdTag: "3028409238493",
      },
    };
  },

  // MeterValues
  MeterValues: ({ params }) => {
    console.log(`Server got MeterValues from ${client.identity}:`, params);
    return {};
  },

  // DataTransfer
  DataTransfer: ({ params }) => {
    console.log(`Server got DataTransfer from ${client.identity}:`, params);
    return {
      vendor_id: "",
      message_id: "",
      data: "",
    };
  },

  // DiagnosticStatusNotification
  DiagnosticStatusNotification: ({ params }) => {
    console.log(
      `Server got DiagnosticStatusNotification from ${client.identity}:`,
      params
    );
    return {};
  },

  // FirmwareStatusNotification
  FirmwareStatusNotification: ({ params }) => {
    console.log(
      `Server got FirmwareStatusNotification from ${client.identity}:`,
      params
    );
    return {};
  },

  // LogStatusNotification
  LogStatusNotification: ({ params }) => {
    console.log(
      `Server got LogStatusNotification from ${client.identity}:`,
      params
    );
    return {};
  },

  // CancelReservation
  CancelReservation: ({ params }) => {
    console.log(
      `Server got  CancelReservation from ${client.identity}:`,
      params
    );
    return {
      reservation_id: int(),
    };
  },

  // ChangeAvailability
  ChangeAvailability: ({ params }) => {
    console.log(
      `Server got  ChangeAvailability from ${client.identity}:`,
      params
    );
    return {
      connector_id: 0,
      type: "AvailabilityType",
    };
  },

  // ChangeConfiguration
  ChangeConfiguration: ({ params }) => {
    console.log(
      `Server got  ChangeConfiguration from ${client.identity}:`,
      params
    );
    return {
      key: "",
      value: "",
    };
  },

  // ClearCache
  ClearCache: ({ params }) => {
    console.log(`Server got  ClearCache from ${client.identity}:`, params);
    return {};
  },

  // ClearChargingProfile
  ClearChargingProfile: ({ params }) => {
    console.log(
      `Server got  ClearChargingProfile from ${client.identity}:`,
      params
    );
    return {
      id: int(),
      connector_id: int(),
      charging_profile_purpose: "ChargingProfilePurposeType",
      stack_level: int(),
    };
  },

  // GetCompositeSchedule
  GetCompositeSchedule: ({ params }) => {
    console.log(
      `Server got  GetCompositeSchedule from ${client.identity}:`,
      params
    );
    return {
      connector_id: int(),
      duration: int(),
      charging_rate_unit: "chargingRateUnitType",
    };
  },

  // GetConfiguration
  GetConfiguration: ({ params }) => {
    console.log(
      `Server got  GetConfiguration from ${client.identity}:`,
      params
    );
    return {
      Key: "",
    };
  },

  // GetDiagnostics
  GetDiagnostics: ({ params }) => {
    console.log(`Server got  GetDiagnostics from ${client.identity}:`, params);
    return {
      location: "",
      retries: int(),
      retry_interval: int(),
      start_time: "",
      stop_time: "",
    };
  },

  // GetLocalListVersion
  GetLocalListVersion: ({ params }) => {
    console.log(
      `Server got  GetLocalListVersion from ${client.identity}:`,
      params
    );
    return {};
  },

  // RemoteStartTransaction
  RemoteStartTransaction: ({ params }) => {
    console.log(
      `Server got  RemoteStartTransaction from ${client.identity}:`,
      params
    );
    return {
      id_tag: "",
      connector_id: int(),
      chaging_profile: int(),
    };
  },

  // RemoteStopTransaction
  RemoteStopTransaction: ({ params }) => {
    console.log(
      `Server got  RemoteStopTransaction from ${client.identity}:`,
      params
    );
    return {
      transaction_id: int(),
    };
  },

  // ReserveNow
  ReserveNow: ({ params }) => {
    console.log(`Server got  ReserveNow from ${client.identity}:`, params);
    return {
      connector_id: int(),
      expiry_date: new Date().toISOString(),
      id_tag: "",
      reservation_id: int(),
      parent_id_tag: "",
    };
  },

  // Reset
  Reset: ({ params }) => {
    console.log(`Server got  Reset from ${client.identity}:`, params);
    return {
      Type: " enumeration (hard or soft )!",
    };
  },

  // SendLocalList
  SendLocalList: ({ params }) => {
    console.log(`Server got  SendLocalList from ${client.identity}:`, params);
    return {
      list_version: int(),
      update_type: "enumeration Difirentiel or Full",
      local_authorization_list: "authorization data",
    };
  },

  // SetChargingProfile
  SetChargingProfile: ({ params }) => {
    console.log(
      `Server got  SetChargingProfile from ${client.identity}:`,
      params
    );
    return {
      connector_id: int(),
      cs_charging_profiles: int(),
    };
  },

  // TriggerMessage
  TriggerMessage: ({ params }) => {
    console.log(`Server got  TriggerMessage from ${client.identity}:`, params);
    return {
      requested_message: "voir doc edition 2 page 88",
      connector_id: int(),
    };
  },

  // UnlockConnector
  UnlockConnector: ({ params }) => {
    console.log(`Server got  UnlockConnector from ${client.identity}:`, params);
    return {
      connector_id: int(),
    };
  },

  // UpdateFirmware
  UpdateFirmware: ({ params }) => {
    console.log(`Server got  UpdateFirmware from ${client.identity}:`, params);
    return {
      location: "",
      retrieve_date: new Date().toISOString(),
      retries: int(),
      retry_interval: int(),
    };
  },
};

module.exports = methods;
