package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.Reservation;
import com.example.backend.models.RoomRate;

public interface RoomRateRepoInterface {
    public List<RoomRate> getRoomRates(int idC);
    public int insertRoomRates(List<RoomRate> roomrates);
    public int updateRoomRates(List<RoomRate> roomrates);
    public double getPrice(Reservation reservation, int idC);
}
