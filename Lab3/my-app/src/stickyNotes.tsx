import React, { useEffect, useState } from 'react';
import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import ToggleTheme from './hooksExercise';
import { FavoritedNote, Label, Note } from "./types"; // Import the Label type from the appropriate module

export const StickyNotes = () => {
    const [favoritedTitles, setFavoritedTitles] = useState([] as FavoritedNote[]);
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

const updateNoteTitle = (id: number, newTitle: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, title: newTitle } : note))
    );
    setFavoritedTitles((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, title: newTitle } : note))
      );
  };

const deleteNoteHandler = (id: number) => {
setNotes((prevNotes) => {
    const noteToDelete = prevNotes.find((note) => note.id === id);

    if (noteToDelete && noteToDelete.favorited) {
    // Update the favorited titles first
    setFavoritedTitles((prevFavTitles) =>
        prevFavTitles.filter((favNote) => favNote.id !== id)
    );
    }

    return prevNotes.filter((note) => note.id !== id);
});
};
const toggleFavoriteGivenId = (id: number) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          if (!note.favorited) {
            // Add an object {id, title} to the favoritedTitles array
            setFavoritedTitles((prevFavTitles) => [
              ...prevFavTitles,
              { id: note.id, title: note.title }
            ]);
          } else {
            // Remove the object with the matching id from the favoritedTitles array
            setFavoritedTitles((prevTitles) =>
              prevTitles.filter((favNote) => favNote.id !== note.id)
            );
          }
          return { ...note, favorited: !note.favorited };
        }
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
          placeholder="Note Content"
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
          <h2
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => updateNoteTitle(note.id, e.target.innerText)}
            >
        {note.title} </h2>
          <p> {note.content} </p> 
          <p> {note.label} </p>
        </div>
      ))}
    </div>

   <ToggleTheme/>
   <div>
      <h3>List of favorites:</h3>
      <ul>
        {favoritedTitles.map((note, index) => (
          <li key={index}>{note.title}</li>
        ))}
      </ul>
    </div>
 </div>

);
}