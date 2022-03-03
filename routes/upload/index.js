const Joi = require("joi");
const xyz = require("../../controller/upload");

const router = [
  {
    path: "/upload",
    method: "post",
    options: {
      handler: xyz.uploads,
      description: "Upload a file ",
      notes: "File upload",
      tags: ["api", "uploads"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
      payload: {
        output: "file",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        timeout: false,
      },
      validate: {
        payload: Joi.any().meta({ swaggerType: "file" }),
      },
    },
  },
];

module.exports = router;
