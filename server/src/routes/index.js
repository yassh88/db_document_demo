const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  // middleware
  app.use(express.json());
  app.use(express.urlencoded());
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.post("/fileMetaData", controller.saveData);
  router.get("/fileMetaData", controller.getData);
  router.get("/currentDocSize", controller.getCurrentSize);

  app.use(router);
};

module.exports = routes;
