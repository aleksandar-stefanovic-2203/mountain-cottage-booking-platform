package com.example.backend.models;

import java.sql.Date;

public class RoomRate {
    private int idRR;
    private String periodName;
    private Date periodStart;
    private Date periodEnd;
    private double priceAdult;
    private double priceChild;
    private int idC;

    public RoomRate(int idRR, String periodName, Date periodStart, Date periodEnd, double priceAdult, double priceChild, int idC) {

        this.idRR = idRR;
        this.periodName = periodName;
        this.periodStart = periodStart;
        this.periodEnd = periodEnd;
        this.priceAdult = priceAdult;
        this.priceChild = priceChild;
        this.idC = idC;
        
    }

    public int getIdRR() {
        return idRR;
    }

    public void setIdRR(int idRR) {
        this.idRR = idRR;
    }

    public String getPeriodName() {
        return periodName;
    }

    public void setPeriodName(String periodName) {
        this.periodName = periodName;
    }

    public Date getPeriodStart() {
        return periodStart;
    }

    public void setPeriodStart(Date periodStart) {
        this.periodStart = periodStart;
    }

    public Date getPeriodEnd() {
        return periodEnd;
    }

    public void setPeriodEnd(Date periodEnd) {
        this.periodEnd = periodEnd;
    }

    public double getPriceAdult() {
        return priceAdult;
    }

    public void setPriceAdult(double priceAdult) {
        this.priceAdult = priceAdult;
    }

    public double getPriceChild() {
        return priceChild;
    }

    public void setPriceChild(double priceChild) {
        this.priceChild = priceChild;
    }

    public int getIdC() {
        return idC;
    }

    public void setIdC(int idC) {
        this.idC = idC;
    }

}
