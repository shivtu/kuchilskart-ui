import axios from "axios";

const httpOptions = {
  host: "http://kucchils-kart-test.ap-south-1.elasticbeanstalk.com",
  // host: "http://192.168.0.107:5000",
  uri: "/api/v1",
  role: { retailer: "/retailer", users: "/users" },
  route: {
    welcome: "/welcome",
    signUp: "/signup",
    authenticate: "/authenticate",
    findAllUtilties: "/utility/find/allUtilities",
    createVegetable: "/vegetables/add",
    findAllVegetables: "/vegetables/findAll",
    createNewTax: "/taxes/add",
    createNewItemCategory: "/itemCategory/create",
    createNewDiscount: "/discount/create",
    createNewDeliveryCharge: "/deliveryUtility/createConstraint",
    addNewDeliveryLocation: "/deliveryUtility/addNewDeliveryLocation",
  },
};

async function welcomeMsg() {
  const welcomeMessage = await axios({
    method: "GET",
    url: "http://kucchils-kart-test.ap-south-1.elasticbeanstalk.com/api/v1/users/welcome",
  });
  return welcomeMessage.data;
}

async function signUp(signUpData) {
  const newUser = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.route.signUp}${httpOptions.role.retailer}`,
    data: signUpData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return newUser.data;
}

async function authenticateUser(userName, password) {
  const jwt = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.users}${httpOptions.route.authenticate}`,
    data: { username: userName, password: password },
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  return jwt.data;
}

async function fetchUtilityData(authToken) {
  const utilityData = await axios({
    method: "GET",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.findAllUtilties}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return utilityData.data;
}

async function createNewVegetable(authToken, data) {
  const newVegetable = await axios({
    method: "post",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.createVegetable}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${authToken}`,
    },
  });
  return newVegetable.data;
}

async function getAllVegetables(authToken) {
  const allVegetables = await axios({
    method: "GET",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.findAllVegetables}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return allVegetables.data;
}

async function createNewTax(authToken, data) {
  const newTax = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.createNewTax}`,
    data: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return newTax.data;
}

async function createNewCategory(authToken, data) {
  const newCategory = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.createNewItemCategory}`,
    data: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return newCategory.data;
}

async function createNewDiscount(authToken, data) {
  const newDiscount = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.createNewDiscount}`,
    data: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return newDiscount.data;
}

async function createNewDeliveryCharge(authToken, data) {
  const newDeliveryCharge = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.createNewDeliveryCharge}`,
    data: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return newDeliveryCharge.data;
}

async function createNewDeliveryLocation(authToken, data) {
  const newDeliveryLocation = await axios({
    method: "POST",
    url: `${httpOptions.host}${httpOptions.uri}${httpOptions.role.retailer}${httpOptions.route.addNewDeliveryLocation}`,
    data: data,
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json",
    },
  });
  return newDeliveryLocation.data;
}

export {
  signUp,
  authenticateUser,
  fetchUtilityData,
  welcomeMsg,
  createNewVegetable,
  getAllVegetables,
  createNewTax,
  createNewCategory,
  createNewDiscount,
  createNewDeliveryCharge,
  createNewDeliveryLocation,
};
