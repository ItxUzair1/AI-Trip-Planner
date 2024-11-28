import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FirebaseProvider from './context/firebase.jsx'

createRoot(document.getElementById('root')).render(
  <FirebaseProvider>
      <App />
  </FirebaseProvider>
    
  
)
