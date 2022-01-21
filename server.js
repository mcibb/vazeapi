var fs = require("fs");
//var flatten = require('flat');
//var unflatten = require('flat').unflatten;


let data = fs.readFileSync("activities.json");
let db = JSON.parse(data);

let back = JSON.parse(data);





console.log("server start");

var express = require("express");
const req = require("express/lib/request");

var app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("App running");
    console.log(PORT);
});



app.use(express.static("public"));

app.get("/add/:month/:day/:hour/:text", addText);

function addText(request, response) {
    let data = request.params;
    let month = data.month;
    let day = data.day;
    let hour = data.hour;
    let text = data.text;
    /*
    let activities = flatten(db); 
    activities["0.0.9"] = "test";
    activities = unflatten(activities); 
    let result = activities["0"][0][9];
*/
    db[month][day][hour] = text;

    
    
   
    
    let write = JSON.stringify(db, null, 2);
    fs.writeFile("activities.json", write, finished);

    function finished(err) {
        console.log("OK");
    }

   
    
    response.send(db);
}




app.get("/all", sendAll);

function sendAll(request, response) {
    data = request.params;
    
    response.send(back);
}

app.get("/all/:month/:day/:hour", sendAll);

function sendAll(request, response) {
   
    let data = request.params;
    let month = data.month;
    let day = data.day;
    let hour = data.hour;
    

    let reply = back[month][day][hour];    


    response.send(reply).text();
    return reply.text();
    
}


app.get("/writejson", writeJSON);


function writeJSON(request, response) {
    
    let data = request.params;
    


    let hours = {
        "0": " ",
        "1": " ",
        "2": " ",
        "3": " ",
        "4": " ",
        "5": " ",
        "6": " ",
        "7": " ",
        "8": " ",
        "9": " ",
        "10": " ",
        "11": " "
    };

    let months = {
        "0": 
        {   
            "0": hours,
            "1": hours,
            "2": hours,
            "3": hours,
            "4": hours,
            "5": hours,
            "6": hours,
            "7": hours,
            "8": hours,
            "9": hours,
            "10": hours,
            "11": hours,
            "12": hours,
            "13": hours,
            "13": hours,
            "14": hours,
            "15": hours,
            "16": hours,
            "17": hours,
            "18": hours,
            "19": hours,
            "20": hours,
            "21": hours,
            "22": hours,
            "23": hours,
            "24": hours,
            "25": hours,
            "26": hours,
            "27": hours,
            "28": hours,
            "29": hours,
            "30": hours
        },
        "1": 
            {   
                "0": hours,
                "1": hours,
                "2": hours,
                "3": hours,
                "4": hours,
                "5": hours,
                "6": hours,
                "7": hours,
                "8": hours,
                "9": hours,
                "10": hours,
                "11": hours,
                "12": hours,
                "13": hours,
                "13": hours,
                "14": hours,
                "15": hours,
                "16": hours,
                "17": hours,
                "18": hours,
                "19": hours,
                "20": hours,
                "21": hours,
                "22": hours,
                "23": hours,
                "24": hours,
                "25": hours,
                "26": hours,
                "27": hours
            },
        "2": 
            {   
                "0": hours,
                "1": hours,
                "2": hours,
                "3": hours,
                "4": hours,
                "5": hours,
                "6": hours,
                "7": hours,
                "8": hours,
                "9": hours,
                "10": hours,
                "11": hours,
                "12": hours,
                "13": hours,
                "13": hours,
                "14": hours,
                "15": hours,
                "16": hours,
                "17": hours,
                "18": hours,
                "19": hours,
                "20": hours,
                "21": hours,
                "22": hours,
                "23": hours,
                "24": hours,
                "25": hours,
                "26": hours,
                "27": hours,
                "28": hours,
                "29": hours,
                "30": hours
            }
    };

    

   
   
    
    for (i = 0; i < 3; i++) {
        db[i] = months[i];
        
    }
    let write = JSON.stringify(db, null, 2);
    fs.writeFile("activities.json", write, finished);

    function finished(err) {
        console.log("OK");
        reply = {
            msg: "OK"
        }
    response.send(db);
    }

    
}

