/* globals
---------------------------------------------------------------------*/
var numStudent = 0;
var swfChecker;

/* document ready
---------------------------------------------------------------------*/
$(document).ready(function() {
    // for each student in students
    for (var i = 0; i < students.length; i++) {
        var divider = "";

        // check the current group
        if (i === 0 || students[i].group !== students[i-1].group)
            divider = ('<h3 class="students__divider"> group ' + students[i].group + '</h3>');

        // add a link to their game ID
        var fullName = students[i].firstname + ' ' + students[i].lastname;
        var link = ('<a class="students__link" href="/#' + i + '">' + fullName + '</a>');

        $('.students').append(divider, link);
    }
});