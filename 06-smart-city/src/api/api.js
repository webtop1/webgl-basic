/*
 * @Descripttion: 
 * @version: 
 * @Author: tinghai
 * @Date: 2022-05-30 23:00:43
 */
import axios from "axios";

export function getSmartCityInfo() {
  return axios.get("http://127.0.0.1:4523/m1/676424-0-default/api/smartcity/info");
}

export function getSmartCityList() {
  return axios.get("http://127.0.0.1:4523/m1/676424-0-default/api/smartcity/list");
}
