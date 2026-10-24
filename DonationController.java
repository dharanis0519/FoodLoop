package com.foodloop;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/donations")
public class DonationController {
    private final DonationService service;
    public DonationController(DonationService service){this.service=service;}

    @GetMapping public List<FoodDonation> all(){return service.all();}
    @GetMapping("/available") public List<FoodDonation> available(){return service.available();}
    @PostMapping public ResponseEntity<?> create(@RequestBody FoodDonation donation){
        if (blank(donation.getFoodName()) || blank(donation.getQuantity()) || blank(donation.getDonorName()) || blank(donation.getLocation())) {
            return ResponseEntity.badRequest().body(Map.of("message","Food name, quantity, donor name, and pickup location are required."));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(donation));
    }
    @PostMapping("/{id}/claim") public ResponseEntity<?> claim(@PathVariable long id){
        return service.claim(id).<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(()->ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","Donation is unavailable or was already claimed.")));
    }
    @PostMapping("/{id}/collected") public ResponseEntity<?> collected(@PathVariable long id){
        return service.collected(id).<ResponseEntity<?>>map(ResponseEntity::ok)
            .orElseGet(()->ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message","Only claimed donations can be marked collected.")));
    }
    private boolean blank(String s){return s==null || s.trim().isEmpty();}
}
