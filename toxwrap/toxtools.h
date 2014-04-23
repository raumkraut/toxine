#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <tox.h>
#include <stdbool.h>

#ifdef DEBUG
#define DEBUG_PRINT(...) fprintf( stderr, __VA_ARGS__ );
#else
#define DEBUG_PRINT(...) ;
#endif

void fraddr_to_str(uint8_t *id_bin, char *id_str);
uint8_t *hex_string_to_bin(char *hex_string);
int init_connection(Tox *m);
