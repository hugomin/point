"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/** 
 * @fileOverview 实现Index数据模型
 * @author  wangzmein
*/
/** 
 * IndexModel 生成一段异步数据
 * @class
 * 
*/
class IndexModel {
  /**
   * @constructor
   * @param {string} app  koa2 上下文
   */
  constructor(app) {}

  /**
   * @returns {promise} 返回异步数据
   * @example
   * return  new Promise
   * getData()
   */
  getData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("IndexAction异步数据");
      }, 1000);
    });
  }
}
exports.default = IndexModel;