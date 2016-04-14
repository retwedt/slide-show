// slide-show.js
// a scrolling image gallery clone


// DOM ELEMENTS
var scroller = document.querySelector(".scroller");
var imageList = scroller.querySelectorAll("img");
var minHeight = 10000;

// handle image elements
for (var i=0; i<imageList.length; i++ ) {
	// determine height of smallest image, all images will be set to this height
	if (imageList[i].height < minHeight) {
		minHeight = imageList[i].height;
	}
	// remove image from page
	scroller.removeChild(imageList[i]);
}
console.log(minHeight);

// create scroller elements and add to page
// image wrap
var imgWrap = document.createElement("div");
imgWrap.setAttribute("class", "img-wrap");
scroller.appendChild(imgWrap);
// right button
var scrollerRight = document.createElement("div");
scrollerRight.setAttribute("id", "scroller-right");
imgWrap.appendChild(scrollerRight);
// left button
var scrollerLeft = document.createElement("div");
scrollerLeft.setAttribute("id", "scroller-left");
imgWrap.appendChild(scrollerLeft);
// title
var scrollerTitle = document.createElement("p");
scrollerTitle.setAttribute("class", "scroller-title");
imgWrap.appendChild(scrollerTitle);
// timeline
var timelineWrap = document.createElement("div");
timelineWrap.setAttribute("class", "timeline-wrap");
imgWrap.appendChild(timelineWrap);
// big and small dot templates
var bigDot = document.createElement("div");
bigDot.setAttribute("class", "dot-big");
bigDot.innerHTML = '<div class="dot"></div>'; // shorthand of creating another element inside of the wrapper div
var smallDot = document.createElement("div");
smallDot.setAttribute("class", "dot-small");
smallDot.innerHTML = '<div class="dot"></div>'; // shorthand of creating another element inside of the wrapper div


// variables to store the currently selected image number in the group
var currentImageNum = 0;
var imgTime = new Date().getTime();
var delayTime = scroller.dataset.scrollerDelay || 2000; // default to 5s
var scrollerDirection = scroller.dataset.scrollerDirection || "right"; // default to right
var timelineMarkers = [];


// setup scroller
updateScroller("new");
// update scroller every 500ms
setInterval(function() {checkTime()}, 1000);


// scroller button events
scrollerRight.onclick = function() {
	updateScroller("right");
}
scrollerLeft.onclick = function() {
	updateScroller("left");
}


// FUNCTIONS
function updateScroller(direction) {
	clearScroller();
	// figure out direction of scroller
	// (is it being moved left/right or being created?)
	if (direction == "right") {
		if (currentImageNum == (imageList.length - 1)) {
			currentImageNum = 0;
		} else {
			currentImageNum++;
		}
	} else if (direction == "left") {
		if (currentImageNum == 0) {
			currentImageNum = (imageList.length - 1);
		} else {
			currentImageNum--;
		}
	} else if (direction != "new") {
		console.log("error!!");
	}
	// use poster info to update the modal box before showing it
	var newImg = imageList[currentImageNum].cloneNode(true);
	var oW = newImg.width;
	var oH = newImg.height;
	var nH = (oW/oH) * minHeight;
	newImg.style.height = minHeight + "px";
	newImg.style.width = "auto";
  newImg.classList.add('is-hidden');

	// set image wrap to correct dimensions 
	imgWrap.style.width = nH + "px";
	imgWrap.style.height = minHeight + "px";

	imgWrap.appendChild(newImg);
	setTimeout(function() {fadeIn(newImg)}, 500);
	scrollerTitle.textContent = currentImageNum + 1;
	// update timeline
	updateTimeline();
}
// function to clear scroller and timeline
function clearScroller() {
	// remove all children from the modalContent element
	var curImg = imgWrap.querySelector("img");
	if (curImg) {
		fadeOut(curImg);
	}

	// empty modalText element
	scrollerTitle.textContent = "";
}
// function to create timeline in scroller
function updateTimeline() {
	// remove any elements currently in the timeline
	while (timelineWrap.firstChild) {
    timelineWrap.removeChild(timelineWrap.firstChild);
	}
	// remove any elements in the timelineMarkers array
	timelineMarkers = [];
	// get current group length, this will be the number of markers (big dots)
	for (var i=0; i<imageList.length; i++) {
		var newBigDot = bigDot.cloneNode(true);
		timelineMarkers.push(newBigDot);
		timelineWrap.appendChild(newBigDot);
		if (i != (imageList.length-1)) {
			var smallDot1 = smallDot.cloneNode(true);
			var smallDot2 = smallDot.cloneNode(true);
			timelineWrap.appendChild(smallDot1);
			timelineWrap.appendChild(smallDot2);
		}
	}
	// calculate timelineWrap width and update element
	// dotWrap elements are 16px x 12px
	var timelineWidth = (16 * imageList.length) + (16 * (imageList.length-1) * 2);
	timelineWrap.style.width = timelineWidth + "px";
	// highlight the active timeline marker
	timelineMarkers[currentImageNum].querySelector(".dot").id = "highlight";
	// add click events to the timeline markers
	for (var j=0; j<timelineMarkers.length; j++) {
		timelineMarkers[j].querySelector(".dot").addEventListener("click", function() {
			// when a timeline marker is clicked, check if it is the current marker, 
			// then update the global current poster values and build a new modal
			var imgNum = timelineMarkers.indexOf(this.parentElement);
			console.log(currentImageNum + " : " + imgNum);
			if (currentImageNum != imgNum) {
				clearScroller();
				// update the previous timeline marker
				timelineMarkers[imgNum].querySelector(".dot").id = "highlight";
				currentImageNum = imgNum;
				updateScroller("new");
				// update the active timeline marker
				timelineMarkers[currentImageNum].querySelector(".dot").id = "";
				imgTime = new Date().getTime();
			}
		});
	}
}
function checkTime() {
	var time = new Date().getTime();
	if ((time - imgTime) >= delayTime) {
		imgTime = time;
		updateScroller(scrollerDirection);
	}
}





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
// fade in/fade out functions
// from http://www.chrisbuttery.com/articles/fade-in-fade-out-with-javascript/
function fadeOut(el){
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
    	// fade out image then remove it from dom
      el.style.display = 'none';
      el.classList.add('is-hidden');
      el.parentElement.removeChild(el);
    } else {
      requestAnimationFrame(fade);
    }
  })();
}
function fadeIn(el){
  if (el.classList.contains('is-hidden'))
    el.classList.remove('is-hidden');
  el.style.opacity = 0;
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimFrame(fade);
    }
  })();
}




