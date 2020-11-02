const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                        rootValue: 37.5,
                        propList: ['*']
                    })
                ]
            }
        }
    },
    devServer: {
        hot: true,
        proxy: {
            // 用‘/api’开头，代理所有请求到目标服务器
            '/api': {
                target: 'http://localhost:3000', // 接口域名
                changeOrigin: true, // 是否启用跨域
                pathRewrite: { //
                    '^/api': ''
                }
            }
        }
    },
    // webpack 路径配置
    chainWebpack: config => {
        // config.entry.app = ["babel-polyfill", resolve('src/index.js')];
        // 配置静态文件引入路径
        config.resolve.alias
            .set('@', resolve('src'));
        config.resolve.symlinks(true);
        // 打包构建项目时,图片压缩，开发环境不需要打开
        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         bypassOnDebug: true
        //     })
        //     .end();
    },
};
