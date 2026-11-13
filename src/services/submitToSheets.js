// Google Sheets endpoint (Google Apps Script Web app).
// Deploy steps: see apps-script/Code.gs — then paste your /exec URL below,
// or set VITE_SHEETS_WEB_APP_URL in a .env file.
const WEB_APP_URL =
  import.meta.env.VITE_SHEETS_WEB_APP_URL ||
  'https://script.google.com/macros/s/AKfycbxFnP91I1xPNLfQ1Ojv7IfIRRocaDd4nFk4Pg1wSoQgElnjKxBgC1HpY4NG3GuzCS1P/exec';

function isConfigured() {
  return Boolean(WEB_APP_URL) && WEB_APP_URL.includes('/exec');
}

async function postToSheet(sheet, data) {
  if (!isConfigured()) {
    console.warn(`[sheets] "${sheet}" not sent — Web App URL is not configured yet.`);
    return { skipped: true };
  }

  const response = await fetch(WEB_APP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      sheet,
      submittedAt: new Date().toISOString(),
      ...data,
    }),
  });
  return response;
}

export async function submitBookingRequest(data) {
  const driverRequiredValue =
    data.driverRequired === 'Other' && data.otherDuration
      ? `Other: ${data.otherDuration}`
      : data.driverRequired;

  const tripTypeValue = data.subTripType
    ? `${data.tripType} (${data.subTripType})`
    : data.tripType;

  return postToSheet('Booking', {
    hp_field: data.hp_field || '',
    date: new Date().toLocaleDateString('en-IN'),
    status: 'Pending',
    fullName: data.fullName || '',
    mobile: data.mobile || '',
    whatsapp: data.whatsapp || '',
    email: data.email || '',
    pickup: data.pickup || '',
    drop: data.drop || '',
    pickupDate: data.pickupDate || '',
    pickupTime: data.pickupTime || '',
    tripType: tripTypeValue,
    subTripType: data.subTripType || '',
    vehicleType: data.vehicleType || '',
    vehicleModel: data.vehicleModel || '',
    transmission: Array.isArray(data.transmission) ? data.transmission.join(', ') : (data.transmission || ''),
    driverRequired: driverRequiredValue || '',
    otherDuration: data.otherDuration || '',
    returnDate: data.returnDate || '',
    returnTime: data.returnTime || '',
    notes: data.notes || '',
  });
}

const MAX_LICENCE_BYTES = 5 * 1024 * 1024;

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function submitAgencyApplication(form) {
  const { licence, ...rest } = form;

  const payload = {
    ...rest,
    hp_field: form.hp_field || '',
    services: Array.isArray(rest.services) ? rest.services.join(', ') : rest.services,
    licence: '',
    licenceName: licence?.name || '',
    date: new Date().toLocaleDateString('en-IN'),
    status: 'Pending',
  };

  if (licence) {
    if (licence.size > MAX_LICENCE_BYTES) {
      console.warn('[sheets] Licence is larger than 5 MB — sending the file name only.');
    } else {
      payload.licenceBase64 = await fileToBase64(licence);
      payload.licenceMime = licence.type || 'application/octet-stream';
    }
  }

  return postToSheet('Driver', payload);
}

export async function submitFeedback(data) {
  return postToSheet('Feedback', {
    ...data,
    date: new Date().toLocaleDateString('en-IN'),
  });
}
