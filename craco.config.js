module.exports = {
  // commonjs
  devServer: {
    port: 8000, // b端 前端
    proxy: {
      "/api": "http://localhost:3001"
    }
  }
};
