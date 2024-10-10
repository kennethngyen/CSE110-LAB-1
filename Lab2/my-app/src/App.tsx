import React, { useEffect, useState } from 'react';
import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from './hooksExercise';
function App() {
  const [favoritedTitles, setFavoritedTitles] = useState([] as String[]);
  const [notes, setNotes] = useState(dummyNotesList as Note[]); 
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
 const [createNote, setCreateNote] = useState(initialNote);
 useEffect(() => {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");

  if (titleInput) {
    titleInput.addEventListener("focus", function () {
      this.style.backgroundColor = "#e0f7fa";  
    });

    titleInput.addEventListener("blur", function () {
      this.style.backgroundColor = "";  
    });
  }

  if (contentInput) {
    contentInput.addEventListener("focus", function () {
      this.style.backgroundColor = "#e0f7fa";  
    });

    contentInput.addEventListener("blur", function () {
      this.style.backgroundColor = "";
    });
  }
}, []);

 
 const createNoteHandler = (e: React.FormEvent) => {
  e.preventDefault();
  setNotes((oldNotes) => {
    console.log(oldNotes)
    const newNote = {
      ...createNote,
      id: Math.random()*100, 
      favorited: false
    };  
    console.log(newNote)
    return [...oldNotes, newNote];
  });
  }

  const deleteNoteHandler = (id:number) =>{
    setNotes((prevNotes)=>prevNotes.filter((x)=>x.id!==id));
    setFavoritedTitles((prevFavTitles) =>
      prevFavTitles.filter((title) => {
        const noteToDelete = notes.find((note) => note.id === id);
        return noteToDelete && noteToDelete.favorited ? title !== noteToDelete.title : true;
      })
    );
  }

  const toggleFavoriteGivenId = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          if (!note.favorited) {
            setFavoritedTitles((prevFavTitles) => [...prevFavTitles, note.title]);
          } else {
            setFavoritedTitles((prevTitles) =>
              prevTitles.filter((title) => title !== note.title)
            );
          }
          return { ...note, favorited: !note.favorited };
        }
        // return the note at the end with modified favorited
        return note;
      })
    );
  };
 return (
   <div className='app-container'>
     <form className="note-form" onSubmit={createNoteHandler}>
       <div><input
          id="title"
        	placeholder="Note Title"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, title: event.target.value })}
        	required>
      	</input>
    	</div>

    	<div>
      	<textarea
          id="content"
        	onChange={(event) =>
          	setCreateNote({ ...createNote, content: event.target.value })}
            placeholder="Content"
        	required>
            
      	</textarea>
    	</div>

  <div>
     	<select
       	onChange={(event) =>
         	setCreateNote({ ...createNote, label: event.target.value as Label })}
       	required>
       	<option value={Label.personal}>Personal</option>
       	<option value={Label.study}>Study</option>
       	<option value={Label.work}>Work</option>
       	<option value={Label.other}>Other</option>
     	</select>
   	</div>

       <div><button type="submit">Create Note</button></div>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => toggleFavoriteGivenId(note.id)}>
                {note.favorited ? "❤️" : "🤍"}
              </button>
              <button onClick={()=>deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
      </div>

     <ToggleTheme/>
     <div>
        <h3>List of favorites:</h3>
        <ul>
          {favoritedTitles.map((title, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      </div>
   </div>

 );
}

export default App;
