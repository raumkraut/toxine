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


#include <emscripten.h>
#include "toxtools.h"

#define WAITPERIOD 100 //ms
#define EXPORT_THIS EMSCRIPTEN_KEEPALIVE 


Tox * tox;
uint8_t * tox_data;
char    tmp_string[2000] = {0};
uint8_t tmp_client_id[TOX_FRIEND_ADDRESS_SIZE + 1] = {0};
uint8_t tmp_name[TOX_MAX_NAME_LENGTH + 1];
uint8_t tmp_status[TOX_MAX_STATUSMESSAGE_LENGTH + 1];
uint8_t tmp_message[TOX_MAX_MESSAGE_LENGTH + 1];

/***** STUBS */

void srandom(unsigned int seed)
{
    DEBUG_PRINT("srandom stub called\n");
}

int getsockopt(int sockfd, int level, int optname, void * optval, socklen_t * optlen)
{
    DEBUG_PRINT("getsockopt stub called\n");
    return 0;
}

/***** HELPERS */
/* Actual callback functions, invoke JS code */

void friend_request(Tox * tox, uint8_t * public_key, uint8_t * data, uint16_t length, void * userdata)
{
    EM_ASM(tox.contact_request('$0', '$1'), key, data);
    //int32_t tox_add_friend_norequest(tox, uint8_t *client_id);
}

void friend_message(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
    tox_get_client_id(tox, friend, tmp_client_id);
    EM_ASM(tox.contactMessage('$0', '$1'), tmp_client_id, string);
}

void name_change(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
    tox_get_client_id(tox, friend, tmp_client_id);
    EM_ASM(tox.contactNickChanged('$0', '$1'), tmp_client_id, string);
}

void status_message(Tox * tox, int friend, uint8_t * string, uint16_t length, void * userdata)
{
    tox_get_client_id(tox, friend, tmp_client_id);
    EM_ASM(tox.contactStatusMessage('$0', '$1'), tmp_client_id, string);
}

/***** EXPORTED FUNCTIONS */
/* These are CamelCase, because they map to JS */

EXPORT_THIS bool update()
{  
    bool ret = 1;
    ret &= tox_wait_prepare(tox, tox_data);
    DEBUG_PRINT("prep: %d\n", ret);
    ret &= (tox_wait_execute(tox_data, 0, WAITPERIOD * 1000) > 0);
    DEBUG_PRINT("exec: %d\n", ret);
    ret &= tox_wait_cleanup(tox, tox_data);
    DEBUG_PRINT("clean: %d\n", ret);
    tox_do(tox);
    ret &= tox_isconnected(tox);
    DEBUG_PRINT("conn: %d\n", ret);
    return ret;
}

EXPORT_THIS bool setup()
{
    tox = tox_new(0);
    if (!tox)
    {
        DEBUG_PRINT("Failed to allocate Messenger datastructure");
        return false;
    }
    
    tox_data = malloc(tox_wait_data_size());
    if (!tox_data)
        return false;
    
    tox_callback_friend_request(tox, friend_request, NULL);
    tox_callback_friend_message(tox, friend_message, NULL);
    tox_callback_name_change(tox, name_change, NULL);
    tox_callback_status_message(tox, status_message, NULL);
    return true;
}

EXPORT_THIS bool bootstrapFromList()
{
    return !init_connection(tox);
}

EXPORT_THIS bool bootstrap(char * address, int port, char * key)
{
    unsigned char * pub_key = hex_string_to_bin(key);
    int ret = tox_bootstrap_from_address(tox, address, TOX_ENABLE_IPV6_DEFAULT, htons(port), pub_key);
    free(pub_key);
    return ret;
}

EXPORT_THIS char * getId()
{
    tox_get_address(tox, tmp_client_id);
    fraddr_to_str(tmp_client_id, tmp_string);
    tmp_client_id[TOX_FRIEND_ADDRESS_SIZE] = 0;
    return tmp_string;
}

EXPORT_THIS void cleanup()
{
    tox_kill(tox);
}

EXPORT_THIS bool addContact(char * id, char * msg)
{
    return tox_add_friend(tox, id, msg, strlen(msg));
}

EXPORT_THIS bool removeContact(uint8_t * id)
{
    int32_t n = tox_get_friend_number(tox, id);
    return tox_del_friend(tox, n);
}

EXPORT_THIS bool sendMessage(char * id, char * msg)
{
    int32_t n = tox_get_friend_number(tox, id);
    return tox_send_message(tox, n, msg, strlen(msg));
}

EXPORT_THIS bool setName(char * name)
{
    return tox_set_name(tox, name, strlen(name)) == 0;
}

EXPORT_THIS char * getName()
{
    uint16_t n = tox_get_self_name(tox, tmp_name);
    tmp_name[n] = 0;
    return tmp_name;
}

/***** TODO *****
    
int tox_set_status_message(Tox *tox, uint8_t *status, uint16_t length);
int tox_set_user_status(Tox *tox, uint8_t userstatus);
int tox_get_status_message(Tox *tox, int32_t friendnumber, uint8_t *buf, uint32_t maxlen);
int tox_get_self_status_message(Tox *tox, uint8_t *buf, uint32_t maxlen);
uint8_t tox_get_user_status(Tox *tox, int32_t friendnumber);
uint8_t tox_get_self_user_status(Tox *tox);
uint64_t tox_get_last_online(Tox *tox, int32_t friendnumber);

uint32_t tox_count_friendlist(Tox *tox);
uint32_t tox_get_friendlist(Tox *tox, int32_t *out_list, uint32_t list_size);



uint32_t tox_size(Tox *tox);

void tox_save(Tox *tox, uint8_t *data);

int tox_load(Tox *tox, uint8_t *data, uint32_t length);

uint32_t tox_size_encrypted(Tox *tox);

int tox_save_encrypted(Tox *tox, uint8_t *data, uint8_t *key, uint16_t key_length);

int tox_load_encrypted(Tox *tox, uint8_t *data, uint32_t length, uint8_t *key, uint16_t key_length);
*/
