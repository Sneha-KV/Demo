const path = require("path");
const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin")
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');


const glob = require("glob")
var inProduction = process.env.NODE_ENV === 'production';
module.exports = {
  entry: {
    "bundle.js": glob.sync("build/static/?(js)/*.*.?(js)").map(f => path.resolve(__dirname, f)),
    // "bundle.css": glob.sync("build/static/?(css)/*.*.?(css)").map(f => path.resolve(__dirname, f))
    // "bundle.js": glob.sync("build/static/?(js|css)/*.?(js|css)").map(f => path.resolve(__dirname, f)),
  },
  output : {
    path: path.join(__dirname, '/dist/js'),
    filename: '[name]'
},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new TerserPlugin(),
    new FileManagerPlugin({
      events: {
          onStart: {
            // delete: [path.join(__dirname, 'dist/css'), path.join(__dirname, 'dist/')],
          },
          onEnd: {
            
              copy: [
                
                
                  {
                      source: glob.sync("build/static/css/main.*.css")[0],
                      // path.join(__dirname, 'build/static/css/main.*.css'),
                      destination: 'dist/css/bundle.css'
                  }, 
                  {
                    source: path.join(__dirname, 'build/static/media'),
                    destination: 'dist/media/'
                  }
              ]
          }
      }
  })
  ],
  mode: inProduction ? 'production' : 'development'
}

// -------------------------------------------------------------------------------------------------

// var webpack = require('webpack');
// var path = require('path');
// var glob = require('glob');
// var MiniCssExtractPlugin = require("mini-css-extract-plugin");
// var PurgecssPlugin = require('purgecss-webpack-plugin');
// var { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const TerserPlugin = require("terser-webpack-plugin")

// var PATHS = {
//   src: path.join(__dirname, 'src')
// }

// var inProduction = process.env.NODE_ENV === 'production';

// module.exports = {
//     entry: { chatBot : glob.sync("build/static/?(js|css)/main.*.?(js|css)").map(f => path.resolve(__dirname, f))},
//         // entry: {app: [__dirname +'/src/index.js', __dirname+'/src/App.scss]}
//     // entry: {app: [__dirname +'/src/index.js', __dirname+'/src/App.scss]}
//     output : {
//         path: path.join(__dirname, '/build'),
//         filename: '[name].js'
//     },
//     module: {
//         rules : [
//             // {
//             //     test : /\.css$/,
//             //     use: ['style-loader', 'css-loader']
//             // },
//             {
//                 test: /\.s[ac]ss$/,
//                 // use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
//                 use: [
//                   {
//                     loader: 'style-loader'
//                   },
//                   {
//                     loader: 'css-loader'
//                   },
//                   {
//                     loader: 'sass-loader'
//                   }
//                 ]
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader"
//             },
//             {
//                 test: /\.png|jpe?g|gif|eot|ttf|woff|woff2$/,
//                 loader: 'file-loader',
//                 options : {
//                     name: 'images/[name].[hash].[ext]'
//                 }
//             },
//             {
//                 test: /\.svg$/,
//                 use: ["@svgr/webpack"]
//             }
//         ]
//     },
//     plugins : [
//         new MiniCssExtractPlugin({
//             filename: '[name].css'
//         }),
//         new PurgecssPlugin({
//             paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
//             minimize: inProduction
//         }),
        
//         new webpack.LoaderOptionsPlugin({
//             minimize: inProduction
//         }),
//         new CleanWebpackPlugin({
//             root: __dirname,
//             verbose: true,
//             dry: false

//         }),
//         new webpack.ProvidePlugin({
//             "React": "react",
//          }),
//         // function () {
//         //     this.plugin('done', stats => {
//         //         require('fs').writeFileSync(path.join(__dirname, 'build/manifest.json')),
//         //         JSON.stringify(stats.toJson())
//         //     })
//         // }

//     ],
//     mode: inProduction ? 'production' : 'development'
// };

// if(inProduction) {
//     module.exports.plugins.push(
//         new TerserPlugin()
//     )
// }