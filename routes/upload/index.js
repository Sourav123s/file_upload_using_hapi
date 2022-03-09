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
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
      },
      validate: {
        payload: Joi.any().meta({ swaggerType: "file" }),
      },
    },
  },
  {
    path: "/upload-multiple",
    method: "post",
    options: {
      handler: xyz.uploadMultiple,
      description: "Upload a file ",
      notes: "File upload",
      tags: ["api", "uploads"],
      plugins: {
        "hapi-swagger": {
          payloadType: "form",
        },
      },
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
      },
      validate: {
        payload: Joi.object({
          file: Joi.any().meta({ swaggerType: "file" }).description("file"),
        })
      },
    },
  },
];

module.exports = router;
