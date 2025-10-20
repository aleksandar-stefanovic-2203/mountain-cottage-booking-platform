package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Cottage;

public class CottageRepo implements CottageRepoInterface {

    @Override
    public Cottage getCottage(String name){
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM cottage WHERE name = ?");){            
            stm.setString(1, name);

            ResultSet rs = stm.executeQuery();

            if(rs.next()){
                return new Cottage(rs.getInt("idC"), rs.getString("name"), rs.getString("location"), rs.getString("services"), rs.getString("phoneNumber"), rs.getInt("capacity"), rs.getString("ownerUsername"));
            }

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public List<Cottage> getCottages(String ownerUsername) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM cottage" + ((ownerUsername != null) ? " WHERE ownerUsername = ?" : ""));){            
            if(ownerUsername != null) stm.setString(1, ownerUsername);

            ResultSet rs = stm.executeQuery();
            List<Cottage> cottages = new ArrayList<>();

            while(rs.next()){
                cottages.add(new Cottage(rs.getInt("idC"), rs.getString("name"), rs.getString("location"), rs.getString("services"), rs.getString("phoneNumber"), rs.getInt("capacity"), rs.getString("ownerUsername")));
            }

            return cottages;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int deleteCottage(int idC) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("DELETE FROM cottage WHERE idC = ?");){            
            stm.setInt(1, idC);

            return stm.executeUpdate();

        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public int insertCottage(Cottage cottage) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm1 = con.prepareStatement("INSERT INTO cottage (name, location, services, phoneNumber, capacity, ownerUsername) VALUES (?, ?, ?, ?, ?, ?)");
        PreparedStatement stm2 = con.prepareStatement("SELECT idC FROM cottage WHERE name = ?")){
            stm1.setString(1, cottage.getName());
            stm1.setString(2, cottage.getLocation());
            stm1.setString(3, cottage.getServices());
            stm1.setString(4, cottage.getPhoneNumber());
            stm1.setInt(5, cottage.getCapacity());
            stm1.setString(6, cottage.getOwnerUsername());

            int value = stm1.executeUpdate();
            if(value == 0) return 0;

            stm2.setString(1, cottage.getName());
            ResultSet rs = stm2.executeQuery();
            if(rs.next()){
                return rs.getInt("idC");
            }
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }
    
}
