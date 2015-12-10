# TODO list

- Add a task to convert toml to json and push it into the build folder for scripts to use

- Add some way of converting markdown into 'content' that is processed using templates

- Add some way of generating an index of all the built files

- Add some way of generating a sitemap, search, etc.

## Notes

### markdown

How do we smartly split markdown and metadata which is bundled in a single file?

### index

We can use run_sequence and gulp-summary to parse the tree of generated files
after all the templates have been rendered, but then, obviously, they do not
include themselves or their own metadata.
