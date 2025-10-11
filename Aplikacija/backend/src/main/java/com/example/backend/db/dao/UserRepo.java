package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.db.DB;
import com.example.backend.models.User;

@Service
public class UserRepo implements UserRepoInterface {

    private final PasswordEncoder passwordEncoder;

    public UserRepo(PasswordEncoder passwordEncoder){
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User login(User user) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM user WHERE username = ? AND type = ? AND status = 'активан'");){
            stm.setString(1, user.getUsername());
            stm.setString(2, user.getType());

            ResultSet rs = stm.executeQuery();

            if(rs.next() && passwordEncoder.matches(user.getPassword(), rs.getString("password"))){
                return new User(rs.getString("username"), rs.getString("password"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("gender"), rs.getString("address"), rs.getString("phoneNumber"), rs.getString("email"), rs.getString("creditCardNumber"), rs.getString("type"), rs.getString("status"));
            }
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int register(User user) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'непознат')");){
            stm.setString(1, user.getUsername());
            stm.setString(2, passwordEncoder.encode(user.getPassword()));
            stm.setString(3, user.getFirstName());
            stm.setString(4, user.getLastName());
            stm.setString(5, user.getGender());
            stm.setString(6, user.getAddress());
            stm.setString(7, user.getPhoneNumber());
            stm.setString(8, user.getEmail());
            stm.setString(9, user.getCreditCardNumber());
            stm.setString(10, user.getType());

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }
    
}
