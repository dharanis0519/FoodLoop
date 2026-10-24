# FoodLoop — Surplus Food Donation Platform

FoodLoop is a portfolio project that connects food donors with community groups. Donors can publish surplus food, users can search/filter donations, and a community group can claim available donations.

## Features
- Responsive landing page and donation cards
- Create a food donation using a form
- Search by food name, donor, or location
- Filter donations by category
- Claim available donations
- Status tracking: Available → Claimed
- REST API built with Java and Spring Boot
- Sample donations included for demo purposes
- Optional MySQL schema at `database/schema.sql`

## Tech stack
- Java 17
- Spring Boot 3
- Spring Web REST API
- HTML, CSS, JavaScript
- Maven

## Requirements
- JDK 17 or newer
- Maven 3.6+ (or use an IDE with Maven support)

## Run locally
1. Download and extract the ZIP.
2. Open a terminal in the folder containing `pom.xml`.
3. Run:

   ```bash
   mvn spring-boot:run
   ```

4. Open `http://localhost:8080`.

If using IntelliJ IDEA or Eclipse, import the folder as a Maven project and run `FoodLoopApplication.java`.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/donations` | List all donations |
| GET | `/api/donations/available` | List available donations |
| POST | `/api/donations` | Create a donation |
| POST | `/api/donations/{id}/claim` | Claim an available donation |
| POST | `/api/donations/{id}/collected` | Mark a claimed donation as collected |

### Example create request
```json
{
  "foodName": "Vegetable rice boxes",
  "category": "Prepared meals",
  "quantity": "10 boxes",
  "donorName": "Community Kitchen",
  "location": "T. Nagar, Chennai",
  "pickupTime": "Today, 7 PM",
  "expiryTime": "Today, 9 PM",
  "notes": "Vegetarian meals, packed safely"
}
```

## Database note
The current application intentionally uses in-memory demo storage so it can run without a database setup. Donations reset when the application restarts. `database/schema.sql` is a starting schema for a future MySQL persistence layer; it is not connected to the current service yet.

## Project structure
```text
FoodLoop/
├── pom.xml
├── README.md
├── database/
│   └── schema.sql
└── src/main/
    ├── java/com/foodloop/
    │   ├── FoodLoopApplication.java
    │   ├── FoodDonation.java
    │   ├── DonationService.java
    │   ├── DonationController.java
    │   └── PageController.java
    └── resources/
        ├── application.properties
        └── static/
            ├── index.html
            ├── css/styles.css
            └── js/app.js
```

## Limitations / next steps
- Demo storage is in memory, not persisted to MySQL.
- No login/authentication or user roles yet.
- Pickup times and expiry are text fields, not validated dates.
- Add MySQL/JPA persistence, authentication, and collection confirmation before using this for real donations.
- Use only safe, properly stored food; the platform does not inspect or certify food safety.

## GitHub
Suggested repository description: `FoodLoop — a Spring Boot surplus food donation demo with a responsive HTML/CSS/JavaScript frontend and REST API.`
