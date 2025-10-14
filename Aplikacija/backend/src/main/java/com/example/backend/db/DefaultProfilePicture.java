package com.example.backend.db;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.stereotype.Component;

@Component
public class DefaultProfilePicture {
    private final byte[] defaultProfilePictureBytes;

    public DefaultProfilePicture() {
        Path path = Path.of("public/default-profile-picture.png");
        byte[] defaultProfilePictureBytes = null;
        try {
            defaultProfilePictureBytes = Files.readAllBytes(path);
        } catch (IOException e) {
            e.printStackTrace();
        }

        this.defaultProfilePictureBytes = defaultProfilePictureBytes;
    }

    public byte[] getBytes() {
        return defaultProfilePictureBytes;
    }
}
