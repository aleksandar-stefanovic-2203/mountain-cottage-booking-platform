package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Cottage;

public interface CottageRepoInterface {
    public Cottage getCottage(String name);
    public List<Cottage> getCottages(String ownerUsername);
    public int deleteCottage(int idC);
}
