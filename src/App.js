import React from 'react';

import './App.css';
import './buttons.scss';
import './styles/AppBehavior.scss'
import {AppProvider} from './components/context/AppContext';
import StripeWrapperComponent from './components/stripeWrapperComponent'
import {StripeProvider} from 'react-stripe-elements';


function App() {

  return (
    <div className="App">
      <StripeProvider apiKey="pk_test_7LEEquBX9joVxcuVTXsZW0RN002UkUsXj3">
        <AppProvider>
            <StripeWrapperComponent/>
        </AppProvider>
      </StripeProvider>
    
    </div>
  );
}

export default App;
