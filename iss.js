const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      callback(null, JSON.parse(body).ip);
      return;
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    const parsedBody = JSON.parse(body);
    if (error) callback(error, null);
    else if (parsedBody.success === false) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    } else
      callback(null, {
        latitude: JSON.parse(body).latitude,
        longitude: JSON.parse(body).longitude,
      });
  });
};

const fetchISSFlyOverTimes = (cords, callback) => {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${cords.latitude}&lon=${cords.longitude}`,
    (error, response, body) => {
      const parsedBody = JSON.parse(body);
      if (error) callback(error, null);
      else if (parsedBody.message !== "success") {
        callback(
          Error(
            `Server returned an error. Success status was ${parsedBody.message}.`
          )
        );
      } else callback(null, parsedBody.response);
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, data) => {
    if (error) callback(error, null);
    else {
      fetchCoordsByIP(data, (error, res) => {
        if (error) callback(error, null);
        else {
          fetchISSFlyOverTimes(res, (error, res) => {
            if (error) callback(error, null);
            else callback(null, res);
          });
        }
      });
    }
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
