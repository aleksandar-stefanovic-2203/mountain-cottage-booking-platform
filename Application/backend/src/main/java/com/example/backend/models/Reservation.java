package com.example.backend.models;

import java.time.LocalDateTime;

public class Reservation {
    private int idR;
    private LocalDateTime reservationDate;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private int numberOfAdults;
    private int numberOfChildren;
    private double price;
    private int idC;
    private String touristUsername;
    private String additionalRequests;
    private String status;
    private String comment;

    public Reservation(int idR, LocalDateTime reservationDate, LocalDateTime startDate, LocalDateTime endDate,
            int numberOfAdults, int numberOfChildren, double price, int idC, String touristUsername,
            String additionalRequests, String status, String comment) {

        this.idR = idR;
        this.reservationDate = reservationDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfAdults = numberOfAdults;
        this.numberOfChildren = numberOfChildren;
        this.price = price;
        this.idC = idC;
        this.touristUsername = touristUsername;
        this.additionalRequests = additionalRequests;
        this.status = status;
        this.comment = comment;
        
    }

    public int getIdR() {
        return idR;
    }

    public void setIdR(int idR) {
        this.idR = idR;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public int getNumberOfAdults() {
        return numberOfAdults;
    }

    public void setNumberOfAdults(int numberOfAdults) {
        this.numberOfAdults = numberOfAdults;
    }

    public int getNumberOfChildren() {
        return numberOfChildren;
    }

    public void setNumberOfChildren(int numberOfChildren) {
        this.numberOfChildren = numberOfChildren;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

    public String getTouristUsername() {
        return touristUsername;
    }

    public void setTouristUsername(String touristUsername) {
        this.touristUsername = touristUsername;
    }

    public String getAdditionalRequests() {
        return additionalRequests;
    }

    public void setAdditionalRequests(String additionalRequests) {
        this.additionalRequests = additionalRequests;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
