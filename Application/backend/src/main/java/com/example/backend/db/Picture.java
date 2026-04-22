package com.example.backend.db;

import java.io.IOException;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class Picture {
    private final byte[] defaultProfilePictureBytes;
    private final byte[] mastercardPictureBytes;
    private final byte[] visaPictureBytes;
    private final byte[] dinersPictureBytes;

    public Picture() {

        byte[] defaultProfilePictureBytes = null;
        byte[] mastercardPictureBytes = null;
        byte[] visaPictureBytes = null;
        byte[] dinersPictureBytes = null;
        
        try {
            
            ClassPathResource defaultProfilePictureResource = new ClassPathResource("static/images/default-profile-picture.png");
            defaultProfilePictureBytes = defaultProfilePictureResource.getContentAsByteArray();

            ClassPathResource mastercardPictureResource = new ClassPathResource("static/images/mastercard.png");
            mastercardPictureBytes = mastercardPictureResource.getContentAsByteArray();

            ClassPathResource visaPictureResource = new ClassPathResource("static/images/visa.png");
            visaPictureBytes = visaPictureResource.getContentAsByteArray();

            ClassPathResource dinersPictureResource = new ClassPathResource("static/images/diners.png");
            dinersPictureBytes = dinersPictureResource.getContentAsByteArray();

        } catch (IOException e) {
            e.printStackTrace();
        }

        this.defaultProfilePictureBytes = defaultProfilePictureBytes;
        this.mastercardPictureBytes = mastercardPictureBytes;
        this.visaPictureBytes = visaPictureBytes;
        this.dinersPictureBytes = dinersPictureBytes;        
    }

    public byte[] getDefaultProfilePictureBytes() {
        return defaultProfilePictureBytes;
    }

    public byte[] getMastercardPictureBytes() {
        return mastercardPictureBytes;
    }

    public byte[] getVisaPictureBytes() {
        return visaPictureBytes;
    }

    public byte[] getDinersPictureBytes() {
        return dinersPictureBytes;
    }

}
