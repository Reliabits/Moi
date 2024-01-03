import log from "@log";
import Global from "../common";
import api from "./config";
import api2 from "./configstwo";

class apis {}
apis.call = (url, params, header) => {
  return new Promise((resolve, reject) => {
    try {
      api.get(url, params, header).then((res) => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callAug = (url, params, header) => {
  return new Promise((resolve, reject) => {
    try {
      api2.get(url, params, header).then((res) => {
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:  e-", err);
      reject(err);
    }
  });
};

apis.callDelete = (url, params, header) => {
  console.log("url, params , header", url, params, header)
  return new Promise((resolve, reject) => {
    try {
      api.delete(url, params, header).then((res) => {
        console.log("res delete index", res)
        resolve( res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

//without token
apis.callGet = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.get(url, params).then((res) => {
        console.log("url", url, res);
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callPostAuth = (url, params, header) => {
  return new Promise((resolve, reject) => {
    try {
      api.post(url, params, header).then((res) => {
        console.log("url", url, res);
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callPost = (url, params) => {
  return new Promise((resolve, reject) => {
    try {
      api.post(url, params).then((res) => {
        console.log("url", url, res);
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      alert(err);
      reject(err);
    }
  });
};

apis.callPut = (url, params, header) => {
  return new Promise((resolve, reject) => {
    try {
      api.put(url, params, header).then((res) => {
        console.log("url", url, res);
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.callPatch = (url, param, header) => {
  return new Promise((resolve, reject) => {
    try {
      api.patch(url, param, header).then((res) => {
        console.log("url", url, res);
        resolve(res);
      });
    } catch (err) {
      log.error("API calling error:-", err);
      reject(err);
    }
  });
};

apis.getProfile = async () => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/auth/profile", "", header);
};

apis.createLoginOTP = async (param) => {
  console.log("param :",param)
  return apis.callPostAuth("api/v1/auth/phonenumber", param, "");
};

apis.walletApi = async () => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/wallet", "", header);
};

apis.getInvoices = async (id) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call(`api/v1/transactions/invoice/${id}`, "", header);
};

apis.createAccount = async (param) => {
  return apis.callPostAuth("api/v1/auth/create_account", param, "");
};

apis.verifyOTP = async (param) => {
  return apis.callPost("api/v1/auth/verify_otp", param, "");
};

apis.goldRates = async () => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/gold/rates", "", header);
};

apis.productDetail = async () => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callAug("merchant/v1/products?page=1&count=30", "", header);
};

apis.buyGold = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/payment/payu", param, header);
};

apis.updateAccount = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPut("api/v1/auth/profile", param, header);
};

apis.udpateProfile =  async (param) => {
  console.log("param upload profile :",param)
  let header = {

    headers: { Authorization: "Bearer " + (await Global.getToken()) },
    
  };
  return apis.callPut("api/v1/auth/update_profile", param, header);
};



apis.getTransacation = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/transactions?page=1&limit=100", '', header);
};


apis.addBank = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/wallet/bank", param, header);
};

apis.addUPI = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  
  };
 
  return apis.callPostAuth("api/v1/wallet/bank", param, header);
};

apis.kycAdhaar = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/kyc/aadhaar", param, header);
};

apis.kycPancard = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/kyc/pan", param, header);
};


apis.sellGold = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/gold/sell", param, header);
};


apis.getBank = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/wallet/banks", '', header);
};


apis.deleteBank = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callDelete("api/v1/wallet/bank/remove", param, header);
};

apis.addAddress = async (param) => {
  console.log("param Data :",param)
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/add_address", param, header);
};
apis.AddFcm = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/save_fcm", param, header);
};

apis.setPin = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/set/pin", param, header);
};

apis.verifyPin = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/verify/pin", param, header);
};

apis.removeAddress = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/remove_address", param, header);
};
apis.Alert = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/alert", param, header);
};

apis.validateUpi = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/payment/validate_upi", param, header);
};

apis.getAlert = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/alert", '', header);
};
apis.getAddress = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/auth/profile", '', header);
};

apis.getNotification = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.call("api/v1/auth/notification", '', header);
};


apis.editAddress = async (param) => {
  let header = {
    headers: { Authorization: "Bearer " + (await Global.getToken()) },
  };
  return apis.callPostAuth("api/v1/auth/edit_address", param, header);
};


export default apis;
