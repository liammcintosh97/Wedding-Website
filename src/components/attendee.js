import React from "react"
import SingleChoice from "./singleChoice";

import "./styles/attendee.scss"

class Attendee extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: this.props.name,
      vaccinated: "",
      dietRequirements: "",
    }

    this.onVaccinationStatusChange = this.onVaccinationStatusChange.bind(this);
    this.onDietaryRequirementsChange = this.onDietaryRequirementsChange.bind(this)
  }

  onVaccinationStatusChange(value){
    this.setState({vaccinated: value})
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
            <div className="checkBox">
              {this.props.selectedName !== this.props.name && (
                <SingleChoice label={"Will " + this.props.name + " be fully vaccinated by 27/05/22 ?"}options={["YES","NO"]} onValueChange={this.onVaccinationStatusChange}/>
              )}
              {this.props.selectedName === this.props.name && (
                <SingleChoice label={"Will you be fully vaccinated by 27/05/22 ?"}options={["YES","NO"]} onValueChange={this.onVaccinationStatusChange}/>
              )}
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