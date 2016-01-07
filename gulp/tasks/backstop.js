import gulp from "gulp";
import * as config from "../config";

/*
 * Test for css changes using backstop
 */
gulp.task("css-test",function(callback){
    runBackstopTask("test");
});

/*
 * CSS has passed visual test so reset
 */
gulp.task("css-passed",function(callback){
    runBackstopTask("reference","CSS has been marked as 'passed' and screenshots have been reset.");
});

/*
 * Reset CSS test
 */
gulp.task("css-reset",function(callback){
    runBackstopTask("reference");
});

/*
 * Open the css test report
 */
gulp.task("css-openReport",function(callback){
    runBackstopTask("openReport");
});

/*
 * Run a task from the backstop gulpfile
 */
function runBackstopTask(task,log){

    //Use 'spawn' to execute shell command using Node
    var spawn = require("child_process").spawn;

    //the path to the backstop module install
    var path = "node_modules/backstopjs";

    //the task to tun
    var tasks = [task];

    //cd into the backstop dir
    process.chdir(path);

    //run the gulp task
    var child = spawn("gulp",tasks);

    //echo the output to the console
    if(log){
        console.log(log);
    }else{
        child.stdout.on("data",function(data){
            if(data){
                var data = data
                    .toString()
                    .replace("gulp test","gulp css-test")
                    .replace("gulp reference","gulp css-reset")
                    .replace("gulp openReport","gulp css-openReport")
                ;
                console.log(data);
            }
        });
    }

}

/*
 * The watch stuff
 */
export function watch() {
    //For compatibility; no actual watch as this is a production only build target
}