## c-watch

[//]: # (Badges)
[![Build Status](https://travis-ci.org/William-Olson/c-watch.svg?branch=master)](https://travis-ci.org/William-Olson/c-watch)
[![Code Climate](https://codeclimate.com/github/William-Olson/c-watch/badges/gpa.svg)](https://codeclimate.com/github/William-Olson/c-watch)
[![Test Coverage](https://codeclimate.com/github/William-Olson/c-watch/badges/coverage.svg)](https://codeclimate.com/github/William-Olson/c-watch/coverage)

[//]: # (Description)
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
  -m, --make="..."          ex. -m "target"
  -h, --help                displays this menu

    [!] = Unsupported at this time.

```

**run with defaults**:

```
c-watch
```

c-watch will look in the current directory for a Makefile and watches
any files with .c, .cpp or .h extensions in the current directory. It tries
to run an executable named a.out.

### Common options

**Makefile**

If your makefile is in a different location than the current directory, then
you can explicitly provide it with the source flag (-s).

```
c-watch -s "some-dir/Makefile,src/*.c,src/*.h"
```

**Build**

Specify to only build a certain item in the makefile:

```
c-watch -s "some-dir/Makefile,src/*.c,src/*.h" --make="target_two"
```

The above will run `make target_two` instead of just `make` by itself.  Specify
multiple targets if you want (delimited by spaces).

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
