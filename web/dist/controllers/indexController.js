"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _indexModel = require("../models/indexModel.js");

var _indexModel2 = _interopRequireDefault(_indexModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IndexController {
    constructor() {}
    indexAction() {
        return async (ctx, next) => {
            const IndexModelIns = new _indexModel2.default();
            const result = await IndexModelIns.getData();
            ctx.body = await ctx.render('index', { data: result });
        };
    }
}
exports.default = IndexController;
//路由  router