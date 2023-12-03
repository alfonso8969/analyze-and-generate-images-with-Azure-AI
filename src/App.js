import React, { useState } from "react";
import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const results = document.getElementById("divResult");
  // results.style.display = 'none';

  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    if (event.target.value === "") {
      results.style.display = "none";
    }
  };

  function handleImageAnalysis(e) {
    e.preventDefault();
    if (imageUrl) {
      results.style.display = "block";
      results.style.color = "green";
      const result = document.getElementById("result");
      const img = document.getElementById("img");
      img.style.display = "block";
      const h1vision = document.getElementById("vision");
      h1vision.style.display = "block";
      const h1generate = document.getElementById("generate");
      h1generate.style.display = "none";
      callImageAnalysisAPI(imageUrl)
        .then((resp) => (result.innerText = JSON.stringify(resp)))
        .catch((err) => {
          const results = document.getElementById("divResult");
          results.style.display = "block";
          const h1vision = document.getElementById("vision");
          h1vision.style.display = "none";
          const h1generate = document.getElementById("generate");
          h1generate.style.display = "block";
          const result = document.getElementById("result");
          results.style.color = "red";
          result.innerText = "code: " + err.code + "\nmessage: " + err.message;
          img.style.display = "none";
          console.error("The sample encountered an error:", err);
        });
    }
  }

  async function callImageAnalysisAPI(imageUrl) {
    const apiKey = process.env.REACT_APP_API_KEY; // Reemplaza "TU_CLAVE_DE_API" con tu propia clave de API
    const endpoint = process.env.REACT_APP_ENDPOINT; // Reemplaza "tu-endpoint-de-api" con tu propio endpoint de API

    const response = await fetch(
      `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people&language=en`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        body: JSON.stringify({
          url: imageUrl,
        }),
      }
    );

    const data = await response.json();
    return data;
  }

  const handleImageGeneration = (e) => {
    e.preventDefault();
    const img = document.getElementById("img");
    if (imageUrl) {
      const result = document.getElementById("urlInput");
      const description = result.value;
      callImageGenerationAPI(description)
        .then((resp) => {
          const generatedImageUrl = resp;
          setImageUrl(generatedImageUrl);
          img.src = generatedImageUrl;
        })
        .catch((err) => {
          const results = document.getElementById("divResult");
          results.style.display = "block";
          const h1vision = document.getElementById("vision");
          h1vision.style.display = "none";
          const h1generate = document.getElementById("generate");
          h1generate.style.display = "block";
          const result = document.getElementById("result");
          results.style.color = "red";
          result.innerText = "code: " + err.code + "\nmessage: " + err.message;
          img.style.display = "none";
          console.error("The sample encountered an error:", err);
        });
    }
  };

  async function callImageGenerationAPI(description) {
    const apiKey = process.env.REACT_APP_API_KEY; // Reemplaza "TU_CLAVE_DE_API" con tu propia clave de API
    const endpoint = process.env.REACT_APP_ENDPOINT; // Reemplaza "tu-endpoint-de-api" con tu propio endpoint de API

    const prompt = description;
    const size = "256x256";

    // The number of images to generate
    const n = 1;
    console.log("== Batch Image Generation ==");

    const client = new OpenAIClient(endpoint, new AzureKeyCredential(apiKey));
    const results = await client.getImages(prompt, { n, size });

    for (const image of results.data) {
      console.log(`Image generation result URL: ${image.url}`);
    }
    console.log(`Image generation result URL: ${results.result.status}`);
    return results.result;
  }

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
        <h1 id="vision">Computer vision Analysis</h1>
        <h1 id="generate">Computer vision Generate</h1>
        <img
          id="img"
          src={imageUrl}
          alt="selected"
          width="300"
          height="300"
        ></img>
        <div id="result"></div>
      </div>
    </div>
  );
}

export default App;
