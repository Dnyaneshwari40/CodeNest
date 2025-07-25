import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#00ff00');
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctxRef.current = ctx;
  }, [color]);

  useEffect(() => {
    const eraserCursor = document.getElementById('eraser-cursor');

    const moveEraser = (e) => {
      if (eraserCursor) {
        eraserCursor.style.left = `${e.pageX - 8}px`;
        eraserCursor.style.top = `${e.pageY - 8}px`;
      }
    };

    if (isEraser) {
      window.addEventListener('mousemove', moveEraser);
    }

    return () => {
      window.removeEventListener('mousemove', moveEraser);
    };
  }, [isEraser]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isEraser) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) return;

    const ctx = ctxRef.current;

    if (isEraser) {
      ctx.clearRect(offsetX - 8, offsetY - 8, 16, 16); // Eraser clears area
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isEraser) {
      ctxRef.current.closePath();
    }
    setIsDrawing(false);
  };

  const toggleEraser = () => {
    setIsEraser((prev) => !prev);
  };

  const changeColor = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    if (!isEraser) {
      ctxRef.current.strokeStyle = newColor;
    }
  };

  return (
    <div className="draw-box half" style={{ position: 'relative' }}>
      <div className="editor-header">Draw</div>
    
  <canvas
  ref={canvasRef}
  onMouseDown={startDrawing}
  onMouseMove={draw}
  onMouseUp={stopDrawing}
  onMouseLeave={stopDrawing}
  style={{
    borderRadius: '10px',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    cursor: isEraser ? 'none' : 'crosshair', 
    position: 'relative',
  }}
/>



      {/* Custom Eraser Cursor */}
      {isEraser && (
        <div
          id="eraser-cursor"
          style={{
            position: 'absolute',
            width: '16px',
            height: '16px',
            backgroundColor: 'white',
            border: '1px solid black',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        />
      )}

      <div className="button-area" style={{ gap: '10px' }}>
        <button onClick={toggleEraser}>
          {isEraser ? '🖌️ Pen Mode' : '🧽 Eraser'}
        </button>
        <input
          type="color"
          value={color}
          onChange={changeColor}
          disabled={isEraser}
          style={{
            width: '40px',
            height: '40px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            outline: 'none',
            background: 'none',
          }}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
