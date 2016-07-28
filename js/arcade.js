/* globals
---------------------------------------------------------------------*/
var numStudent = 0;
var hash = '';

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    // init 
    checkHash();
    updatePage();

    // event listeners
    $(window).bind('hashchange', function(e) {
        checkHash();
        updatePage();
    });

    $('.control__reload-game').click(updatePage);
});

/* functions
---------------------------------------------------------------------*/
function checkHash() {
    // match numStudent to the current page state
    if (location.hash === '')
        location.hash = '#0';
    hash = location.hash;
    numStudent = hash.substring(1);
}

function updatePage() {
    // update the DOM for the current student
    var currStudent = students[numStudent];
    var pathToGame = 'swf/' + currStudent.firstname + '-' + currStudent.lastname + '.swf';

    // game
    $('.game__alert')
        .width(currStudent.width)
        .height(currStudent.height)
        .show();
    $('#game').replaceWith("<object id='game' name='game' type='application/x-shockwave-flash' data='" + pathToGame + "' width='" + currStudent.width + "' height='" + currStudent.height + "'> < param name = 'movie' value = '" + pathToGame + "'/> <param name = 'quality' value = 'autohigh' / > </object>");
    $('.game__title').text(currStudent.firstname + ' ' + currStudent.lastname);
    watchSwf($('#game'));

    // links
    if (numStudent > 0)
        $('.control__prev-game').prop('href', '#' + (parseInt(numStudent) - 1));
    else
        $('.control__prev-game').prop('href', '#' + (parseInt(students.length) - 1));

    if (numStudent < students.length - 1)
        $('.control__next-game').prop('href', '#' + (parseInt(numStudent) + 1));
    else
        $('.control__next-game').prop('href', '#0');
    $('.control__reload-game').prop('href', '#' + parseInt(numStudent));

    // counter
    $('.control__counter').text(parseInt(numStudent) + '/' + parseInt(students.length));
}

function watchSwf($target) {
    // set the focus() once the $target loads
    var swfChecker = setInterval(function() {
        var $swf = $target;

        if ($swf[0]) {
            $swf.focus();
            $('.game__alert').fadeOut('500');
            clearInterval(swfChecker);
        }
    }, 250);
}
