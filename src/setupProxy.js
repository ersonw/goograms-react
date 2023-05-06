const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/complete',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            // target: 'http://139.180.213.49:8080',
            // pathRewrite:{
            //     "^/api":""
            // },
            // changeOrigin: true,
        })
    );
};
