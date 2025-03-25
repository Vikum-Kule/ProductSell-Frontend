import axios from "axios";
import { getToken, getUser } from "../Utils/Common";
import token_valid from "./TokenValid";

//get import data with pagination
const getSaleProductData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/saleproduct/all/" + offset + "/" + pageSize,
        {
          productName: filter._productName ? filter._productName.trim() : null,
          barcode: filter._barcode ? filter._barcode.trim() : null,
          billNumber: filter._billNumber ? filter._billNumber.trim() : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          customer: filter._customer ? filter._customer.trim() : null,
          paidStatus: filter._paidStatus ? filter._paidStatus.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//add sale product
const addSaleProduct = async (values, productionList) => {
  console.log(values);
  // check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/saleproduct/add",
        {
          customerId: values._customer,
          paidStatus: values._paidStatus,
          sellingQty: values._sellingQty,
          sellingPricePerUnit: values._sellingPricePerUnit,
          costPerProduct: values._costPerProduct,
          totalPrice: 0.0,
          addedBy: user.username,
          billNumber: values._billNumber,
          note: "",
          productId: values._product.product_id,
          saleProductionItems: productionList,
          totalProfit: values._totalProfit,
          profitMargin: values._profitMargin,
          totalPrice: values._sellingQty * values._sellingPricePerUnit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        // setUserSession(response.data.token, response.data.user)
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get sale products " + error);
        return false;
      });
  }
};

//get sale product according to the given Id
const getSaleProductById = async (saleId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/saleproduct/" + saleId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Sale product " + error);
        return "Something went wrong...";
      });
  }
};

//update sale product
const updateSaleProduct = async (saleId, values) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .put(
        "/api/saleproduct/update/" + saleId,
        {
          customer: values._customer,
          paidStatus: values._paidStatus,
          sellingQty: values._sellingQty,
          sellingPricePerUnit: values._sellingPricePerUnit,
          costPerProduct: values._costPerProduct,
          totalPrice: 0.0,
          addedBy: user.username,
          billNumber: values._billNumber,
          note: "",
          productId: values._product.product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        // setUserSession(response.data.token, response.data.user)
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get sale products " + error);
        return false;
      });
  }
};

//get sale product by bill id...
const getSaleProductbyBillId = async (billNumber, productId) => {
  // check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/saleproduct/get_bill_product",
        {
          billNumber: billNumber,
          productId: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log("Error: ", error);
        return "Something went wrong...";
      });
  }
};

//sale bills
//get import data with pagination
const getSaleBillData = async (offset, pageSize, filter) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    return axios
      .post(
        "/api/salebill/all/" + offset + "/" + pageSize,
        {
          billNumber: filter._productName ? filter._productName.trim() : null,
          productIds: filter._products.length != 0 ? filter._products : null,
          customerIds: filter._customer.length != 0 ? filter._customer : null,
          addedBy: filter._addedBy ? filter._addedBy.trim() : null,
          status: filter._status ? filter._status.trim() : null,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response --", response.data.content);
        return response.data;
      })
      .catch(async (error) => {
        // return "Something went wrong...";
        console.log("get imports " + error);
        return "Something went wrong...";
      });
  }
};

//add sale bill...
const addSaleBill = async (values, productList) => {
  console.log(values);
  // check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    //get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post(
        "/api/salebill/add",
        {
          customerId: values._customer,
          payments: values._payments,
          totalPrice: values._totalPrice,
          discount_percentage: values._discount_percentage,
          discount_amount: values._discount_value,
          addedBy: user.username,
          billNumber: values._billNumber,
          totalProfit: values._totalProfit,
          remainingAmount: values._remainingAmount,
          note: "",
          billItems: productList,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(async (response) => {
        console.log(response);
        // setUserSession(response.data.token, response.data.user)
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("add sale bill " + error);
        return false;
      });
  }
};

//get sale product according to the given Id
const getSaleBillById = async (billId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/salebill/" + billId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Sale product " + error);
        return "Something went wrong...";
      });
  }
};

//get sale product according to the given Id
const updateRemainingAmount = async (bill) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .put(
        "/api/salebill",
        {
          billId: bill.billId,
          remainingAmount: bill.remainingAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("Update Bill Remaining Amount " + error);
        return "Something went wrong...";
      });
  }
};

//get sale product according to the given Id
const deleteSaleBillById = async (billId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .delete("/api/salebill/" + billId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Sale product " + error);
        return false;
      });
  }
};

///////sale bill payments
//get sale bill payment by bill Id
const getSaleBillPaymentsById = async (billId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/billpayment/" + billId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Sale Bill Payment " + error);
        return "Something went wrong...";
      });
  }
};

// update sale bill payments
const updateSaleBillPayments = async (billId, values) => {
  // check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();

    // get user name
    let user = getUser();
    console.log("User" + user.username);

    return axios
      .post("/api/billpayment/" + billId, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(async (response) => {
        console.log(response);
        return true;
      })
      .catch((error) => {
        console.log("update sale bill payment error: " + error);
        return false;
      });
  }
};

//sending for approval
const billSendingForApproval = async (billId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/salebill/approval/" + billId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("get Sale Bill Payment " + error);
        return "Something went wrong...";
      });
  }
};

//sending for approval
const approveBill = async (billId) => {
  //check access tocken expiry function
  let token_valid_result = await token_valid();
  if (token_valid_result) {
    let token = getToken();
    return axios
      .get("/api/salebill//approved/" + billId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Response all--", response.data);
        return response.data;
      })
      .catch((error) => {
        // return "Something went wrong...";
        console.log("faild to approve bill " + error);
        return "Something went wrong...";
      });
  }
};

export {
  getSaleProductData,
  addSaleProduct,
  getSaleProductById,
  updateSaleProduct,
  getSaleBillData,
  addSaleBill,
  getSaleBillById,
  getSaleProductbyBillId,
  deleteSaleBillById,
  getSaleBillPaymentsById,
  updateSaleBillPayments,
  updateRemainingAmount,
  billSendingForApproval,
  approveBill,
};
