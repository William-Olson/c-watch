## c-watch

A simple watcher program for C/C++ projects.  Automatically
runs make and executes the c program when src files are changed.

### Install

```
npm install -g c-watch
```

### Try

display help:

```
c-watch -h
```

this should output something like this:

```
 Available options:
  -s, --source="..."        ex. -s "./*, ./src/*"  #comma delimitted
  -g, --gcc="..."      [!]  ex. -g "-O3 --Wall"    #space delimitted
  -o, --out="..."           ex. -o "foo.out"
  -p, --params="..."        ex. -p "inFile.txt 25"
  -h, --help                displays this menu

    [!] = Unsupported at this time.

```

**run with defaults**:

```
c-watch
```

c-watch will look in the current directory for a Makefile and watches
any files with .c or .h extensions in the current directory. It tries
to run an executable named a.out.

### Common options

**Makefile**

If your makefile is in a different location than the current directory, then
you can explicitly provide it with the source flag (-s).

```
c-watch -s "some-dir/Makefile,src/*.c,src/*.h"
```

**Executable**

You will most likely want to specify where the executable is that your makefile built.
This can be done with the output flag (-o) indicating c-watch should run that file.

```
c-watch -o ./bin/a.out
```

**Parameters**

Pass some args to your c executable.

```
c-watch -p "input-file.txt 9000.1 0xFF -v ..etc."
```

**gotcha**: avoid using redirection for output in the param field.  You can redirect the whole
output with redirection outside of the param field.

```
#append output to output-file.txt
c-watch -p "input-file.txt" >> output-file.txt
```
