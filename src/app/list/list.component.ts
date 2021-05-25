import { i18nMetaToDocStmt } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { ServiceService } from '../service/service.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  todos: Todo[];
  editTodo: Todo;
  showEdit = false;

  constructor(
    private service: ServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * @description get all todo to this.todos
   */
  getAll(): void {
    this.todos = this.service.getTodo();
  }

  edit(id: string): void {
    this.editTodo = this.service.getOneTodo(id);
    console.log('id', id, this.editTodo);
    if (this.editTodo) {
      this.showEdit  = true;
    } else {
      this.showEdit = false;
    }
  }

  /**
   * 
   * @description set todo item to complete
   */
  done(id: string): void {
    this.service.isDone(id);
    this.getAll();
  }

  /**
   * 
   * @description set todo item to undone
   */
  undone(id: string): void {
    this.service.isUnDone(id);
    this.getAll();
  }

  /**
   * @description Edited on todo
   */
  saveEdit(): void {
    this.service.editTodo(this.editTodo);
    this.return();
  }

  /**
   * @description navigate to add interface
   */
  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  /**
   * @description return to list and refresh todos list
   */
  return(): void {
    this.getAll();
    this.showEdit = false;
  }

  /**
   * 
   * @param id todo item
   * @description delete one todo by id and refresh list
   */
  delete(id: string): void {
    this.service.deleteTodo(id);
    this.getAll();

  }

  // thank for whating :)

}
