# Slide-Show - an Image Carousel clone

Welcome to Slide-Show, an image carousel clone.


## How To Use

Include the stylesheet on your document's `<head>`.
```
<head>
  <link href="slide-show.css" rel="stylesheet">
</head>
```

Include the javascript file in your document's `<body>`, just before the closing tag.
```
<body>
	// other code here
  <script src="slide-show.min.js"></script>
</body>
```

 - Use the `slide-show` class attached to a div to activate the scroller object
	 - Include image elements inside the div to fill the scroller object
	 - The order the images are in will be the order they appear in the scroller object
 - Use `data-slide-show-delay='5000'` to set the time to show each image in ms, defaults to 5000ms
 - Use `data-slide-show-direction='right'` to set the direction the scroller rotates, can be `right` or `left`, defaults to `right`
 - Use `data-slide-show-fill='fill'` can be set to `'fill'`, which will fill each image to the size of whatever element is wrapping the .slide-show.  Otherwise, the images will be set to the height of the smallest image, and a margin will be left if the image is narrower than the .slide-show.


## Example:

```
<div class="slide-show" data-slide-show-fill="fill" data-slide-show-direction="right" data-slide-show-delay="5000" >
  <img src="img/desk.jpg" alt="slide show image" title="this is an image description" />
  <img src="img/smiling.jpg" alt="slide show image" title="this is a clickable link!" data-slide-show-link="index.html" />
</div>
```

[Live Demo](http://rextwedt.com/slide-show/)


## Custom Builds

Slide-Show is powered by gulp.js, so it's pretty easy to create a custom build. First you will need a copy of the Slide-Show project.  Next, you will need Gulp and all other dependencies:

```
$ cd path/to/slideShow/
$ npm install // you will need sudo if you are on a mac!
```


Run ```gulp``` to compile your custom builds.  You can customize the look of your image scroller using ```src/scss/_custom-variables.scss```.


There are three variables you can customize:
```
$scroller-bg-color: #808080;
$title-bg-color: #D1D1D1;
$btn-prefix: red;
```
```$scroller-bg-color``` describes the background color of the Slide-Show, behind the images.  ```$title-bg-color``` describes background color of the description text in the Slide-Show.  ```$btn-prefix``` can be used to allow custom buttons. This example will allow you to use custom buttons called 'red-left.png', 'red-right.png', 'red-play.png', 'red-pause.png', 'red-reverse.png'.


## Directory Structure

```
├── dist/
     └── img/
├── docs/
├── src/
		 ├── demo/
		      ├── img/
		      └── css/
     ├── img/
     ├── js/
     └── scss/
├── .gitignore
├── gulpfile.js
├── package.json
<<<<<<< HEAD
├── bower.json
=======
├── CHANGELOG.md
├── LICENSE.txt
>>>>>>> dev
└── README.md
```


## License

Slide-Show is licensed under the [MIT license](https://github.com/retwedt/slide-show/blob/master/LICENSE.txt).
