-- FoodLoop demo schema (for the optional MySQL extension)
CREATE DATABASE IF NOT EXISTS foodloop;
USE foodloop;

CREATE TABLE IF NOT EXISTS food_donations (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(90) NOT NULL,
    category VARCHAR(40) NOT NULL,
    quantity VARCHAR(50) NOT NULL,
    donor_name VARCHAR(80) NOT NULL,
    pickup_location VARCHAR(160) NOT NULL,
    pickup_time VARCHAR(80),
    expiry_time VARCHAR(80),
    notes VARCHAR(350),
    status ENUM('Available','Claimed','Collected') NOT NULL DEFAULT 'Available',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- The included Spring Boot app currently uses in-memory demo storage,
-- so it runs without MySQL installation. This schema is provided for
-- a future database-persistence enhancement.
