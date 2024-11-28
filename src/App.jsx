import { RouterProvider } from 'react-router-dom';
import './App.css'
import { Button } from '/src/components/ui/button'
import { router } from './Router/Routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <RouterProvider
     router={router}
    />
    
    </>
  );
}

export default App
