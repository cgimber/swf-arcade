/* globals
---------------------------------------------------------------------*/
var numStudent = 0;
var numPrev, numNext;
var hash = '';
var loadCheckInterval;

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
    numStudent = parseInt(hash.substring(1));
}

function updatePage() {
    // update the DOM for the current student
    var currStudent = students[numStudent];
    var fullName = currStudent.firstname + ' ' + currStudent.lastname;
    var pathToGame = 'swf/' + currStudent.firstname + '-' + currStudent.lastname + '.swf';
    var params = { quality: "autohigh" };
    var callback = function(e) {
        // only execute if SWFObject embed was successful
        if (!e.success || !e.ref) {
            $('.game__alert--loading').hide();
            $('.game__alert--error').show();
            return false;
        }

        var count = 0;

        // this timeout ensures we don't try to access PercentLoaded too soon
        var initialTimeout = setTimeout(function() {
            // ensure Flash Player's PercentLoaded method is available and returns a value
            if (typeof e.ref.PercentLoaded !== "undefined" && e.ref.PercentLoaded()) {
                // set up a timer to periodically check value of PercentLoaded
                loadCheckInterval = setInterval(function() {
                    if (e.ref.PercentLoaded() === 100) {
                        e.ref.focus();
                        $('.game__alert--loading').hide();
                        $('.game__alert--click').show();
                        $('.alert__container').fadeOut('1000');
                        clearInterval(loadCheckInterval);
                    } else {
                        // animate loading dots
                        count++;
                        var dots = new Array(count % 5).join('.');
                        $('.game__alert--loading').text("loading" + dots);
                    }
                }, 500);
            } else {
                $('.game__alert--loading').hide();
                $('.game__alert--click').show();
                $('.alert__container').fadeOut('1000');
                clearInterval(loadCheckInterval);
            }
        }, 200);
    };

    if (loadCheckInterval)
        clearInterval(loadCheckInterval);
    
    // game
    $('.alert__container').show();
    $('.game__alert')
        .width(currStudent.width)
        .height(currStudent.height)
        .show();
    $('.game__alert--loading').show();
    $('.game__alert--click').hide();
    $('.game__alert--error').hide();

    swfobject.embedSWF(pathToGame, 
                       "game", 
                       currStudent.width, 
                       currStudent.height, 
                       9, 
                       false, // express install
                       false, // flashvars 
                       params, 
                       false, // attributes 
                       callback);

    $('.game__title').text(fullName);

    // document
    document.title = 'swf-arcade - ' + fullName;

    // determine the index of the prev/next students
    if (numStudent > 0)
        numPrev = numStudent - 1;
    else numPrev = students.length - 1;

    if (numStudent < students.length - 1)
        numNext = numStudent + 1;
    else numNext = 0;

    // links
    $('.control__prev-game').prop('href', '#' + numPrev);
    $('.control__next-game').prop('href', '#' + numNext);

    // counter
    $('.control__counter').text(numStudent + '/' + students.length);
}
