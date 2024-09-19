import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable()
export class TodoService {
  readonly todoUrl: string = environment.apiUrl + 'todos';
  constructor(private httpClient: HttpClient) { }
  getTodos(filters?: { status?: boolean; category?: string }): Observable<Todo[]> {
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status.toString());
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


  filterTodos(todos: Todo[], filters: { owner?: string; category?: string; body?: string }): Todo[] {
    // let filteredUsers = users;

    if (filters.owner) {
      return todos;
    }

    // if (filters.company) {
    //   filters.company = filters.company.toLowerCase();
    //   filteredUsers = filteredUsers.filter(user => user.company.toLowerCase().indexOf(filters.company) !== -1);
    // }

    return todos;
  }
}
