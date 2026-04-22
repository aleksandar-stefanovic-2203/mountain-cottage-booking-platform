package com.example.backend.models;

public class PictureWrapper {
    private byte[] pictureBytes;

    public PictureWrapper(byte[] pictureBytes) {
        this.pictureBytes = pictureBytes;
    }

    public byte[] getPictureBytes() {
        return pictureBytes;
    }

    public void setPictureBytes(byte[] pictureBytes) {
        this.pictureBytes = pictureBytes;
    }
}
