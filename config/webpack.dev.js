//引入eslint语法检查的插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
//引入处理html自动引入打包后的文件的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path=require('path')
module.exports={
    //入口
    entry:'./js/index.js',
    //输出
    output:{
      //开发模式可以没有输出
        path:undefined,
        filename: "static/js/main.js",
        clean: true, // 自动将上次打包目录资源清空
    },
    //加载器
    module:{
        rules:[
          {
             oneOf:[      //处理css资源
      {
          test:/\.css$/,
          use:['style-loader','css-loader']
      },
      //处理less资源
      {
          test:/\.less$/,
          use:['style-loader','css-loader','less-loader']
      },
      //处理sass资源
      {
          test:/\.s[ac]ss$/,
          use:['style-loader','css-loader','sass-loader']
      },
      //处理图片资源
      {
          test:/\.(png|jpe?g|gif|webp)$/,
          type:'asset',
          //用base64，图片会以 data URI 形式内置到 js 中了 
          parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
              }
            },
             generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      //处理在html中通过<img>标签引入的图片
      {
        // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
        test:/\.html$/,
        loader:"html-loader",
        options:{
            esModule:false,
        }
},
       //处理字体资源
       {
          test: /\.(ttf|woff2?|mp4|mp3|avi)$/,
          type: "asset/resource",
          generator: {
            filename: "static/media/[hash:8][ext][query]",
          },
        },
        //babel  js的兼容性处理
          {
              test: /\.js$/,
              exclude: /node_modules/, // 排除node_modules代码不编译
              loader: "babel-loader",
              options: {
                cacheDirectory: true, // 开启babel编译缓存
                cacheCompression: false, // 缓存文件不要压缩
                plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
              },

            },]
          }
     
           
           
        ]
    },
    //插件
    plugins:[
        //eslint语法检查
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
            exclude: "node_modules", // 默认值
            cache: true, // 开启缓存
            // 缓存目录
            cacheLocation: path.resolve(
              __dirname,
              "../node_modules/.cache/.eslintcache"
            ),
          }),
          new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html"),
          }),
    ],
  //     // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  devtool: "cheap-module-source-map",
    //模式
    mode:'development'
}