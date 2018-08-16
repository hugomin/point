import { GET, route } from 'awilix-koa'
export default
@route("/")
@route("/index.html")
class IndexController {
    constructor({ indexService }) {
        this.indexService = indexService;
    }
    @GET()
    async indexAction(ctx) {
        //ctx.query => ajax
        //ctx.params.id =>/test/:id
        const result = await this.indexService.getData();
        ctx.body = await ctx.render('index',
            { data: result });
    }
}
//路由  router