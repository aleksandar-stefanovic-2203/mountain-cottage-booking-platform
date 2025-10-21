package com.example.backend.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.db.dao.RoomRateRepo;
import com.example.backend.models.RoomRate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/roomrates")
@CrossOrigin(origins = "http://localhost:4200/")
public class RoomRateController {
    @GetMapping("")
    public List<RoomRate> getRoomRates(@RequestParam int idC) {
        return new RoomRateRepo().getRoomRates(idC);
    }
    
    @PostMapping("/insertRoomRates")
    public int insertRoomRates(@RequestBody List<RoomRate> roomrates) {
        return new RoomRateRepo().insertRoomRates(roomrates);
    }

    @PutMapping("updateRoomRates")
    public int updateRoomRates(@RequestBody List<RoomRate> roomrates) {
        return new RoomRateRepo().updateRoomRates(roomrates);
    }
    
}
