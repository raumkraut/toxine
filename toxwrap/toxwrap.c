/* toxwrap.c
 * High-level javascript wrapper for toxlib
 * 
 * Camilo Polymeris, 2014
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 */

#define BOOTSTRAP_ADDRESS "23.226.230.47"
#define BOOTSTRAP_PORT 33445
#define BOOTSTRAP_KEY "A09162D68618E742FFBCA1C2C70385E6679604B2D80EA6E84AD0996A1AC8A074"

#define MY_NAME "ImoutoBot"

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <emscripten.h>
#include <tox.h>


Tox *tox;

void srandom(unsigned int seed)
{
    printf("srandom stub called\n");
}

int getsockopt(int sockfd, int level, int optname, void * optval, socklen_t * optlen)
{
    printf("getsockopt stub called\n");
    return 0;
}

void friend_request(Tox * tox, uint8_t * public_key, uint8_t * data, uint16_t length, void * userdata)
{
}

void friend_message(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
}

void name_change(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
}

void status_message(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
}

void update()
{
    tox_do(tox);
    printf("Updated\n");
}

void setup()
{
    tox = tox_new(0);
    if (!tox)
    {
        printf("Failed to allocate Messenger datastructure");
        exit(1);
    }
    
    tox_callback_friend_request(tox, friend_request, NULL);
    tox_callback_friend_message(tox, friend_message, NULL);
    tox_callback_name_change(tox, name_change, NULL);
    tox_callback_status_message(tox, status_message, NULL);
}

void cleanup()
{
    tox_kill(tox);
}


