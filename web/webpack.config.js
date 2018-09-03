const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const mode = argv.mode || "development";
const _modeFlag = (mode === "production"?true:false)
const _mergeConfig = require(`./config/webpack.${mode}.js`);
const glob = require("glob");
const { join } = require("path");
let _entry = {};//空的入口文件
let _plugins = [];
const files = glob.sync("./src/webapp/views/**/*.entry.ts");
const HappyWebpackPlugin = require("./config/happyWebpack");//多线程
const HTMLWebpackPlugin = require("html-webpack-plugin");
const HTMLAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");
console.log(files)
for (let item of files) {
    console.log(item)
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts$)/g.test(item)) {
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        _plugins.push(new HTMLWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            inject: false,
            chunks: [entryKey],
            minify: {
                removeAttributeQuotes:_modeFlag,
                collapseWhitespace:_modeFlag
            }
        }))
    }
}
let webpackConfig = {
    //index-index.entry.ts
    entry: _entry,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
        ...HappyWebpackPlugin,
        new HTMLAfterWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.ts?$/,
            use: "happypack/loader?id=happyTS"
        },
        // {
        //     test: /\.css?$/,
        //     use: "happypack/loader?id=happyTS"
        // }
        ]
    },
    resolve: {
        extensions: [".ts", ".css"]
    }
}
module.exports = merge(webpackConfig, _mergeConfig)