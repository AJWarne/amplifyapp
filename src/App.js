import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
Amplify.configure(config);




function App({ signOut, user }) {
  return (
    <div className="App">
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello from V2</h1>
        <button onClick={signOut}>Sign out</button>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
