import React from "react"

import "./styles/registry.scss"

class Registry extends React.Component{

  componentDidMount () {
    const script = document.createElement("script");
    const container = document.getElementById("registry-container");

    script.src = "//www.myregistry.com//Visitors/GiftList/iFrames/EmbedRegistry.ashx?r=ZDkYyG_QHLqfgGQe5NKUVQ2&v=2";
    script.type= "text/javascript"
    script.id="script_myregistry_giftlist_iframe"

    container.appendChild(script);
  }

  render(){
    return (
      <div className="registryPage-container">
        <header>
          <h1>registry</h1>
        </header>
        <main>
          <div class="registry-message">
            <p>Our wedding registry is brought to you by MyRegistry.com you can add to it by following this <a href="https://www.myregistry.com/wedding-registry/monique-borg-and-liam-mcintosh-bayswater-victoria/3070649">link</a> or by interacting with this page</p>
          </div>
          <div id="registry-container">
          </div>
        </main>
        <footer>
        </footer>
      </div>
    );
  }
}

export default Registry
