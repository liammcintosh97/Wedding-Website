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
    if(process.env.NODE_ENV === 'development') console.log(err);
    return null;
  }
}

// Asynchronously get the data
async function getData() {
  if(process.env.NODE_ENV === 'development') console.log("Getting Sheet Data from : " + googleSheetID)

  const sheet = await getSheet();
  if(sheet === null) throw new Error("Unable to get Sheet")

  const tab = sheet.sheetsByIndex[0];
  if(process.env.NODE_ENV === 'development') console.log(tab.title);
}

async function addSubmission(submission){
  if(process.env.NODE_ENV === 'development') console.log("Adding submission to sheet : " + googleSheetID)

  const sheet = await getSheet(clientSecret,googleSheetID);
  if(sheet === null) throw new Error("Unable to get Sheet")

  for(var i = 0; i< submission.attendees.length; i++){
    var attendee = submission.attendees[i];

    await sheet.addRow({
      name: attendee.name,
      phoneNumber: submission.phoneNumber,
      vaccinated: attendee.vaccinated,
      dietRequirements: attendee.dietRequirements,
      message: submission.message,
      accommodation: submission.accommodation
    });
  }
}

module.exports.getData = getData
module.exports.addSubmission = addSubmission