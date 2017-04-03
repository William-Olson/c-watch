const OPTS = [ '-s', '-g', '-o', '-p', '-m', '-h' ];
const LOPTS = [ '--source', '--gcc', '--out', '--params', '--make', '--help' ];

/*

 some helpers

*/
const rhsVal = str => {
  if (str.indexOf('=') === -1) {
    throw new Error(`Bad format for arg: ${str}`);
  }
  const res = str.slice(str.indexOf('=') + 1, str.length);
  if (!res || !res.length) {
    throw new Error(`Bad format for arg: ${str}`);
  }
  return res;
};

const printHelp = console.info(`
Available options:

  -s, --source="..."        ex. -s "./*, ./src/*"  #comma delimitted
  -g, --gcc="..."      [!]  ex. -g "-O3 --Wall"    #space delimitted
  -o, --out="..."           ex. -o "foo.out"
  -p, --params="..."        ex. -p "inFile.txt 25"
  -m, --make="..."          ex. -m "target"
  -h, --help                displays this menu

      [!] = Unsupported at this time.

`);

const warns = args => {
  let bad = 0;
  for (let i = 2; i < args.length; i++) {
    if (OPTS.find(o => o === args[i])) {
      i++;
      continue;
    }
    else if (LOPTS.find(o => args[i].includes(o))) {
      continue;
    }
    else {
      bad++;
      console.warn('\n[c-watch] ! ** Warning: ');
      console.warn('\tIgnoring invalid arguments: ' + args[i] + '\n');
    }
  }
  return bad;
};

const strToArr = (str, spacesOnly = null) => {
  if (!str) {
    return null;
  }

  return str.includes(',') && !spacesOnly ?
    str.split(',').map(sub => sub.trim()) :
    str.split(' ').map(sub => sub.trim());
};


/*

  the arg parser module

*/
module.exports = function(args)
{
  // grab arg values or nulls
  const s = (args.indexOf('-s') + 1) ? args[args.indexOf('-s') + 1] : (args.find(a => a.includes('--source')) ? rhsVal(args.find(a => a.includes('--source'))) : null);
  const g = (args.indexOf('-g') + 1) ? args[args.indexOf('-g') + 1] : (args.find(a => a.includes('--gcc')) ? rhsVal(args.find(a => a.includes('--gcc'))) : null);
  const o = (args.indexOf('-o') + 1) ? args[args.indexOf('-o') + 1] : (args.find(a => a.includes('--out')) ? rhsVal(args.find(a => a.includes('--out'))) : null);
  const p = (args.indexOf('-p') + 1) ? args[args.indexOf('-p') + 1] : (args.find(a => a.includes('--params')) ? rhsVal(args.find(a => a.includes('--params'))) : null);
  const m = (args.indexOf('-m') + 1) ? args[args.indexOf('-m') + 1] : (args.find(a => a.includes('--make')) ? rhsVal(args.find(a => a.includes('--make'))) : null);
  const h = (args.indexOf('-h') + 1) ? args[args.indexOf('-h') + 1] : (args.find(a => a.includes('--help')) ? rhsVal(args.find(a => a.includes('--help'))) : null);

  if (h) {
    printHelp();
    return { help: true };
  }

  return {
    input: {
      source_code: strToArr(s),
      params: {
        gcc: strToArr(g),
        out: o,
        params: strToArr(p),
        mk_cmd: strToArr(m)
      }
    },
    warnings: warns(args),
    opt_count: [ s, g, o, p, m ].filter(o => o).length,
    help: false
  };

};