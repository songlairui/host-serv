import Lowdb = require("lowdb");

export interface DBData {
  projects: string[];
  foldersFavorite: string[];
  tasks: string[];
  config: {
    [key: string]: any;
  };
}

export interface Context {
  request: any;
  db: Lowdb.LowdbSync<DBData>;
}

export interface Workspace {
  id: string;
  folders: {
    name?: string;
    path: string;
  }[];
  settings: {
    [key: string]: any;
  };
}
