// Paste this into Google Apps Script (script.google.com)
// Replace SPREADSHEET_ID with your Google Sheet's ID (from its URL)
const SPREADSHEET_ID = '1e7ohCwhzn5V29syEBXQNKTYcWzGRlnv7_lYd11OtkmY';

function doPost(e) {
  try {
    const params = e.parameters;
    const formName = (params['form-name'] || [''])[0];
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet, row;

    if (formName === 'creator-signup') {
      sheet = ss.getSheetByName('Creators') || ss.insertSheet('Creators');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Location', 'Platform', 'Handle', 'Followers', 'Niche', 'About']);
      }
      row = [
        new Date().toLocaleString(),
        (params.name     || [''])[0],
        (params.email    || [''])[0],
        (params.phone    || [''])[0],
        (params.location || [''])[0],
        (params.platform || [''])[0],
        (params.handle   || [''])[0],
        (params.followers|| [''])[0],
        (params.niche    || [''])[0],
        (params.about    || [''])[0],
      ];

    } else if (formName === 'brand-inquiry') {
      sheet = ss.getSheetByName('Brands') || ss.insertSheet('Brands');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Timestamp', 'Name', 'Email', 'Company', 'Website', 'Platforms', 'Budget', 'Goals']);
      }
      row = [
        new Date().toLocaleString(),
        (params.name     || [''])[0],
        (params.email    || [''])[0],
        (params.company  || [''])[0],
        (params.website  || [''])[0],
        (params.platforms|| []).join(', '),   // checkbox — may have multiple values
        (params.budget   || [''])[0],
        (params.goals    || [''])[0],
      ];

    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'error', message: 'Unknown form' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
