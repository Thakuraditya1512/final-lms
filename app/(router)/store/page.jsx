import React from 'react';

function Store() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', marginTop: '20px' }}>
      <div style={{ width: '30%', backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <img src="/discord.jpg" alt="Product 1" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        <p>Discord join channel </p>
        <button>link</button>
      </div>
      <div style={{ width: '30%', backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <img src="/images.png" alt="Product 2" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        <p>FormsLink </p>
        <button>LINK:</button>
      </div>
      <div style={{ width: '30%', backgroundColor: '#f4f4f4', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <img src="/whatsapp.png" alt="Product 3" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
        <p>Whatsapp join Group </p>
        <button>LINK:</button>
      </div>
    </div>
  );
}

export default Store;



