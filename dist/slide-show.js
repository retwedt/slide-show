// slide-show.js
// a scrolling image gallery clone


// DOM ELEMENTS
// there can be multiple slide-shows on a page, so collect them in an array
var scroller = document.querySelector(".slide-show");


// get image list and set minimum scroller height
var imgList = scroller.querySelectorAll("img");

// create variables for scroller elements
var imgWrap, scrollerRight, scrollerLeft, scrollerTitle, scrollerLink, timelineWrap, bigDot, smallDot;

// variables to store the currently selected image number in the group
var curImgNum = 0;
var curTime = new Date().getTime();
var delayTime = scroller.dataset.slideShowDelay || 5000; // default to 5s
var scrollerDirection = scroller.dataset.slideShowDirection || "right"; // default to right
var timelineMarkers = [];
var minHeight;


// setup scroller
buildScroller();


// wait until image has loaded, then calculate minimum image height and set up scroller
imgList[0].onload = function() {
	var mH = 100000;
	// determine height of smallest image, all images will be set to this height
	for (var i=0; i<imgList.length; i++ ) {
		if (imgList[i].height < mH) {
			mH = imgList[i].height;
		}
		// remove image from page
		scroller.removeChild(imgList[i]);
	}
	if (scroller.clientHeight != 0) {
		console.log(scroller.clientHeight);
		minHeight = scroller.clientHeight;
	} else {
		console.log("no scroll dimensions set!");
		minHeight = mH;
	}

	// setup scroller
	clearScroller();
	  setTimeout(function() {
	  	updateScroller("new");
	  }, 500);
	// update scroller every 500ms
	setInterval(function() {
		checkTime()
	}, delayTime);
}


// bind events
window.onresize = function() {
	setImgDimensions(imgWrap.querySelector("img"));
}
scrollerRight.onclick = function() {
  // prevent update when clicked too quickly
  var newTime = new Date().getTime();
  if ((newTime - curTime) > 800) {
  	curTime = new Date().getTime();
		clearScroller();
	  setTimeout(function() {
	  	updateScroller("right");
	  }, 500);
  } else {
    console.log("clicking too quickly!");
  }
}
scrollerLeft.onclick = function() {
  // prevent update when clicked too quickly
  var newTime = new Date().getTime();
  if ((newTime - curTime) > 800) {
  	curTime = new Date().getTime();
		clearScroller();
	  setTimeout(function() {
	  	updateScroller("left");
	  }, 500);
  } else {
    console.log("clicking too quickly!");
  }
}


// FUNCTIONS
// create scroller elements and add to page
function buildScroller() {
	// image wrap
	imgWrap = document.createElement("div");
	imgWrap.setAttribute("class", "img-wrap");
	scroller.appendChild(imgWrap);
	// right button
	scrollerRight = document.createElement("div");
	scrollerRight.setAttribute("class", "slide-show-right");
	scroller.appendChild(scrollerRight);
	// left button
	scrollerLeft = document.createElement("div");
	scrollerLeft.setAttribute("class", "slide-show-left");
	scroller.appendChild(scrollerLeft);
	// title
	scrollerTitle = document.createElement("p");
	scrollerLink = document.createElement("a");
	// timeline
	timelineWrap = document.createElement("div");
	timelineWrap.setAttribute("class", "timeline-wrap");
	scroller.appendChild(timelineWrap);
	// big and small dot templates
	bigDot = document.createElement("div");
	bigDot.setAttribute("class", "dot-big");
	smallDot = document.createElement("div");
	smallDot.setAttribute("class", "dot-small");
}
// ** direction can be right, left, new, or timeline
function updateScroller(direction) {
	// figure out direction of scroller, update the current number appropriately
	if (direction == "new") {
		buildTimeline();
	}	else if (direction == "timeline") {
		updateTimeline(curImgNum);
	} else if (direction == "right") {
		if (curImgNum == (imgList.length - 1)) {
			curImgNum = 0;
		} else {
			curImgNum++;
		}
		updateTimeline(curImgNum);
	} else if (direction == "left") {
		if (curImgNum == 0) {
			curImgNum = (imgList.length - 1);
		} else {
			curImgNum--;
		}
		updateTimeline(curImgNum);
	} else {
		console.log("what direction is the scroller going?!!");
	}

  // create text element and add it to slide-show element
  var newTxt;
  if (imgList[curImgNum].dataset.slideShowLink != null) {
	  newTxt = scrollerLink.cloneNode(true);
	  newTxt.href = imgList[curImgNum].dataset.slideShowLink;
  } else {
	  newTxt = scrollerTitle.cloneNode(true);
  }
	newTxt.textContent = imgList[curImgNum].title;
  imgWrap.appendChild(newTxt);

	// create image element and add it to img-wrap
	var newImg = imgList[curImgNum].cloneNode(true);
	setImgDimensions(newImg); // set image dimensions

	// append image to image wrap
  imgWrap.appendChild(newImg);
  imgWrap.setAttribute("class", "img-wrap img-wrap-show");

	// update timeline
	updateTimeline(curImgNum);
}
// function to clear scroller and timeline
function clearScroller() {
	// hide image wrap
	imgWrap.setAttribute("class", "img-wrap img-wrap-hide");

	var curTxt = imgWrap.querySelector("p") || imgWrap.querySelector("a");
	var curImg = imgWrap.querySelector("img");
	if (curImg && curTxt) {
    setTimeout(function() {
      imgWrap.removeChild(curTxt);
      imgWrap.removeChild(curImg);
    }, 500);
	}
}
function setImgDimensions(img) {
	if (img) {
		var r = img.width / img.height;
		var nH = minHeight;
		var nW = r * nH;

		if (scroller.dataset.slideShowFill == "fill") {
			if (nW < scroller.offsetWidth) {
				nW = scroller.offsetWidth;
				nH = scroller.offsetWidth * (1/r);
			}
		}

		img.style.height = nH + "px";
		img.style.width = nW + "px";
		// set image wrap to correct height 
		imgWrap.style.height = minHeight + "px";

	} else {
		console.log("error no image!");
	}
}


