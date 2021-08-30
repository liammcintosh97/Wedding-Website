import React from "react"
import ReCAPTCHA from "react-google-recaptcha";
import {Link} from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner"
import ThematicBreak from "../components/thematicBreak";

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
        message: "",
        accommodation: false
      },
      isLoading: false
    }

    this.recaptchaRef = React.createRef();

    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onAccommodationChange = this.onAccommodationChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.postFormSubmission = this.postFormSubmission.bind(this);
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

  onAccommodationChange(event){
    if(process.env.NODE_ENV === 'development') console.log(event.target.checked)
    this.setState(prevState => ({
      submission: {
          ...prevState.submission,
          accommodation: event.target.checked
      }
    }))
  }

  async onSubmit(event){
    event.preventDefault();

    if(!this.isValidSubmission(this.state.submission)) return

    this.setState({isLoading: true})

    try{
      const token = await this.recaptchaRef.current.executeAsync();

      if(token === null){
        alert("Please verify ReCAPTCHA")
        if(process.env.NODE_ENV === 'development') console.log("Submission was not posted: Failed to verify ReCAPTCHA")
        return;
      }

      if(process.env.NODE_ENV === 'development') console.log("Submitting Form",this.state.submission)
      await this.postFormSubmission(this.state.submission)
    }catch(e){
      alert("Please verify ReCAPTCHA")
      if(process.env.NODE_ENV === 'development') console.log("Submission was not posted: Failed to verify ReCAPTCHA because of an error", e)
      this.setState({isLoading: false});
      return;
    }
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

    if(!this.isValidData(submission.accommodation)){
      alert("Accommodation field is not valid")
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

      this.setState({isLoading: false},()=>{
        if(response.status === 200){
          alert("Your RSVP was submitted!")
          if(process.env.NODE_ENV === 'development') console.log("RSVP submission successful: ", data);
          this.setState({
            submission:{
              name: "",
              phoneNumber: "",
              email: "",
              message: "",
              accommodation: false
            }
          })
        }
        else if(response.status === 404){
          alert("Your RSVP failed to submit")
          if(process.env.NODE_ENV === 'development') console.log("RSVP submission failure: ", data);
        }
        else if(response.status === 50){
          alert("Your RSVP failed to submit")
          if(process.env.NODE_ENV === 'development') console.log("RSVP submission failure: ", data);
        }
        return data;
      })
    }catch(e){
      alert("Your RSVP failed to submit")
      if(process.env.NODE_ENV === 'development') console.log("RSVP submission failure due to a Fetch error: ",e);
    }
  }

  render(){
    return (
      <div className="rsvpPage-container">
      <header>
        <h1>RSVP</h1>
      </header>
      <main>
        <form className="rsvp-form" onSubmit={this.onSubmit}>
          <div className="rsvp-row">

            <div className="rsvp-element">
              <label>Name</label>
              <input type="text" name="name" onChange={this.onNameChange} value={this.state.submission.name}/>
            </div>

          </div>

          <div className="rsvp-row">
            <div className="rsvp-element">
              <label>Phone Number</label>
              <input type="text" name="phone number" onChange={this.onPhoneNumberChange} value={this.state.submission.phoneNumber}/>
            </div>

            <div className="rsvp-element">
              <label>Email</label>
              <input type="text" name="email" onChange={this.onEmailChange} value={this.state.submission.email}/>
            </div>

          </div>

          <div className="rsvp-row">

            <div className="rsvp-element">
              <label>Message</label>
              <textarea className="rsvp-textArea" name="message" rows={10} onChange={this.onMessageChange} value={this.state.submission.message}/>
            </div>

          </div>

          <div className="rsvp-row">
            <div className="rsvp-element">
                <label>Are you you interested in staying at the venue?</label>
                <input className="rsvp-accommodation" type="checkbox" name="accommodation"  onChange={this.onAccommodationChange} value={this.state.submission.accommodation}/>
                <p className="rsvp-accommodation-disclaimer">*Please note that there is limited access to onsite accommodation. However you can find alternatives <Link to="/accommodation">here</Link>*</p>
            </div>
          </div>

          <div className="rsvp-row">
            <div className="rsvp-element">
              <button className="rsvp-submit" type="submit">Submit</button>
            </div>
          </div>
        </form>

        <ThematicBreak direction="horizontal"/>

        <div className="rsvp-alternative">
          <h2>Alternatively...</h2>
          <p>You can contact Liam on <strong>0449609700</strong> or Monique on <strong>0447727934</strong> to RSVP directly!</p>
          <p>We look forward to seeing you there!</p>
        </div>

        <ReCAPTCHA
          ref={this.recaptchaRef}
          className="rsvp-recaptcha"
          sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE}
          size="invisible"
        />
        {
          this.state.isLoading && (
            <LoadingSpinner
              style={{
                  position: "absolute",
                  left: "15px",
                  right:"0px",
                  bottom: "15px"
                }
              }
              className="rsvp-loading-spinner">

            </LoadingSpinner>
          )
        }

      </main>
      <footer>
      </footer>
    </div>
    );
  }
}

export default RSVP
