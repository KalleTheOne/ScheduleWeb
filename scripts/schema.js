var GroupId, width, height, week, school
var SchoolId = {name:"Hulebäcksgymnasiet", guid:"219254f7-917c-472e-ac23-6982156c6164"}
school = "hule"
GroupId = "NA17B"


week = currentWeek()
weekbox.value = week
if (week == currentWeek()) {
    document.getElementById("smartButton").innerHTML = "Detta är den nuvarande veckan"
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

function changeGroup() {
    GroupId = document.getElementById("groupinp").value.toUpperCase();

    if (GroupId == "NA17D" || GroupId == "NA16D" || GroupId == "NA15D" || GroupId == "NA18D" || GroupId == "NA19D") {
        //Tvär
        SchoolId.name = "Hulebäcksgymnasiet Na-tvär"
        SchoolId.guid = "3486fa73-d068-4593-88a2-c7155c2df138"
        school = "tvar"
    }
    else {
        //Resten
        SchoolId.name = "Hulebäcksgymnasiet"
        SchoolId.guid = "219254f7-917c-472e-ac23-6982156c6164"
        school = "hule"
    }

    document.cookie = GroupId

    document.getElementById("groupinp").value = GroupId
    genSchema()
}

function gotoCurrentWeek() {
    week = currentWeek()
    weekbox.value = week
    genSchema()
}

genSchema()

function genSchema() {
var xhr = new XMLHttpRequest();
var url = "https://web.skola24.se/timetable/timetable-viewer/data/render"
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-type", "application/json");

var data = JSON.stringify({
"divWidth": Math.floor(innerWidth - 315),
"divHeight": innerHeight,
"headerEnabled":false,
"selectedPeriod":null,
"selectedWeek": week,
"selectedTeacher":null,
"selectedGroup":null,
"selectedClass":null,
"selectedRoom":null,
"selectedStudent":null,
"selectedCourse":null,
"selectedSubject":null,
"selectedSchool": {"name":SchoolId.name,"guid":SchoolId.guid,"settings":{"activateViewer":true}},
"selectedSignatures":{"signature":GroupId},"domain":"harryda.skola24.se"});

document.getElementById("schema").width = Math.floor(innerWidth - 320);
document.getElementById("schema").height = innerHeight;

xhr.send(data);
var json = JSON.parse(xhr.responseText);
//var stringJSON = JSON.stringify(json)
//console.log(json);

var imgData = json
var c = document.getElementById("schema");
var ctx = c.getContext("2d");

for (var i = 0; i < imgData.data.boxList.length; i++) {
    var x, y, width, height, fcolor, bcolor;

    x = imgData.data.boxList[i].x;
    y = imgData.data.boxList[i].y;
    width = imgData.data.boxList[i].width;
    height = imgData.data.boxList[i].height;
    fcolor = imgData.data.boxList[i].fcolor;
    bcolor = imgData.data.boxList[i].bcolor;
    type = imgData.data.boxList[i].type;
    id = imgData.data.boxList[i].id;

    /*
    var gradient=ctx.createLinearGradient(0,0,170,0);
    gradient.addColorStop("0","magenta");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1.0","red");
    ctx.strokeStyle=gradient;
    */

    ctx.fillStyle = fcolor;
    ctx.fillStyle = bcolor;
    if (id != 2) {
    if (type != 3) {ctx.stroke()}
    ctx.rect(x, y, width, height);
    ctx.fillRect(x, y, width, height);
    ctx.lineWidth=1;
    }
}

// Om i är mindre än antalet datainlägg, i adderas då med 1 och koden utförs
    for (var i = 0; i < imgData.data.textList.length; i++) {
    //Förklara variablar med bild egenskaper
    var x, y, width, height, text, fontsize, fcolor;

    //Sparar data i variablarna
    x = imgData.data.textList[i].x;
    y = imgData.data.textList[i].y + 10;
    width = imgData.data.textList[i].width;
    height = imgData.data.textList[i].height;
    text = imgData.data.textList[i].text;
    fontsize = imgData.data.textList[i].fontsize;
    fcolor = imgData.data.textList[i].fcolor;
    id = imgData.data.textList[i].id;
    bold = imgData.data.textList[i].bold;

    if (school == "hule") {
        if (i == 54 || i == 55 || i == 56 || i == 57 || i == 58) {y += 8}
}
    if (school == "tvar") {
        if (i == 58 || i == 59 || i == 60 || i == 61 || i == 62) {y += 8}
}

    //Kod som genererar schema
    ctx.font = fontsize + "px Times new roman";
    ctx.fillStyle = fcolor;
    ctx.fillText(text, x ,y);
}
}
//Width/Height ratio: 0.77