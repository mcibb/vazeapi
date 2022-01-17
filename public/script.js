
/*
fetch('https://mcibb.github.io/vaze/activities.json')
  .then(res => res.json())
  .then(data => {
      console.log(JSON.stringify(data));
      let all = JSON.stringify(data);
      console.log(data["in"]);
    //json vaiable contains object with data
  })
*/

const url = 'https://vazeapi.herokuapp.com/all';



fetch(url)
    .then(response => response.json())
    .then(data => console.log(data));


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






//function to insert date, hours and close button into #dayPanel, then display it
function dayPanelCreate(i, k) {
    dayPanel.innerHTML = "";
    dayPanel.innerHTML += "<p class='panelTitleText'>" +dayButtons[i].textContent+ ". " + k + "</p>";
    dayPanel.innerHTML += "<div id='panelClose'></div>";
    dayPanel.innerHTML += "<div id='hourLines'></div>";
    let hourLines = document.querySelector("#hourLines");
    for (i = 8; i < 20; i++) {
        hourLines.innerHTML += "<div class='hourLinesText' style='max-width: 5vw'>" + i + ":⁰⁰</div>";
        hourLines.innerHTML += "<input type='text' class='hourLinesText' style='max-width: 50vw'; />";
        
        //div class='add'></div><div class='xt'></div>
   
    }    
    hoverTime();
    

    dayPanel.style.display = "grid";
    panelClose.addEventListener("click", function() {
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

for (let i = 0; i < dayButtons.length; i++) {
    dayButtons[i].addEventListener("click", function() {
        let k = "";
        
        if ( i < 31 ) {
            k = "Január 2022";
            table[0].style.transform = "translate(200%, 0%)";
            table[2].style.transform = "translate(-200%, 0%)";
            months[0].style.transform = "translate(200%, 0%)";
            months[2].style.transform = "translate(-200%, 0%)";
            dayPanelCreate(i, k);
            
            
            
        } else if ( i > 30 && i < 59) {
            k = "Február 2022";
            table[1].style.transform = "translate(100%, 0%)";
            table[2].style.transform = "translate(-200%, 0%)";
            table[0].style.transform = "translate(100%, 0%)";
            months[1].style.transform = "translate(100%, 0%)";
            months[2].style.transform = "translate(-200%, 0%)";
            months[0].style.transform = "translate(100%, 0%)";
            dayPanelCreate(i, k);
            
            
        } else if (i > 58) {
            k = "Marec 2022";
            table[1].style.transform = "none";
            table[2].style.transform = "none";
            table[0].style.transform = "none";
            months[1].style.transform = "none";
            months[2].style.transform = "none";
            months[0].style.transform = "none";
            dayPanelCreate(i, k);
           
        };
    
        
        
    });
    
}
