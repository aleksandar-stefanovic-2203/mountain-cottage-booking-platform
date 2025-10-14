package com.example.backend.controllers;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.db.dao.UserRepo;
import com.example.backend.models.User;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;



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

    @PostMapping("/register")
    public int register(
        @RequestParam String username,
        @RequestParam String password,
        @RequestParam String firstName,
        @RequestParam String lastName,
        @RequestParam String gender,
        @RequestParam String address,
        @RequestParam String phoneNumber,
        @RequestParam String email,
        @RequestParam String creditCardNumber,
        @RequestParam String type,
        @RequestParam String status,
        @RequestParam(required = false) MultipartFile profilePicture
    ) {
        try {
            User user = new User(username, password, firstName, lastName, gender, address, phoneNumber, email, profilePicture != null ? profilePicture.getBytes() : null, creditCardNumber, type, status);
            return userRepo.register(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return 0;
    }
    
    @PatchMapping("/changePassword/{username}")
    public int changePassword(@PathVariable String username, @RequestBody Map<String, Object> changes){
        return userRepo.changePassword(username, (String) changes.get("oldPassword"), (String) changes.get("newPassword"));
    }

    @GetMapping("/{username}")
    public User getUser(@PathVariable String username) {
        return userRepo.getUser(username);
    }
    
    @PutMapping("/updateData")
    public int updateData(
        @RequestParam String username,
        @RequestParam String password,
        @RequestParam String firstName,
        @RequestParam String lastName,
        @RequestParam String gender,
        @RequestParam String address,
        @RequestParam String phoneNumber,
        @RequestParam String email,
        @RequestParam String creditCardNumber,
        @RequestParam String type,
        @RequestParam String status,
        @RequestParam(required = false) MultipartFile profilePicture,
        @RequestParam String newProfilePicture
    ) {
        try {
            User user = new User(username, password, firstName, lastName, gender, address, phoneNumber, email, profilePicture != null ? profilePicture.getBytes() : null, creditCardNumber, type, status);
            return userRepo.updateData(user, newProfilePicture);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return 0;
    }
}
