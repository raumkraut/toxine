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

$(window).on('load', function()
{
    $('#connect-dialog-port').spinner();
    $('#connect-dialog').dialog(
    {
        width: '400px',
        resizable: false,
        buttons: { 'Connect': function() { $(this).dialog() } }
    });

    $('#chat-send').button({ icons: { primary:'ui-icon-comment' }, text: false });
    $('#chat-attach').button({ icons: { primary:'ui-icon-document' }, text: false });
});
