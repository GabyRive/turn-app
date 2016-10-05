$(document).ready(function() {

    var date = getFullDate();

    $('#date h4').text(date);
    console.log(date);

    $(function() {
        $("#datepicker").datepicker();
    });

    var t = $('#smsTable').DataTable();
    var input = `<td><input type="text" name="record" class="form-control" aria-describedby="recordHelp" placeholder="Enter patient's record number."><small id="recordHelp" class="form-text text-muted">We'll never share the record number with anyone else.</small></td>`;
    var textarea = `<td><textarea class="form-control" name="smsBody" rows="2" cols="30" form="sms-form">{{msg}}</textarea></td>`;
    var button = `<td><button type="submit" class="btn btn-primary">Submit</button></td>`;

    $('#addRow').on( 'click', function () {
        t.row.add( [
          input,
          textarea,
          button
        ]).draw( );
        console.log("Adding row.");
    });

    // Automatically add a first row of data
    $('#addRow').click();
});

getFullDate = function() {
    var today = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return days[today.getDay()] + ', ' + months[today.getMonth()] + " " + today.getDate() + ", " + today.getUTCFullYear();
}

// Event Listener $('button#submit-1').on('click', inputData);
// var inputData = {
    //recordNumber: String,
    //smsBody: String,
//};

// inside the callback get the values of the inputs
// and then do an $.post url with JSON.stringify(input_object)
