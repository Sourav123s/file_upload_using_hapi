"use strict";

const Hapi = require("@hapi/hapi");
const fs = require("fs");
const inter = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");
const vision = require("@hapi/vision");
const Pack = require("./package.json");
const baseRouter = require("./routes");
global.__basedir = __dirname;

const init = async () => {
  const server = await new Hapi.Server({
    host: "localhost",
    port: 3000,
  });

  const swaggerOptions = {
    info: {
      title: "Test API Documentation",
      version: Pack.version,
    },
  };

  await server.register([
    inter,
    vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
  await server.register(baseRouter, {
    routes: {
      prefix: "/api",
    },
  });
  //   server.route(Routes);
  // server.route({
  //   method: "POST",
  //   path: "/submit",
  //   handler: (request, h) => {
  //     const data = request.payload;
  //     //   console.log(data.file.pipe());
  //     if (data.file) {
  //       const name = data.file.hapi.filename;

  //       const path = __dirname + "/uploads/" + name;
  //       const file = fs.createWriteStream(path);

  //       file.on("error", (err) => console.error(err));

  //       data.file.pipe(file);

  //       data.file.on("end", (err) => {
  //         const ret = {
  //           filename: data.file.hapi.filename,
  //           headers: data.file.hapi.headers,
  //         };
  //         return JSON.stringify(ret);
  //       });
  //     }
  //     return "ok";
  //   },
  //   options: {
  //     payload: {
  //       output: "stream",
  //       parse: true,
  //       allow: "multipart/form-data",
  //       multipart: true,
  //     },
  //   },
  // });
  try {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } catch (err) {
    console.log(err);
  }
};

init();
