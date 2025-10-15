package com.example.backend.db;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class DefaultProfilePicture {
    private final byte[] defaultProfilePictureBytes;

    public DefaultProfilePicture() {        
        byte[] defaultProfilePictureBytes = null;
        try {
            ClassPathResource resource = new ClassPathResource("static/images/default-profile-picture.png");
            defaultProfilePictureBytes = resource.getContentAsByteArray();
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.defaultProfilePictureBytes = defaultProfilePictureBytes;
    }

    public byte[] getBytes() {
        return defaultProfilePictureBytes;
    }
}
