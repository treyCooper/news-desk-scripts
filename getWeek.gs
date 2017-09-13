//“Get Week” - combines all of the sheets by their dates and stacks it so it goes by date and desk.

function copyDataForWeek(){
      var ss= SpreadsheetApp.getActiveSpreadsheet();
      ss.getSheetByName("Today&Week Master").insertRowsAfter(400, 400);
      ss.getSheetByName("Today&Week Master").deleteRows(2,400);
      var desk = new Array(5);
      desk = ["News","News — West","Opinion", "Arts&Culture", "Features", "Sport"];
      for (var y = 0; y < 8; y++) {
        var d = new Date(Date.now()+86400000*y);
        var targetDate = d.toDateString();

        for (var t = 0; t < desk.length; t++) {

          var s = ss.getSheetByName(desk[t]);
          var data = s.getDataRange().getValues();
          var numColumns = s.getLastColumn();
          var targetSheet = ss.getSheetByName("Today&Week Master");
          var selection=s.getDataRange();
          var columns=selection.getNumColumns();
          var rows=selection.getNumRows();
          var column= 1;

          for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i][0]);
            date=date.toDateString();
            if (date == targetDate){
              var target = targetSheet.getRange(targetSheet.getLastRow() + 1, 1);
              var row= i + 1;
              var range=selection.getCell(row +1 , column);
              var cell=range.getValue();
              s.getRange(row, 1, 1, numColumns).copyTo(target);
              if(cell == []) {
                var x= 2;
                while (cell == []){
                  var target = targetSheet.getRange(targetSheet.getLastRow() + 1, 1);
                  var bow= i + x;
                  var range=selection.getCell(bow, column);
                  var cell=range.getValue();
                  x++;

                  if(cell ==[]){
                    s.getRange(bow, 1, 1, numColumns).copyTo(target);
                  }
                }
              }
              else{
                s.getRange(i + 1, 1, 1, numColumns).copyTo(target);
              }
            }
          }
        }
      }
}
