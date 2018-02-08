var test, multitester
test = 4
multitester = test + test2

var GroupId, SchoolId, width, height, week


function init() {
    GroupId = null
    SchoolId = "82710&code=465788"
    document.getElementById("groupinp").value = GroupId

    width = Math.floor(document.getElementById("Schema").clientWidth + 5)
    height = window.innerHeight

    week = currentWeek()
    weekbox.value = week
    if (week == currentWeek()) {
        document.getElementById("smartButton").innerHTML = "Detta är den nuvarande veckan"
    }

    document.getElementsByTagName("TITLE")[0].text = "HuleSchema v." + week
    genSchema()
}

function genSchema() {
    document.getElementById("Schema").style.backgroundImage = "url('http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=" + SchoolId + "/sv-se&type=-1&id=" + GroupId + "&period=&week=" + week + "&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width=" + width + "&height=" + height + "&maxwidth=4000&maxheight=4000')"
}

function weekDiff(diff) {
    week += diff
    weekbox.value = week

    if (week == currentWeek()) {
        document.getElementById("smartButton").innerHTML = "Detta är den nuvarande veckan"
    }
    else {
        document.getElementById("smartButton").innerHTML = "Gå till den nuvarande veckan"
    }

    genSchema()
}
function gotoCurrentWeek() {
    week = currentWeek()
    weekbox.value = week
    genSchema()
}

function changeGroup() {
    var groupTest
    GroupId = document.getElementById("groupinp").value.toUpperCase();

    if (GroupId == "NA17D" || GroupId == "NA16D" || GroupId == "NA15D" || GroupId == "NA18D" || GroupId == "NA19D") {
        SchoolId = "82710Y"
        document.getElementById("newSchema").style.display = "none";
    }
    else {
        //SchoolId = "82710&code=465788"
        document.getElementById("newSchema").style.display = "inline";
        document.getElementById('newSchema').src = "https://web.skola24.se/timetable/timetable-viewer/harryda.skola24.se/Huleb%C3%A4cksgymnasiet/signatures/" + GroupId;
    }

    document.getElementById("groupinp").value = GroupId
    genSchema()
}

function detectResize() {
    width = Math.floor(document.getElementById("Schema").clientWidth + 5)
    height = window.innerHeight

    genSchema()
    return "Done";
}


// http://www.novasoftware.se/ImgGen/schedulegenerator.aspx?format=png&schoolid=82710Y/sv-se&type=-1&id=na17d&period=&week=3&mode=0&printer=0&colors=32&head=0&clock=0&foot=0&day=0&width=4000&height=4000&maxwidth=4000&maxheight=4000