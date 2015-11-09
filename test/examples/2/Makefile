DBG=-O0
CMP=-c -Wall


all: test2
	@echo "Build Success! created executable: test2"

test2: test2.o
	g++ test2.o -o test2

test2.o: test2.cpp
	g++ $(CMP) -o test2.o test2.cpp


clean:
	rm -f test2 *.o

run: all
	@sh -c "./test2 foo.txt"
