package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Cottage;

public interface CottageRepoInterface {
    public List<Cottage> getCottages(String ownerUsername);
}
