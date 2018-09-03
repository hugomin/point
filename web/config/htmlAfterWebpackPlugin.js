const pluginName = 'htmlAfterWebpackPlugin';
const assetsHelp = (data)=>{
    let css = [],js=[];
    const dir = {
        js:item => `<script src="${item}"></script>`,
        css:item => `<link rel="stylesheet" href="${item}"></link>`
    }
    for(let jsitem of data.js){
        js.push(dir.js(jsitem))
    }
    for(let cssitem of data.css){
        js.push(dir.css(cssitem))
    }
    return {
        css,
        js
    }
}

class htmlAfterWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(pluginName,htmlpluginData=>{
                let _html = htmlpluginData.html;
                const result = assetsHelp(htmlpluginData.assets);
                _html = _html.replace("<!--injectcss-->",result.css.join(""))
                _html = _html.replace("<!--injectjs-->",result.js.join(""))
                htmlpluginData.html = _html;
                console.log("webpack 构建过程开始！");
            })
        });
    }
}
module.exports = htmlAfterWebpackPlugin;