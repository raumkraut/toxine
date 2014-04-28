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
#include <emscripten/bind.h>
#include <string>
#include <vector>
#include <cstdlib>
#include <cstdio>

extern "C"
{
    #include <tox.h>
}

#ifdef DEBUG
#define DEBUG_PRINT(...) fprintf( stderr, __VA_ARGS__ )
#else
#define DEBUG_PRINT(...) {}
#endif

/// Time to wait for something to happen at the tox socket.
#define WAITPERIOD 100 //ms

using std::string;
using std::vector;

/// Contains contact ("friend") information
struct Contact
{
    int     _fn;            ///< Used internally
    string id;              ///< Tox ID as hexadecimal string
    string name;            ///< Self-set display name
    string status_message;  ///< Status message text
    int     status;         ///< User status: 0: none, 1: away, 2: busy
    time_t  last_online;    ///< Timestamp of user last seen online. 0 if never seen.
};

/* Stuff used internally */
Tox  * tox = NULL;
uint8_t * tox_data = NULL;

/* temporary buffers to generate strings*/
uint8_t * tmp_data = NULL;
uint8_t tmp_id[TOX_CLIENT_ID_SIZE];
uint8_t tmp_name[TOX_MAX_NAME_LENGTH];
uint8_t tmp_status_message[TOX_MAX_STATUSMESSAGE_LENGTH];

/* list of Contacts, maybe a fn->Contact map would be better if these tend to be long */
vector<Contact> contacts;

/***** STUBS */

extern "C"
{
    void srandom(unsigned int seed)
    {
        /* Random is seeded in toxine.js (and by the browser, too, I hope) */
        DEBUG_PRINT("srandom stub called\n");
    }

    int getsockopt(int sockfd, int level, int optname, void * optval, socklen_t * optlen)
    {
        /* TODO write optval or figure out what this does in general */
        DEBUG_PRINT("getsockopt stub called\n");
        return 0;
    }
}

/***** HELPERS */

// Return index in contacts that has request _fn
// Again, maybe a map would be a better idea
int find_in_contacts(int fn)
{
    for (int i = 0; i < contacts.size(); i++)
        if (contacts[i]._fn == fn)
            return i;
    DEBUG_PRINT("Bad friend number %d\n", fn);
    return 0;
}

/// Return data hexadecimally encoded into hexstr
uint8_t * hexstr_to_data(string hexstr)
{
    int outlen = hexstr.length() / 2;
    if (tmp_data)
        delete[] tmp_data;
    tmp_data = new uint8_t[outlen];
    const char * cstr = hexstr.c_str();
    for(int i = 0; i < outlen; i++)
    {
        // Workaround for emscripten bug #2322
        unsigned int byte;
        if (sscanf(cstr, "%2x", &byte) < 1)
            DEBUG_PRINT("Bad hexstring: %s\n", cstr);
        tmp_data[i] = byte;
        cstr += 2 * sizeof(uint8_t);
    }
    return tmp_data;
}

/// Return id hexadecimally encoded into hexstr
uint8_t * hexstr_to_id(string hexstr)
{
    return hexstr_to_data(hexstr);
}

/// Return hexadecimal representation of the data passed in the parameter
string data_to_hexstr(const uint8_t * data, int inlen)
{
    char hexstr[2 * inlen];
    char * chex = hexstr;
    for (int i = 0; i < inlen; i++)
    {
        sprintf(chex, "%02X", data[i]);
        chex += 2 * sizeof(char);
    }
    return string(hexstr, 2 * inlen);
}

/// Return hexadecimal representation of the tox id (full address including nospam and checksum)
string id_to_hexstr(const uint8_t * id)
{
    return data_to_hexstr(id, TOX_FRIEND_ADDRESS_SIZE);
}

/* Actual callback functions, invoke JS code */

/// Signal contact changed
//  Javascript should implement tox.onProfileChanged(i)
//  i is an index into the Contacts list (not fn!)
void contact_changed(int i)
{
    EM_ASM(tox.onProfileChanged($0), i);
}

