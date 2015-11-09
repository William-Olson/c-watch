#!/usr/bin/env node

'use strict';
var shelljs = require('shelljs', {silent: true}),
    gulp = require('gulp'),
    aux = require('./c-watch-aux');

var user_data;
var task_count = 1;
/* user_data comes in the form of:
** -------------------------------
** {  source_code: [],
**    params: { gcc: '', exc: '', args: ''},
**    makefile: boolean,
**    makefile_dir: '',
**    get_exc_str: [function]
** }
*/


// ===============SETUP-DEFAULTS================ //
user_data = aux.get_defaults();
var _init = function (option_data){
  user_data = aux.set_options(option_data);
};
var _enable = function (){
   watch_task();
   make_task();
   run_task();
};
var _get_config = function (){ return user_data; };
// ============================================= //


//******* gulp jobs *******
gulp.task('make', make_task);
gulp.task('run', ['make'], run_task);
gulp.task('watch', watch_task);



//******* gulp helpers *******  ------------------------------------------------------------------
function watch_task() {
  gulp.watch(user_data.source_code, ['run']);
}

function make_task() {
  console.log('[c-watch] --- Build: #' + task_count);
  //TODO:
  //  1- check if gcc-args are given
  //  2- use args (if possible)
  //  3- determine whether or not to use gcc/g++
  // *4- if(!makefile): filter files & use compile

  //handle makefile build
  if(user_data.makefile){
    console.info(shelljs.exec('cd ' + user_data.makefile_dir + ' && make ' + user_data.params.mk_cmd).output);
    //console.log('[c-watch] done.');
  }else{
    console.error('[c-watch] ! ** Error: This early version of c-watch requires a Makefile');
    process.exit(1);
  }
}

function run_task() {
  //TODO: - figure out a way to handle stdin (no shelljs?)
  console.log('[c-watch] --- Run:   #' + task_count);
  console.info(shelljs.exec(user_data.get_exc_str()).output);
  //console.log('[c-watch] done.');
  task_count++;
}
//------------------------------------------------------------------------------------------------

//******* c-watch methods *******
module.exports = {
  init:   _init,
  enable: _enable,
  get_config: _get_config
};
