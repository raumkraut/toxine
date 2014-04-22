/* toxine.js
 * 
 * Browser-based Tox instant messaging client.
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

const UPDATE_INTERVAL = 250; //milliseconds

var tox = null;

// JS detected!
$('#js-warning').hide();
$('#wrap').css('visibility', 'visible');

// Setup main entry points
$(window).on('load', setup);
$(window).on('beforeunload', cleanup);

try
{
    this['Module'] = Module;
    Module.test;
}
catch(e)
{
    this['Module'] = Module = {};
}

Module['preRun'] = Module['preRun'] || [];
Module['preRun'].push(createDevRandom);

function createDevRandom() 
{
    function randombyte()
    {
        var buf = new Int8Array(1);            
        window.crypto.getRandomValues(buf);
        return buf[0];
    }
        
    FS.init();
    var devFolder = FS.findObject('/dev') || Module['FS_createFolder']('/', 'dev', true, true);    
    Module['FS_createDevice'](devFolder, 'random', randombyte);
    Module['FS_createDevice'](devFolder, 'urandom', randombyte);    
}

function setup()
{  
    setupUI();
    setupTox();
    $('#loading').css('visibility', 'hidden');
}

function setupUI()
{
    $('#connect-dialog-port').spinner();
    $('#connect-dialog').dialog(
    {
        width: '400px',
        modal: true,
        resizable: false,
        autoOpen: true,
        buttons: { 'Connect': connectClicked }
    });
    
    $('#add-contact-dialog').dialog(
    {
        width: '400px',
        modal: true,
        resizable: false,
        autoOpen: false,
        buttons: { 'Ok': function() {  } }
    });
    
    $('#keys-dialog').dialog(
    {
        width: '400px',
        modal: true,
        resizable: false,
        autoOpen: false,
    });
    
    $('#keys-dialog-nospam').button({ icons: { secondary:'ui-icon-arrowrefresh-1-s' } });
    $('#keys-dialog-persistent-key').button();
    $('#keys-dialog-download-key').button({ icons: { primary:'ui-icon-arrowthick-1-s' } });
    $('#keys-dialog-clear-key').button({ icons: { secondary:'ui-icon-trash' } });

    $('#user-nick').editable();
    $('#user-statustext').editable();
    
    $('#sidebar-add-contact').button({ icons: { primary:'ui-icon-plus' }, text: false })
        .click(function () { $('#add-contact-dialog').dialog('open'); });
    $('#add-contact-button').click(function () { $('#add-contact-dialog').dialog('open'); });
    
    $('#sidebar-remove-contact').button({ icons: { primary:'ui-icon-minus' }, text: false });
    $('#sidebar-aliases').button({ icons: { primary:'ui-icon-tag' }, text: false });
    
    $('#sidebar-connection-settings').button({ icons: { primary:'ui-icon-locked' }, text: false })
        .click(function () { $('#connect-dialog').dialog('open'); });
    
    $('#sidebar-keys-dialog').button({ icons: { primary:'ui-icon-key' }, text: false })
        .click(function () { $('#keys-dialog').dialog('open'); });
    
    $('#chat-send').button({ icons: { primary:'ui-icon-comment' }, text: false });
    $('#chat-attach').button({ icons: { primary:'ui-icon-document' }, text: false });
}

function setupTox()
{
    tox = new Object();

    tox.setup =   Module.cwrap('setup',     'boolean');
    tox.update =  Module.cwrap('update',    'boolean');
    tox.connect = Module.cwrap('bootstrap', 'boolean', ['string', 'number', 'string']);
    tox.cleanup = Module.cwrap('cleanup'); 
    
    tox.getId = Module.cwrap('getId', 'string');

    tox.addContact =    Module.cwrap('addContact',    'boolean', ['string', 'string']);
    tox.removeContact = Module.cwrap('removeContact', 'boolean', ['string']);
    
    tox.sendMessage = Module.cwrap('sendMessage', 'boolean', ['string', 'string']);

    tox.setName = Module.cwrap('setName', 'boolean', ['string']);
    tox.getName = Module.cwrap('getName', 'string');
    
    tox.connected = false;
    tox.setup();
}

function connectClicked()
{
    var addr = $('#connect-dialog-address').val();
    var port = parseInt($('#connect-dialog-port').val());
    var key = $('#connect-dialog-key').val();
    try
    {
        if (!tox.connect(addr, port, key))
            throw 'tox.connect error';
    }
    catch (e)
    {
        console.log(e);
        $('#connect-dialog-address').addClass('.ui-state-error');
        return;
    }
    
    $('#connect-dialog-address').removeClass('.ui-state-error');
    $('#connect-dialog').dialog('close');
    setInterval(update, UPDATE_INTERVAL);
}

function cleanup()
{
    if (tox)
        tox.cleanup();
}

function update()
{
    tox.connected = tox.update();
}
