import React from 'react'

import "./styles/pictureGallary.scss"

import pic1 from "../images/img_lights_wide.jpeg"
import pic2 from "../images/img_lights_wide.jpeg"
import pic3 from "../images/img_mountains_wide.jpeg"
import pic4 from "../images/img_nature_wide.jpeg"
import pic5 from "../images/img_snow_wide.jpeg"
import pic6 from "../images/img_woods_wide.jpeg"


class PictureGallary extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      slideIndex: 1
    }

    this.plusSlides = this.plusSlides.bind(this);
    this.currentSlide = this.currentSlide.bind(this);
    this.showSlides = this.showSlides.bind(this);
  }

  // Next/previous controls
  plusSlides(n) {
    this.setState({slideIndex: this.state.slideIndex + n})
    this.showSlides(this.state.slideIndex);
  }

  //Thumbnail image controls
  currentSlide(n) {
    this.setState({slideIndex: n})
    this.showSlides(this.state.slideIndex);
  }

  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("demo");
    //var captionText = document.getElementById("caption");
    if (n > slides.length) {
      this.setState({slideIndex: 1});
    }
    if (n < 1) {
      this.setState({slideIndex: slides.length});
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    /*
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }*/
    slides[this.state.slideIndex-1].style.display = "block";
    //dots[this.state.slideIndex-1].className += " active";
    //captionText.innerHTML = dots[this.state.slideIndex-1].alt;
  }

  componentDidMount(){
    this.showSlides(this.state.slideIndex)
  }

  render(){
    return(    
      <div className="container">

        <div className="mySlides fade">
          <div className="numbertext">1 / 6</div>
            <img src={pic1} alt=""/>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 6</div>
            <img src={pic2} alt=""/>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 6</div>
            <img src={pic3} alt=""/>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">4 / 6</div>
            <img src={pic4} alt=""/>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">5 / 6</div>
            <img src={pic5} alt=""/>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">6 / 6</div>
            <img src={pic6} alt=""/>
        </div>

        <a className="prev" onClick={()=>this.plusSlides(-1)}>&#10094;</a>
        <a className="next" onClick={()=>this.plusSlides(1)}>&#10095;</a>

        <div className="gallary-dots">
          <span className="dot" onClick={()=> this.currentSlide(1)}></span>
          <span className="dot" onClick={()=> this.currentSlide(2)}></span>
          <span className="dot" onClick={()=> this.currentSlide(3)}></span>
          <span className="dot" onClick={()=> this.currentSlide(4)}></span>
          <span className="dot" onClick={()=> this.currentSlide(5)}></span>
          <span className="dot" onClick={()=> this.currentSlide(6)}></span>
        </div>
      </div>

    );
  }
}

export default PictureGallary