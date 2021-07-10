const { addSubmission } = require('./googleSheets.js');

exports.handler = async (event) => {

  const submission = JSON.parse(event.body)

  console.log(submission);

  if(!isValid(submission)){
    return sendRes(404,JSON.stringify("Submission undefined, null or blank"));
  }

  if(!isValidSubmission(submission)){
    return sendRes(404,JSON.stringify("Submission is malformed"));
  }

  try{
    addSubmission(submission);
    return sendRes(200,JSON.stringify(submission))
  }catch(err){
    return sendRes(500,JSON.stringify(err))
  }
};

function sendRes(status, body){
  var response = {
    statusCode: status,
    headers: {
      "Content-Type" : "application/json",
      "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      "Access-Control-Allow-Methods" : "OPTIONS,POST",
      "Access-Control-Allow-Credentials" : true,
      "Access-Control-Allow-Origin" : "*",
      "X-Requested-With" : "*"
    },
    body: JSON.stringify(body)
  }

  return response
}

function isValidSubmission(submission){

  if(!isValid(submission.name) || !isValid(submission.phoneNumber) || !isValid(submission.email) ||!isValid(submission.message))return false

  return true
}

function isValid(value){
  if(value === null || value === undefined || value === "" || value === {}) return false;

  return true;
}