const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");



});

app.post("/",function(req,res){
  const query = req.body.cityName;
  console.log("City: "+ query);
  const apiKey = "7b7d84c79090d64eae0da94e90d20bd0";

  var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units=metric";
  console.log("url "+url);
  https.get(url, function(response){
    console.log("Status: "+ response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      var imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";



      res.write("<p>The weather is currently "+weatherData.weather[0].description +" in "+query+"</p>");
      res.write("<h1> The temperature in "+query+" is "+weatherData.main.temp +" deg. celsius. </h1>");
      res.write("<img src="+imgURL+">");
      res.send();
    });



  });
});





app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
