# Support Open Community Quilt
A user generated quilt of tagged makes.

## Install
Get w/ bower:

	$ bower install fuzzyfox/supportopen

Include in a page (minimum requirements example):

	<!doctype html>
	<html>
		<head>
			<meta charset="utf-8">
			<link rel="stylesheet" href="./bower_components/supportopen-quilt/dist/quilt.min.css">
		</head>
		<body>
			<div id="quiltContainer">
				<iframe src="http://pathto.example.com/companion_make.html" frameborder="0" id="makePreview" class="quilt-msnry"></iframe>
				<ul id="quiltMakes"></ul>
			</div>

			<!-- yeah... all these scripts (plan to reduce this) -->
			<script src="./bower_components/supportopen-quilt/asset/vendor/jquery/dist/jquery.min.js"></script>
			<script src="./bower_components/supportopen-quilt/asset/vendor/masonry/dist/masonry.pkgd.min.js"></script>
			<script src="./bower_components/supportopen-quilt/asset/vendor/makeapi-client/src/make-api.js"></script>
			<script src="./bower_components/supportopen-quilt/dist/quilt.min.js"></script>

			<!-- finally we can init the quilt -->
			<script>Quilt();</script>
		</body>
	</html>


## Usage
### Configuration
The quilt has some builtin default options (seen below) which can be overridden on initilization, or via page querystring.

	var config = {
		tags: [ 'supportopen', 'webwewant', 'millionmozillians' ],
		execution: 'or',
		limit: 100,
		duration: 7000
	};

	Quilt( config );

#### Configure by URL
* **Tags:** `tags=comma,separated,list,of,tags`
* **Execution:** `execution=or`
* **Limit:** `limit=100`
* **Duration:** `duration=7000`

**Example** showing how to fetch only 10 makes tagged `supportopen` **and** `mozfest`, and show each for 10 seconds.

	fuzzyfox.github.io/supportopen/quilt.html?tags=supportopen,mozfest&execution=and&limit=10&duration=10000


## Demo
<strike>[Generic quilt example](http://fuzzyfox.github.io/supportopen/quilt.html) *– included in this repository*

Displays makes with all known tags used for quilts. Essentially the "sharing is caring" mode.</strike>

	// new demo on its way

## In the wild
### Support Open
* [Starter Make](http://mzl.la/supportopen)
* [Support Open Quilt](http://mzl.la/supportopen-quilt)

### Web We Want
* [Starter Make](https://mozilla.makes.org/thimble/the-web-we-want)
* [Web We Want Quilt](http://mzl.la/webwewantremix)

## Development
### Install

	$ npm install && bower install

### Play nice:

* remove trailing whitespace from files before save
* don't use non-ascii file names
* run grunt before commit (and make sure there are no errors)

Do all this w/ ease!

	mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
	echo "\n# run grunt before commit, abort if errors\ngrunt" >> .git/hooks/pre-commit
