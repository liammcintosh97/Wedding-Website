import React from 'react'

import "./styles/pictureGallery.scss"

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
      this.playTimer = setTimeout(()=>{gallery.play(gallery)}, 5500); // Change image every 2 seconds
    })
  }

  componentDidMount(){
    if(process.env.NODE_ENV === 'development') console.log("Picture gallery onMount")
    if(process.env.NODE_ENV === 'development') console.log(document.readyState);
    if (document.readyState !== "complete") window.addEventListener('load', this.handleLoad);
    else{ this.handleLoad()}
  }

  componentDidUpdate(){
    if(process.env.NODE_ENV === 'development') console.log("Picture gallery onUpdate")
  }

  componentWillUnmount(){
    if(process.env.NODE_ENV === 'development') console.log("Picture gallery onUnmount")
    clearTimeout(this.playTimer);
    window.removeEventListener('load',this.handleLoad);
  }


  handleLoad(){
    var slides = document.getElementsByClassName("gallery-image-container");
    var dots = document.getElementsByClassName("dot");

    if(process.env.NODE_ENV === 'development') console.log("Handle Load")
    if(process.env.NODE_ENV === 'development') console.log(document)
    if(process.env.NODE_ENV === 'development') console.log(slides)
    if(process.env.NODE_ENV === 'development') console.log(dots)

    this.setState({
      slides: slides,
      dots: dots,
    },()=> {
      this.play(this);
    })

  }

  render(){
    return(    
      <div className="gallery-container">
        {
          this.props.images.map((image,index) =>{
            return (<div key={index} className="gallery-image-container fade">
                    <div >{index + 1} / {this.props.length}</div>
                    <img src={image} alt=""/>
                  </div>)
          })
        }

        <div className="gallery-button-container">
          <div className="gallery-prev-button" onClick={()=>this.plusSlides(-1)}>&#10094;</div>
          <div className="gallery-next-button" onClick={()=>this.plusSlides(1)}>&#10095;</div>
        </div>


        <div className="gallery-dots">
          {
            this.props.images.map((image,index) =>{

              return <span key={index} className="dot" onClick={()=> this.currentSlide(index)}></span>
            })
          }
        </div>
      </div>

    );
  }
}

export default PictureGallery