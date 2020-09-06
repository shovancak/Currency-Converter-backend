//Imports
const latestCurrencyData = require("../util/latestCurrencyData");
const conversion = require("../util/conversion");
const { validationResult } = require("express-validator");

//Dummy data
const DUMMY_DATA = {
  AED: 3.6729,
  AFN: 76.850004,
  ALL: 105.05,
  AMD: 481.616228,
  ANG: 1.794206,
  AOA: 621.948,
  ARS: 74.438464,
  AUD: 1.372721,
  AWG: 1.8,
  AZN: 1.7025,
  BAM: 1.650127,
  BBD: 2,
  BDT: 84.813159,
  BGN: 1.657691,
  BHD: 0.376979,
  BIF: 1936,
  BMD: 1,
  BND: 1.363172,
  BOB: 6.911901,
  BRL: 5.3025,
  BSD: 1,
  BTC: 0.000097692867,
  BTN: 73.06611,
  BWP: 11.436659,
  BYN: 2.633009,
  BZD: 2.014849,
  CAD: 1.306305,
  CDF: 1960,
  CHF: 0.912845,
  CLF: 0.02821,
  CLP: 771.500546,
  CNH: 6.8418,
  CNY: 6.8425,
  COP: 3693.858598,
  CRC: 596.094133,
  CUC: 1,
  CUP: 25.75,
  CVE: 93.35,
  CZK: 22.3678,
  DJF: 178,
  DKK: 6.28491,
  DOP: 58.45,
  DZD: 128.333042,
  EGP: 15.811769,
  ERN: 15.003119,
  ETB: 35.7,
  EUR: 0.844691,
  FJD: 2.1175,
  FKP: 0.752474,
  GBP: 0.752474,
  GEL: 3.075,
  GGP: 0.752474,
  GHS: 5.795,
  GIP: 0.752474,
  GMD: 51.82,
  GNF: 9630,
  GTQ: 7.72664,
  GYD: 209.036055,
  HKD: 7.75062,
  HNL: 24.789999,
  HRK: 6.370145,
  HTG: 113.122879,
  HUF: 304.238,
  IDR: 14753.9635,
  ILS: 3.3727,
  IMP: 0.752474,
  INR: 73.2462,
  IQD: 1189,
  IRR: 42101.970176,
  ISK: 139.13,
  JEP: 0.752474,
  JMD: 147.220435,
  JOD: 0.709,
  JPY: 106.24548164,
  KES: 108.416076,
  KGS: 78.233368,
  KHR: 4105,
  KMF: 416.950166,
  KPW: 900,
  KRW: 1187.43,
  KWD: 0.306082,
  KYD: 0.832989,
  KZT: 420.7516,
  LAK: 9125,
  LBP: 1516.919374,
  LKR: 185.04458,
  LRD: 199.275036,
  LSL: 16.61,
  LYD: 1.365,
  MAD: 9.19,
  MDL: 16.514008,
  MGA: 3815,
  MKD: 52.035431,
  MMK: 1330.917303,
  MNT: 2852.257172,
  MOP: 7.979667,
  MRO: 357,
  MRU: 36.955,
  MUR: 39.801835,
  MVR: 15.41,
  MWK: 745,
  MXN: 21.563099,
  MYR: 4.1495,
  MZN: 71.799988,
  NAD: 16.62,
  NGN: 381.5,
  NIO: 34.6,
  NOK: 8.92294,
  NPR: 116.906126,
  NZD: 1.490562,
  OMR: 0.38498,
  PAB: 1,
  PEN: 3.5465,
  PGK: 3.4345,
  PHP: 48.575629,
  PKR: 165.95,
  PLN: 3.764623,
  PYG: 6987.906239,
  QAR: 3.641,
  RON: 4.1004,
  RSD: 99.28,
  RUB: 75.3547,
  RWF: 951,
  SAR: 3.750375,
  SBD: 8.251634,
  SCR: 17.952216,
  SDG: 55.325,
  SEK: 8.74365,
  SGD: 1.36464,
  SHP: 0.752474,
  SLL: 9887.822835,
  SOS: 585,
  SRD: 7.458,
  SSP: 130.26,
  STD: 20973.366047,
  STN: 20.77,
  SVC: 8.745834,
  SYP: 511.304605,
  SZL: 16.57,
  THB: 31.388877,
  TJS: 10.310396,
  TMT: 3.51,
  TND: 2.73975,
  TOP: 2.27255,
  TRY: 7.4371,
  TTD: 6.768783,
  TWD: 29.3375,
  TZS: 2318.996,
  UAH: 27.705228,
  UGX: 3686.405483,
  USD: 1,
  UYU: 42.604356,
  UZS: 10275,
  VEF: 248487.642241,
  VES: 338355.5,
  VND: 23196.903531,
  VUV: 112.704037,
  WST: 2.630422,
  XAF: 554.080909,
  XAG: 0.03715404,
  XAU: 0.00051719,
  XCD: 2.70255,
  XDR: 0.706724,
  XOF: 554.080909,
  XPD: 0.00043355,
  XPF: 100.798437,
  XPT: 0.00110044,
  YER: 250.399984,
  ZAR: 16.58301,
  ZMW: 19.616452,
  ZWL: 322,
};

//Controller function for getting latest currency data.
const getLatestCurrencyData = async (req, res, next) => {
  //Getting latest currency data from external API
  // const latestData = await latestCurrencyData();
  const latestData = DUMMY_DATA;
  //Error handling
  if (!latestData) {
    return res.status(404).json({
      errorMessage: "Something went wrong, colud not get latest currency data.",
    });
  }
  //Response => object with latest currency data
  res.status(200).json({ latestData: latestData });
};

//Controller function for currency conversion
const currencyConversion = (req, res, next) => {
  //Using validationResult function from express-validator package for validating data in request
  //vlaidationResult returns object of errors in case there are some validation erros based on validation criteria set in routes file
  const validationErrors = validationResult(req);
  //Error handling in case of request body data validation failed
  if (!validationErrors.isEmpty()) {
    //Sending response with error message
    return res
      .status(422)
      .json({ errorMessage: "Invalid data passed, please check your data." });
  }

  //Extracting data from request body
  const { amount, rate } = req.body;
  //Converting currencies
  const convertedAmount = conversion(amount, rate);
  //Error handling in case of not working conversion
  if (!convertedAmount) {
    //Sending response with error message
    return res.status(500).json({
      errorMessage:
        "Something went wrong, conversion does not work, please try again.",
    });
  }
  //Response => object with converted amount in destination currency
  res.status(200).json({ convertedAmount: convertedAmount });
};

//Exports
exports.getLatestCurrencyData = getLatestCurrencyData;
exports.currencyConversion = currencyConversion;
