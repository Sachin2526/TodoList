package com.example.todoList.service;

import com.example.todoList.model.Todo;
import com.example.todoList.repository.TodoRepository;
import com.example.todoList.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;

    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findByIsCompletedFalse();
    }

    @Override
    public List<Todo> getCompletedTodos() {
        return todoRepository.findByIsCompletedTrue();
    }

    @Override
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public Todo completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElse(null);
        if (todo != null) {
            todo.setIsCompleted(true);
            return todoRepository.save(todo);
        }
        return null;
    }

    @Override
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
