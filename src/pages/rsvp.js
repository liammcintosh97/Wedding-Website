import React from "react"

import "./styles/rsvp.scss"

class RSVP extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      submission: {
        name: null,
        phoneNumber: null,
        email: null,
        message: null
      }
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
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

  onSubmit(){
    console.log("Submitting Form",this.state.submission)

    if(!this.isValidSubmission(this.state.submission)){
      console.log("The submission is not valid")
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

    return true;
  }

  isValidData(data){
    return data !== null && data !== undefined && data !== ''
  }

  render(){
    return (
      <div className="rsvpPage-container">
      <header>
        <h1>RSVP</h1>
      </header>
      <main>
        <form className="rsvp-form">
          <div className="row">
            <label>
              Name:
              <input type="text" name="name" onChange={this.onNameChange} />
            </label>
          </div>

          <div className="row">
            <label>
              Phone Number:
              <input type="text" name="phone number" onChange={this.onPhoneNumberChange}/>
            </label>
            <label>
              Email:
              <input type="text" name="email" onChange={this.onEmailChange}/>
            </label>
          </div>

          <div className="row">
            <label>
              Message:
              <input type="text" name="name" onChange={this.onMessageChange}/>
            </label>
          </div>

          <button onClick={this.onSubmit}>Submit</button>
        </form>
      </main>
      <footer>
      </footer>
    </div>
    );
  }
}

export default RSVP
