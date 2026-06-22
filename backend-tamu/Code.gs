/**
 * Daftar Tamu Undangan — Google Apps Script
 * Pasang di Spreadsheet yang berisi sheet bernama "Tamu"
 * dengan kolom: A = ID, B = Nama Tamu
 */
const SHEET_NAME_TAMU = 'Tamu';

function doGet() {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME_TAMU);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: 'Sheet "Tamu" tidak ditemukan' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const data = sheet.getDataRange().getValues();
    const guests = {};

    for (let i = 1; i < data.length; i++) {
      const id   = String(data[i][0]).trim();
      const name = String(data[i][1]).trim();
      if (id && name) guests[id] = name;
    }

    return ContentService
      .createTextOutput(JSON.stringify(guests))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
