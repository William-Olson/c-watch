#!/usr/bin/env node
module.exports = (function (){
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
  **    makefile_dir: ''
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
// ============================================= //


  //******* gulp jobs *******
  gulp.task('make', make_task);
  gulp.task('run', ['make'], run_task);
  gulp.task('watch', watch_task);



  //******* gulp helpers *******  ------------------------------------------------------------------
  function watch_task() {
    // //DEBUG
    // console.info('-------------------------');
    // console.info('Options:');
    // console.dir(user_data);
    // console.info('-------------------------');
    gulp.watch(user_data.source_code, ['run']);
  }

  function make_task() {
    console.log('[c-watch] --- Build: #' + task_count);
    //TODO:
    //  1- test if makefile is present
    //  2- check if gcc args are given
    //  3- use makefile (if possible)
    //  4- use args (if possible)
    //  5- if(!makefile): filter files & use gcc

    //handle makefile build
    if(user_data.makefile){
      var build_output = '';
      build_output += shelljs.exec('cd ' + user_data.makefile_dir + ' && make').output;
      console.info(build_output);
      //console.log('[c-watch] done.');
    }else{
      console.error('[c-watch] ! ** Error: This early version of c-watch requires a Makefile');
    }

  }

  function run_task() {
    var run_output = '';
    console.log('[c-watch] --- Run:   #' + task_count);
    //TODO:
    //  1- test if outfile is set else use ./a.out
    //  2- check if params are given
    //  3- use makefile (if possible)
    if(user_data.params.exc === undefined){
      user_data.params.exc = 'a.out';
    }
    if(user_data.makefile_dir.indexOf('./') === -1)
      run_output += shelljs.exec('./' + user_data.makefile_dir + user_data.params.exc).output;
    else
      run_output += shelljs.exec(user_data.makefile_dir + user_data.params.exc).output;
    console.info(run_output + '\n');
    //console.log('[c-watch] done.');
    task_count++;
    //remove the old executable file
    shelljs.exec('echo "hello" > ' + user_data.makefile_dir + user_data.params.exc +
                 ' && ' + 'rm ' + user_data.makefile_dir + user_data.params.exc);
  }
  //------------------------------------------------------------------------------------------------

  //******* the exported object *******
  return {
    //set config options
    init: _init,
    enable: _enable
  };

}());
