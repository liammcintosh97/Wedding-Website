import React from "react"
//import ReactSlider from 'react-slider'

import "./styles/schedule.scss"
import ScheduleHorizontal from "../images/schedule-horizontal.svg"
import ScheduleVertical from "../images/schedule-vertical.svg"

class Schedule extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      date: new Date(),
      //debugTime: "",
      windowWidth: 0,
    }

    this.resizeListener = null;

    /*
    this.timer = null;
    this.schedule = React.createRef();

    this.initTimer = this.initTimer.bind(this);
    this.update = this.update.bind(this);

    this.onDebugTimeSubmit = this.onDebugTimeSubmit.bind(this);
    this.onDebugTimeChange = this.onDebugTimeChange.bind(this);

    //this.initTimer();*/

  }

  componentDidMount(){
    this._ismounted = true;

    this.resizeListener = window.addEventListener('resize', ()=>{
      if(!this._ismounted) return;
      this.setState({windowWidth: window.innerWidth})
    })
  }

  componentWillUnmount(){
    this._ismounted = false;

    window.removeEventListener('resize',this.resizeListener);
    //clearInterval(this.timer);
  }

  /*
  initTimer(){
    console.log("This time is: ", this.format12hr(this.state.date))

    this.timer = setInterval(()=>{this.update(new Date())}, 60 * 1000);

  }

  update(newDate){
    this.setState({date: newDate},()=>{

      let currentTime =  this.format12hr(this.state.date)
      let currentTimeStamp = this.state.date.getTime();

      let timeElements = this.schedule.current.children;
      console.log("This current time is: ", currentTime)

      for(var i = 0; i < timeElements.length; i++ ){

        let timeA = new Date(`2022-05-27T${timeElements[i].id}:00+10:00`).getTime();
        let timeB

        if(i === timeElements.length-1) timeA = new Date(`2022-05-27T23:10:00+10:00`).getTime();
        else timeB = new Date(`2022-05-27T${timeElements[i+1].id}:00+10:00`).getTime();

        if(this.isTimeBetween(timeA,timeB,currentTimeStamp)){
          this.highlightTime(timeElements[i],true)
        }
        else this.highlightTime(timeElements[i],false)
      }
    })
  }

  onDebugTimeChange(event){
   this.setState({debugTime: event.target.value})
  }

  onDebugTimeSubmit(event){
    event.preventDefault();
    let debugTime = new Date(`2022-05-27T${this.state.debugTime}:00+10:00`)

    console.log(debugTime);

    this.update(debugTime);
  }*/

  //Helper methods
  /*
  isTimeBetween(a,b,time){
    return time >= a && time < b
  }*/

  format12hr(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  highlightTime(element,hightLight){
    if(hightLight){
      element.className = "time highlighted"
    }
    else{
      element.className = "time"
    }
  }


  render(){
    return (
      <div className="schedulePage-container">
        <main>
          {
            this.state.windowWidth >= 800 && (
              <img className="schedule-horizontal" src={ScheduleHorizontal} alt="Wedding Schedule"></img>
            )
          }
          {
            this.state.windowWidth < 800 && (
              <img className="schedule-vertical" src={ScheduleVertical} alt="Wedding Schedule"></img>
            )
          }

          {/*<div className="schedule" ref={this.schedule}>

            <div className="time" id="14:00">
              <h4>2:00pm</h4>
              <p>Guests check in</p>
            </div>

            <div className="time" id="15:30">
              <h4>3:30pm</h4>
              <p>Guests Arrival</p>
            </div>

            <div className="time" id="16:00">
              <h4>4:00pm</h4>
              <p>Ceremony</p>
            </div>

            <div className="time" id="17:30">
              <h4>5:30pm</h4>
              <p>Canapes</p>
            </div>

            <div className="time" id="18:00">
              <h4>6:00pm</h4>
              <p>Reception Commences</p>
            </div>

            <div className="time" id="18:10">
              <h4>6:10pm</h4>
              <p>Bridal party announced</p>
            </div>

            <div className="time" id="18:15">
              <h4>6:15pm</h4>
              <p>Cake is Cut</p>
            </div>

            <div className="time" id="18:30">
              <h4>6:30pm</h4>
              <p>Entrée</p>
            </div>

            <div className="time" id="19:30">
              <h4>7:30pm</h4>
              <p>Main course</p>
            </div>

            <div className="time" id="20:30">
              <h4>8:30pm</h4>
              <p>Speeches</p>
            </div>

            <div className="time" id="20:50">
              <h4>8:50pm</h4>
              <p>Bridal dance</p>
            </div>

            <div className="time" id="21:30">
              <h4>9:30pm</h4>
              <p>Dessert</p>
            </div>

            <div className="time" id="22:30">
              <h4>10:30pm</h4>
              <p>Bar closes, Bouquet toss</p>
            </div>

            <div className="time" id="23:00">
              <h4>11:00pm</h4>
              <p>Reception concludes</p>
            </div>
          </div>*/}

          <div className="schedule-clock">
            <p>{this.format12hr(this.state.date)}</p>
          </div>
        </main>
        <footer>
        </footer>
        {/*
            process.env.NODE_ENV === 'development' && (
              <form className="schedule-debug-time" onSubmit={this.onDebugTimeSubmit}>
                <label>
                  Debug Time
                  <input type="text" value={this.state.debugTime} onChange={this.onDebugTimeChange} />
                </label>
                <input type="submit" value="Submit" />
              </form>
            )*/
          }
      </div>
    );
  }
}

export default Schedule
