package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Reservation;

public interface ReservationRepoInterface {
    public int reserve(Reservation reservation);
    public List<Reservation> getReservations(String touristUsername);
    public List<Reservation> getReservationsOwner(String ownerUsername);
    public int setStatusAndComment(int idR, String status, String comment);
    public int cancelReservation(int idR);
}
