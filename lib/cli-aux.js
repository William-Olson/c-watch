#!/usr/bin/env node
module.exports = (function (args) {
  'use strict';

  var options = { params: {} };
  var option_count = 0;
  var warns = 0;

  //let user know c-watch is running
  console.info('[c-watch] Starting C-Watch...');

  //handle arguments from console
  if(args.length > 2){
    for(var i = 2; i < args.length; i++){
      if(args[i][0] === '-' && args[i][1] === '-'){
        //handle long expressions
        var lhs = args[i].slice(2, args[i].indexOf('=')),
        rhs = args[i].slice(args[i].indexOf('=')+1, args[i].length);
        switch(lhs){
          case 'source':
            if(rhs.indexOf(',') === -1) {
              options.source_code = [rhs];
            } else{
              options.source_code = rhs.split(',');
              options.source_code.forEach(trim_each);
            }
            break;
          case 'gcc':
            options.params.gcc = rhs;
            break;
          case 'out':
            options.params.out = rhs;
            break;
          case 'params':
            options.params.params = rhs;
            break;
          case 'help':
            print_help();
            process.exit(0);
            break;
          default:
            format_error(args[i]);
        }
        option_count++;
      } else if(args[i][0] === '-'){
        //handle short expressions
        switch(args[i]){
          case '-s':
            if(args[i + 1].indexOf(',') === -1) {
              options.source_code = [args[i + 1]];
            } else{
              options.source_code = args[i + 1].split(',');
              options.source_code.forEach(trim_each);
            }
            break;
          case '-g':
            options.params.gcc = args[i + 1];
            break;
          case '-o':
            options.params.exc = args[i + 1];
            break;
          case '-p':
            options.params.args =  args[i + 1];
            break;
          case '-h':
            print_help();
            process.exit(0);
            break;
          default:
            format_error(args[i]);
        }
        option_count++;
        i++;
      } else {
        console.warn('\n[c-watch] ! ** Warning: ');
        console.warn('\tIgnoring invalid arguments: ' + args[i] + '\n');
        warns++;
      }
    }
  }


  function print_help() {
    console.info('\n\n Available options: ' +
                 '\n  -s, --source="..."        ex. -s "./*, ./src/*"  #comma delimitted ' +
                 '\n  -g, --gcc="..."      [!]  ex. -g "-O3 --Wall"    #space delimitted ' +
                 '\n  -o, --out="..."           ex. -o "foo.out" ' +
                 '\n  -p, --params="..."        ex. -p "inFile.txt 25"' +
                 '\n  -h, --help                displays this menu ' +
                 '\n\n    [!] = Unsupported at this time. \n\n\n'
                 );
  }

  function format_error(focus, opt_msg) {
    //print_help();
    throw new Error('\n[c-watch] ! ** Error: \n' +
                    '\tImproper option format: ' + focus + '\n' +
                    ((opt_msg) ? opt_msg : ''));
    
  }

  function trim_each (opt, n, opts) {
    opts[n] = opt.trim();
  }

  return {
    input: options,
    warnings: warns,
    opt_count: option_count
  };

});