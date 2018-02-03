var path = require("path");

module.exports = {
  entry:  "./entry.js",
  output: {
    path:path.resolve(__dirname, ""),
    filename:"bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.jsx|.js$/,
        loader:"babel-loader",//此babel-loader包含了对于jsx语法的解析
        query: {
          presets:['es2015','react']
        }
      },
      {
        test:/\.scss$/,
        loader:"style-loader!css-loader!sass-loader"
      },
//    { //css背景图片
//          test: /\.(png|jpe?g|gif|ico)(\?\S*)?$/,
//          loader: 'file-loader',
//          query: {
//              name: 'img/[name].[ext]'
//          }
//      },
      {//css背景图片
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url?limit=4192&name=[path][name].[ext]' 
      }
    ]
  }
}
