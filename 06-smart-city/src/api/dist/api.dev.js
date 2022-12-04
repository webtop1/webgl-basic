"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSmartCityInfo = getSmartCityInfo;
exports.getSmartCityList = getSmartCityList;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Descripttion: 
 * @version: 
 * @Author: tinghai
 * @Date: 2022-05-30 23:00:43
 */
function getSmartCityInfo() {
  return _axios["default"].get("http://127.0.0.1:4523/m1/676424-0-default/api/smartcity/info");
}

function getSmartCityList() {
  return _axios["default"].get("http://127.0.0.1:4523/m1/676424-0-default/api/smartcity/list");
}