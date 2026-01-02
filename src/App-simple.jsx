import React from 'react'

function App() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎂 Cake'd by Adorable</h1>
      <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
        Welcome to our custom cake ordering website! We create beautiful, delicious cakes for all your special occasions.
      </p>
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button style={{
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          fontSize: '1.1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '0 10px'
        }}>
          Order Now
        </button>
        <button style={{
          background: 'transparent',
          color: 'white',
          border: '2px solid white',
          padding: '12px 24px',
          fontSize: '1.1rem',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '0 10px'
        }}>
          View Gallery
        </button>
      </div>
    </div>
  )
}

export default App
