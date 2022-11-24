// index.js
const {
  fetchISSFlyOverTimes,
  fetchMyIP,
  fetchCoordsByIP,
  nextISSTimesForMyLocation,
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
//   fetchCoordsByIP(ip, (error, data) => {
//     if (error) console.log(error);
//     else {
//       console.log(data);
//       fetchISSFlyOverTimes(data, (error, flyTimes) => {
//         if (error) console.log(error);
//         else console.log(flyTimes);
//       });
//     }
//   });
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
