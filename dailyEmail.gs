//“Daily Email” - Sends out a daily email pulling the info of all rows for today and formats it to look ok.

function dailyEmail() {
   var ss= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Today&Week Master");
   var d = new Date(Date.now());
          var targetDate = d.toDateString();
          var data = ss.getDataRange().getValues();
          var numColumns = ss.getLastColumn();
          var emailBody = new Array();
          var selection=ss.getDataRange();
          var columns=selection.getNumColumns();
          var rows=selection.getNumRows();
          var column= 1;
          for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i][0]);
            date=date.toDateString();

            if (date == targetDate){
              var row= i + 1;
              var range=selection.getCell(row +1 , column);
              var cell=range.getValue();
              var col = 2;
              var getCel = selection.getCell(row +1, col);
              var cellToCollect = getCel.getValue();
              var bold = cellToCollect.toString();
              emailBody.push(new Array (cellToCollect+" ---------------------------------------------------------------------------------------------------------"));
              var space = "";
              emailBody.push(new Array(space));
              var x= 2;

                  if(cell==[]){
                    getCel = selection.getCell(row +1, col);
                    cellToCollect = getCel.getValue();

                    while(cell ==[]){
                    var bow= i + x;
                    var range=selection.getCell(bow, column);
                    var cell=range.getValue();
                    x++;
                      if (cell==[]){
                        for (var p = 1; p < 7; p++){
                        getCel = selection.getCell(bow , col + p);
                        cellToCollect = getCel.getValue();
                          if(cellToCollect !== ''){
                            emailBody.push(new Array(cellToCollect));
                          }
                        }
                       emailBody.push(new Array(space));
                     }
                   }
                 }
              var newLine= ",,";
              emailBody.push(new Array(newLine));
              }
              else{
              }
          }
 emailBody = emailBody.toString().split(",").join('\n');
  MailApp.sendEmail(/*'email@email.com, email@email.net'*/, 'Newslist for Today', emailBody);
}
