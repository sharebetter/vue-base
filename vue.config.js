const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    runtimeCompiler: true,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: config => {
        // 移除 prefetch 插件
        // config.plugins.delete('prefetch')
        // 移除 preload 插件
        // config.plugins.delete('preload')
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@utils', resolve('src/utils'))
            .set('@api', resolve('src/api'))
            .set('@pic', resolve('src/assets/img'))
            .set('@pages', resolve('src/pages'))
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20240 }))
    },
    configureWebpack: config => {
        config.plugins.push(
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                threshold: 20240,
                minRatio: 0.8
            }),
        );
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin (这个会影响css热更新)
        extract: process.env.NODE_ENV !== 'development',
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    devServer: {
        open: process.env.NODE_ENV === 'development',
        host: '',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
    }
};

