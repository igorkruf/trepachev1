module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Дмитрий Тест №1";
      return args;
    });
  },
  css: {
    loaderOptions: {
      scss: {
        // additionalData: `@import "~@/styles/global.vars.scss";`,
        prependData: `@import "@/styles/global.vars.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/api/*": {
        target: "http://localhost:3000",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
