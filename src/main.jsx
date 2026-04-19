import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Nạp code từ file App.jsx của bạn
import './index.css'     // Nạp các style cơ bản (Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
