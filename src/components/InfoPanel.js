import React from 'react';

const InfoPanel = ({ shapes = {} }) => (
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
);

export default InfoPanel;
