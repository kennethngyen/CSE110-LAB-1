import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import App from './App';

test("renders Create Note", () => {
 render(
   <BrowserRouter>
     <App />
   </BrowserRouter>
 );
 const createNoteElement = screen.getByText("Create Note");
 expect(createNoteElement).toBeInTheDocument();
});