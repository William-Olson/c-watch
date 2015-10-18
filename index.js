#!/usr/bin/env node
(function (){
  'use strict';


 //handle and log arguments info -----------------------
  var cli_aux = require('./cli-aux');
  var options = cli_aux.input;
  if(cli_aux.opt_count === 0)
    console.info('[c-watch] Using default options');
  if(cli_aux.warnings > 0)
    console.warn('[c-watch] Proceeding with warnings!');


 //configure watcher -----------------------------------
  var watcher = require('./c-watch');
  if(cli_aux.opt_count > 0)
  	watcher.init(options);
  else
  	watcher.init({ params: {} });


 //start watching --------------------------------------
  watcher.enable();


}());