function settingsActivate() {
    if (document.getElementById("linksdivul").style.display == "initial") {
        document.getElementById("linksdivul").style.display = "none";
        document.getElementById("settingsMenu").style.display = "initial";

        document.getElementById("linksdiv").style.backgroundColor = "#3d3d3d";
        document.getElementById("settingsButtonP").innerHTML = "Stäng inställningar";
    }
    else {
        document.getElementById("settingsMenu").style.display = "none";
        document.getElementById("linksdivul").style.display = "initial";

        document.getElementById("linksdiv").style.backgroundColor = "#4c4c4c";
        document.getElementById("settingsButtonP").innerHTML = "Inställningar";
    }
}