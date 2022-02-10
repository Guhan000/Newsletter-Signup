const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
 
mailchimp.setConfig({
  apiKey: "9aefb1e0784c06a396886c2431f5d6d9-us14",
  server: "us14"
});
 
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})
 
app.post("/", function(req, res){
 
  const listId = "ee80f30763";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };
 
  async function run() {

    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
        }
      });
 
      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );

      res.sendFile(__dirname+"/success.html");
    }
    catch(e) {
        res.sendFile(__dirname+"/failure.html");
    }
  }
 
  run();
})

// app.post("/failure", function(req,res) {
//     res.redirect("/");
// })
 
app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000")
});








// const express = require('express');
// const bodyParser = require('body-parser');
// const request = require('request');
// const app = express();
// const https = require('https');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

// app.get("/", (req,res) => {
//     res.sendFile(__dirname+"/signup.html")
// })

// app.post("/", (req,res) => {
//     const firstName = req.body.fname;
//     const lastName = req.body.lname;
//     const email = req.body.email;


//     const data = {
//         members: [
//             {
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields: {
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//             }
//         ]
//     };

//     const jsonData = JSON.stringify(data);
//     const url = "https://us14.api.mailchimp.com/3.0/list/ee80f30763";
//     const options = {
//         method: "POST",
//         auth: "guhan:9aefb1e0784c06a396886c2431f5d6d9-us14"
//     }

//     const request = https.request(url,options,function(response){
//         response.on("data", function(data){
//             console.log(JSON.parse(data));
//         })
//     })

//     request.write(jsonData);
//     request.end();

// })

// app.listen(3000, () => {
//     console.log("server started at port 3000");
// })

// // unique id
// // ee80f30763

// // api key
// // 9aefb1e0784c06a396886c2431f5d6d9-us14

