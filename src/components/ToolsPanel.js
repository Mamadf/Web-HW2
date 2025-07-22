import React from 'react';
import ShapeSVG from './ShapeSVG';

const ToolsPanel = ({ onDragStart }) => (
  <div style={{ backgroundColor: '#f0f0f0', width: '150px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h3>Shapes</h3>
    {['rectangle', 'circle', 'triangle'].map((shape) => (
      <div
        key={shape}
        style={{ margin: '10px', cursor: 'grab' }}
        draggable
        onDragStart={() => onDragStart(shape)}
      >
        <ShapeSVG type={shape} size={100} />
      </div>
    ))}
  </div>
);

export default ToolsPanel;