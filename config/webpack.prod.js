//引入eslint语法检查的插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
//引入处理html自动引入打包后的文件的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入 提取css成单独文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//引入 css压缩的插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//引入无损压缩图片的插件
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const os = require("os");
const TerserPlugin = require("terser-webpack-plugin");
//引入预加载的插件
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const path=require('path')
// cpu核数
const threads = os.cpus().length;
//封装css兼容性的函数
// 获取处理样式的Loaders
const getStyleLoaders = (preProcessor) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    preProcessor,
  ].filter(Boolean);
};

//封装css兼容性处理的函数
module.exports={
    //入口
    entry:{
      index: './src/index.js',
      search: './src/search.js',
    },
    //输出
    output:{

        path:path.resolve(__dirname,'../dist'),
        filename: "static/js/[name].[contenthash:8].js", // 入口文件打包输出资源命名方式
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js", // 动态导入输出资源命名方式
        assetModuleFilename: "static/media/[hash:8][ext][query]", // 图片、字体等资源命名方式（注意用hash）
        clean: true, // 自动将上次打包目录资源清空
    },
    //加载器
    module:{
        rules:[
           {
             //每个文件只能被一个loader处理
             oneOf:[
                //处理css资源
            {
              test:/\.css$/,
               use: getStyleLoaders(),
          },
          //处理less资源
          {
              test:/\.less$/,
              use: getStyleLoaders("less-loader"),
          },
          //处理sass资源
          {
              test:/\.s[ac]ss$/,
              use: getStyleLoaders("sass-loader"),
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
           
            },
            //babel  js的兼容性处理
              {
                  test: /\.js$/,
                  exclude: /node_modules/, // 排除node_modules代码不编译
                  use: [
                    {
                      loader: "thread-loader", // 开启多进程
                      options: {
                        workers: threads, // 数量
                      },
                    },
                    {
                      loader: "babel-loader",
                  options: {
                    cacheDirectory: true, // 开启babel编译缓存
                    cacheCompression: false, // 缓存文件不要压缩
                    plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                  },
                    },
                  ],
                },
             ]
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
            threads, // 开启多进程
          }),
          //自动生成html文件
          new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            filename: 'entry1.html', // 此处新增
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../index.html"),
            chunks:['index'],  
            inject:true
          }),
             //自动生成html文件
             new HtmlWebpackPlugin({
              // 以 public/index.html 为模板创建文件
              filename: 'entry2.html',// 此处新增
              // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
              template: path.resolve(__dirname, "../search.html"),
              chunks:['search'],  
              inject:true
            }),
            // 提取css成单独文件
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
    new CssMinimizerPlugin(),
    //预加载
    new PreloadWebpackPlugin({
      // rel: "preload", // preload兼容性更好
      // as: "script",
       rel: 'prefetch' // prefetch兼容性更差
    }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        // 压缩图片
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["jpegtran", { progressive: true }],
                ["optipng", { optimizationLevel: 5 }],
                [
                  "svgo",
                  {
                    plugins: [
                      "preset-default",
                      "prefixIds",
                      {
                        name: "sortAttrs",
                        params: {
                          xmlnsOrder: "alphabetical",
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
       // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
       new TerserPlugin({
        parallel: threads // 开启多进程
      })
      ],  
      //代码分割
        splitChunks: {
          //会将动态导入的文件拆分成单独文件
          //会将node modules拆分成单独文件
          chunks: "all", // 对所有模块都进行分割
      },
         // 提取runtime文件,解决contenthash文件命名问题
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`, // runtime文件命名规则
    },
    },
    devtool: "source-map",
    //模式
    mode:'production',
   
  
      performance: {
          hints: "warning", // 枚举
          maxAssetSize: 300000, // 整数类型（以字节为单位）
          maxEntrypointSize: 500000, // 整数类型（以字节为单位）
          assetFilter: function (assetFilename) {
              // 提供资源文件名的断言函数
              // 只给出js与css文件的性能提示
              return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
          }
      }
  
}