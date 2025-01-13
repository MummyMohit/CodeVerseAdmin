import logo from './logo.svg';
import './App.css';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './ContextApi/Context';
function App() {
  return (
    <>
    <Context>
  <RouterProvider router={router} />
  </Context>
    </>
    
  );
}

export default App;
