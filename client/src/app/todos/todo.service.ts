import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo, TodoRole } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
readonly todoUrl: string = environment.apiUrl + 'todos';
  constructor(private httpClient: HttpClient) { }

  getTodos(filters?: {
    role?: TodoRole;
    status?: boolean;
    owner?: string;
    body?: string;
    category?: string;
  }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.role) {
        httpParams = httpParams.set('role', filters.role);
      }
      // if (filters.status) {
      //   httpParams = httpParams.set('status', filters.status); //unknown to string, is a boolean
      // }
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if (filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
    }

    return this.httpClient.get<Todo[]>(this.todoUrl, {
      params: httpParams,
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { owner?: string; category?: string; status?: boolean; body?: string}): Todo[] {
    console.log("In filterTodos with filters.status = " + filters.status);
    let filteredTodos = todos;

    if (filters.owner !== undefined) {
      filters.owner = filters.owner.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    console.log("There are " + filteredTodos.length + " todos after owner filtering.");

    // if (filters.category) {
    //   filters.category = filters.category.toLowerCase();
    //   filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    // }

    if (filters.status !== undefined) {

      filteredTodos = filteredTodos.filter(todo => todo.status === filters.status);
    }

    if (filters.body !== undefined) {
      filters.body = filters.body.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    return filteredTodos;
  }
}
