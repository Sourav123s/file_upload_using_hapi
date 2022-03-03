const upload = require("./upload/index");
module.exports = {
  name: "base-route",
  version: "1.0.0",
  register: (server, options) => {
    server.route(upload);
  },
};
