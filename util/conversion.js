//Function for calculating conversion amount with parameters "amount, rate"
// amount => number of USD
// rate => destination currency rate
const conversion = (amount, rate) => {
  const result = amount * rate;
  // result=> amount of converted money in destination currency
  return result;
};

//Exports
module.exports = conversion;
