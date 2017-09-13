//“Delete Yesterday” - Delete yesterday from the sheet at midnight and then move all the pieces up and pull the 8th day in.

function deleteYesterday(){
      var s= SpreadsheetApp.getActiveSpreadsheet();
      var ss= s.getSheetByName("Today&Week Master");
      var rowsToDelete = [];

      var d = new Date(Date.now()-86400000);
      var targetDate = d.toDateString();


      var data = ss.getDataRange().getValues();
      var numColumns = ss.getLastColumn();
      var selection=ss.getDataRange();
      var columns=selection.getNumColumns();
      var rows=selection.getNumRows();
      var column= 1;

        for (var i = 0; i < data.length; i++) {
          var c = new Date(data[i][0]);
          c=c.toDateString();

          if (c == targetDate){
            var row= i + 1;
            var range=selection.getCell(row +1 , column);
            var cell=range.getValue();
            rowsToDelete.push(row);

            if(cell == []) {
              var x= 2;

              while (cell==[]){
                var bow= i + x;
                var range=selection.getCell(bow, column);
                var cell=range.getValue();
                x++;

                if(cell==[]){
                rowsToDelete.push(bow);
                }
              }
            }
          }
        }
  var numRowsDeleted = rowsToDelete.length + 1;
  ss.insertRowsAfter(400, numRowsDeleted);

  for (var k = rowsToDelete.length - 1; k >= 0; k--) {
    ss.deleteRow(rowsToDelete[k]);
   }
}
