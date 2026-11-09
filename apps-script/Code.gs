/**
 * OTTUNAR — Google Apps Script Web App (one endpoint, three tabs)
 *
 * HOW TO (RE)DEPLOY  — do this again whenever this file changes
 * 1. Open your spreadsheet → menu: Extensions → Apps Script
 * 2. Delete the old code, paste this whole file, Ctrl+S
 * 3. Deploy → Manage deployments → ✏ (edit) → Version: New version
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    (If you have no deployment yet: Deploy → New deployment → Web app)
 * 4. Authorise when asked — this version needs **Google Drive** access
 *    (it stores the uploaded driving licence and writes its link to the sheet).
 * 5. Keep using the SAME /exec URL you already have.
 *
 * Tabs used:  "Booking"  |  "Feedback"  |  "Driver"
 * The Driver tab's "licence" column contains a clickable Google Drive link.
 */

var TABS = {
  Booking: 'Booking',
  Feedback: 'Feedback',
  Driver: 'Driver'
};

var LICENCE_FOLDER = 'Ottunar Driver Licences';

/**
 * Columns each tab must have. Missing ones are appended automatically
 * (at the end, so existing rows keep their alignment).
 */
var REQUIRED_HEADERS = {
  Booking: ['transmission'],
  Feedback: [],
  Driver: []
};

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1) Upload the driving licence to Drive → replace with a viewable link.
    //    Must happen BEFORE the header row is built, so the base64 never
    //    ends up as a column in your sheet.
    if (data.licenceBase64) {
      data.licence = saveLicence_(
        data.licenceBase64,
        data.licenceName || 'licence',
        data.licenceMime || ''
      );
      delete data.licenceBase64;
      delete data.licenceMime;
    }

    var key = String(data.sheet || '').trim();
    var tabName = TABS[key];

    if (!tabName) {
      return json({ ok: false, error: 'Unknown sheet: ' + key });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);

    // First row of a new tab becomes the header.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(Object.keys(data).map(String));
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Ensure required columns exist — appended at the end so old rows
    // keep their alignment (they will simply show blank in new columns).
    var missing = (REQUIRED_HEADERS[tabName] || []).filter(function (h) {
      return headers.indexOf(h) === -1;
    });
    if (missing.length) {
      sheet
        .getRange(1, sheet.getLastColumn() + 1, 1, missing.length)
        .setValues([missing]);
      headers = headers.concat(missing);
    }

    var values = headers.map(function (h) {
      return toCell(data[h]);
    });

    sheet.appendRow(values);
    SpreadsheetApp.flush();

    return json({ ok: true, tab: tabName, licence: data.licence || '' });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, version: 2, message: 'Ottunar sheets endpoint is running (v2: Drive uploads).' });
}

/**
 * RUN THIS ONCE from the editor (select it ▷ Run) to grant Google Drive access.
 * Without it, uploaded licences cannot be saved and the Driver row will fail.
 */
function authorizeDrive() {
  DriveApp.getFoldersByName(LICENCE_FOLDER);
}

/** Saves the uploaded file to Google Drive and returns its link. */
function saveLicence_(base64, name, mime) {
  var folder = getFolder_(LICENCE_FOLDER);
  var bytes = Utilities.base64Decode(base64);
  var blob = Utilities.newBlob(bytes, mime || 'application/octet-stream', safeName_(name));
  var file = folder.createFile(blob);
  return file.getUrl();
}

function getFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function safeName_(name) {
  var clean = String(name).replace(/[\\/:*?"<>|]/g, '_').trim();
  return clean || 'licence';
}

function toCell(value) {
  if (value === undefined || value === null) return '';
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
