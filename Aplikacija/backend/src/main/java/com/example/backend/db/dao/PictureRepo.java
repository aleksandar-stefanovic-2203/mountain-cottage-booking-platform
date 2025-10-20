package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.example.backend.db.DB;

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
    
}
