var test
test = 4

var error = 0
var SchoolId, GroupId, day, pageWidth, week, pageHeight, nDay

function init() {

    SchoolId = "82710Y"
    GroupId = "NA17D"
    day = 1
    nDay = 1
    week = currentWeek()
    pageWidth = innerWidth
    pageHeight = Math.floor(innerWidth * 1.41)

    document.getElementById("schdiv").style.height = Math.floor(innerWidth * 1.41) + "px";


    
    makeUrl()
}

function makeUrl() {
    document.getElementById("schedule").style.backgroundImage = "url('http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=" + SchoolId + "/sv-se&type=-1&id=" + GroupId + "&period=&week=" + week + "&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day="+ day +"&width=" + pageWidth +"&height=" + pageHeight + "&maxwidth=" + pageWidth +"&maxheight=" + pageHeight + "')";
}

function updateSize(){
    Width = Math.floor(window.innerWidth)
    Height = Math.floor(window.innerHeight)
    printImage(makeUrl(week))
  }

function dayIncrease(value) {
     
    nDay = value + nDay

    if (nDay == 0) {
        day = 18
        week = week - 1
        nDay = 5
    }
    if (nDay == 1) {
        day = 1
    }
    if (nDay == 2) {
        day = 2
    }
    if (nDay == 3) {
        day = 4
    }
    if (nDay == 4) {
        day = 8
    }
    if (nDay == 5) {
        day = 16
    }
    if (nDay == 6) {
        day = 1
        week = week + 1
        nDay = 1
    }
    else {
        error = 1
    }

    makeUrl()
}