import React from "react"

import "./styles/singleChoice.scss"


class SingleChoice extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      value: " ",
      inputRefs: [],
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.addInputRef = this.addInputRef.bind(this);
  }

  onValueChange(event,value){
    var checkedElement = event.target;
    console.log("Checked Element ID:",checkedElement.id)

    var refs = this.state.inputRefs

    for(var i=0; i < refs.length; i++){
      console.log(refs[i].id);
      if(checkedElement.id !== refs[i].id){
        refs[i].checked = false;
      }
    }

    this.setState({value: value},()=>{
      this.props.onValueChange(value);
    });
  }

  addInputRef(ref){
    if(this.state.inputRefs.includes(ref)) return
    this.state.inputRefs.push(ref);
  }

  render(){
    return (
      <div className="checkBox">
        <label>{this.props.label}</label>
        <div className="checkBox-elements">
          {
            this.props.options.map((option,index) => (
              <div key={index}>
                <input id={option} ref={this.addInputRef} type="checkbox" name="vaccinated" onChange={(event)=>this.onValueChange(event,option)}/>
                <p>{option}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default SingleChoice