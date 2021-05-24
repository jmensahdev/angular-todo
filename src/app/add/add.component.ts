import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  todo: Todo = {
    id: '',
    label: '',
    description: '',
    isComplete: false,
    dueDate: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }
  constructor(
    private router: Router,
    private service: ServiceService
    ) { }

  ngOnInit(): void {
  }

  addTodo(): void {
    const oldTodos: Todo[] = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    this.todo.id = oldTodos.length.toString();
    console.log('todo', this.todo);
    const isadd = this.service.addTodo(this.todo);
    if (isadd) {
      alert('sauvegarder !!!');
      this.router.navigate(['/']);
    } else {
      alert('pas sauvegarder !!!');
    }
  }

  return(): void {
    this.router.navigate(['/']);
  }

}
