 package com.example.todoList.controller;


import com.example.todoList.model.Todo;
import com.example.todoList.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping
    public List<Todo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @GetMapping("/completed")
    public List<Todo> getCompletedTodos() {
        return todoService.getCompletedTodos();
    }

    @PostMapping
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
        Todo savedTodo = todoService.createTodo(todo);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<Todo> completeTodo(@PathVariable Long id) {
        Todo updatedTodo = todoService.completeTodo(id);
        if (updatedTodo != null) {
            return ResponseEntity.ok(updatedTodo);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }
    
 // Retrieve all todos and display the main page
    
    //http://localhost:8080/view
    
//    @RequestMapping(value="view",method = RequestMethod.GET)
//    public String viewTodos(Model model) {
//        List<Todo> todos = todoService.getAllTodos();
//        List<Todo> completedTodos = todoService.getCompletedTodos();
//        model.addAttribute("todos", todos);
//        model.addAttribute("completedTodos", completedTodos);
//        return "index"; // Thymeleaf template
//    }
}
