import React from 'react';

const Header = ({ paintingTitle, setPaintingTitle, handleExport, handleImport, fileInputRef }) => (
  <div style={{ backgroundColor: '#4CAF50', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <input
      type="text"
      value={paintingTitle}
      onChange={(e) => setPaintingTitle(e.target.value)}
      style={{ fontSize: '20px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px', border: 'none', maxWidth: '300px' }}
    />
    <div>
      <button onClick={handleExport} style={{ marginRight: '10px' }}>Export JSON</button>
      <button onClick={() => fileInputRef.current.click()}>Import JSON</button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleImport}
        style={{ display: 'none' }}
      />
    </div>
  </div>
);

export default Header;