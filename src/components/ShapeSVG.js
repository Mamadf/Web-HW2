import React from 'react';

const ShapeSVG = ({ type, size = 60 }) => {
  const fill = '#007bff';
  const stroke = '#000';
  const strokeWidth = 2;

  if (type === 'rectangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="10" y="25" width="80" height="50" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <polygon points="50,10 90,90 10,90" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      </svg>
    );
  }

  return null;
};

export default ShapeSVG;