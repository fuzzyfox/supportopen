# supportopen

## Usage
// content to come

## Demo
<http://fuzzyfox.github.io/supportopen/quilt>

## In the wild
### Support Open
* **Make:** <http://mzl.la/supportopen>
* **Quilt:** <http://mzl.la/supportopen-quilt>

### Web We Want
* **Make:** <https://mozilla.makes.org/thimble/the-web-we-want>
* **Quilt:** <http://mzl.la/webwewantremix>

## Development
Play nice:

* remove trailing whitespace from files before save
* don't use non-ascii file names
* run grunt before commit (and make sure there are no errors)

Do all this w/ ease!

	mv .git/hooks/pre-commit.sample .git/hooks/pre-commit
	echo "\n# run grunt before commit, abort if errors\ngrunt" >> .git/hooks/pre-commit
