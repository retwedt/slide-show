// main.js
// from http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/


// DOM ELEMENTS
var imgWrap = document.querySelector(".img-wrap");
var img = imgWrap.querySelector("img");
imgWrap.removeChild(img);

var imgTime = new Date().getTime();


// shim layer with setTimeout fallback
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


// // setup scroller
updateScroller();
document.onclick = function() {
	imgTime = new Date().getTime()
	updateScroller();
}


// FUNCTIONS
function updateScroller() {
	clearScroller();
	var newImg = img.cloneNode(true);
  newImg.classList.add('is-hidden');

	imgWrap.appendChild(newImg);
	setTimeout(function() {fadeIn(newImg)}, 500);
}
function clearScroller() {
	var curImg = imgWrap.querySelector("img");
	if (curImg) {
		fadeOut(curImg);
	}
}
function checkTime() {
	var time = new Date().getTime();
	if ((time - imgTime) >= 2000) {
		console.log("check");
		imgTime = time;
		updateScroller();
	}
}
function fadeOut(el){
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = 'none';
      el.classList.add('is-hidden');
      el.parentElement.removeChild(el);
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
function fadeIn(el){
  if (el.classList.contains('is-hidden')){
    el.classList.remove('is-hidden');
  }
  el.style.opacity = 0;

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimFrame(fade);
    }
  })();
}


