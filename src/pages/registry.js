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
          <div>
            <iframe title="Registry Frame" src="https://www.myregistry.com/wedding-registry/monique-borg-and-liam-mcintosh-bayswater-victoria/3070649"/>
          </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Registry
