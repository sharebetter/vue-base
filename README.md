# base-vue (包含微信授权、项目基本配置)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 框架说明
> vue.config.js文件
```
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
        // 设置静态文件路径
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@utils', resolve('src/utils'))
            .set('@api', resolve('src/api'))
            .set('@pic', resolve('src/assets/img'))
            .set('@pages', resolve('src/pages'))
        // 图片限制 转为64base
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 20240 }))
        // 图片质量压缩
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('img-loader')
            .loader('img-loader').options({
                plugins: [
                    require('imagemin-jpegtran')(),
                    require('imagemin-pngquant')({
                        quality: [0.75, 0.85]
                    })
                ]
            })
        let externals = {
            vue: 'Vue',
            axios: 'axios',
            'vue-router': 'VueRouter',
            vuex: 'Vuex'
        }
        config.externals(externals)
    },
    // 文件压缩
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
                threshold: 20240,
                minRatio: 0.8
            })
        ]
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
```
### 若要开启微信授权(解开对应文件注释)
> main.js文件
```
// 配置初始化
configInit();
// 获取微信授权
getwxAuth().then(() => {
   wxConfig(location.href).then(() => {
      new Vue({
          router,
          store,
          render: h => h(App)
      }).$mount('#app')
    })
});
```
> router/index.js
```
// 微信签证
router.afterEach(to => {
    // 微信验签，ios只需验证一次即可,url改成自己的域名url
    let url = `${global.base}jiajia${to.fullPath}`
    if (checkVersion().ios) {
        if (!global.isConfig) {
            wxConfig(location.href)
        }
    } else {
        wxConfig(url)
    }
    global.isConfig = true
})
```
> assets/envConfig.js 基本配置文件（需要改成自己相应的环境配置）
```
export function configInit () {
    if (location.href.indexOf('rr.jjshebao.com') > -1) {
    // 微信授权回调地址
        global.redirect = 'http://authapi.jjshebao.com/v20/wechat/backUrl'
        global.base_redirect = 'http://authapi.jjshebao.com/v20/wechat/backUrl'
        global.APPID = 'wx0e3c9f92fa48e32a'
        global.entry = 'ucontOnline'
        global.base = 'http://rr.jjshebao.com/'
        global.env = {
            resourceService: 'http://resourceapi.jjshebao.com/apiUcont/v20',
            otherService: 'https://otherapi.jjshebao.com/v20'
        }
    } else {
    // 微信授权回调地址
        global.redirect = 'http://test-authapi.jjshebao.com/v20/wechat/backUrl'
        global.base_redirect = 'http://test-authapi.jjshebao.com/v20/wechat/backUrl'
        global.APPID = 'wx9cd70d2eb2642a40'
        global.entry = 'ucontTest'
        global.base = 'http://rr-test.jjshebao.com/'
        global.env = {
            resourceService: 'http://test-resourceapi.jjshebao.com/apiUcont/v20',
            otherService: 'https://tst-otherapi.jjshebao.com/v20'
        }
    }
}
```
> service/authService.js （微信授权判断、认证）
```
export function getwxAuth () {
    if (local.getItem('rr_uid')) {
        local.setItem('has_uid', true)
    } else {
        local.setItem('has_uid', false)
    }
    // getEntry()
    if (location.href.indexOf('familyId') > -1) {
        // 设置授权appid
        global.APPID = splitUtil('familyId=')
        // 设置授权回调地址
        global.redirect = `${global.base_redirect}/${global.APPID}`
        // 判断appid是否匹配，是否需要重新授权
        if (local.getItem('family_appid') !== global.APPID) {
            local.setItem('family_appid', global.APPID)
            location.href = baseURL().URL_WX
        } else if (!local.getItem('rr_uid')) { // 判断本地是否存储uid，不存在就重新授权
            location.href = baseURL().URL_WX
        } else {
            local.setItem('family_appid', global.APPID)
            return Promise.resolve(true)
        }
    } else if (location.href.indexOf('uid') > -1) { // 判断是否是授权回调
        local.setItem('rr_uid', splitUtil('uid='))
        return Promise.resolve(true)
    } else {
        if (local.getItem('family_appid')) {
            global.APPID = local.getItem('family_appid')
        }
        global.redirect = `${global.base_redirect}/${global.APPID}`
        return Promise.resolve(true)
    }
}
```
> service, router, assets，api等文件夹内文件根据自己需要修改
