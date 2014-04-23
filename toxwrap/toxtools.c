 /*
 * Miscellaneous functions and data structures for doing random things.
 *
 *  Copyright (C) 2013 Tox project All Rights Reserved.
 *  Copyright (C) 2014 Toxic All Rights Reserved.
 *
 *  Tox is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Tox is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Tox.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

#include <string.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdint.h>

#include "toxtools.h"

#ifdef DEBUG
#include <assert.h>
#endif // DEBUG

#define MIN(x, y) (((x) < (y)) ? (x) : (y))
#define MAX(x, y) (((x) > (y)) ? (x) : (y))

// You are responsible for freeing the return value!
uint8_t *hex_string_to_bin(char *hex_string)
{
    // byte is represented by exactly 2 hex digits, so lenth of binary string
    // is half of that of the hex one. only hex string with even length
    // valid. the more proper implementation would be to check if strlen(hex_string)
    // is odd and return error code if it is. we assume strlen is even. if it's not
    // then the last byte just won't be written in 'ret'.
    size_t i, len = strlen(hex_string) / 2;
    uint8_t *ret = malloc(len);
    char *pos = hex_string;

    for (i = 0; i < len; ++i, pos += 2)
        sscanf(pos, "%2hhx", &ret[i]);

    return ret;
}

#define FRADDR_TOSTR_CHUNK_LEN 8
#define FRADDR_TOSTR_BUFSIZE (TOX_FRIEND_ADDRESS_SIZE * 2 + TOX_FRIEND_ADDRESS_SIZE / FRADDR_TOSTR_CHUNK_LEN + 1)

void fraddr_to_str(uint8_t *id_bin, char *id_str)
{
    uint32_t i, delta = 0, pos_extra, sum_extra = 0;

    for (i = 0; i < TOX_FRIEND_ADDRESS_SIZE; i++) {
        sprintf(&id_str[2 * i + delta], "%02hhX", id_bin[i]);

        if ((i + 1) == TOX_CLIENT_ID_SIZE)
            pos_extra = 2 * (i + 1) + delta;

        if (i >= TOX_CLIENT_ID_SIZE)
            sum_extra |= id_bin[i];

        if (!((i + 1) % FRADDR_TOSTR_CHUNK_LEN)) {
            id_str[2 * (i + 1) + delta] = ' ';
            delta++;
        }
    }

    id_str[2 * i + delta] = 0;

    if (!sum_extra)
        id_str[pos_extra] = 0;
}

#define MINLINE  50 /* IP: 7 + port: 5 + key: 38 + spaces: 2 = 70. ! (& e.g. tox.im = 6) */
#define MAXLINE  256 /* Approx max number of chars in a sever line (name + port + key) */
#define MAXNODES 50
#define NODELEN (MAXLINE - TOX_CLIENT_ID_SIZE - 7)

static int  linecnt = 0;
static char nodes[MAXNODES][NODELEN];
static uint16_t ports[MAXNODES];
static uint8_t keys[MAXNODES][TOX_CLIENT_ID_SIZE];

static int nodelist_load(char *filename)
{
    if (!filename)
        return 1;

    FILE *fp = fopen(filename, "r");

    if (fp == NULL)
        return 1;

    char line[MAXLINE];

    while (fgets(line, sizeof(line), fp) && linecnt < MAXNODES) {
        if (strlen(line) > MINLINE) {
            char *name = strtok(line, " ");
            char *port = strtok(NULL, " ");
            char *key_ascii = strtok(NULL, " ");

            /* invalid line */
            if (name == NULL || port == NULL || key_ascii == NULL)
                continue;

            strncpy(nodes[linecnt], name, NODELEN);
            nodes[linecnt][NODELEN - 1] = 0;
            ports[linecnt] = htons(atoi(port));
            DEBUG_PRINT("Found %s, %s\n", nodes[linecnt], keys[linecnt]);
            uint8_t *key_binary = hex_string_to_bin(key_ascii);
            memcpy(keys[linecnt], key_binary, TOX_CLIENT_ID_SIZE);
            
            free(key_binary);

            linecnt++;
        }
    }

    if (linecnt < 1) {
        fclose(fp);
        return 2;
    }

    fclose(fp);
    return 0;
}

int init_connection_helper(Tox *m, int line)
{
    return tox_bootstrap_from_address(m, nodes[line], TOX_ENABLE_IPV6_DEFAULT,
                                      ports[line], keys[line]);
}

/* Connects to a random DHT node listed in the DHTnodes file
 *
 * return codes:
 * 1: failed to open node file
 * 2: no line of sufficient length in node file
 * 3: failed to resolve name to IP
 * 4: nodelist file contains no acceptable line
 */
static bool srvlist_loaded = false;

#define NUM_INIT_NODES 5

int init_connection(Tox *m)
{
    if (linecnt > 0) /* already loaded nodelist */
        return init_connection_helper(m, rand() % linecnt) ? 0 : 3;

    /* only once:
     * - load the nodelist
     * - connect to "everyone" inside
     */
    if (!srvlist_loaded) {
        srvlist_loaded = true;
        int res = nodelist_load("/data/DHTnodes");

        if (linecnt < 1)
            return res;

        res = 3;
        int i;
        int n = MIN(NUM_INIT_NODES, linecnt);

        for (i = 0; i < n; ++i) {
            if (init_connection_helper(m, rand() % linecnt))
                res = 0;
        }

        return res;
    }

    /* empty nodelist file */
    return 4;
}
