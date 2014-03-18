# Support Open Community Quilt
A user generated quilt of tagged makes.

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
[Generic quilt example](http://fuzzyfox.github.io/supportopen/quilt.html) *– included in this repository*

Displays makes with all known tags used for quilts. Essentially the "sharing is caring" mode.

## In the wild
### Support Open
* [Starter Make](http://mzl.la/supportopen)
* [Support Open Quilt](http://mzl.la/supportopen-quilt)

### Web We Want
* [Starter Make](https://mozilla.makes.org/thimble/the-web-we-want)
* [Web We Want Quilt](http://mzl.la/webwewantremix)

## Development
Play nice:

* remove trailing whitespace from files before save
* don't use non-ascii file names
* run grunt before commit (and make sure there are no errors)

Do all this w/ ease!

	mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
	echo "\n# run grunt before commit, abort if errors\ngrunt" >> .git/hooks/pre-commit
