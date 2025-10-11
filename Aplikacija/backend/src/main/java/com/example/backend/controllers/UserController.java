package com.example.backend.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
            if(profilePicture == null) {
                Path path = Path.of("public/default-profile-picture.jpg");
                String name = "profilePicture";
                String originalFileName = "default-profile-picture.jpg";
                String contentType = "image/jpg";

                byte[] content = Files.readAllBytes(path);
                profilePicture = new MockMultipartFile(name, originalFileName, contentType, content);
            }
            User user = new User(username, password, firstName, lastName, gender, address, phoneNumber, email, profilePicture, creditCardNumber, type, status);
            return userRepo.register(user);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return 0;
    }
    
}
