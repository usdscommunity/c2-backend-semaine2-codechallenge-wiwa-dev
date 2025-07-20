import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, Priority } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { randomUUID } from 'crypto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  createTodo(dto: CreateTodoDto): Todo {
    const now = new Date();
    const newTodo: Todo = {
      id: randomUUID(),
      title: dto.title,
      description: dto.description ?? '',
      priority: dto.priority ?? 'medium',
      tags: dto.tags ?? [],
      isFavorite: dto.isFavorite ?? false,
      cretedAt: now,
      updatedAt: now,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodos(filter?: {
    priority?: string;
    tag?: string;
    isFavorite?: string;
    search?: string;
  }): Todo[] {
    let result = [...this.todos];

    if (filter?.priority) {
      result = result.filter((todo) => todo.priority === filter.priority);
    }

    if (filter?.tag) {
      result = result.filter(
        (todo) => filter.tag !== undefined && todo.tags?.includes(filter.tag),
      );
    }

    if (filter?.isFavorite !== undefined) {
      const isFav = filter.isFavorite === 'true';
      result = result.filter((todo) => todo.isFavorite === isFav);
    }

    if (filter?.search) {
      const search = filter.search.toLowerCase();
      result = result.filter(
        (todo) =>
          todo.title.toLowerCase().includes(search) ||
          todo.description?.toLowerCase().includes(search),
      );
    }

    return result;
  }

  getTodoById(id: string): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Todo with id "${id}" not found`);
    return todo;
  }

  updateTodo(id: string, dto: UpdateTodoDto): Todo {
    const todo = this.getTodoById(id);

    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.description !== undefined) todo.description = dto.description;
    if (dto.priority !== undefined) todo.priority = dto.priority;
    if (dto.tags !== undefined) todo.tags = dto.tags;
    if (dto.isFavorite !== undefined) todo.isFavorite = dto.isFavorite;

    todo.updatedAt = new Date();

    return todo;
  }

  deleteTodo(id: string): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    this.todos.splice(index, 1);
  }
}
