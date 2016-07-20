/* globals
---------------------------------------------------------------------*/
var students = [{
    "firstname": "Christian",
    "lastname": "Gimber",
    "gamename": "fast-walker",
    "width": "1000px",
    "height": "750px",
    "submitted": true
}, {
    "firstname": "Crash",
    "lastname": "Course",
    "gamename": "test-game-01",
    "width": "640px",
    "height": "480px",
    "submitted": true
}, {
    "firstname": "Joe",
    "lastname": "Bruin",
    "gamename": "test-game-02",
    "width": "640px",
    "height": "385px",
    "submitted": true
}];

var numStudent = 0;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    $('.control__next-game').click(function(event) {
        nextGame();
    });
});

/* functions
---------------------------------------------------------------------*/
function nextGame() {
    if (numStudent < students.length - 1)
        numStudent++;
    else
        numStudent = 0;

    var currStudent = students[numStudent];
    var pathToGame;

    if (currStudent.submitted)
        pathToGame = 'swf/' + currStudent.gamename + '.swf';
    else {
        // ideally we wouldn't include students with unsubmitted games
        pathToGame = 'swf/placeholder.swf';
    }
    $('#game').replaceWith("<object id='game' type='application/x-shockwave-flash' data='" + pathToGame + "' width='" + currStudent.width + "' height='" + currStudent.height + "'> < param name = 'movie' value = '" + pathToGame + "'/> <param name = 'quality' value = 'autohigh' / > </object>");

    console.log(currStudent.gamename);
}
