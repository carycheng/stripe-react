/**
 * We have two servers running in this architecture. One for react and one for express.
 * The react app is running on port 3000 but the express server is running on port 5000.
 * The express server handles the oauth endpoint so when we are trying to oauth, going to
 * https://localhost:3000/auth/google will not work, we need to forware this request to the
 * correct domain at https://localhost:5000/auth/google. The proxy here is listening for any
 * request that has the relative path '/auth/google'. When it sees this request, it will forward
 * this request to port 5000. However, on the way back this proxy again will prepend the current
 * port of the request in context, which was originally port 3000.
 */

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};