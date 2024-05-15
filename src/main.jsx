import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LegendProvider from './context/LegendProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegendProvider>
      <App />
    </LegendProvider>
  </React.StrictMode>,
)
