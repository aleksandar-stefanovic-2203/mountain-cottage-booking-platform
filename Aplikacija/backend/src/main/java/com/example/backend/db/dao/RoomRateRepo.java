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
    
}
