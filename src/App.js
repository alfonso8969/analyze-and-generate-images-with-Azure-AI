import React, { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    
  };

  function handleImageAnalysis(e) {
    e.preventDefault();
    let result = document.getElementById('divResult');
    if (imageUrl) {
      result.style.display = 'block';
    }
  }

  const handleImageGeneration = () => {
    // Lógica para generar una imagen con la URL proporcionada
  };

  return (
    <div>
      <div className="form">
        <h1>Computer Vision</h1>
        <form>
          <div className="form-group">
            <label htmlFor="urlInput">Insert URL or type promp:</label>
            <input
              id="urlInput"
              className="form-control"
              type="text"
              value={imageUrl}
              onChange={handleUrlChange}
            />
          </div>
          <div className="buttons">
            <button id="an" onClick={handleImageAnalysis}>
              Analyze image
            </button>
            <button id="gn" onClick={handleImageGeneration}>
              Generate image
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div id="divResult" className="results">
        <h1>Computer vision Analysis</h1>
        <img src={imageUrl} alt="selected" width="200" height="200"></img>
        <div id="result"></div>
      </div>
    </div>
  );
}

export default App;
