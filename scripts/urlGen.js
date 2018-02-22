var whereUrl = window.location.href
var testurlGen = 1
GroupId = "NA17D"

/*
if (window.location.href == "window.loacation.href" + "/" + GroupId) {

}
*/

//var stateObj = { foo: "bar" };
history.pushState(null,null , window.location.href + "/" + GroupId);