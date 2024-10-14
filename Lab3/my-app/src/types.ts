export enum Label {
    personal = "personal",
    study = "study",
    work = "work",
    other = "other",
 }
 
 export type Note = {
   favorited: boolean;
   id: number;
   title: string;
   content: string;
   label: Label;
 };

 export type FavoritedNote = {
   id: number;
   title: string;
   };

 export type GroceryItem = { name: string; isPurchased: boolean };