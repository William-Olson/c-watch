#!/usr/bin/env node
module.exports = (function () {
  'use strict';
  var shelljs = require('shelljs');
  shelljs.config.silent = true;

  //data defaults
  var config = {
  	source_code: [
          './*.c',
          './*.cpp',
          './*.h'
        ],
  	params: {},
  	makefile: false,
  	makefile_dir: ''
  };

  function check_for_makefile () {
    var dir = shelljs.exec('ls').output.split('\n');
    if(dir.indexOf('Makefile') !== -1){
      config.makefile = true;
      config.makefile_dir = './';
      console.info('[c-watch] Using makefile in project directory');
    }else{
      config.makefile = false;
    }
  }

  function check_for_custom_makfile() {
    var found = false, attempt = -1;
    for(var i = 0; i < config.source_code.length; i++){
      attempt = config.source_code[i].indexOf('Makefile');
      if(attempt !== -1){
        config.makefile = true;
        config.makefile_dir = config.source_code[i].slice(0, attempt);
        found = true;
        console.info('[c-watch] Using custom makefile location: ' + config.makefile_dir);
      }
    }
    //TODO: could recursively check subdirectories for makefile here
    if(!found)
      console.info('[c-watch] No makefile found, using gcc options instead');
  }


  var _get_defaults = function (){
  	check_for_makefile();
  	return config;
  };

  var _set_options = function (opt) {
  	config.source_code = opt.source_code || config.source_code;
  	config.params = opt.params;
  	if(config.makefile === false) check_for_custom_makfile();
  	return config;
  };

  //the exported object
  return {
  	get_defaults: _get_defaults,
  	set_options: _set_options
  };
}());