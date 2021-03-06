# Empty Coop

Created and maintained by the team at Hatchd Digital, Perth. We use:

- [Gulp](http://gulpjs.com/)
- [SASS](http://sass-lang.com/)
- [jQuery](http://jquery.com/)
- [browserify](http://browserify.org/)

## Purpose

Empty-coop is a consistent base for all our projects at
[Hatchd](http://hatchd.com.au). It doesn't force the author to adjust to a
specific way of writing (although we have a house style at Hatchd); **It's a
starting point, not a framework.**

## Guidelines

[Visit our wiki](https://github.com/hatchddigital/empty-coop/wiki/) for
guidelines on using Empty-coop.

## Requirements

For development and to get the most out of this boilerplate we recommend
you install Node & npm and gulp.

Initial setup on a mac looks like:

```sh
brew install node
npm install --global gulp
```

This will install `node` with `npm` and `gulp` commenads globally,
ready for use with this project.

## Usage

We use gulp to manage our static builds. To start pull the repo then:

```sh
cd /path/to/empty-coop
npm install
```

This will allow you to run builds which will build all static requirements.

To run a local development server:

```sh
gulp watch
```

To do a production build:

```sh
gulp build
```

## Changelog (major changes)

- **0.16.0** Implemented js linting based on the air b'n'b styleguide and sass linting using sass-lint
- **0.15.0** Swapped out eggbox for svgstore and require for browserify and reworked the gulp file to make it much simpler
- **0.14.0** Removed support for grunt and bower, added gulp (requires eggbox 0.6.3 or higher)
- **0.12.0** Removed support for IE7 (requires eggbox 0.6.0 or higher)
