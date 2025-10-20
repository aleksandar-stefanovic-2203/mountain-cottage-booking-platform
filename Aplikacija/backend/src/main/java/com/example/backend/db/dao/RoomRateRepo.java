package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.RoomRate;

public class RoomRateRepo implements RoomRateRepoInterface {

    @Override
    public List<RoomRate> getRoomRates(int idC) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM roomrate WHERE idC = ?");){
            stm.setInt(1, idC);

            ResultSet rs = stm.executeQuery();
            List<RoomRate> roomRates = new ArrayList<>();

            while(rs.next()){
                roomRates.add(new RoomRate(rs.getInt("idRR"), rs.getString("periodName"), rs.getDate("periodStart"), rs.getDate("periodEnd"), rs.getDouble("priceAdult"), rs.getDouble("priceChild"), rs.getInt("idC")));
            }

            return roomRates;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int insertRoomRates(List<RoomRate> roomrates) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("INSERT INTO roomrate (periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES (?, ?, ?, ?, ?, ?)");){
            for(RoomRate roomrate: roomrates){
                stm.setString(1, roomrate.getPeriodName());
                stm.setDate(2, roomrate.getPeriodStart());
                stm.setDate(3, roomrate.getPeriodEnd());
                stm.setDouble(4, roomrate.getPriceAdult());
                stm.setDouble(5, roomrate.getPriceChild());
                stm.setInt(6, roomrate.getIdC());

                int value = stm.executeUpdate();
                if(value == 0) return 0;
            }

            return 1;
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }
    
}
