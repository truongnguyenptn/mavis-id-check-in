const ethers = require('ethers');

// Define the arguments
const owner = "0x02b4ADB3d64caa452f39D8b822DA197080734996"; // replace with actual owner address
const limitDailyCheckIn = 10; // example limit
const periodEndAt = 1672531199; // example end timestamp

console.log("ok..");
// Encode the arguments
const encodedArgs = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint256", "uint256"],
    [owner, limitDailyCheckIn, periodEndAt]
);

console.log(encodedArgs); // This is the value to use for callData
