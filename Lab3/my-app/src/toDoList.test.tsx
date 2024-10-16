import { render, screen } from "@testing-library/react";
import { dummyGroceryList } from "./constants";
import { ToDoList } from "./toDoList";

describe("To Do List", () => {
  test("displays all to-do items on the screen", () => {
    render(<ToDoList />);

    dummyGroceryList.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  test("number of checked items matches the count displayed in the title", () => {
    render(<ToDoList />);

    const checkedItems = dummyGroceryList.filter(item => item.isPurchased).length;

    expect(screen.getByText(`Items bought: ${checkedItems}`)).toBeInTheDocument();
  });
});
