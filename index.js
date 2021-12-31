var express = require("express");
var multer = require("multer");
const AppSettings = require("./AppSettings");

var app = express();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname.replace(/ /g, "_"));
  },
});

var upload = multer({ storage: storage });

// the public is for testing purpose
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// imageUpload API
app.post("/imageUpload", upload.single("image-file"), function (req, res, next) {
  var response = {
    status: "Image uploaded successfully.",
    imagePath: "http://" + req.headers.host + "/" + req.file.path,
  };
  return res.send(response);
}
);

app.listen(AppSettings.LISTEN_PORT, () => {
  console.log('http://localhost:8080. Server running on port: ' + AppSettings.LISTEN_PORT)
});
