// db.js
import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  products: "++id, product", // Primary key and indexed props
});
