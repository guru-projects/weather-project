const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){
    console.log(req.body.place)

    const location = req.body.place;
    const apikey = "7fbc2995e08c9dc02f4affbd8a9b6e26"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+location+"&appid="+apikey;
        https.get(url, function(response) {
            console.log("statusCode:"+response.statusCode);
            
            response.on("data", function(data){
                
                const weatherData = JSON.parse(data);
                const icon = weatherData.weather[0].icon
                const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
                const temp = weatherData.main.temp
                const name = weatherData.weather[0].description
                res.write("<h1>The temperature is "+temp+"</h1>");
                res.write("<p>It seems to be "+name+"</p>");
                res.write("<img src="+imgURL+">");
                res.send()
            })
        })
});


app.listen(3000, function(){
    console.log("listening on...");
});