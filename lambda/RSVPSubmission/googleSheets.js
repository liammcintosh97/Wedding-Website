const {authorize} = require('./googleAuth')
const {google} = require('googleapis');


// Add your Google sheet ID here
const googleSheetID = '1TEPGoMHWnOyXdRgMlKOEQ4eq0zP5ycBwLvAFOboXIxs';


async function addSubmission(submission){
  console.log("adding Submission")
  try {
    authorize((auth)=>{
      console.log("authorized")
      const sheets = google.sheets({version: 'v4', auth});

      var resource = {
        "majorDimension": "ROWS",
        "values": [[new Date()]]
      }
      var range = "Sheet1!A2:D1000";
      var optionalArgs = {valueInputOption: "USER_ENTERED"};
      sheet.Spreadsheets.Values.append(resource, googleSheetID, range, optionalArgs);
    })

  } catch(err){
    throw (err);
  }
}

module.exports.addSubmission = addSubmission