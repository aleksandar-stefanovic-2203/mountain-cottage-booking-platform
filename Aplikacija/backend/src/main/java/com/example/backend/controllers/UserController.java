package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.UserRepo;
import com.example.backend.models.User;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200/")
public class UserController {

    @Autowired
    private UserRepo userRepo;
    
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return userRepo.login(user);
    }
}
