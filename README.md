# SupportOpen Community Quilt

## What is a Community Quilt?
The **community quilt** is a method of gathering small snippets of feedback,
via free form text, from a community. Each contribution is added to the larger
whole forming the story. e.g. [Web We Want Quilt](http://mzl.la/webwewantremix),
[Support Open](http://mzl.la/supportopen-quilt), and
[MozCamp Asia 2012 Quilt](http://quilts.mozillacamp.org/2012/asia/).

**There are/can be multiple quilts/instances that each contributed to different
stories** that may/maynot overlap. The context is provided in the prompt to the
user + any supporting resources.

A community quilt consists of 3 main components:

1. The quilt itself – a collective view of all contributions.
2. A remixable contribution / prompt for input.
3. A response collection tool that can be used to generate metrics from responses.

Quilts are inclusive of all, so curation should be kept to a minimum.

## The SupportOpen Quilt
This is an implimentation of a community quilt, built ontop of the
[webmaker.org](https://webmaker.org) infrastructure to gather contributions, as
well as additional meta data via the [MakeAPI](https://github.com/mozilla/MakeAPI).
This is the same tool that is currently being used/iterated on for
<http://mzl.la/supportopen>, <http://mzl.la/millionmozillians>, and
<http://mzl.la/webwewantremix>.

Contributions come in the form of simple remixes to a [Thimble](https://thimble.webmaker.org)
make (webpage) that are given a specific tag, or tag combination, that can be
search for via the MakeAPI. These are then aggregated together and displayed as
a collection of Gravatars/Thumbnails alongside a rotating preview (iframe). See
<http://mzl.la/webwewantremix> for an example.

The only curation that occurs for this implimentation is the flagging of content
that violates the [webmaker.org terms of service](https://webmaker.org/terms). This
is a deliberate choice as it enforces the idea of being inclusive to all, and having
all contributions count towards the larger whole. Future versions of SupportOpen
may however allow the use of curated lists of makes using the
[MakeAPI list](https://github.com/mozilla/makeapi#get-api20130724listid) functionality.

### Metrics Gathering
Due to being implimented ontop the [webmaker.org](https://webmaker.org) infrastructure
there are a number of easy to gather metrics about a SupportOpen quilt. A seperate
tool as been created to get these metrics and can be found at
<https://github.com/fuzzyfox/supportopen-fetch>, along with information on what
metics can be gathered.

### Usage
The SupportOpen quilt is designed to have its gallery/quilt display on a single
page, while the metrics and makes are sperate. This is to allow you to use just
the pieces you want, though it should be noted that successful quilts utilize all
3 main components.

This usage section will focus on the gallery/quilt display and on the contents of
the starter template for people to remix.

#### Setup the gallery/quilt display
Installation w/ bower is the easiest method to easily get updates to the quilt.
Right now SupportOpen is not a registered bower component (deliberately) so you
should use the following to install:

	$ bower install fuzzyfox/supportopen

Still being early days, and only just having been bowerified there are quite a
few requirements for the quilt, this means that there are going to be a few
scripts to include in your page to keep the quilt happy. Work do reduce this is
going to be happening very soon.

Below is an example page with only the bare minimum included to get a quilt running.

```html

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
			<script src="./bower_components/jquery/dist/jquery.min.js"></script>
			<script src="./bower_components/masonry/dist/masonry.pkgd.min.js"></script>
			<script src="./bower_components/makeapi-client/src/make-api.js"></script>
			<script src="./bower_components/supportopen-quilt/dist/quilt.min.js"></script>

			<!-- finally we can init the quilt -->
			<script>Quilt();</script>
		</body>
	</html>

```

##### Configuration
The quilt has some builtin default options (seen below) which can be overridden
on initilization, or via page querystring.

```js

	var config = {
		// the combination of required tags needed to be a part of the quilt
		tags: [ 'supportopen', 'webwewant', 'millionmozillians' ],
		// only needed to set to "OR" search and make *any* of the tags above count
		execution: 'or',
		// the number of contributions to display (uses the most recent)
		limit: 100,
		// how long to display contributions for in the preview
		duration: 7000
	};

	Quilt( config );

```

#### Setup the remix prompt ("companion make")
The quilt only works when people are sharing tagged projects on webmaker.org that
we are looking for, however it works best when remixing a pre-made prompt. There
is an example of one of these that can be found in this repository (`make.html`).

	// more info to come soon

### Demo
<strike>[Generic quilt example](http://fuzzyfox.github.io/supportopen/quilt.html)
*– included in this repository* Displays makes with all known tags used for quilts.
Essentially the "sharing is caring" mode.</strike>

	// new demo on its way

### In the wild
#### Support Open
* [Starter Make](http://mzl.la/supportopen)
* [Support Open Quilt](http://mzl.la/supportopen-quilt)

#### Web We Want
* [Starter Make](https://mozilla.makes.org/thimble/the-web-we-want)
* [Web We Want Quilt](http://mzl.la/webwewantremix)

### Development
#### Install

	$ npm install && bower install

#### Play nice:

* remove trailing whitespace from files before save
* don't use non-ascii file names
* run grunt before commit (and make sure there are no errors)

Do all this w/ ease!

	mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
	echo "\n# run grunt before commit, abort if errors\ngrunt" >> .git/hooks/pre-commit
