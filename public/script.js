String.prototype.format = function () {
    
    var args = arguments;
    
    return this.replace(/{([0-9]+)}/g, function (match, index) {
      
      return typeof args[index] == 'undefined' ? match : args[index];
    });
  };

const getUrl = "https://vazeapi.herokuapp.com/all";
const putUrl = "https://vazeapi.herokuapp.com/add/{0}/{1}/{2}";


/*
for (i = 8; i < 20; i++){

    fetch(putUrl.format(0, i, "dačo"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        
    })
    .then(response => response.json())
    .then(data => {
        console.log("success", data);
    })
    .catch((error) => {
        console.error("Error", error);
    })
}
*/









     


/*
.then(response => response.json())
    .then(data => {
        console.log("success", data);
        })
            
*/
var startJan = new Date(2022, 0, 1);
var endJan = new Date(2022, 0, 31);
var startFeb = new Date(2022, 1, 1);
var endFeb = new Date(2022, 1, 28);
var startMar = new Date(2022, 2, 1);
var endMar = new Date(2022, 2, 31);

const table = document.querySelectorAll(".table");
const week = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];
const semester = [[], [], []];
const startEnd = [[startJan, endJan], [startFeb, endFeb], [startMar, endMar]];

let text = "";

for (let i = 0; i < 3; i++) {
    
    
    for (let j = 1; j <= startEnd[i][1].getDate(); j++) {
        semester[i][j] = j;
        
    }

}


// Display months, weekdays and days 
for (let k = 0; k <3; k++) {

    let weekDay = [6, 2, 2];
    

    for (let l = 0; l <7; l++) {
            table[k].innerHTML += "<p class='weekDay'>" + week[l] + "</p>";
            
        }
    for (let i = 0; i < weekDay[k]-1; i++) {
        table[k].innerHTML += "<p></p>";
    } 
    for (let i = 1; i < semester[k].length; i++) {
        table[k].innerHTML += "<p class='day'>" + semester[k][i] + "</p>";
        
    }

}

let dayButtons = document.querySelectorAll(".day");
let dayPanel = document.querySelector("#dayPanel");
let dayPicked = document.querySelector("#dayPicked");
let months = document.querySelectorAll(".month");








//add hover listener to all hourLines
function hoverTime() {

    let lines = document.querySelectorAll(".hourLinesText");

    for (i = 1; i < lines.length; i += 2) {

        let timeLine = lines[i];
        let timeNum = lines[i-1];
        
        
        const stylesLine = "cursor: pointer; background-color: #b8c6db; background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 30%);";
        const stylesNum = "cursor: pointer; background-color: #b8c6db; background-image: linear-gradient(290deg, #f5f7fa 20%, #b8c6db 100%);";
        
        timeLine.addEventListener("mouseenter", function() {
            timeLine.style = stylesLine;
            timeNum.style = stylesNum;
            
            
        });
        timeLine.addEventListener("mouseleave", function() {
            timeLine.style = "unset";
            timeNum.style = "unset";
            
            
        });
        timeNum.addEventListener("mouseenter", function() {
            timeLine.style = stylesLine;
            timeNum.style = stylesNum;
            
            
        });
        timeNum.addEventListener("mouseleave", function() {
            timeLine.style = "unset";
            timeNum.style = "unset";
            
            
        
        });
}}


async function getData() {
    let response = await fetch(getUrl);

    return response.json();
    
}

async function retDb(lines, line, hour) {
    let ret = await getData();
    let day = ret[i];

    
    
    lines[line].value = day[hour];
    if (isOdd(line)) {
        console.log(lines[line]);
    }
    

    
  

    
}
function isOdd(num) { return num % 2;}



//function to insert date, hours and close button into #dayPanel, then display it
function dayPanelCreate(day, k) {
    dayPanel.innerHTML = "";
    dayPanel.innerHTML += "<p class='panelTitleText'>" +dayButtons[day].textContent+ ". " + k + "</p>";
    dayPanel.innerHTML += "<div id='panelClose'></div>";
    dayPanel.innerHTML += "<div id='hourLines'></div>";
    let hourLines = document.querySelector("#hourLines");
    console.log(day);
    let dayy = day;
    console.log(dayy);

    for (x = 8; x < 20; x++) {
        hourLines.innerHTML += "<div class='hourLinesText' style='max-width: 5vw'>" + x + ":⁰⁰</div>";
        hourLines.innerHTML += "<input type='text' class='hourLinesText' value='' style='max-width: 50vw';>";
    }

    let lines = document.querySelectorAll(".hourLinesText");
    let hour = 8;
    for (line = 1; line < lines.length; line +=2){
        
        if (isOdd(line)) {
            retDb(lines, line, hour);
            hour += 1;
        } else {
            continue;
        }

        
    }
    
    hoverTime();
    
    
    dayPanel.style.display = "grid";
    
    close(dayy);
    
}

function close(dayy) {
    console.log(dayy);
    let linesAfter = document.querySelectorAll(".hourLinesText");
    panelClose.addEventListener("click", function() {
        
        time = 8;
        for (line = 1; line < linesAfter.length; line +=2){
            
            if (isOdd(line)) {
                text = linesAfter[line].value;
                fetch(putUrl.format(dayy, time, text));
                time += 1;
            } else {
                continue;
            }
    
            
        }
        table[0].style.transform = "none";
        table[1].style.transform = "none";
        table[2].style.transform = "none";
        months[0].style.transform = "none";
        months[1].style.transform = "none";
        months[2].style.transform = "none";
        dayPanel.style.display = "none";
    });
}
//On click, move the month clicked on the right side, create 2/3vw wide #dayPanel
let opening = false;
let dayy = 0;
for (let day = 0; day < dayButtons.length; day++) {
    dayButtons[day].addEventListener("click", function() {
        let k = "";
        
        
        if ( day < 31 ) {
            k = "Január 2022";
            table[0].style.transform = "translate(200%, 0%)";
            table[2].style.transform = "translate(-200%, 0%)";
            months[0].style.transform = "translate(200%, 0%)";
            months[2].style.transform = "translate(-200%, 0%)";

            
            dayPanelCreate(day, k);
            
            
            
        } else if ( day > 30 && day < 59) {
            k = "Február 2022";
            table[1].style.transform = "translate(100%, 0%)";
            table[2].style.transform = "translate(-200%, 0%)";
            table[0].style.transform = "translate(100%, 0%)";
            months[1].style.transform = "translate(100%, 0%)";
            months[2].style.transform = "translate(-200%, 0%)";
            months[0].style.transform = "translate(100%, 0%)";
            dayPanelCreate(day, k);
            
            
            
        } else if (day > 58) {
            k = "Marec 2022";
            table[1].style.transform = "none";
            table[2].style.transform = "none";
            table[0].style.transform = "none";
            months[1].style.transform = "none";
            months[2].style.transform = "none";
            months[0].style.transform = "none";
            dayPanelCreate(day, k);
            
           
        };
    
        
        
    });
    
}
