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
#define STRING_MAX_LENGTH 2000

typedef uint8_t  Char;
typedef uint8_t  Short;
typedef uint8_t  Status;
typedef uint32_t Int;
typedef uint64_t Timestamp;

typedef struct
{
    Int     _fn;
    Short   id[TOX_FRIEND_ADDRESS_SIZE];
    Char    name[TOX_MAX_NAME_LENGTH + 1];
    Char    status_message[TOX_MAX_STATUSMESSAGE_LENGTH + 1];
    Status  status;
    Timestamp last_online;
} Contact;

Tox  * tox = NULL;
Char * tox_data = NULL;

Contact tmp_contact;
Contact * contacts = NULL;
Int contact_count = 0;

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

Int find_in_contacts(Int fn)
{
    for (Int i = 0; i < contact_count; i++)
        if (contacts[i]._fn == fn)
            return i;
    DEBUG_PRINT("Bad friend number %d\n", fn);
    return 0;
}

void contact_changed(Int i)
{
    EM_ASM(tox.onProfileChanged($0), i);
}

/* Actual callback functions, invoke JS code */

void friend_request(Tox * tox, Char * public_key, Char * data, uint16_t length, void * userdata)
{
    EM_ASM(tox.onRequest('$0', '$1'), key, data);
    //int32_t tox_add_friend_norequest(tox, Char *client_id);
}

void friend_message(Tox * tox, Int fn, Char * string, uint16_t length, void * d)
{
    Int i = find_in_contacts(fn);
    EM_ASM(tox.onMessage($0, '$1'), i, string);
}

void name_change(Tox * tox, Int fn, Char * string, Int length, void * d)
{
    Int i = find_in_contacts(fn);
    strncpy(contacts[i].name, string, length);
    contacts[i].name[length + 1] = 0;
    contact_changed(i);
}

void status_message(Tox * tox, Int fn, Char * string, Int length, void * d)
{
    Int i = find_in_contacts(fn);
    strncpy(contacts[i].status_message, string, length);
    contacts[i].status_message[length + 1] = 0;
    contact_changed(i);
}

/***** EXPORTED FUNCTIONS */

EXPORT_THIS bool update()
{  
    bool ret = true;
    ret &= tox_wait_prepare(tox, tox_data);
    if (!ret)
        DEBUG_PRINT("Tox wait prepare failed\n");
    ret &= (tox_wait_execute(tox_data, 0, WAITPERIOD * 1000) > 0);
    if (!ret)
        DEBUG_PRINT("Tox wait execute failed\n");
    ret &= tox_wait_cleanup(tox, tox_data);
    if (!ret)
        DEBUG_PRINT("Tox wait cleanup failed\n");
    tox_do(tox);
    ret &= tox_isconnected(tox);
    if (!ret)
        DEBUG_PRINT("Not connected\n");
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

EXPORT_THIS bool bootstrap(Char * address, int port, Short * id)
{
    return tox_bootstrap_from_address(tox, address, TOX_ENABLE_IPV6_DEFAULT, htons(port), id);
}

EXPORT_THIS void cleanup()
{
    tox_kill(tox);
    if (contacts)
        free(contacts);
    if (tox_data)
        free(tox_data);
}

EXPORT_THIS bool addContact(Short * id, Char * msg)
{
    return tox_add_friend(tox, id, msg, strlen(msg));
}

EXPORT_THIS bool removeContact(Int i)
{
    return tox_del_friend(tox, contacts[i]._fn);
}

EXPORT_THIS bool sendMessage(Int i, Char * msg)
{
    return tox_send_message(tox, contacts[i]._fn, msg, strlen(msg));
}

EXPORT_THIS bool setName(Char * name)
{
    return tox_set_name(tox, name, strlen(name)) >= 0;
}

EXPORT_THIS Char * getName()
{
    uint16_t n = tox_get_self_name(tox, &tmp_contact.name);
    tmp_contact.name[n] = 0;
    return &tmp_contact.name;
}

EXPORT_THIS bool setStatusMessage(Char * msg)
{
    return tox_set_status_message(tox, msg, strlen(msg)) >= 0;
}

/* none, away, busy */
EXPORT_THIS bool setStatus(int status)
{
    return tox_set_user_status(tox, status) >= 0;
}

EXPORT_THIS Char * getStatusMessage()
{
    int n = tox_get_self_status_message(tox, &tmp_contact.status_message, TOX_MAX_STATUSMESSAGE_LENGTH);
    if (n < 0)
    {
        DEBUG_PRINT("Error getting status message");
        return "";
    }
    tmp_contact.status_message[n] = 0;
    return tmp_contact.status_message;
}

EXPORT_THIS int getStatus()
{
    return tox_get_self_user_status(tox);
}

EXPORT_THIS Contact * getContacts()
{
    if (contacts)
    {
        free(contacts);
        contact_count = 0;
    }
    
    Int n = tox_count_friendlist(tox);
    contacts = malloc(n * sizeof(Contact));
    Int * fn = malloc(n * sizeof(Int));
    Int n_copied = tox_get_friendlist(tox, fn, n);
    if (n_copied != n)
        DEBUG_PRINT("Couldn't get full friendlist");
    for (Int i = 0; i < n_copied; i++)
    {
        int len;
        contacts[i]._fn = fn[i];
        if (tox_get_client_id(tox, fn[i], &contacts[i].id) < 0)
            DEBUG_PRINT("Error getting client id for friend %d\n", fn[i]);
            
        len = tox_get_name(tox, fn[i], &contacts[i].name);
        if (len < 0)
            DEBUG_PRINT("Error getting name for friend %d\n", fn[i]);
        contacts[i].name[len] = 0;
        
        len = tox_get_status_message(tox, fn[i], &contacts[i].status_message, TOX_MAX_STATUSMESSAGE_LENGTH);
        if (len < 0)
            DEBUG_PRINT("Error getting status message for friend %d\n", fn[i]);
        contacts[i].status_message[len] = 0;
        
        contacts[i].status = tox_get_status(tox, fn[i]);
        if (contacts[i].status < 0)
            DEBUG_PRINT("Error getting user status for friend %d\n", fn[i]);
            
        contacts[i].last_online = tox_get_last_online(tox, fn[i]);
        if (contacts[i].last_online == -1)
            DEBUG_PRINT("Error getting last online time for friend %d\n", fn[i]);
    }
    
    return contacts;
}

/* TODO
uint32_t tox_size(Tox *tox);

void tox_save(Tox *tox, Char *data);

int tox_load(Tox *tox, Char *data, uint32_t length);

uint32_t tox_size_encrypted(Tox *tox);

int tox_save_encrypted(Tox *tox, Char *data, Char *key, uint16_t key_length);

int tox_load_encrypted(Tox *tox, Char *data, uint32_t length, Char *key, uint16_t key_length);
*/
