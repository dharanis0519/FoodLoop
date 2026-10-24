package com.foodloop;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class DonationService {
    private final Map<Long, FoodDonation> donations = new LinkedHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0);

    public DonationService() {
        add(new FoodDonation(null,"Fresh vegetable biryani","Prepared meals","12 meal boxes","Green Leaf Kitchen",
                "T. Nagar, Chennai","Today, 7:00 PM","Today, 9:00 PM","Packed hygienically; vegetarian.","Available",null));
        add(new FoodDonation(null,"Bread and buns","Bakery","30 pieces","Sunrise Bakery",
                "Velachery, Chennai","Today, 6:30 PM","Today, 10:00 PM","Please collect in reusable crates.","Available",null));
        add(new FoodDonation(null,"Fresh bananas","Fruits","8 kg","City Market Stall 14",
                "Guindy, Chennai","Today, 5:30 PM","Today, 8:00 PM","Ripe, ready to distribute.","Available",null));
    }
    public synchronized List<FoodDonation> all() {
        return donations.values().stream().map(this::copy).collect(Collectors.toList());
    }
    public synchronized List<FoodDonation> available() {
        return donations.values().stream().filter(d -> "Available".equals(d.getStatus())).map(this::copy).collect(Collectors.toList());
    }
    public synchronized FoodDonation create(FoodDonation d) {
        d.setId(sequence.incrementAndGet()); d.setStatus("Available"); d.setCreatedAt(LocalDateTime.now());
        donations.put(d.getId(), copy(d)); return copy(d);
    }
    public synchronized Optional<FoodDonation> claim(long id) {
        FoodDonation d=donations.get(id);
        if (d==null || !"Available".equals(d.getStatus())) return Optional.empty();
        d.setStatus("Claimed"); return Optional.of(copy(d));
    }
    public synchronized Optional<FoodDonation> collected(long id) {
        FoodDonation d=donations.get(id);
        if (d==null || !"Claimed".equals(d.getStatus())) return Optional.empty();
        d.setStatus("Collected"); return Optional.of(copy(d));
    }
    private FoodDonation copy(FoodDonation d) {
        return new FoodDonation(d.getId(),d.getFoodName(),d.getCategory(),d.getQuantity(),d.getDonorName(),
            d.getLocation(),d.getPickupTime(),d.getExpiryTime(),d.getNotes(),d.getStatus(),d.getCreatedAt());
    }
}
