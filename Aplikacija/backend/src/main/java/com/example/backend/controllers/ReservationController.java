package com.example.backend.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.ReservationRepo;
import com.example.backend.models.Reservation;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/reservations")
@CrossOrigin(origins = "http://localhost:4200/")
public class ReservationController {
    
    @PostMapping("/reserve")
    public int reserve(@RequestBody Reservation reservation) {
        return new ReservationRepo().reserve(reservation);
    }
    
    @GetMapping
    public List<Reservation> getReservations(@RequestParam String touristUsername) {
        return new ReservationRepo().getReservations(touristUsername);
    }
    
    @GetMapping("/owner")
    public List<Reservation> getReservationsOwner(@RequestParam String ownerUsername) {
        return new ReservationRepo().getReservationsOwner(ownerUsername);
    }

    @PatchMapping("/setStatusAndComment/{idR}")
    public int setStatusAndComment(@PathVariable int idR, @RequestBody Map<String, Object> changes){
        return new ReservationRepo().setStatusAndComment(idR, (String)changes.get("status"), (String)changes.get("comment"));
    }

}
