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

  done(id: string): void {
    this.service.isDone(id);
    this.getAll();
  }
  undone(id: string): void {
    this.service.isUnDone(id);
    this.getAll();
  }

  saveEdit(): void {
    this.service.editTodo(this.editTodo);
    this.return();
  }

  goToAdd(): void {
    this.router.navigate(['/add']);
  }

  return(): void {
    this.getAll();
    this.showEdit = false;
  }

  delete(id: string): void {
    this.service.deleteTodo(id);
    this.getAll();

  }

}
