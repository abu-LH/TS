// 引入路径包
const path = require('path') 
// html 生成模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入clean
const{ CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack-dev-server 安装serve 服务


// webpack 所有的配置都在这里
module.exports = {
    // 设置开发环境
    // mode: 'development', 
    // 生产环境
    mode: 'production', 
    // 入口文件
    entry: './src/index.ts',
    // 输出文件
    output: {
        // 指定打包文件路径
        path: path.resolve(__dirname, 'dist'),
        // 指定打包文件名
        filename: 'bundle.js', 
        // 转换 箭头函数, const
        environment: {
            arrowFunction: false,
            // 不使用const
            const: false
        }
    },
    // webpack 打包时要使用的模块规则
    module: {
        // 打包规则
        rules: [
            {
                // 指定规则生效的文件
                test: /\.ts$/,
                // 要使用的文件loader
                use: [
                    {
                        // 指定加载器
                        loader: 'babel-loader',
                        // 设置 babel
                        options: {
                            // 预定义环境
                            presets: [
                                [
                                    // 插件环境
                                    '@babel/preset-env',
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            'chrome': '58',
                                            'ie': '8'
                                        },
                                        // 指定的 corejs 的版本
                                        'corejs': '3',
                                        // 使用 corejs 的方式 'usage': 表示按需加载 
                                        "useBuiltIns": "usage",
                                    }
                                ]
                            ]
                        }
                    }, 
                    'ts-loader'
                ], 
                //不打包的文件     
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 引入postcss 加载器
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browser: 'last 3 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader',
                ]
            }
        ]
    },
    //配置webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // 模板
            template: "./src/index.html"
        }), 
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}