extern "C"
{
/// Signal a friend request received
//  TODO!
    void friend_request(Tox * tox, uint8_t * public_key, uint8_t * data, uint16_t length, void *)
    {
        EM_ASM(tox.onRequest('$0', '$1'), key, data);
        //int32_t tox_add_friend_norequest(tox, uint8_t *client_id);
    }

/// Signal a message received
//  Javascript should implement tox.onMessage(i, msg)
//  i is an index into the Contacts list, msg a string
    void friend_message(Tox * tox, int fn, uint8_t * msg, uint16_t length, void *)
    {
        int i = find_in_contacts(fn);
        DEBUG_PRINT("Message from friend %d: %s\n", i, string((char *)msg, length).c_str());
        EM_ASM(tox.onMessage($0, '$1'), i, string((char *)msg, length));
    }
    
// A contact changed name
    void name_change(Tox * tox, int fn, uint8_t * name, uint16_t length, void *)
    {
        int i = find_in_contacts(fn);
        contacts[i].name = string((char *)name, length);
        contact_changed(i);
    }

// A contact changed their status message
    void status_message(Tox * tox, int fn, uint8_t * msg, uint16_t length, void * d)
    {
        int i = find_in_contacts(fn);
        contacts[i].status_message = string((char *)msg, length);
        contact_changed(i);
    }
}

/***** EXPORTED FUNCTIONS */
/// Update tox.
//  Call at least a couple times per second, but no more often than every WAITPERIOD ms.
bool update()
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

/// Kill tox and delete buffers from heap.
void cleanup()
{
    tox_kill(tox);
    if (tmp_data)
        delete[] tmp_data;
}

/// Setup tox and install callbacks.
bool setup()
{
    if (tox)
        cleanup();
    
    // IPv6 doesn't seem to work. I get strange ws:// addresses
    // TODO check this
    tox = tox_new(0);
    if (!tox)
    {
        DEBUG_PRINT("Failed to allocate Messenger datastructure");
        return false;
    }
    
    tox_data = new uint8_t[tox_wait_data_size()];
    if (!tox_data)
        return false;
    
    tox_callback_friend_request(tox, friend_request, NULL);
    tox_callback_friend_message(tox, friend_message, NULL);
    tox_callback_name_change(tox, name_change, NULL);
    tox_callback_status_message(tox, status_message, NULL);
    return true;
}

/// Bootstrap from specified DHT node
bool bootstrap(const string & address, int port, const string & id)
{
    // IPv6 disabled, see comments in setup() above
    return tox_bootstrap_from_address(tox, address.c_str(), 0, htons(port), hexstr_to_id(id));
}

/// Send a contact request, with optional message
bool addContact(const string & id, const string & msg)
{
    /* tox-core isn't const-correct, ugly cast is necessary */
    uint8_t * cstr = (uint8_t *)msg.c_str();
    return tox_add_friend(tox, hexstr_to_id(id), cstr, msg.length());
}

/// Delete contact from list
bool removeContact(int i)
{
    return tox_del_friend(tox, contacts[i]._fn);
}

/// Send a message to contact
bool sendMessage(int i, const string & msg)
{
    /* tox-core isn't const-correct, ugly cast is necessary */
    uint8_t * cstr = (uint8_t *)msg.c_str();
    return tox_send_message(tox, contacts[i]._fn, cstr, msg.length());
}

/// Get the user's full Tox ID
string getId()
{
    tox_get_address(tox, tmp_id);
    return id_to_hexstr(tmp_id);
}

/// Set the user's name
bool setName(const string & name)
{
    /* tox-core isn't const-correct, ugly cast is necessary */
    return tox_set_name(tox, (uint8_t *)name.c_str(), name.length()) >= 0;
}

/// Returns the user's name
string getName()
{
    uint16_t n = tox_get_self_name(tox, tmp_name);
    return string((char *)tmp_name, n);
}

/// Set the user's status message
bool setStatusMessage(const string & msg)
{
    /* tox-core isn't const-correct, ugly cast is necessary */
    return tox_set_status_message(tox, (uint8_t *)msg.c_str(), msg.length()) >= 0;
}

/// Returns the user's status message
string getStatusMessage()
{
    int n = tox_get_self_status_message(tox, tmp_status_message, TOX_MAX_STATUSMESSAGE_LENGTH);
    if (n < 0)
    {
        DEBUG_PRINT("Error getting status message");
        return string();
    }
    return string((char *)tmp_status_message, n);
}

/// Sets or unsets the user's typing flag
//  This is fully client-handled
bool setTyping(int contact, bool typing)
{
    return tox_set_user_is_typing(tox, find_in_contacts(contact), typing) >= 0;
}

/// Set the user's status (one of 0: none, 1: away, 2: busy)
bool setStatus(int status)
{
    return tox_set_user_status(tox, status) >= 0;
}

