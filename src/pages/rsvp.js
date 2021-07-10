import React from "react"
import ReCAPTCHA from "react-google-recaptcha";

import "./styles/rsvp.scss"

require('dotenv').config()

class RSVP extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      submission: {
        name: "",
        phoneNumber: "",
        email: "",
        message: ""
      },
      reCaptchaToken: null
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.postFormSubmission = this.postFormSubmission.bind(this);

    this.onReCaptchaChange = this.onReCaptchaChange.bind(this);
  }

  onNameChange(event){
    this.setState(prevState => ({
      submission: {
          ...prevState.submission,
          name: event.target.value
      }
    }))
  }

  onEmailChange(event){
    this.setState(prevState => ({
      submission: {
          ...prevState.submission,
          email: event.target.value
      }
    }))
  }

  onPhoneNumberChange(event){
    this.setState(prevState => ({
      submission: {
          ...prevState.submission,
          phoneNumber: event.target.value
      }
    }))
  }

  onMessageChange(event){
    this.setState(prevState => ({
      submission: {
          ...prevState.submission,
          message: event.target.value
      }
    }))
  }

  onSubmit(event){
    event.preventDefault();

    if(this.state.reCaptchaToken === null){
      alert("Please verify ReCAPTCHA")
      console.log("Submission was not posted: Failed to verify ReCAPTCHA")
      return;
    }

    console.log("Submitting Form",this.state.submission)

    /*
    if(!this.isValidSubmission(this.state.submission)){
      console.log("The submission is not valid")
    }*/

    this.postFormSubmission(this.state.submission)
  }

  isValidSubmission(submission){

    if(!this.isValidData(submission.name)){
      alert("Please Enter a valid name")
      return false
    }

    if(!this.isValidData(submission.phoneNumber)){
      alert("Please enter a valid phone number")
      return false
    }

    if(!this.isValidData(submission.phoneNumber)){
      alert("Please enter a valid phone number")
      return false
    }

    if(!this.isValidData(submission.email)){
      alert("Please enter a valid email")
      return false
    }

    if(!this.isValidData(submission.message)){
      alert("Please enter a message")
      return false
    }

    return true;
  }

  isValidData(data){
    return data !== null && data !== undefined && data !== "" && data !== ''
  }

  async postFormSubmission(submission){

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    };

    try{
      const response = await fetch('https://clatqfjdef.execute-api.us-east-2.amazonaws.com/default/RSVPSubmission', requestOptions);
      const data = await response.json();

      if(response.status === 200){
        alert("Your RSVP was submitted!")
        console.log("RSVP submission successful: ", data);
      }
      else if(response.status === 404){
        alert("Your RSVP failed to submit")
        console.log("RSVP submission failure: ", data);
      }
      else if(response.status === 50){
        alert("Your RSVP failed to submit")
        console.log("RSVP submission failure: ", data);
      }

    }catch(e){
      alert("Your RSVP failed to submit")
      console.log("RSVP submission failure due to a Fetch error: ",e);
    }
  }

  onReCaptchaChange(value){
    this.setState({reCaptchaToken: value})
  }

  render(){
    return (
      <div className="rsvpPage-container">
      <header>
        <h1>RSVP</h1>
      </header>
      <main>
        <form className="rsvp-form" onSubmit={this.onSubmit}>
          <div className="row">
            <label>
              Name:
              <input type="text" name="name" onChange={this.onNameChange} value={this.state.submission.name}/>
            </label>
          </div>

          <div className="row">
            <label>
              Phone Number:
              <input type="text" name="phone number" onChange={this.onPhoneNumberChange} value={this.state.submission.phoneNumber}/>
            </label>
            <label>
              Email:
              <input type="text" name="email" onChange={this.onEmailChange} value={this.state.submission.email}/>
            </label>
          </div>

          <div className="row">
            <label>
              Message:
              <input type="text" name="name" onChange={this.onMessageChange} value={this.state.submission.message}/>
            </label>
          </div>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE}
            onChange={this.onReCaptchaChange}
          />,
          <button type="submit">Submit</button>
        </form>
      </main>
      <footer>
      </footer>
    </div>
    );
  }
}

export default RSVP
