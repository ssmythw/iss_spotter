const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then((flyTimes) => {
    console.log(flyTimes);
  })
  .catch((error) => console.log("It didn't work! ", error.message));
