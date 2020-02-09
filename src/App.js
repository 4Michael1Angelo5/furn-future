import React, {useContext} from 'react';

import './App.css';
import './buttons.scss'
import Home from './components/homeComponent'
import {AppProvider} from './components/context/AppContext';
import Main from './components/mainComponent'

function App() {

  return (
    <div className="App">
      <AppProvider>
          <Main/>
      </AppProvider>
      
    </div>
  );
}

export default App;
