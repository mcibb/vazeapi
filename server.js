var fs = require("fs");

let data = fs.readFileSync("activities.json");
let activities = JSON.parse(data);
console.log(activities)

console.log("server start");

var express = require("express");

var app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("App running");
    console.log(PORT);
});



app.use(express.static("public"));

app.put("/add/:day/:hour/:text", addText);

function addText(request, response) {
    let data = request.params;
    let day = data.day;
    let hour = data.hour;
    let text = data.text;
    let dayArray = activities[day];

    dayArray[hour] = text;
    let write = JSON.stringify(activities, null, 2);
    fs.writeFile("activities.json", write, finished);

    function finished(err) {
        console.log("OK");
    }

    
    
    response.send(activities);
}

app.get("/all", sendAll);

function sendAll(request, response) {

    response.send(activities);
}

app.get("/writejson", writeJSON);


function writeJSON(request, response) {
    
    
    let hours = {
        "8": "",
        "9": "",
        "10": "",
        "11": "",
        "12": "",
        "13": "",
        "14": "",
        "15": "",
        "16": "",
        "17": "",
        "18": "",
        "19": ""
    }
    
    for (i = 0; i < 90; i++) {
        activities[i] = hours;
        
    }
    let write = JSON.stringify(activities, null, 2);
    fs.writeFile("activities.json", write, finished);

    function finished(err) {
        console.log("OK");
        reply = {
            msg: "OK"
        }
    response.send(reply);
    }

    
}