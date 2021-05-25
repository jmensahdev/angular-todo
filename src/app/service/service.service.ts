import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  todo = null;
  constructor() { }

  getTodo() : Todo[] {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
  }

  addTodo(todo: Todo): boolean {
    // recupération des todos du localstorages
    try {
      const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
      oldTodos.push(todo);
      localStorage.setItem('todos', JSON.stringify(oldTodos));
      return true;
    } catch (error) {
      return false;
    }
  }

  getOneTodo(id: string):Todo {
    const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    return oldTodos.find(x => x.id === id);
  }
  
  isDone(id: string): boolean {    
    try {
      const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
      oldTodos[oldTodos.findIndex(x => x.id === id)].isComplete = true;
      localStorage.setItem('todos', JSON.stringify(oldTodos));
      return true
    } catch (error) {
      return false;
    }
  }

  
  isUnDone(id: string): boolean {    
    try {
      const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
      oldTodos[oldTodos.findIndex(x => x.id === id)].isComplete = false;
      localStorage.setItem('todos', JSON.stringify(oldTodos));
      return true
    } catch (error) {
      return false;
    }
  }

  editTodo(todo: Todo): Todo {
    try {
      const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
      // find todo index for edit by id
      const index = oldTodos.findIndex(x => x.id === todo.id);
      oldTodos[index] = todo;
      localStorage.setItem('todos', JSON.stringify(oldTodos));
      return todo;
    } catch (error) {
      // si error
      return null
    }
  }


  deleteTodo(id): boolean {
    try {
      let oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
      oldTodos = oldTodos.filter(x => x.id !== id);
      localStorage.setItem('todos', JSON.stringify(oldTodos));
      return true;
    } catch (error) {
      return false;
    }
  }
}
