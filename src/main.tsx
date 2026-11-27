import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/red-hat-display'
import './styles/variables.css'
import './styles/base.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
