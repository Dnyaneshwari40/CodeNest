import React, { useState } from 'react';
import TextEditor from './TextEditor';
import DrawingCanvas from './DrawingCanvas';
import './style.css';

const EditorPage = () => {
  const [showOnlyText, setShowOnlyText] = useState(false); // ✅ default: show both

  return (
    <div className="editor-container">
      <div className={`main-container ${showOnlyText ? '' : 'split'}`}>
        <div className={`editor-box ${showOnlyText ? 'full' : 'half'}`}>
          <TextEditor />
        </div>

        {!showOnlyText && (
          <div className="draw-box half">
            <DrawingCanvas />
          </div>
        )}
      </div>

      <div className="button-area">
        <button onClick={() => setShowOnlyText(!showOnlyText)}>
          {showOnlyText ? 'Show Drawing' : 'Hide Drawing'}
        </button>
      </div>
    </div>
  );
};

export default EditorPage;
