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
