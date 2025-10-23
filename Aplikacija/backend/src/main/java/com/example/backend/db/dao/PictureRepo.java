package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.PictureWrapper;

public class PictureRepo implements PictureRepoInterface {

    @Override
    public int insertPictures(byte[][] picturesBytes, int idC) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("INSERT INTO picture (picture, idC) VALUES (?, ?)");){
            stm.setInt(2, idC);

            for(byte[] pictureBytes: picturesBytes){
                stm.setBytes(1, pictureBytes);
                int value = stm.executeUpdate();
                if(value == 0) return 0;
            }

            return 1;
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public List<PictureWrapper> getPictures(int idC) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM picture WHERE idC = ?");){
            stm.setInt(1, idC);

            ResultSet rs = stm.executeQuery();

            List<PictureWrapper> pictures = new ArrayList<>();
            while(rs.next()){
                pictures.add(new PictureWrapper(rs.getBytes("picture")));
            }

            return pictures;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }
    
}
