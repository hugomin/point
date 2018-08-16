/** 
 * @fileOverview 实现Index数据模型
 * @author  wangzmein
*/
/** 
 * IndexModel 生成一段异步数据
 * @class
 * 
*/
export default class IndexService {
    /**
     * @constructor
     * @param {string} app  koa2 上下文
     */
    constructor(app){

    }

    /**
     * @returns {promise} 返回异步数据
     * @example
     * return  new Promise
     * getData()
     */
    getData(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve("IndexAction异步数据")
            },1000)
        })
    }
}