import React from "react"

import "./styles/attendee.scss"

class Attendee extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: this.props.name,
      phoneNumber: "",
      vaccinated: false,
      dietRequirements: "",
    }

    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this);
    this.onVaccinationStatusChange = this.onVaccinationStatusChange.bind(this);
    this.onDietaryRequirementsChange = this.onDietaryRequirementsChange.bind(this)
  }

  onPhoneNumberChange(event){
    this.setState({phoneNumber: event.target.value})
  }

  onVaccinationStatusChange(event){
    this.setState({vaccinated: event.target.checked})
  }

  onDietaryRequirementsChange(event){
    this.setState({dietRequirements: event.target.value})
  }

  render(){
    return (
      <div className="attendee">

        <div className="attendee-row">
          <div className="attendee-element">
            <h2>{this.props.name}</h2>
          </div>
        </div>


        <div className="attendee-row">
          <div className="attendee-element">
            <label>Phone Number</label>
            <input type="text" name="phone number" onChange={this.onPhoneNumberChange} value={this.state.phoneNumber}/>
          </div>
        </div>

        <div className="attendee-row">
          <div className="attendee-element">
            <div>
              <input type="checkbox" name="vaccinated" onChange={this.onVaccinationStatusChange}/>
              {this.props.selectedName !== this.props.name && <label>Will {this.props.name} be fully vaccinated by 27/05/22</label>}
              {this.props.selectedName === this.props.name && <label>Will you be fully vaccinated by 27/05/22</label>}
            </div>
          </div>
        </div>

        <div className="attendee-row">
          <div className="attendee-element">
            <label>Dietary requirements</label>
            <textarea className="attendee-textArea" name="dietary requirements" rows={5} onChange={this.onDietaryRequirementsChange} value={this.state.dietRequirements}/>
          </div>
        </div>

      </div>
    )
  }
}

export default Attendee