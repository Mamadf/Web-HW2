import React, { useRef, useState, useEffect } from 'react';

function App() {
  const canvasRef = useRef(null);
  const [dragShape, setDragShape] = useState(null);
  const [shapes, setShapes] = useState([]); // store multiple shapes
  const fileInputRef = useRef(null);
  const [paintingTitle, setPaintingTitle] = useState('My Painting');


  // Initialize canvas size based on displayed size
  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width ;
    canvas.height = rect.height;
  }, []);

  const handleDragStart = (shape) => {
    setDragShape(shape);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (!dragShape) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const ctx = canvasRef.current.getContext('2d');

    // Calculate drop position relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newShape = { type: dragShape, x, y };
    setShapes((prev) => [...prev, newShape]);

    drawShape(ctx, newShape);

    setDragShape(null); // reset
  };

  // Draw a shape object
  const drawShape = (ctx, shape) => {
    ctx.fillStyle = '#007bff';

    if (shape.type === 'rectangle') {
      ctx.fillRect(shape.x - 50, shape.y - 25, 100, 50);
    } else if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, 40, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape.type === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(shape.x, shape.y - 40);
      ctx.lineTo(shape.x - 50, shape.y + 50);
      ctx.lineTo(shape.x + 50, shape.y + 50);
      ctx.closePath();
      ctx.fill();
    }
  };

  // Redraw all shapes
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => drawShape(ctx, shape));
  };

  // Redraw on shape update
  useEffect(() => {
    if (shapes.length > 0) {
      redrawCanvas();
    }
  }, [shapes]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleExport = () => {
    const json = JSON.stringify(shapes, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const filename = `${paintingTitle || 'Untitled'}.json`;
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    URL.revokeObjectURL(url);
  };  
  
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedShapes = JSON.parse(event.target.result);
        if (Array.isArray(importedShapes)) {
          setShapes(importedShapes);
          const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
          setPaintingTitle(nameWithoutExtension);
        } else {
          alert('Invalid JSON format.');
        }
      } catch (err) {
        alert('Error reading file.');
      }
    };
    reader.readAsText(file);
  };
  
  const handleDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
    // Find shape under click
    const newShapes = [...shapes];
    for (let i = newShapes.length - 1; i >= 0; i--) {
      const shape = newShapes[i];
      if (
        (shape.type === 'rectangle' && x >= shape.x - 50 && x <= shape.x + 50 && y >= shape.y - 25 && y <= shape.y + 25) ||
        (shape.type === 'circle' && Math.hypot(shape.x - x, shape.y - y) <= 40) ||
        (shape.type === 'triangle' && isPointInTriangle(x, y, shape))
      ) {
        newShapes.splice(i, 1); // remove the shape
        setShapes(newShapes);
        break;
      }
    }
  };

  function isPointInTriangle(px, py, shape) {
    const x1 = shape.x, y1 = shape.y - 40;
    const x2 = shape.x - 50, y2 = shape.y + 50;
    const x3 = shape.x + 50, y3 = shape.y + 50;
  
    const area = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
    const s = 1 / (2 * area) * (y1 * x3 - x1 * y3 + (y3 - y1) * px + (x1 - x3) * py);
    const t = 1 / (2 * area) * (x1 * y2 - y1 * x2 + (y1 - y2) * px + (x2 - x1) * py);
    const u = 1 - s - t;
  
    return s >= 0 && t >= 0 && u >= 0;
  }
  
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#4CAF50', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          value={paintingTitle}
          onChange={(e) => setPaintingTitle(e.target.value)}
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '4px',
            border: 'none',
            maxWidth: '300px'
          }}
        />
        <div>
          <button
            onClick={handleExport}
            style={{ marginRight: '10px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#fff' }}
          >
            Export JSON
          </button>
          <button
            onClick={() => fileInputRef.current.click()}
            style={{ padding: '8px 16px', fontSize: '14px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#fff' }}
          >
            Import JSON
          </button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </div>
      </div>


      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Canvas & Info */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Canvas */}
          <div
            style={{ flex: 1, border: '1px solid #ccc', margin: '10px' }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDoubleClick={handleDoubleClick}
          >
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: '100%', display: 'block' }}
            ></canvas>
          </div>

          {/* Info */}
            <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>
              <h3>Information</h3>
              <p>Drag shapes from the tools section and drop them onto the canvas. Shapes will be centered at the drop point.</p>

              <div style={{ marginTop: '10px' }}>
                <strong>Shape Counts:</strong>
                <ul>
                  <li>Rectangles: {shapes.filter(s => s.type === 'rectangle').length}</li>
                  <li>Circles: {shapes.filter(s => s.type === 'circle').length}</li>
                  <li>Triangles: {shapes.filter(s => s.type === 'triangle').length}</li>
                </ul>
              </div>
            </div>
        </div>

        {/* Tools */}
        <div style={{
          backgroundColor: '#f0f0f0',
          width: '150px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h3>Shapes</h3>

          {/* Rectangle */}
          <div
            style={{ margin: '10px', cursor: 'grab' }}
            draggable
            onDragStart={() => handleDragStart('rectangle')}
          >
            <svg width="75" height="75" viewBox="0 0 100 100">
              <rect x="10" y="25" width="80" height="50" fill="#007bff" stroke="#000" strokeWidth="2" />
            </svg>
          </div>

          {/* Circle */}
          <div
            style={{ margin: '10px', cursor: 'grab' }}
            draggable
            onDragStart={() => handleDragStart('circle')}
          >
            <svg width="75" height="75" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="#007bff" stroke="#000" strokeWidth="2" />
            </svg>
          </div>

          {/* Triangle */}
          <div
            style={{ margin: '10px', cursor: 'grab' }}
            draggable
            onDragStart={() => handleDragStart('triangle')}
          >
            <svg width="75" height="75" viewBox="0 0 100 100">
              <polygon points="50,10 90,90 10,90" fill="#007bff" stroke="#000" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
