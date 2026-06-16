/**
 * RSVP -> Google Sheet
 * Tempel kode ini di Apps Script (Extensions > Apps Script) milik Spreadsheet RSVP.
 * Lihat CARA-PASANG.md untuk langkah lengkap.
 */
const SHEET_NAME = 'RSVP';

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Waktu', 'Nama', 'Kehadiran', 'Jumlah', 'Ucapan']);
    }
    const p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.nama || '',
      p.kehadiran || '',
      p.jumlah || '',
      p.pesan || '',
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
