import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import { dummyGroceryList } from "./constants";
import { GroceryItem } from "./types";

import { useParams } from "react-router-dom";

export function ToDoList() {
 const [numRemainingItems, setNumRemainingItems] = useState(0);
 const { name } = useParams();
 let [items, setItems] = useState(dummyGroceryList);

 function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
   const checkbox: HTMLInputElement = e.target as HTMLInputElement;

   const itemName = checkbox.name;

   const itemIndex = items.findIndex((item) => item.name === itemName);
   items[itemIndex] = { name: itemName, isPurchased: checkbox.checked };

   const uncheckedItems = items.filter((item) => !item.isPurchased);
   const checkedItems = items.filter((item) => item.isPurchased);

   const newItems = uncheckedItems.concat(checkedItems);

   setItems(newItems);

   const diff = checkbox.checked ? 1 : -1;

   setNumRemainingItems(numRemainingItems + diff);
 }

 return (
   <div className="App">
     <div className="App-body">
     <h1>{name}'s To Do List</h1>
     Items bought: {numRemainingItems}
       <form action=".">
         {items.map((item) => ListItem(item, handleCheckboxClick))}
       </form>
     </div>
   </div>
 );
}

function ListItem(item: GroceryItem, changeHandler: ChangeEventHandler) {
 return (
   <div>
     <input
       type="checkbox"
       onChange={changeHandler}
       checked={item.isPurchased}
       name={item.name}
     />
     {item.name}
   </div>
 );
}