# Web System - Mountain Cottage

A platform for renting mountain cottages, developed as part of the "Internet Application Programming" course at the School of Electrical Engineering, University of Belgrade.

## Technologies

- Frontend: Angular 18
- Backend: Spring Boot 3.3 (Java 21)
- Database: MySQL
- Build tools: npm / Angular CLI, Maven

## Project Structure

- `Application/frontend` - Angular application
- `Application/backend` - Spring Boot API
- `Query.sql` - SQL script for database creation and seed data

## Project Description and Functionalities

Mountain Cottage is a full-stack web application for browsing and booking mountain cottages.  
The system supports three user roles (`tourist`, `owner`, `admin`) and one public (unregistered) view.

### Public (Unregistered) Features

- View the cottage catalog without logging in
- Search cottages by name and location
- Sort cottage list by name and location (ascending/descending)
- View accepted reservation statistics for recent periods (for platform activity insight)
- Navigate to registration and login pages

### Authentication and Account Features

- Separate login flows for regular users and administrators
- Role-based routing after login (`tourist`, `owner`, `admin`)
- Registration with profile picture upload
- Profile update (personal info, credit card, optional profile image replacement)
- Change password with validation and old-password check
- Logout and session handling via browser storage

### Tourist Features

- Browse all cottages and open detailed pages
- View cottage details including:
  - basic info and services
  - seasonal room rates
  - cottage image gallery
- Create reservation requests through a 2-step flow
- Automatic reservation price calculation based on selected dates, guest counts, and cottage rate periods
- Input validation for reservation data:
  - check-in/check-out time constraints
  - required visitor counts
  - additional request text length
  - credit card format validation
- Manage reservations:
  - view current and archived reservations
  - cancel reservations when cancellation window rules are met

### Owner Features

- View own cottage list
- Add new cottage entries
- Update existing cottage data
- Upload cottage images
- Maintain multiple room-rate periods per cottage
- Delete owned cottages
- View reservation requests for owned cottages
- Accept reservation requests
- Reject reservation requests (with mandatory comment on rejection)

### Admin Features

- Access admin-specific dashboard
- View user list (excluding admin accounts)
- View and process registration requests
- Approve or deactivate users by changing account status
- Open user profiles and edit role/type when needed
- Browse cottages from the admin panel

### Validation and Business Rules

- Password format validation (length, uppercase/lowercase, number, special character)
- Credit card validation for supported issuer patterns (Mastercard, Visa, Diners)
- Profile image validation by file type and dimensions
- Reservation capacity and period checks on backend pricing/reservation flow
- Reservation status lifecycle support (`pending`, `accepted`, `rejected` semantics in application logic)

### Backend API Domains

- `users` - authentication, registration, profile management, password change, user status management
- `cottages` - CRUD operations for cottage entities
- `roomrates` - rate retrieval, insert/update, reservation price calculation
- `pictures` - cottage and utility image handling
- `reservations` - reservation creation, retrieval (tourist/owner), status updates, cancellation

## Prerequisites

Install the following before running the project:

- Node.js 18+ (LTS recommended)
- Java 21
- Maven 3.9+ (or use the `mvnw` wrapper script in the backend)
- MySQL 8+

## Database Setup

1. Start your MySQL server.
2. Import the script:
   - open `Query.sql` in MySQL Workbench and execute it, or
   - run from terminal:
     - `mysql -u root -p < Query.sql`
3. Verify that the `MountainCottage` database exists.

## Backend Configuration

In `Application/backend/src/main/resources/application.properties`, add your MySQL connection settings, for example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/MountainCottage
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

Add any additional Spring/JDBC options if needed (for example timezone, charset, etc.).

## Running the Backend

From `Application/backend`:

```bash
# Windows
.\mvnw spring-boot:run

# or, if Maven is installed globally
mvn spring-boot:run
```

Default backend URL:

- `http://localhost:8080`

## Running the Frontend

From `Application/frontend`:

```bash
npm install
npm start
```

Default frontend URL:

- `http://localhost:4200`

## Frontend Scripts

- `npm start` - development server
- `npm run build` - application build
- `npm test` - unit tests (Karma/Jasmine)

## Note

If frontend and backend run on different ports, check CORS and the API base URL configuration in Angular services.