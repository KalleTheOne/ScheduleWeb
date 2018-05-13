var test = "Test not defined"

// Gradients: https://uigradients.com/#Forest

var GroupId, width, height, week, school, standardGroup;

var SchoolId = {name:"Hulebäcksgymnasiet", guid:"219254f7-917c-472e-ac23-6982156c6164"}
school = "hule"
GroupId = "NA17A"
standardGroup = document.cookie;
if (standardGroup != "") {
    GroupId = standardGroup;
}
document.getElementById("groupinp").value = GroupId.toUpperCase();

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

    document.getElementById("groupinp").value = GroupId
    genSchema()
}

function gotoCurrentWeek() {
    week = currentWeek()
    weekbox.value = week
    genSchema()
}

function setStandardgroup() {
    standardGroup = document.getElementById("standardGroupinp").value.toUpperCase();
    document.getElementById("standardGroupinp").value = standardGroup;
    document.cookie = standardGroup;
}

genSchema()

function genSchema() {
    //Uses stored image
    if (localStorage.getItem("image" + "," + + week + "," + GroupId + "," + innerHeight + "," + innerWidth) != null) {
        for (i = -5; i <= 10; i++) {
            if (localStorage.key(i) == "image" + "," + + week + "," + GroupId + "," + innerHeight + "," + innerWidth) {
                document.getElementById("schema").src = localStorage.getItem("image" + "," + + week + "," + GroupId + "," + innerHeight + "," + innerWidth);
            }
        }
    }
    else {
        document.getElementById("loading").style.display = "initial";

        //Requesting data --------
        var xhr = new XMLHttpRequest();
        var url = "https://cors-anywhere.herokuapp.com/https://web.skola24.se/timetable/timetable-viewer/data/render"

        if ("withCredentials" in xhr) { test = "With credentials"}

        xhr.open("POST", url, false);
        xhr.setRequestHeader("Content-type", "application/json");

        var data = JSON.stringify({
            "divWidth": Math.floor(innerWidth - 300),
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

        xhr.send(data);

        var json = JSON.parse(xhr.responseText);

        var imgData = json;

        //Creating a canvas
        var canvas = document.createElement('canvas');
        canvas.width = Math.floor(innerWidth - 300);
        canvas.height = Math.floor(innerHeight - 70);

        // Get the drawing context
        var ctx = canvas.getContext('2d');

        //Render image ---------
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
            
            if (type != 3) {
                ctx.fillStyle = "#000000"
                ctx.fillRect(x-1, y-1, width+1+1, height+1+1)
            }
            ctx.fillStyle = bcolor
            ctx.fillRect(x, y, width, height)
        }

        for (var i = 0; i < imgData.data.textList.length; i++) {
            var x, y, width, height, text, fontsize, fcolor;

            //Getting content from textlist, adding to variables.
            x = imgData.data.textList[i].x;
            y = imgData.data.textList[i].y;
            width = imgData.data.textList[i].width;
            height = imgData.data.textList[i].height;
            text = imgData.data.textList[i].text;
            fontsize = imgData.data.textList[i].fontsize;
            fcolor = imgData.data.textList[i].fcolor;
            id = imgData.data.textList[i].id;
            bold = imgData.data.textList[i].bold;

            //Adds content to canvas
            ctx.font = fontsize + "px Times new roman";
            ctx.textBaseline = "top";
            ctx.fillStyle = fcolor;
            ctx.fillText(text, x ,y);
        }

        //Transforming canvas to image (For caching)
        var dataURL = canvas.toDataURL();
        document.getElementById('schema').src = dataURL;

        if (week >= currentWeek() - 1 && week <= currentWeek() + 6 && GroupId == standardGroup) {
            localStorage.setItem("image" + "," + + week + "," + GroupId + "," + innerHeight + "," + innerWidth, dataURL);
        }
        document.getElementById("loading").style.display = "none";
    }
}
//Width/Height ratio: 0.77