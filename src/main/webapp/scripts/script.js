$(document).ready(function()
{
    fetch('http://localhost:8080/schule')
        .then(result => result.json())
        .then(studentList => {
            studentList.map(student => {$('#testArea').append('<div><span>' + student.lastName + ", " + student.firstName + '</span></div>')});
        });
});

