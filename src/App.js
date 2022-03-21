import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import CertLogo from './PlanetPositivePeopleLogo.png';
import PPPLogo from './PPP.png';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { API, Amplify, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import './Certificate.css';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {getNoteByName, getNote} from './graphql/queries';
import { queries } from '@testing-library/react';
import { ConsoleLogger } from '@aws-amplify/core';

import 'bootstrap/dist/css/bootstrap.css';
Amplify.configure(config);

const initialFormState = { name: '', description: '' }


function App({ signOut, user }) {



  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
     fetchNotes();
  }, []);

  const [note, setNote] = useState("");

  /*
const fetchDescription = async () =>{
  try{
      const descriptionData = await API.graphql(graphqlOperation(getNoteByName, {name: "New Note 2"}));
      const descriptionName = descriptionData.data.getNote.description;
      console.log('Description Name:', descriptionName);
  } catch (error) {console.log('The error was:', error)};

}
*/

async function fetchNotes() {
  let filter = {
    description: {
        eq: 'Dsjfkdsljfsd' // filter priority = 1
    }
  };
  //const apiData = await API.graphql({ query: listNotes }); -- Get The full list
  const apiData = await API.graphql({ query: listNotes, variables: {filter: filter}}); //Filter down the list based on some criteria
  setNotes(apiData.data.listNotes.items);
  console.log(note.description);
  console.log('hello');
}
/*
  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);
  }
*/
  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  //New code ended here
  
  
  return (

   
    <div className="App">
    
      <div className="certificateBackground">
          <div className="container">
              <img src={PPPLogo} className="display-6 ms-auto text-start" width="200"/>
          </div>
          <div className="container">
            <p></p>
            <p className="text-center">in partnership with</p>
            <p></p>
          </div>
          <h2 className="text-center">Business Name Here</h2>

          <div className="certificateInnerBox">
            <h2>Environmental Impact Certificate</h2>
              This document certifies that:
                <div className="certBlackText">
                    <h3>Business Name</h3>
                </div>
              <h5>Has chosen to Greenify® 1 new hire for a period of 12 months</h5><p></p>
              <h5>Each greenified hire is underwritten by a bundle of natural climate solutions that rebalance the typical UK inhabitant’s annual ecological footprint</h5>
              <div className="container">
            <div className="row">
              <div className="col-sm">
                  <div className="certInnerCircle">
                    <div className="certValueText">
                      <h2>12.7 Tonnes</h2>
                      of nature based carbon credits
                    </div>
                  </div>
              </div>
            <div className="col-sm">
                  <div className="certInnerCircle">
                  <div className="certValueText">
                      <h2>34 kg</h2>
                      of ocean and nature-bound plastic waste recovered
                    </div>
                  </div>
            </div>
            <div className="col-sm">
                  <div className="certInnerCircle">
                  <div className="certValueText">
                      <h2>8</h2>
                      trees planted
                    </div>
                  </div>
            </div>
            </div>
            <p></p>
            <h5>Your support will make a real and measurable impact in the fight against climate change, plastic pollution and global deforestation.</h5>  
            <p></p>
            <div className="row">
              <div className="col-sm">
                Date: 18/02/2022
              </div>
              <div className="col-sm">
                Certificate Number: B12PDJ73JSHU812
              </div>
            </div>


          </div>
          </div>

          

          
      </div>
      <p></p><p></p>

      <a href>https://main.d2cmjxzmz29757.amplifyapp.com?B12PDJ73JSHU812</a>
      

      <p></p><p></p>
      
        
        <div className="container"></div>
        
    
      
    


      
        




        <p></p><p></p>
        <button onClick={signOut}>Sign out</button>
      
    </div>
    
  );
}



export default withAuthenticator(App);
