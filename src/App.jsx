import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Router';


function App() {

  return (
    
    <div className='w-full'>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </div>
      

  )
}

export default App
