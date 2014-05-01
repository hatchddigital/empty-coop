# Empty Coop

Created and maintained by the team at Hatchd Digital, Perth
(see static/humans.txt). We use:

- [Grunt](http://gruntjs.com/)
- [SASS](http://sass-lang.com/)
- [jQuery](http://jquery.com/)
- [RequireJS](http://requirejs.org/)

Comes bundled with the [eggbox](https://github.com/hatchddigital/eggbox) icon set

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
you install Node & npm, Grunt and Bower. This allows you to manage and
build your code with simple command-line commands. This removes usage of
GUI software like CodeKit for any development needs. Basic toolchain setup
on a Mac looks like:

```sh
brew install node
npm install -g grunt-cli bower
```

This will install `node` with `npm` + `grunt` and `bower` commenads globally,
ready for use with this project. For more information see the
[node](http://nodejs.org/), [npm](http://npmjs.com.au),
[grunt](http://gruntjs.com/) and [bower](bower.io) projects.

## Usage

We use Grunt to manage our static builds. To start pull the repo then:

```sh
cd /path/to/empty-coop
npm install && bower install
grunt
```

This will allow you to run builds which will build all static requirements
(app-min.js and style.css). We will remove these files from the repository
in upcoming versions.
