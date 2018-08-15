import IndexController from './indexController';
const insIndexController = new IndexController();
export default (app, router) => {
    app.use(router(_ => {
        _.get('/', insIndexController.indexAction())
    }
    ))
}