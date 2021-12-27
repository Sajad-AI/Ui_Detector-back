var express = require("express");
var multer = require("multer");

var app = express();

const port = process.env.PORT || 8080;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "_" + file.originalname.replace(/ /g, "_"));
  },
});
var upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

// imageUpload API
app.post("/imageUpload", upload.single("image-file"), function (req, res, next) {
  console.log(JSON.stringify(req.file));
  console.log("req.url " + req.url);
  console.log("req.hostname " + req.hostname);
  console.log("req.headers.host " + req.headers.host);

  var response = {
    status: "Image uploaded successfully.",
    imagePath: "http://" + req.headers.host + "/" + req.file.path,
  };
  return res.send(response);
}
);

app.listen(port, () => {
  console.log('http://localhost:8080. Server running on port: ' + port)
});
