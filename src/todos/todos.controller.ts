import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.model';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  createTodo(@Body() dto: CreateTodoDto): Todo {
    return this.todosService.createTodo(dto);
  }

  @Get()
  getTodos(
    @Query('priority') priority?: string,
    @Query('tag') tag?: string,
    @Query('isFavorite') isFavorite?: string,
    @Query('search') search?: string,
  ): Todo[] {
    return this.todosService.getTodos({ priority, tag, isFavorite, search });
  }

  @Get(':id')
  getTodoById(@Param('id') id: string): Todo {
    return this.todosService.getTodoById(id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto): Todo {
    return this.todosService.updateTodo(id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): void {
    return this.todosService.deleteTodo(id);
  }
}
