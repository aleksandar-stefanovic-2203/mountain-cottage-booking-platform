package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.PictureWrapper;

public interface PictureRepoInterface {
    public int insertPictures(byte[][] picturesBytes, int idC);
    public List<PictureWrapper> getPictures(int idC);
}
