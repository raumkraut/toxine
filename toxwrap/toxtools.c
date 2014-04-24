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

//~ static int  linecnt = 0;
//~ static char nodes[MAXNODES][NODELEN];
//~ static uint16_t ports[MAXNODES];
//~ static uint8_t keys[MAXNODES][TOX_CLIENT_ID_SIZE];
//~ 
//~ static int nodelist_load(char *filename)
//~ {
    //~ if (!filename)
        //~ return 1;
//~ 
    //~ FILE *fp = fopen(filename, "r");
//~ 
    //~ if (fp == NULL)
        //~ return 1;
//~ 
    //~ char line[MAXLINE];
//~ 
    //~ while (fgets(line, sizeof(line), fp) && linecnt < MAXNODES) {
        //~ if (strlen(line) > MINLINE) {
            //~ char *name = strtok(line, " ");
            //~ char *port = strtok(NULL, " ");
            //~ char *key_ascii = strtok(NULL, " ");
//~ 
            //~ /* invalid line */
            //~ if (name == NULL || port == NULL || key_ascii == NULL)
                //~ continue;
//~ 
            //~ strncpy(nodes[linecnt], name, NODELEN);
            //~ nodes[linecnt][NODELEN - 1] = 0;
            //~ ports[linecnt] = htons(atoi(port));
            //~ DEBUG_PRINT("Found %s, %s\n", nodes[linecnt], keys[linecnt]);
            //~ uint8_t *key_binary = hex_string_to_bin(key_ascii);
            //~ memcpy(keys[linecnt], key_binary, TOX_CLIENT_ID_SIZE);
            //~ 
            //~ free(key_binary);
//~ 
            //~ linecnt++;
        //~ }
    //~ }
//~ 
    //~ if (linecnt < 1) {
        //~ fclose(fp);
        //~ return 2;
    //~ }
//~ 
    //~ fclose(fp);
    //~ return 0;
//~ }

/*
 * Hardcoding this for now till I can find what the bug is with emscripten that prevents me from
 * loading the DHTnodes file
 */

const int linecnt = 16;

static char nodes[][NODELEN] = {
    "192.254.75.98",
    "192.184.81.118",
    "107.161.21.13",
    "144.76.60.215",
    "23.226.230.47",
    "107.161.16.168",
    "37.187.46.132",
    "173.255.223.85",
    "66.175.223.88",
    "192.99.5.50",
    "192.210.149.121",
    "54.199.139.199",
    "69.42.220.58",
    "31.192.105.19",
    "66.74.15.98",
    "109.169.46.133" };

static uint16_t ports[] = {
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445,
    33445};

static uint8_t keys[][TOX_CLIENT_ID_SIZE] = {
    "FE3914F4616E227F29B2103450D6B55A836AD4BD23F97144E2C4ABE8D504FE1B",
    "5CD7EB176C19A2FD840406CD56177BB8E75587BB366F7BB3004B19E3EDC04143",
    "5848E6344856921AAF28DAB860C5816780FE0C8873AAC415C1B7FA7FAA4EF046",
    "04119E835DF3E78BACF0F84235B300546AF8B936F035185E2A8E9E0A67C8924F",
    "A09162D68618E742FFBCA1C2C70385E6679604B2D80EA6E84AD0996A1AC8A074",
    "22445AF3BD6EE975DCEB3CAC825F75342E3BC711CE7B146F028CDB085DE6554E",
    "C021232F9AC83914A45DFCF242129B216FED5ED34683F385D932A66BC9178270",
    "92E0CE88651FC89D54D6A3110FD08854ECD487613E69BFB1002380D35FD4F947",
    "B24E2FB924AE66D023FE1E42A2EE3B432010206F751A2FFD3E297383ACF1572E",
    "842863A0077FE27DF1E3F912A61692B90041030A661710EBFE9D1D503C4E7A54",
    "F404ABAA1C99A9D37D61AB54898F56793E1DEF8BD46B1038B9D822E8460FAB67",
    "7F9C31FE850E97CEFD4C4591DF93FC757C7C12549DDD55F8EEAECC34FE76C029",
    "9430A83211A7AD1C294711D069D587028CA0B4782FA43CB9B30008247A43C944",
    "D59F99384592DE4C8AB9D534D5197DB90F4755CC9E975ED0C565E18468A1445B",
    "20C797E098701A848B07D0384222416B0EFB60D08CECB925B860CAEAAB572067",
    "7F31BFC93B8E4016A902144D0B110C3EA97CB7D43F1C4D21BCAE998A7C838821"};

int init_connection_helper(Tox *m, int line)
{
    int ret = tox_bootstrap_from_address(m, nodes[line], TOX_ENABLE_IPV6_DEFAULT,
                                      ports[line], keys[line]);
    DEBUG_PRINT("Connecting to %s returned: %d\n", nodes[line], ret);
    return ret;
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
    int res = 0;
    DEBUG_PRINT("Init connection.\n");
    //~ if (linecnt > 0) /* already loaded nodelist */
        //~ return init_connection_helper(m, rand() % linecnt) ? 0 : 3;
//~ 
    //~ /* only once:
     //~ * - load the nodelist
     //~ * - connect to "everyone" inside
     //~ */
    //~ if (!srvlist_loaded) {
        srvlist_loaded = true;
        //~ int res = nodelist_load("/data/DHTnodes");
        //~ 
        //~ DEBUG_PRINT("DHTnodes file loaded.\n");
        if (linecnt < 1)
            return res;

        res = 3;
        int i;
        int n = MIN(NUM_INIT_NODES, linecnt);
        
        DEBUG_PRINT("Connecting to %d nodes.\n", n);

        for (i = 0; i < n; ++i) {
            if (init_connection_helper(m, rand() % linecnt))
                res = 0;
        }

        return res;
    //~ }

    /* empty nodelist file */
    return 4;
}
