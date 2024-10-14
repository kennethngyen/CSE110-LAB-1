import { fireEvent, render, screen } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("create stickyNote", () => {
 test("renders create note form", () => {
   render(<StickyNotes />);

   const createNoteButton = screen.getByText("Create Note");
   expect(createNoteButton).toBeInTheDocument();
 });

 test("creates a new note", () => {
   render(<StickyNotes />);

// Please make sure your sticky note has a title and content input field with the following placeholders.
   const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
   const createNoteContentTextarea =
     screen.getByPlaceholderText("Note Content");
   const createNoteButton = screen.getByText("Create Note");

   fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
   fireEvent.change(createNoteContentTextarea, {
     target: { value: "Note content" },
   });
   fireEvent.click(createNoteButton);

   

   const newNoteTitle = screen.getByText("New Note");
   const newNoteContent = screen.getByText("Note content");

   expect(newNoteTitle).toBeInTheDocument();
   expect(newNoteContent).toBeInTheDocument();
 });

 test("favorite first note, delete it, and check if favorite state is empty", () => {
    render(<StickyNotes />);

    const favoriteButton = screen.getAllByText("🤍")[0];
    fireEvent.click(favoriteButton);
    const favoritedHeart = screen.getAllByText("❤️")[0];
    expect(favoritedHeart).toBeInTheDocument();

    //delete first note
    const deleteButton = screen.getAllByText("x")[0];
    fireEvent.click(deleteButton);

    const favoritedNote = screen.queryByText("test note 1 title");
    expect(favoritedNote).not.toBeInTheDocument();
  });  
});

describe("delete, favorite, edit, and remove a note", () => {
    test("delete 5 notes, favorite the remaining note, edit its title, and delete it", () => {
      render(<StickyNotes />);
      const deleteButtons = screen.getAllByText("x");
      for (let i = 0; i < 5; i++) {
        fireEvent.click(deleteButtons[i]);
      }
      const remainingNoteTitle = screen.getByText("test note 6 title");
      expect(remainingNoteTitle).toBeInTheDocument();

      console.log('remainingNote:', remainingNoteTitle.innerHTML);
  
      const favoriteButton = screen.getByText("🤍");
      fireEvent.click(favoriteButton);
  
      expect(screen.getByText("❤️")).toBeInTheDocument();
  

      fireEvent.blur(remainingNoteTitle, { target: { innerText: "edited" } });
  
  
      const remainingDeleteButton = screen.getByText("x");
      fireEvent.click(remainingDeleteButton);
  
      expect(screen.queryByText("edited")).not.toBeInTheDocument();
    });
  });
  