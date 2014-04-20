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
    printf("Update");
}

int main(int argc, const char * argv[])
{
    printf("Init tox\n");
    tox = tox_new(0);
    if (!tox)
    {
        printf("Failed to allocate Messenger datastructure");
        exit(1);
    }
    
    printf("Register callbacks\n");
    tox_callback_friend_request(tox, friend_request, NULL);
    tox_callback_friend_message(tox, friend_message, NULL);
    tox_callback_name_change(tox, name_change, NULL);
    tox_callback_status_message(tox, status_message, NULL);
    
    printf("Start main loop\n");
    emscripten_set_main_loop(update, 1, 1);
    
    tox_kill(tox);
    return 0;
}


