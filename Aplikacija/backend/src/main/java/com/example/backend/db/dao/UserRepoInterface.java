package com.example.backend.db.dao;

import java.util.List;

import com.example.backend.models.User;

public interface UserRepoInterface {
    public User login(User user);
    public int register(User user);
    public int changePassword(String username, String oldPassword, String newPassword);
    public User getUser(String username);
    public int updateData(User user, String newProfilePicture);
    public List<User> getAllUsers();
    public List<User> getAllRegistrationRequests();
}
