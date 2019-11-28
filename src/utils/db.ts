import Lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import * as path from "path";
import { DBData } from "../interface";

const db = Lowdb(new FileSync<DBData>(path.resolve(__dirname, "db.json")));

// Seed an empty DB
db.defaults({
  projects: [],
  foldersFavorite: [],
  tasks: [],
  config: {}
}).write();

export default db;
