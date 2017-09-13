//Archive - Archive Today at midnight and move it to yesterday and then pull up tomorrow.

function moveToArchive() {
  var ss= SpreadsheetApp.getActiveSpreadsheet();
  var d = new Date(Date.now()- 86400000);
  var targetDate = d.toDateString();
  var s = ss.getSheetByName("Production");
  var data = s.getDataRange().getValues();
  var numColumns = s.getLastColumn();
  var targetSheet = ss.getSheetByName("Archive");
  var selection=s.getDataRange();
  var columns=selection.getNumColumns();
  var rows=selection.getNumRows();
  var column= 1;
  var rowsToDelete = [];
  for (var i = 0; i < data.length; i++) {

    var date = new Date(data[i][0]);
    date=date.toDateString();

    if (date == targetDate){
      var row= i + 1;
      var range=selection.getCell(row +1 , column);
      var cell=range.getValue();
      var num = 1;
      targetSheet.insertRowsAfter(num, 1);
      num++;
      s.getRange(row, 1, 1, numColumns).moveTo(targetSheet.getRange("A"+ num));
      rowsToDelete.push(row);

      if(cell == []) {
        var x= 2;

        while (cell==[]){
          var bow= i + x;
          var range=selection.getCell(bow, column);
          var cell=range.getValue();
          x++;

          if(cell==[]){
            targetSheet.insertRowsAfter(num, 1);
            num++;
            s.getRange(bow, 1, 1, numColumns).moveTo(targetSheet.getRange("A"+ num));
            rowsToDelete.push(bow);
          }
        }
      }
    }
  }
  var numRowsDeleted = rowsToDelete.length + 1;

  for (var k = rowsToDelete.length - 1; k >= 0; k--) {
    s.deleteRow(rowsToDelete[k]);
  }
}
