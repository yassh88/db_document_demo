const uploadFile = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const baseUrl = "http://localhost:8080/files/";
const { v4: uuidv4 } = require("uuid");
const upload = async (req, res) => {
  const ts = Date.now();
  try {
    console.log("req.file", req.file);
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      name: req.file.originalname,
      url: baseUrl + req.file.originalname,
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const getCurrentSize = (req, res) => {
  // 5000000;
  //dummy API
  res.status(200).send({ currentSize: 400000 });
};

const saveData = (req, res) => {
  try {
    var uploader = req.body.uploader;
    var description = req.body.description;
    var uploadReason = req.body.uploadReason;
    var date = req.body.date;
    var fileDetails = req.body.fileDetails;
    const dirPath = __basedir + "/resources/json_db/db.json";
    fs.readFile(dirPath, "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data); //now it an object
        const saveObj = {
          id: uuidv4(),
          uploader,
          description,
          uploadReason,
          fileDetails,
          date,
        };
        obj.table.push(saveObj); //add some data
        console.log("uploader", uploader);

        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile(dirPath, json, "utf8", () => {
          res.status(200).send({
            message: "Data is uploaded.",
            obj: saveObj,
          });
        }); // write it back
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not uploaded the file data. " + err,
    });
  }
};

const getData = (req, res) => {
  try {
    const dirPath = __basedir + "/resources/json_db/db.json";
    fs.readFile(dirPath, "utf8", function readFileCallback(err, data) {
      if (err) {
        console.log(err);
      } else {
        obj = JSON.parse(data); //now it an object
        res.status(200).send(obj);
      }
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not uploaded the file data. " + err,
    });
  }
};

module.exports = {
  upload,
  getListFiles,
  download,
  getCurrentSize,
  saveData,
  getData,
};
