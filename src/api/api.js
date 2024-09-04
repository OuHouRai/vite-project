/**
 * 整个项目api的统一管理
 */

import request from "./request.js";

//请求首页左侧的表格的数据

export default {
  getTableData() {
    return request({
      url: "/home/getTableData",
      method: "get",
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      method: "get",
    });
  },
  getChartData() {
    return request({
      url: "/home/getChartData",
      method: "get",
    });
  },
  getMenu(data) {
    return request({
      url: "/permission/getMenu",
      method: "post",
      data,
    });
  },
};
