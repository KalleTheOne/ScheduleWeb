var testAssets = 9

//Error variable
var Error = 0

//Which week?

function currentWeek(){
  var d = new Date();
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}
document.title = "Huleschema v." + currentWeek();

function isANumber(str){
  return !/\D/.test(str);
}

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}