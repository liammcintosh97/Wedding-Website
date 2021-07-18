// Get spreadsheet npm package
const { GoogleSpreadsheet } = require('google-spreadsheet');
// Ensure you've updated this file with your client secret
const clientSecret = require('./credentials.json');

// Add your Google sheet ID here
const googleSheetID = '1TEPGoMHWnOyXdRgMlKOEQ4eq0zP5ycBwLvAFOboXIxs';

// Instantiates the spreadsheet
const doc = new GoogleSpreadsheet(googleSheetID);

async function getSheet(){

  try {
    // Authenticate using the JSON file we set up earlier
    await doc.useServiceAccountAuth(clientSecret);
    await doc.loadInfo();

    return doc.sheetsByIndex[0];
  } catch(err) {
    console.log(err);
    return null;
  }
}

// Asynchronously get the data
async function getData() {
  console.log("Getting Sheet Data from : " + googleSheetID)

  const sheet = await getSheet();
  if(sheet === null) throw new Error("Unable to get Sheet")

  const tab = sheet.sheetsByIndex[0];
  console.log(tab.title);
}

async function addSubmission(submission){
  console.log("Adding submission to sheet : " + googleSheetID)

  const sheet = await getSheet(clientSecret,googleSheetID);
  if(sheet === null) throw new Error("Unable to get Sheet")

  await sheet.addRow({
    name: submission.name,
    phoneNumber: submission.phoneNumber,
    email: submission.email,
    message: submission.message,
    accommodation: submission.accommodation
  });
}

module.exports.getData = getData
module.exports.addSubmission = addSubmission