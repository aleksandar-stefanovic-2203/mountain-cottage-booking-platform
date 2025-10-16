package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.db.DB;
import com.example.backend.db.Picture;
import com.example.backend.models.PictureWrapper;
import com.example.backend.models.User;

@Service
public class UserRepo implements UserRepoInterface {

    private final PasswordEncoder passwordEncoder;
    private final byte[] defaultProfilePictureBytes;
    private final byte[] mastercardPictureBytes;
    private final byte[] visaPictureBytes;
    private final byte[] dinersPictureBytes;

    public UserRepo(PasswordEncoder passwordEncoder, Picture picture){
        this.passwordEncoder = passwordEncoder;
        this.defaultProfilePictureBytes = picture.getDefaultProfilePictureBytes();
        this.mastercardPictureBytes = picture.getMastercardPictureBytes();
        this.visaPictureBytes = picture.getVisaPictureBytes();
        this.dinersPictureBytes = picture.getDinersPictureBytes();
    }

    @Override
    public User login(User user) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM user WHERE BINARY username = ? AND type = ? AND status = 'активан'");){
            stm.setString(1, user.getUsername());
            stm.setString(2, user.getType());

            ResultSet rs = stm.executeQuery();

            if(rs.next() && passwordEncoder.matches(user.getPassword(), rs.getString("password"))){
                return new User(rs.getString("username"), rs.getString("password"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("gender"), rs.getString("address"), rs.getString("phoneNumber"), rs.getString("email"), rs.getBytes("profilePicture") != null ? rs.getBytes("profilePicture") : defaultProfilePictureBytes, rs.getString("creditCardNumber"), rs.getString("type"), rs.getString("status"));
            }

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int register(User user) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'непознат')");){
            stm.setString(1, user.getUsername());
            stm.setString(2, passwordEncoder.encode(user.getPassword()));
            stm.setString(3, user.getFirstName());
            stm.setString(4, user.getLastName());
            stm.setString(5, user.getGender());
            stm.setString(6, user.getAddress());
            stm.setString(7, user.getPhoneNumber());
            stm.setString(8, user.getEmail());
            stm.setBytes(9, user.getProfilePictureBytes());
            stm.setString(10, user.getCreditCardNumber());
            stm.setString(11, user.getType());

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public int changePassword(String username, String oldPassword, String newPassword) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT password FROM user WHERE BINARY username = ? AND status = 'активан'");
        PreparedStatement stm2 = con.prepareStatement("UPDATE user SET password = ? WHERE BINARY username = ? AND status = 'активан'")){
            stm.setString(1, username);

            stm2.setString(1, passwordEncoder.encode(newPassword));
            stm2.setString(2, username);

            ResultSet rs = stm.executeQuery();

            if(!rs.next()) return -1;

            if(!passwordEncoder.matches(oldPassword, rs.getString("password"))) return -2;
            
            if(oldPassword.equals(newPassword)) return -3;

            return stm2.executeUpdate();

        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public User getUser(String username) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM user WHERE BINARY username = ?");){
            stm.setString(1, username);

            ResultSet rs = stm.executeQuery();

            if(rs.next()){
                return new User(rs.getString("username"), rs.getString("password"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("gender"), rs.getString("address"), rs.getString("phoneNumber"), rs.getString("email"), rs.getBytes("profilePicture") != null ? rs.getBytes("profilePicture") : defaultProfilePictureBytes, rs.getString("creditCardNumber"), rs.getString("type"), rs.getString("status"));
            }

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int updateData(User user, String newProfilePicture) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("UPDATE user SET firstName = ?, lastName = ?, gender = ?, address = ?, phoneNumber = ?, email = ?, " + (newProfilePicture.equals("Да") ? "profilePicture = ?," : "") + "creditCardNumber = ?, type = ? WHERE username = ?");){                                                
            stm.setString(1, user.getFirstName());
            stm.setString(2, user.getLastName());
            stm.setString(3, user.getGender());
            stm.setString(4, user.getAddress());
            stm.setString(5, user.getPhoneNumber());
            stm.setString(6, user.getEmail());

            int index = 7;
            if(newProfilePicture.equals("Да")){
                stm.setBytes(index, user.getProfilePictureBytes());
                index++;
            }
            stm.setString(index, user.getCreditCardNumber());
            stm.setString(index + 1, user.getType());
            stm.setString(index + 2, user.getUsername());

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public List<User> getAllUsers() {
        return this.getUsers(true);
    }

    @Override
    public List<User> getAllRegistrationRequests() {
        return this.getUsers(false);
    }
    
    private List<User> getUsers(boolean allUsers){
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM user WHERE status " + (allUsers ? "!=" : "=") + " 'непознат' ORDER BY status, username");){

            ResultSet rs = stm.executeQuery();
            List<User> users = new ArrayList<>();

            while(rs.next()){
                users.add(new User(rs.getString("username"), rs.getString("password"), rs.getString("firstName"), rs.getString("lastName"), rs.getString("gender"), rs.getString("address"), rs.getString("phoneNumber"), rs.getString("email"), rs.getBytes("profilePicture") != null ? rs.getBytes("profilePicture") : defaultProfilePictureBytes, rs.getString("creditCardNumber"), rs.getString("type"), rs.getString("status")));
            }

            return users;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int changeStatus(String username, String status) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("UPDATE user SET status = ? WHERE username = ?");){                                                
            stm.setString(1, status);
            stm.setString(2, username);

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public PictureWrapper getPictureBytes(String type) {
        switch (type) {
            case "mastercard":
                return new PictureWrapper(mastercardPictureBytes);
            
            case "visa":
                return new PictureWrapper(visaPictureBytes);

            case "diners":
                return new PictureWrapper(dinersPictureBytes);

            default:
                return null;
        }
    }
}
