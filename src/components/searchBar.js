import React from "react"

import "./styles/searchBar.scss"

class SearchBar extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      value: "",
      results: [],
      show: true,
    }

    this.barRef = React.createRef();

    window.addEventListener("click",(event)=>{
      if(this.barRef.current === null || this.barRef.current === undefined) return

      if(event.target === this.barRef.current || this.barRef.current.contains(event.target))this.show(true)
      else this.show(false);

    })

    this.show = this.show.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.search(event.target.value);
    this.show(true);
  }

  show(show){
    if(this.state.show === show) return
    this.setState({show: show})
  }

  search(value){
    var results = []
    this.setState({results: []});

    var query = value.charAt(0).toUpperCase() + value.slice(1)

    if(query.length < 3) return;

    for(var i = 0; i < this.props.data.length; i++){
      for(var j = 0; j < this.props.data[i].length; j++){
        if(this.props.data[i][j].includes(query)) results.push(this.props.data[i][j])
      }
    }
    this.setState({results: results});
  }

  onSelect(e,selectedName){
    e.preventDefault();
    this.show(false)
    this.setState({value:selectedName});

    for(var i = 0; i < this.props.data.length; i++){
      for(var j = 0; j < this.props.data[i].length; j++){
        if(this.props.data[i][j] === selectedName){
          this.props.onResults(selectedName,this.props.data[i]);
        }
      }
    }
  }
  
  render(){
    return (
      <div className={`search-bar`}>
        <label>Search Bar</label>
        <input ref={this.barRef} placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleChange}/>
        {
          this.state.show && this.state.value.length < 3 && this.state.value.length > 0 &&
          <div className="search-bar-results">
            <p>Please enter 3 or more character</p>
          </div>
        }
        {
          this.state.show && this.state.value.length >= 3 && this.state.results.length === 0 &&
          <div className="search-bar-results">
            <p>Sorry, no results!</p>
          </div>
        }
        {
          this.state.show && this.state.value.length >= 3 && this.state.results.length > 0 &&
          <div className="search-bar-results">
            {this.state.results.map((name,index) => (
              <button onClick={(e)=>{this.onSelect(e,name)}} className="search-bar-item" key={index}>{name}</button>
            ))}
          </div>
        }
      </div>
  )}
}

export default SearchBar
