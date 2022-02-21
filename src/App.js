import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
//import Amplify from 'aws-amplify';
import { API, Amplify, graphqlOperation } from 'aws-amplify';
import config from './aws-exports';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from './graphql/mutations';
import {getNoteByName, getNote} from './graphql/queries';
import { queries } from '@testing-library/react';
import { ConsoleLogger } from '@aws-amplify/core';
Amplify.configure(config);

const initialFormState = { name: '', description: '' }



function App({ signOut, user }) {

 const [notes, setNotes] = useState([]);
  let nameOFnote;
 
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    //fetchNotes();
    getSingleNote();
    //getNoteSingle();
  }, []);

   async function getSingleNote() { //THIS WORKS!!!!  CHECK CONSOLE LOG!!!
    //const notedescription = await API.graphql({query: queries.getNote, variables: {id: 'd31aa1f4-0aa0-484b-b8e7-fa2b7d23e90c'}});
    //const userName = (await API.graphql(graphqlOperation(getUsers, {id: "xxx"}))).getUser.data.name
    try{
    const notedescription = (await API.graphql(graphqlOperation(getNote, {id: "d31aa1f4-0aa0-484b-b8e7-fa2b7d23e90c"})));
    nameOFnote = "notempty";
    console.log(nameOFnote);
    nameOFnote =  notedescription;
    console.log(nameOFnote);
    nameOFnote =  notedescription.data.getNote.description; //How to return the data within the fields
    console.log(nameOFnote);
    //  this.useState({nameOFnote: notedescription.data.getNote.description});
    //return nameOFnote;
    return( 
      <div>
          ZZZZZZZ!!!!!!!  

      </div>
    )
    } catch (error) {
      console.log(error);
    }   
   }
  

  async function getNoteSingle() {
   // const oneTodo = await API.graphql({ query: queries.getTodo, variables: { id: 'some id' }});
   //nameOFnote = "not empty";
    const apiData = await API.graphql({ query: queries.getNoteByName, variables: { name: 'New Note 2'}});
    nameOFnote = apiData.data.name;
    //const apiData = await API.graphql({query: getNote("d31aa1f4-0aa0-484b-b8e7-fa2b7d23e90c")});
    //nameOFnote = (apiData.data.getNote.name);
    //nameOFnote = "not empty";
    //setNotes(apiData.data.getNote.name);


  }

  async function fetchNotes() {
    
    const apiData = await API.graphql({ query: listNotes });
    setNotes(apiData.data.listNotes.items);

  }

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
      <header className="App-header">
      
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Planet Postive People certificate</h1>
        <div style={{marginBottom: 30}}> 12.7 Tonnes of nature based carbon credits </div>
        <div style={{marginBottom: 30}}> 0 kg of ocean and nature-bound plastic waste received </div>
        <div style={{marginBottom: 30}}> 16 trees planted </div>

       
      </header>
    </div>
  );
}

export default withAuthenticator(App);
