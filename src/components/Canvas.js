import React, { useRef, useEffect } from 'react';
import { drawShape, isPointInTriangle } from '../utils/shapeUtils';

const Canvas = ({ shapes, setShapes, dragShape, setDragShape }) => {
  const canvasRef = useRef(null);
  const clickTimeout = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width ;
    canvas.height = rect.height;
  }, []);

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

  const handleDoubleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
  
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

  return (
    <div style={{ flex: 1, border: '1px solid #ccc', margin: '10px' }} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      <canvas ref={canvasRef} onDoubleClick={handleDoubleClick} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
};

export default Canvas;