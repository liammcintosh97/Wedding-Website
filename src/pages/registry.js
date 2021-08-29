import React from "react"

import "./styles/registry.scss"

class Registry extends React.Component{
  render(){
    return (
      <div className="registryPage-container">
        <header>
          <h1>registry</h1>
        </header>
        <main>
          <div className="registry-message">
            <h2>Coming Soon!</h2>
            <p><em>Please come back at a later date as we create our registries</em></p>
          </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Registry
