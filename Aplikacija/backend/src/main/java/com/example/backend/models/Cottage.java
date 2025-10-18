package com.example.backend.models;

public class Cottage {
    private int idC;
    private String name;
    private String location;
    private String services;
    private String phoneNumber;
    private int capacity;
    private String ownerUsername;
    
    public Cottage(int idC, String name, String location, String services, String phoneNumber, int capacity, String ownerUsername) {
        this.idC = idC;
        this.name = name;
        this.location = location;
        this.services = services;
        this.phoneNumber = phoneNumber;
        this.capacity = capacity;
        this.ownerUsername = ownerUsername;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getOwnerUsername() {
        return ownerUsername;
    }

    public void setOwnerUsername(String ownerUsername) {
        this.ownerUsername = ownerUsername;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
    
}
