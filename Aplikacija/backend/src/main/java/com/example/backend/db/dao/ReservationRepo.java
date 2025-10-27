package com.example.backend.db.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.backend.db.DB;
import com.example.backend.models.Reservation;

public class ReservationRepo implements ReservationRepoInterface {

    @Override
    public int reserve(Reservation reservation) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("INSERT INTO reservation (startDate, endDate, numberOfAdults, numberOfChildren, price, idC, touristUsername, additionalRequests, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'непознат')");
        PreparedStatement stm2 = con.prepareStatement("SELECT capacity FROM cottage WHERE idC = ?");
        PreparedStatement stm3 = con.prepareStatement("SELECT SUM(numberOfAdults) AS totalNumberOfAdults, SUM(numberOfChildren) AS totalNumberOfChildren FROM reservation WHERE idC = ? AND status = 'прихваћена' AND ? >= startDate AND ? <= endDate")){
            stm2.setInt(1, reservation.getIdC());

            ResultSet rs = stm2.executeQuery();
            int capacity;
            if(rs.next()) capacity = rs.getInt("capacity");
            else return 0;
            
            stm3.setInt(1, reservation.getIdC());
            for(LocalDateTime currDate = reservation.getStartDate(); currDate.isBefore(reservation.getEndDate()); currDate = currDate.plusDays(1)){
                stm3.setObject(2, currDate.toLocalDate());
                stm3.setObject(3, currDate.toLocalDate());

                rs = stm3.executeQuery();

                int numberOfFreeSpaces = capacity;
                if(rs.next()){
                    numberOfFreeSpaces -= (rs.getInt("totalNumberOfAdults") + rs.getInt("totalNumberOfChildren"));
                }

                if(numberOfFreeSpaces < reservation.getNumberOfAdults() + reservation.getNumberOfChildren()) return -1;
            }

            stm.setObject(1, reservation.getStartDate());
            stm.setObject(2, reservation.getEndDate());
            stm.setInt(3, reservation.getNumberOfAdults());
            stm.setInt(4, reservation.getNumberOfChildren());
            stm.setDouble(5, reservation.getPrice());
            stm.setInt(6, reservation.getIdC());
            stm.setString(7, reservation.getTouristUsername());
            stm.setString(8, reservation.getAdditionalRequests());

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public List<Reservation> getReservations(String touristUsername) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM reservation" + ((touristUsername != null) ? " WHERE BINARY touristUsername = ?" : ""));){
            if(touristUsername != null) stm.setString(1, touristUsername);

            ResultSet rs = stm.executeQuery();

            List<Reservation> reservations = new ArrayList<>();

            while(rs.next()){
                reservations.add(new Reservation(rs.getInt("idR"), (LocalDateTime)rs.getObject("reservationDate"), (LocalDateTime)rs.getObject("startDate"), (LocalDateTime)rs.getObject("endDate"), rs.getInt("numberOfAdults"), rs.getInt("numberOfChildren"), rs.getDouble("price"), rs.getInt("idC"), rs.getString("touristUsername"), rs.getString("additionalRequests"), rs.getString("status"), rs.getString("comment")));
            }

            return reservations;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }
    
    @Override
    public List<Reservation> getReservationsOwner(String ownerUsername) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("SELECT * FROM reservation JOIN cottage ON reservation.idC = cottage.idC WHERE ownerUsername = ?");){
            stm.setString(1, ownerUsername);

            ResultSet rs = stm.executeQuery();

            List<Reservation> reservations = new ArrayList<>();

            while(rs.next()){
                reservations.add(new Reservation(rs.getInt("idR"), (LocalDateTime)rs.getObject("reservationDate"), (LocalDateTime)rs.getObject("startDate"), (LocalDateTime)rs.getObject("endDate"), rs.getInt("numberOfAdults"), rs.getInt("numberOfChildren"), rs.getDouble("price"), rs.getInt("idC"), rs.getString("touristUsername"), rs.getString("additionalRequests"), rs.getString("status"), rs.getString("comment")));
            }

            return reservations;

        } catch (SQLException e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    public int setStatusAndComment(int idR, String status, String comment) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("UPDATE reservation SET status = ?, comment = ? WHERE idR = ?");){
            stm.setString(1, status);
            stm.setString(2, comment);
            stm.setInt(3, idR);

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }

    @Override
    public int cancelReservation(int idR) {
        try(Connection con = DB.source().getConnection();
        PreparedStatement stm = con.prepareStatement("DELETE FROM reservation WHERE idR = ?");){
            stm.setInt(1, idR);

            return stm.executeUpdate();
            
        } catch (SQLException e){
            e.printStackTrace();
        }

        return 0;
    }
}