function buildTimeline() {
	// get current group length, this will be the number of markers (big dots)
	tlLength = imgList.length;
	for (var i=0; i<tlLength; i++) {
		var newBigDot = bigDot.cloneNode(true);
		timelineMarkers.push(newBigDot);
		timelineWrap.appendChild(newBigDot);
		if (i != (tlLength-1)) {
			var smallDot1 = smallDot.cloneNode(true);
			var smallDot2 = smallDot.cloneNode(true);
			timelineWrap.appendChild(smallDot1);
			timelineWrap.appendChild(smallDot2);
		}
	}
	// calculate timelineWrap width and update element
	// dotWrap elements are 18px x 18px
	var timelineWidth = (20 * tlLength) + (20 * (tlLength-1) * 2);
	timelineWrap.style.width = timelineWidth + "px";
	// highlight the active timeline marker
	timelineMarkers[curImgNum].id = "highlight";
	// add click events to the timeline markers
	for (var j=0; j<timelineMarkers.length; j++) {
		timelineMarkers[j].addEventListener("click", function() {
			// check if the user is clicking too quickly on the timeline elements
		  var newTime = new Date().getTime();
		  if ((newTime - curTime) > 800) {
		  	curTime = new Date().getTime();
				// when a timeline marker is clicked, check if it is the current marker, 
				// then update the global current poster values and build a new modal
				var thisImgNum = timelineMarkers.indexOf(this);
				if (curImgNum != thisImgNum) {
					// update styling of previous poster timeline marker
					timelineMarkers[curImgNum].id = "";
					// update global current poster num
					curImgNum = thisImgNum;
					clearScroller();
				  setTimeout(function() {
				  	updateScroller("timeline");
				  }, 500);
					updateTimeline(curImgNum);
				}
		  } else {
		    console.log("clicking too quickly!");
		  }
		});
	}
}
function updateTimeline(imgNum) {
	// remove all highlights from the timeline
	for (var i=0; i<timelineMarkers.length; i++) {
		timelineMarkers[i].id = "";
	}
	// highlight the correct timeline marker for the current poster
	timelineMarkers[imgNum].id = "highlight";
}
function clearTimeline() {
	// remove any elements currently in the timeline
	while (timelineWrap.firstChild) {
    timelineWrap.removeChild(timelineWrap.firstChild);
	}
	// remove any elements in the timelineMarkers array
	timelineMarkers = [];
}


function checkTime() {
	var newTime = new Date().getTime();
	if ((newTime - curTime) >= delayTime) {
		curTime = newTime;
		clearScroller();
	  setTimeout(function() {
	  	updateScroller(scrollerDirection);
	  }, 500);
	}
}
