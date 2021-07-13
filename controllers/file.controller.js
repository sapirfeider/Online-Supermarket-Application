const fs = require("fs");
const baseUrl = "/files/";

const getListFiles = (req, res) => {
  //create my recipt and save doc in uploads folder
  
  const {userName} = req.query
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

    const currentFile = fileInfos.find((file) => {
      return file.name == `${userName}.txt`
    })

    res.status(200).send(currentFile);
  });
};

const download = (req, res) => {
  //the href to my specific file in the folder

  const fileName = `${req.params.name}`;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  getListFiles,
  download,
};