import React, {useState} from 'react';
import DotSelector from './DotSelector';
import Renderer from './Renderer';
import './App.css';

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [dotMatrix, setDotMatrix] = useState([]);

  return (
    <div className="App">
      <div className="renderer-container">
        <Renderer dotMatrix={dotMatrix} imageUrl={imageUrl} />
      </div>
      <div className="dot-selector-container">
        <DotSelector
          dotMatrix={dotMatrix}
          setDotMatrix={setDotMatrix}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </div>
    </div>
  );
}

export default App;
