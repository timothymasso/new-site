import React from 'react'
import ReactDOM from 'react-dom/client'
import Dither from './Dither'
import App from './App'
import './index.css'

// Render the background dither effect
const ditherContainer = document.getElementById('dither-container')
if (ditherContainer) {
  const ditherRoot = ReactDOM.createRoot(ditherContainer)
  ditherRoot.render(
    <Dither
      waveColor={[0.2, 0.3, 1]}
      mouseRadius={0.2}
      colorNum={18.5}
      waveAmplitude={0.52}
      waveFrequency={5.7}
      waveSpeed={0.02}
      enableMouseInteraction={false}
    />
  )
}

// Render the main app content
const appContainer = document.getElementById('app-root')
if (appContainer) {
  const appRoot = ReactDOM.createRoot(appContainer)
  appRoot.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
