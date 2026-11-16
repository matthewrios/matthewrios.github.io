// Pocket Puzzles log: receives feedback, error reports and results from the app
// and appends them to tabs in the Google Sheet this script is attached to.
// Setup: open the sheet > Extensions > Apps Script, paste this file, then
// Deploy > New deployment > Web app, Execute as: Me, Who has access: Anyone.
var COLUMNS = {
  Feedback: ['at', 'text', 'game', 'puzzle', 'where', 'v', 'w', 'h', 'ua', 'state', 'errors'],
  Errors:   ['at', 'kind', 'msg', 'game', 'puzzle', 'where', 'v', 'ua', 'stack'],
  Results:  ['at', 'game', 'puzzle', 'time', 'hints', 'v', 'ua']
};
function doPost(e) {
  var p = JSON.parse(e.postData.contents);
  var name = p.type === 'feedback' ? 'Feedback' : p.type === 'error' ? 'Errors' : 'Results';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  var cols = COLUMNS[name];
  if (sheet.getLastRow() === 0) sheet.appendRow(cols);
  sheet.appendRow(cols.map(function (c) { return p[c] === undefined ? '' : String(p[c]).slice(0, 45000); }));
  return ContentService.createTextOutput('ok');
}
function doGet() { return ContentService.createTextOutput('Pocket Puzzles log is running'); }
