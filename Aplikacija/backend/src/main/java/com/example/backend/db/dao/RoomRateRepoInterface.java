package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.RoomRate;

public interface RoomRateRepoInterface {
    public List<RoomRate> getRoomRates(int idC);
    public int insertRoomRates(List<RoomRate> roomrates);
}
