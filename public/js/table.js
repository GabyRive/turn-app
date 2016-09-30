$(document).ready(function() {

    var date = getFullDate();

    $('#date h4').text(date);
    console.log(date);

    $(function() {
        $("#datepicker").datepicker();
    });
});

getFullDate = function() {
    var today = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[today.getDay()] + ', ' + months[today.getMonth()] + " " + today.getDate() + ", " + today.getUTCFullYear();
}
