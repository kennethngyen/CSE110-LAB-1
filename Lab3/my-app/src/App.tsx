import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./navbar";
import { StickyNotes } from "./stickyNotes";
import { ToDoList } from "./toDoList";

const App = () => {
 return (
   <div>
    <Navbar />
     <Routes>
       <Route path="/" element={<StickyNotes />} />
       <Route path="/todolist/:name" element={<ToDoList />} />
     </Routes>
   </div>
 );
};

export default App;