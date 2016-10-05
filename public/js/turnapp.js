$(document).ready(function() {

  var date = getFullDate();

  index = 0;

  data = [];

  $('#date h4').text(date);
  console.log(date);

  $('#addRow').on('click', function() {
    index = index + 1;
    addRow(index);
    main();
  });

  $('#sortable').on('click', '.delete-button', function() {
    var id = $(this).data('id');
    deleteRow(id);
    main();
  });

  $('#sortable').on('click', '.reception-button', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $('#sortable').on('click', '.exit-button', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });

  $('#sortable').on('click', '.service-button', function(e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });

  main();
});

getFullDate = function() {
  var today = new Date();
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return days[today.getDay()] + ', ' + months[today.getMonth()] + " " + today.getDate() + ", " + today.getUTCFullYear();
}


function addRow(index) {
  var dataObject = {
    id: index,
    name: '',
    phoneNumber: '',
    recordNumber: '',
    reception: false,
    service: false,
    exit: false
  };
  data.push(dataObject);
}

function rowHtml(dataObject) {
  var html = "<tr><td><input type='text' id='row-" + dataObject.id + "-age' name='age' value=''></td><td><input type='text' id='row-" + dataObject.id + "-age' name='age' value=''></td><td><input type='text' id='row-" + dataObject.id + "-age' name='age' value=''></td><td class='th-center'><button id='reception" + dataObject.id + "button' class='reception-button' type='button' name='button'>Reception</button></td><td class='th-center'><button id='service" + dataObject.id + "button' type='button' class='service-button' name='button'>Service</button></td><td class='th-center'><button id='exit" + dataObject.id + "button' type='button' class='exit-button' name='button'>Exit</button><td><button id='exit" + dataObject.id + "button' data-id=" + dataObject.id + " class='delete-button' type='button' name='button'>Delete</button></td></tr>";
  return html;
}

function deleteRow(id) {
  var self = id;
  var index = data.findIndex(function(item) {
    return item.id === id;
  });
  data.splice(index, 1);
}

function main() {
  tableRowList = [];
  $('#sortable').html('');
  for (var i = 0; i < data.length; i++) {
    tableRowList.push(rowHtml(data[i]));
  }
  tableRowsHtml = tableRowList.join('');
  $('#sortable').html(tableRowsHtml);
}

$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

  $(function() {
     $( "#datepicker" ).datepicker();
   });

  $('button').on('click', function(){
    $(this).closest('id');
  });
