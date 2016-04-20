// main.js


// DOM ELEMENTS
var imgWrap = document.querySelector(".img-wrap");
var img = imgWrap.querySelector("img");
// set image wrap to the exact dimensions of the image
var h = img.height;
var w = img.width;
imgWrap.style.height = h + "px";
imgWrap.style.width = w + "px";
// remove the image template
imgWrap.removeChild(img);

var imgTime = new Date().getTime();


// // setup scroller
updateScroller();
imgWrap.onclick = function() {
  // prevent update when clicked too quickly
  var newTime = new Date().getTime();
  if ((newTime - imgTime) > 800) {
  	imgTime = new Date().getTime();
  	updateScroller();
  } else {
    console.log("clicking too quickly!");
  }
}


// FUNCTIONS
function updateScroller() {
  clearScroller();
  var newImg = img.cloneNode(true);
  newImg.setAttribute("class", "hide");
  imgWrap.appendChild(newImg);
  setTimeout(function() {
    newImg.setAttribute("class", "show");
  }, 800);
}
function clearScroller() {
	var curImg = imgWrap.querySelector("img");
	if (curImg) {
    curImg.setAttribute("class", "hide");
    setTimeout(function() {
      imgWrap.removeChild(curImg);
    }, 500);
	}
}
