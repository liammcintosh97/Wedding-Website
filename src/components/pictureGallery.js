import React from 'react'

import "./styles/pictureGallery.scss"

import pic1 from "../images/img_5terre_wide.jpeg"
import pic2 from "../images/img_lights_wide.jpeg"
import pic3 from "../images/img_mountains_wide.jpeg"
import pic4 from "../images/img_nature_wide.jpeg"
import pic5 from "../images/img_snow_wide.jpeg"
import pic6 from "../images/img_woods_wide.jpeg"


class PictureGallery extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      slideIndex: 0,
      slides: null,
      dots: null
    }

    this.plusSlides = this.plusSlides.bind(this);
    this.currentSlide = this.currentSlide.bind(this);
    this.showSlides = this.showSlides.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  // Next/previous controls
  plusSlides(n) {
    var newIndex = this.state.slideIndex + n;
    var slides = this.state.slides

    if (newIndex > slides.length -1) {newIndex = 0}
    if (newIndex < 0) {newIndex = slides.length -1}

    this.setState({slideIndex: newIndex },() =>{
      this.showSlides();
    })

  }

  //Thumbnail image controls
  currentSlide(n) {
    this.setState({slideIndex: n}, ()=>{
      this.showSlides()
    })
  }

  showSlides() {
    var slides = this.state.slides
    var dots =  this.state.dots

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.state.slideIndex].style.display = "block";
    dots[this.state.slideIndex].className += " active";

  }

  play(gallery){
    var slides = gallery.state.slides
    var dots = this.state.dots

    for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[gallery.state.slideIndex].style.display = "block";
    dots[this.state.slideIndex].className += " active";

    var newIndex = gallery.state.slideIndex;
    newIndex++;
    if (newIndex > slides.length -1) {newIndex = 0};

    gallery.setState({slideIndex: newIndex},()=>{
      setTimeout(()=>{gallery.play(gallery)}, 5500); // Change image every 2 seconds
    })
  }

  componentDidMount(){
    window.addEventListener('load', this.handleLoad);
  }

  componentDidUpdate(){
    window.addEventListener('load', this.handleLoad);
  }

  handleLoad(){
    var slides = document.getElementsByClassName("gallery-image-container");
    var dots = document.getElementsByClassName("dot");

    this.setState({
      slides: slides,
      dots: dots,
    })
    this.play(this);
  }

  render(){
    return(    
      <div className="gallery-container">

        <div className="gallery-image-container fade">
          <div >1 / 6</div>
          <img src={pic1} alt=""/>
        </div>

        <div className="gallery-image-container fade">
          <div >2 / 6</div>
          <img src={pic2} alt=""/>
        </div>

        <div className="gallery-image-container fade">
          <div >3 / 6</div>
          <img src={pic3} alt=""/>
        </div>

        <div className="gallery-image-container fade">
          <div >4 / 6</div>
          <img src={pic4} alt=""/>
        </div>

        <div className="gallery-image-container fade">
          <div >5 / 6</div>
          <img src={pic5} alt=""/>
        </div>

        <div className="gallery-image-container fade">
          <div>6 / 6</div>
          <img src={pic6} alt=""/>
        </div>

        <div className="gallery-prev-button" onClick={()=>this.plusSlides(-1)}>&#10094;</div>
        <div className="gallery-next-button" onClick={()=>this.plusSlides(1)}>&#10095;</div>

        <div className="gallery-dots">
          <span className="dot" onClick={()=> this.currentSlide(0)}></span>
          <span className="dot" onClick={()=> this.currentSlide(1)}></span>
          <span className="dot" onClick={()=> this.currentSlide(2)}></span>
          <span className="dot" onClick={()=> this.currentSlide(3)}></span>
          <span className="dot" onClick={()=> this.currentSlide(4)}></span>
          <span className="dot" onClick={()=> this.currentSlide(5)}></span>
        </div>
      </div>

    );
  }
}

export default PictureGallery