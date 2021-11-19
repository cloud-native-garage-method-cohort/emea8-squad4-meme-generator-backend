var express = require("express");
var app = express();

app.get("/memes", function (req, res) {
  var sql = require("mssql");

  // config for your database
  var config = {
    user: "SA",
    password: "YourStrong@Passw0rd",
    server: "host.docker.internal", //Service of DB in OS
    database: "MemeDB",
    trustServerCertificate: true,
  };

  // connect to your database
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from Images", function (err, recordset) {
      if (err) console.log(err);

      memes = [];
      memes.push(recordset.recordset);
      result = {
        success: true,
        data: { memes: memes[0] },
      };
      // send records as a response
      res.send(result);
    });
  });
});

var server = app.listen(8080, function () {
  console.log("Server is running..");
});
