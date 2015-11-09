#include <stdio.h>
#include <string.h>


#define BUFFER_LEN 25
FILE* fileToRead;


void print_file (FILE* file_pointer) {
  char read_buffer[BUFFER_LEN];
  printf("[test2] Here is the content of file you passed in: \n");
  while (fscanf(file_pointer, "%s", read_buffer) != EOF) {
    printf("%s\n", read_buffer);
  }
  printf("[test2] Parameters are working! \n");
}


int main (int argc, char** argv) {

  //read file with filename passed from console
  if(argc == 2){
      fileToRead = fopen(argv[1], "r");
      if(fileToRead)
        print_file(fileToRead);
      else{
        fprintf(stderr, "[test2] Error: The file you passed in was not found: %s \n", argv[1]);
        fprintf(stderr, "[test2] Hint: restart c-watch and change the -p argument. \n");
      }
  } else
      fprintf(stderr, "[test2] Error: Too few arguments. \nPass a filename to read it\'s contents. \n");


  //close file if needed
  if(fileToRead)
    fclose(fileToRead);
}
