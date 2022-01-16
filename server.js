var fs = require("fs");

let data = fs.readFileSync("activities.json");
let activities = JSON.parse(data);
console.log(activities)

console.log("server start");

var express = require("express");

var app = express();

var server = app.listen(process.env.PORT || 5000, listening);

function listening() {
    console.log("listening");
}

app.use(express.static("public"));

app.get("/add/:day/:text", addText);

function addText(request, response) {
    let data = request.params;
    let day = data.day;
    let text = data.text;

    activities[day] = text;
    let write = JSON.stringify(activities, null, 2);
    fs.writeFile("activities.json", write, finished);

    function finished(err) {
        console.log("OK");
    }

    let reply = {
        msg: "Text inputted"
    }
    
    response.send(reply);
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