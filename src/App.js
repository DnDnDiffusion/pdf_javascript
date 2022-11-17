import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const url = "http://www.pdf995.com/samples/pdf.pdf";

  const pdfjs = require("../node_modules/pdfjs-dist/build/pdf");
  const workerSrc = require("../node_modules/pdfjs-dist/build/pdf.worker.entry");
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  //    pdfjs.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    //        setIsSelected(true);
  };

  const handleSubmission = () => {
    // console.log("SOmya");
    const items = getItems("Test.pdf");
  };

  async function getContent(src) {
    const doc = await pdfjs.getDocument(url).promise;
    const page = await doc.getPage(1);
    return await page.getTextContent();
  }

  async function getItems(src) {
    const content = await getContent(src);
    const items = content.items.map((item) => console.log(item.str));
    return items;
  }

  //   const items = getItems("./UmangJain_Resume.pdf")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input type="file" name="file" onChange={changeHandler} />
        <div>
          <button onClick={handleSubmission}>Submit</button>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
