package com.foodloop;

import java.time.LocalDateTime;

public class FoodDonation {
    private Long id;
    private String foodName;
    private String category;
    private String quantity;
    private String donorName;
    private String location;
    private String pickupTime;
    private String expiryTime;
    private String notes;
    private String status;
    private LocalDateTime createdAt;

    public FoodDonation() {}
    public FoodDonation(Long id, String foodName, String category, String quantity, String donorName,
                        String location, String pickupTime, String expiryTime, String notes,
                        String status, LocalDateTime createdAt) {
        this.id=id; this.foodName=foodName; this.category=category; this.quantity=quantity;
        this.donorName=donorName; this.location=location; this.pickupTime=pickupTime;
        this.expiryTime=expiryTime; this.notes=notes; this.status=status; this.createdAt=createdAt;
    }
    public Long getId(){return id;} public void setId(Long id){this.id=id;}
    public String getFoodName(){return foodName;} public void setFoodName(String v){this.foodName=v;}
    public String getCategory(){return category;} public void setCategory(String v){this.category=v;}
    public String getQuantity(){return quantity;} public void setQuantity(String v){this.quantity=v;}
    public String getDonorName(){return donorName;} public void setDonorName(String v){this.donorName=v;}
    public String getLocation(){return location;} public void setLocation(String v){this.location=v;}
    public String getPickupTime(){return pickupTime;} public void setPickupTime(String v){this.pickupTime=v;}
    public String getExpiryTime(){return expiryTime;} public void setExpiryTime(String v){this.expiryTime=v;}
    public String getNotes(){return notes;} public void setNotes(String v){this.notes=v;}
    public String getStatus(){return status;} public void setStatus(String v){this.status=v;}
    public LocalDateTime getCreatedAt(){return createdAt;} public void setCreatedAt(LocalDateTime v){this.createdAt=v;}
}
