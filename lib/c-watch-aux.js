#!/usr/bin/env node
module.exports = (function () {
  'use strict';
  var shelljs = require('shelljs');
  shelljs.config.silent = true;

  //data defaults
  function new_config (){
    return {
      source_code: [
            './*.c',
            './*.cpp',
            './*.h'
          ],
      params: {exc: 'a.out', args: ''},
      makefile: false,
      makefile_dir: '',
      get_exc_str: function () {
        return (this.makefile_dir + this.params.exc + ' ' + this.params.args);
      }
    };
  }
  var config = new_config();

  function check_for_makefile () {
    var dir = shelljs.exec('ls').output.split('\n');
    if(dir.indexOf('Makefile') !== -1){
      config.makefile = true;
      config.makefile_dir = './';
    }else{
      config.makefile = false;
    }
  }

  function check_for_custom_makfile() {
    var override = false, attempt = -1;
    for(var i = 0; i < config.source_code.length; i++){
      attempt = config.source_code[i].indexOf('Makefile');
      if(attempt !== -1){
        if (config.makefile === true) override = true;
        config.makefile = true;
        config.makefile_dir = config.source_code[i].slice(0, attempt);
      }
    }

    //log the end result of the makefile
    if(override)
      console.info('[c-watch] Using explicit makefile. (Override)');
    else if (!config.makefile)
      console.info('[c-watch] No makefile found, using gcc options instead');
    else if(config.makefile_dir === './')
      console.info('[c-watch] Using makefile in current directory.');
    else
      console.info('[c-watch] Using explicit makefile.');
  }


  var _get_defaults = function (){
    config = new_config();
    check_for_makefile();
    return config;
  };

  var _set_options = function (opt) {
    _get_defaults();
    config.source_code = opt.source_code || config.source_code;
    config.params.exc = opt.params.exc || config.params.exc;
    config.params.args = opt.params.args || config.params.args;
    check_for_custom_makfile();
    return config;
  };

  //the exported object
  return {
    get_defaults: _get_defaults,
    set_options: _set_options
  };
}());