package com.example.backend.models;

public class UserInfo {
    private int numOfTourists;
    private int numOfOwners;
    
    public UserInfo(int numOfTourists, int numOfOwners) {
        this.numOfTourists = numOfTourists;
        this.numOfOwners = numOfOwners;
    }

    public int getNumOfTourists() {
        return numOfTourists;
    }

    public void setNumOfTourists(int numOfTourists) {
        this.numOfTourists = numOfTourists;
    }

    public int getNumOfOwners() {
        return numOfOwners;
    }

    public void setNumOfOwners(int numOfOwners) {
        this.numOfOwners = numOfOwners;
    }

}
