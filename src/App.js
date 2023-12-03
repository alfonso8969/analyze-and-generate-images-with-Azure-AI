import React, { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const results = document.getElementById('divResult');
 // results.style.display = 'none';

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    if (event.target.value === "") {
      results.style.display = 'none';
    }
  };

  function handleImageAnalysis(e) {
    e.preventDefault();
    if (imageUrl) {
      results.style.display = 'block';
      const result = document.getElementById('result');
      callImageAnalysisAPI(imageUrl).then(resp => result.innerText = JSON.stringify(resp) );
    }

    
  }

  async function callImageAnalysisAPI(imageUrl) {
    const apiKey = "a927947a161c4435b5e64df02ecd0dc3"; // Reemplaza "TU_CLAVE_DE_API" con tu propia clave de API
    const endpoint = "https://alfcomputervision.cognitiveservices.azure.com/"; // Reemplaza "tu-endpoint-de-api" con tu propio endpoint de API

    const response = await fetch(`${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
      },
      body: JSON.stringify({
        url: imageUrl
      })
    });

    const data = await response.json();
    return data;
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
        <img src={imageUrl} alt="selected" width="300" height="300"></img>
        <div id="result"></div>
      </div>
    </div>
  );
}

export default App;
