package com.example.backend.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.db.dao.PictureRepo;
import com.example.backend.models.PictureWrapper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("/pictures")
@CrossOrigin(origins = "http://localhost:4200/")
public class PictureController {
    
    @PostMapping("/insertPictures")
    public int insertPictures(        
        @RequestParam MultipartFile[] pictures,
        @RequestParam int idC
    ) {
        try {
            byte[][] picturesBytes = new byte[pictures.length][];
            for (int i = 0; i < pictures.length; i++) {
                picturesBytes[i] = pictures[i].getBytes();
            }
            return new PictureRepo().insertPictures(picturesBytes, idC);
        } catch(IOException e){
            e.printStackTrace();
        }

        return 0;
    }

    @GetMapping("/{idC}")
    public List<PictureWrapper> getPictures(@PathVariable int idC) {
        return new PictureRepo().getPictures(idC);
    }
    
    
}
