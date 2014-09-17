'use strict';

/* The actual configuration object used */
var config = {};

/* Set of registered task object */
var tasks = [];

/* Are we in debug mode? */
var debug = false;

/* Trace debug messages */
function trace(msg) {
  if (debug) {
    console.log(msg);
  }
}

/* Extension glue to use configure */
function extend(destination, source) {
  for (var property in source) {
    if (destination.hasOwnProperty(property)) {
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
}

/* Configure a set of grunt tasks */
function configure(source) {
  extend(config, source);
}

/* Register a deferred set of tasks */
function registerTask(name, subtasks, override, newname) {
  tasks.push({ name: name, tasks: subtasks, override: override, newname: newname });
}

/* Setup local configure variable and import packages, load tasks */
function initConfig(grunt) {

  // Import all grunt tasks from package.json
  require('matchdep').filterAll(['*-grunt', 'grunt-*']).forEach(function (x) {
    trace('Autoload module: ' + x);
    grunt.loadNpmTasks(x);
  });

  // Load the grunt configuration
  grunt.initConfig(config);

  // Register all the deferred tasks
  for (var i = 0; i < tasks.length; ++i) {
    var task = tasks[i];

    // Rename previous task if any
    if (task.override && task.newname) {
        trace('  Rename task: ' + task.override + ' -> ' + task.newname);
        grunt.task.renameTask(task.override, task.newname);
    }

    // Register this task
    trace('  Register task: ' + task.name + ' -> ' + task.tasks);
    grunt.registerTask(task.name, task.tasks);
  }
}

// API
module.exports = {
  configure: configure,
  registerTask: registerTask,
  initConfig: initConfig
};
