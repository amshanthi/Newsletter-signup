const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("view"));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/581c601ae0";

  const option = {
    method: "POST",
    auth: "shanthia:d19fe69adb6080c15565e1a834267aba-us1",
  };

  const request = https.request(url, option, function (response) {
      if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html")
      }else{
        res.sendFile(__dirname+"/failure.html")
      }
    response.on("data", function (data) {
      //   console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/")
})

app.post("/success",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
  console.log("server is sunning at 3000");
});

// API key
// 2352f8c4beff3158bbc6338f06054b1d-us1

// LIST-id
// 581c601ae0
