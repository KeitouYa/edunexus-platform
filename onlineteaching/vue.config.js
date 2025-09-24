const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/edu": {
        target: "http://localhost:8089",
        pathRewrite: { "^/edu": "" }, //设置了所有以edu开头的请求
        // ws: true, //用于支持websocket
        // changeOrigin: true, //用于控制请求头中的Host值
      },
    },
  },
});
