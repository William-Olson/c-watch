#!/usr/bin/env node
module.exports = (function () {
  'use strict';

  var options = { params: {} };
  var option_count = 0;
  var warns = 0;

  //let user know c-watch is running
  console.info('[c-watch] Starting C-Watch...');

  //handle arguments from console
  if(process.argv.length > 2){
    for(var i = 2; i < process.argv.length; i++){
      if(process.argv[i][0] === '-' && process.argv[i][1] === '-'){
        //handle long expressions
        var lhs = process.argv[i].slice(2, process.argv[i].indexOf('=')),
        rhs = process.argv[i].slice(process.argv[i].indexOf('=')+1, process.argv[i].length);
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
            format_error(process.argv[i]);
        }
        option_count++;
      } else if(process.argv[i][0] === '-'){
        //handle short expressions
        switch(process.argv[i]){
          case '-s':
            if(process.argv[i + 1].indexOf(',') === -1) {
              options.source_code = [process.argv[i + 1]];
            } else{
              options.source_code = process.argv[i + 1].split(',');
              options.source_code.forEach(trim_each);
            }
            break;
          case '-g':
            options.params.gcc = process.argv[i + 1];
            break;
          case '-o':
            options.params.exc = process.argv[i + 1];
            break;
          case '-p':
            options.params.args =  process.argv[i + 1];
            break;
          case '-h':
            print_help();
            process.exit(0);
            break;
          default:
            console.error('\n[c-watch] ! ** Error: ');
            console.error('\tImproper option format: ', process.argv[i] + '\n');
            print_help();
            process.exit(1);
        }
        option_count++;
        i++;
      } else {
        console.warn('\n[c-watch] ! ** Warning: ');
        console.warn('\tIgnoring invalid arguments: ' + process.argv[i] + '\n');
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
    console.error('\n[c-watch] ! ** Error: ');
    console.error('\tImproper option format: ', focus + '\n');
    if(opt_msg) console.error(opt_msg);
    print_help();
    process.exit(1);
  }

  function trim_each (opt, n, opts) {
    opts[n] = opt.trim();
  }

  return {
    input: options,
    warnings: warns,
    opt_count: option_count
  };

  }());