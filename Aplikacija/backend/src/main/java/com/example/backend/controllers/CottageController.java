package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.CottageRepo;
import com.example.backend.models.Cottage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/cottages")
@CrossOrigin(origins = "http://localhost:4200/")
public class CottageController {

    @GetMapping("/{name}")
    public Cottage getCottage(@PathVariable String name) {
        return new CottageRepo().getCottage(name);
    }

    @GetMapping("")
    public List<Cottage> getCottages(@RequestParam(required = false) String ownerUsername) {
        return new CottageRepo().getCottages(ownerUsername);
    }

    @DeleteMapping("/deleteCottage/{idC}")
    public int deleteCottage(@PathVariable int idC){
        return new CottageRepo().deleteCottage(idC);
    }

    @PostMapping("/insertCottage")
    public int insertCottage(@RequestBody Cottage cottage) {
        return new CottageRepo().insertCottage(cottage);
    }
    
}
