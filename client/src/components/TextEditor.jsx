import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ text, setText }) {
  return (
    <div className="text-editor-wrapper">
      <div className="editor-header">Live Text Editor</div>
      <ReactQuill value={text} onChange={setText} />
    </div>
  );
}

export default TextEditor;
