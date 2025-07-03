package com.example.todoList.service;


import com.example.todoList.model.Todo;

import java.util.List;

public interface TodoService {
    List<Todo> getAllTodos();
    List<Todo> getCompletedTodos();
    Todo createTodo(Todo todo);
    Todo completeTodo(Long id);
    void deleteTodo(Long id);
}
