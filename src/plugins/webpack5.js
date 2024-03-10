// eslint-disable-next-line
module.exports = function (context, options) {
  return {
    name: "custom-docusaurus-plugin",
    // eslint-disable-next-line
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          alias: {
            // path: require.resolve("path-browserify"),
          },
          fallback: {
            // fs: false,
            // http: require.resolve("stream-http"),
            // https: require.resolve("https-browserify"),
            // os: require.resolve("os-browserify/browser"),
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer/"),
            stream: require.resolve("stream-browserify"),
          },
        },
      };
    },
  };
};
