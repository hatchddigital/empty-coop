# Empty Fork!

This is a fork of https://github.com/hatchddigital/empty-coop to experiment
which various technical possibilities without breaking the original repo.

## Requirements

For development and to get the most out of this boilerplate we recommend
you install Node & npm and gulp.

Initial setup on a mac looks like:

```sh
brew install node
npm install --global gulp
```

This will install `node` with `npm` and `gulp` commands globally,
ready for use with this project.

## Usage

We use gulp to manage our static builds. To start pull the repo then:

```sh
cd /path/to/empty-coop
npm run setup
```

This will allow you to run builds which will build all static requirements.

To run a local development server:

```sh
gulp watch
```

## Changelog (major changes)

- **0.0.1** FORKED from empty-coop and removed requirejs.
