/**
 * Ucapan Selamat -> Google Sheet
 * Deploy sebagai Web App (Execute as: Me, Who has access: Anyone).
 * Lihat CARA-PASANG.md untuk langkah lengkap.
 */
const SHEET_NAME = 'Ucapan';

function doGet(e) {
  try {
    const p = (e && e.parameter) ? e.parameter : {};
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (p.action === 'save') {
      return saveUcapan(ss, p);
    }
    return listUcapan(ss);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveUcapan(ss, p) {
  let sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Waktu', 'Nama', 'Ucapan']);
  }
  sheet.appendRow([new Date(), p.nama || '', p.ucapan || '']);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function listUcapan(ss) {
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() <= 1) {
    return ContentService
      .createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
  const data = rows
    .filter(r => r[1] || r[2])
    .map(r => ({
      id: r[0] ? r[0].getTime() : Date.now(),
      nama: r[1] || '',
      ucapan: r[2] || '',
    }));
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
