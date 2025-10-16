package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.CottageRepo;
import com.example.backend.models.Cottage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/cottages")
@CrossOrigin(origins = "http://localhost:4200/")
public class CottageController {

    @GetMapping("")
    public List<Cottage> getCottages(@RequestParam(required = false) String ownerUsername) {
        return new CottageRepo().getCottages(ownerUsername);
    }
    
}
