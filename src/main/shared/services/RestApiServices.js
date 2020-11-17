import axios from "axios";

const httpOptions = {
  host:
    "http://kucchilskartstaging-env.eba-zr6pprpw.ap-south-1.elasticbeanstalk.com",
  uri: "/api/v1",
  role: { retailer: "/retailer", users: "/users" },
  route: {
    welcome: "/welcome",
    findAllUtilties: "/utility/find/allUtilities",
    authenticate: "/authenticate",
  },
};

async function welcomeMsg() {
  const welcomeMessage = await axios({
    method: "GET",
    url:
      "http://kucchilskartstaging-env.eba-zr6pprpw.ap-south-1.elasticbeanstalk.com/api/v1/users/welcome",
  });
  return welcomeMessage.data;
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
    },
  });
  return utilityData.data;
}

async function fetchAllVegitables() {}

export { authenticateUser, fetchUtilityData, fetchAllVegitables, welcomeMsg };