/// Returns the user's status (one of 0: none, 1: away, 2: busy)
int getStatus()
{
    return tox_get_self_user_status(tox);
}

/// Changes the user's Tox ID NOSPAM value
void changeNospam()
{
    tox_set_nospam(tox, rand());
}

/// Returns a list of Contacts
// Contact-related functions take an index into this list as parameter
const vector<Contact> & getContacts()
{
    int n = tox_count_friendlist(tox);
    int * fn = new int[n];
    int n_copied = tox_get_friendlist(tox, fn, n);
    if (n_copied != n)
        DEBUG_PRINT("Couldn't get full friendlist");
    for (int i = 0; i < n_copied; i++)
    {
        int len;
        contacts[i]._fn = fn[i];
        if (tox_get_client_id(tox, fn[i], tmp_id) < 0)
            DEBUG_PRINT("Error getting client id for friend %d\n", fn[i]);
        contacts[i].id = id_to_hexstr(tmp_id);
            
        len = tox_get_name(tox, fn[i], tmp_name);
        if (len < 0)
            DEBUG_PRINT("Error getting name for friend %d\n", fn[i]);
        contacts[i].name = string((char *)tmp_name, len);
        
        len = tox_get_status_message(tox, fn[i], tmp_status_message, TOX_MAX_STATUSMESSAGE_LENGTH);
        if (len < 0)
            DEBUG_PRINT("Error getting status message for friend %d\n", fn[i]);
        contacts[i].status_message = string((char *)tmp_status_message, len);
        
        contacts[i].status = tox_get_user_status(tox, fn[i]);
        if (contacts[i].status < 0)
            DEBUG_PRINT("Error getting user status for friend %d\n", fn[i]);
            
        contacts[i].last_online = tox_get_last_online(tox, fn[i]);
        if (contacts[i].last_online == -1)
            DEBUG_PRINT("Error getting last online time for friend %d\n", fn[i]);
    }
    
    delete[] fn;
    return contacts;
}

/// Save tox data to a hexencoded string and return that
// If key is != "", encrypt it using that key.
// TODO: Binary option
string save(const string & key)
{
    int size;
    if (!key.empty())
        size = tox_size_encrypted(tox);
    else
        size = tox_size(tox);
    
    if (tmp_data)
        delete[] tmp_data;
    uint8_t * tmp_data = new uint8_t[size];
    
    if (!key.empty()) /* tox-core isn't const-correct, ugly cast is necessary */
        tox_save_encrypted(tox, tmp_data, (uint8_t *)key.c_str(), key.length());
    else
        tox_save(tox, tmp_data);
    
    string ret = data_to_hexstr(tmp_data, size);
    delete[] tmp_data;
    return ret;
}

/// Load tox data from datastr (hex-encoded)
// If key is != "", decrypt it using that key.
// TODO: Binary option
bool load(const string & datastr, const string & key)
{
    int ret;
    /* tox-core isn't const-correct, ugly cast is necessary */
    uint8_t * data = hexstr_to_data(datastr);
    if (!key.empty()) /* tox-core isn't const-correct, ugly cast is necessary */
        ret = tox_load_encrypted(tox, data, datastr.length() / 2, (uint8_t *)key.c_str(), key.length());
    else
        ret = tox_load(tox, data, datastr.length() / 2);
    
    return ret == 0;
}


// Create javascript bindings.
// We use the same camelCase function names as above.
using namespace emscripten;

EMSCRIPTEN_BINDINGS(tox)
{
    register_vector<Contact>("Contacts");
    value_object<Contact>("Contact")
        .field("id", &Contact::id)
        .field("name", &Contact::name)
        .field("status_message", &Contact::status_message)
        .field("status", &Contact::status)
        .field("last_online", &Contact::last_online);
    function("setup", &setup);
    function("cleanup", &cleanup);
    function("bootstrap", &bootstrap);
    function("update", &update);
    function("addContact", &addContact);
    function("removeContact", &removeContact);
    function("sendMessage", &sendMessage);
    function("getId", &getId);
    function("getName", &getName);
    function("setName", &setName);
    function("getStatusMessage", &getStatusMessage);
    function("setStatusMessage", &setStatusMessage);
    function("getStatus", &getStatus);
    function("setStatus", &setStatus);
    function("changeNospam", &changeNospam);
    function("getContacts", &getContacts);
    function("save", &save);
    function("load", &load);
}
