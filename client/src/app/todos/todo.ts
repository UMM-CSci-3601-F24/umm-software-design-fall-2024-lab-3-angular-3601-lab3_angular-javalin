export interface Todo {
  _id: string;
  owner: string;
  status: boolean;
  body: string;
  category: string;
  role: TodoRole;
}

export type TodoRole = 'admin' | 'editor' | 'viewer';




