CREATE DATABASE MountainCottage;
USE MountainCottage;

CREATE TABLE User(
	username VARCHAR(20) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    gender NVARCHAR(10) NOT NULL CHECK (gender IN ('мушки', 'женски', 'друго')),
    address NVARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    profilePicture MEDIUMBLOB,
    creditCardNumber VARCHAR(20) NOT NULL,
    type NVARCHAR(20) NOT NULL CHECK (type IN ('туриста', 'власник', 'администратор')),
    status NVARCHAR(10) NOT NULL CHECK (status IN ('непознат', 'активан', 'неактиван'))
);

INSERT INTO User VALUES ('Aca2203', '$2a$10$IvbeWIYihkDQAG8A6Mo0dOo6bF1/iB83GIFQ15rOXTw/zfrZPQ1iK', 'Александар', 'Стефановић', 'мушки', 'Маријане Грегоран 85/23', '063-436-297', 'stefanovicsalex@gmail.com', NULL, '5100111122223333', 'администратор', 'активан'); -- aca123
INSERT INTO User VALUES ('jovanzsavic', '$2a$10$hnGVSzzInn4aKHiZslXNWu1hswYJ7DX7ETUs0/wq.guZDJCBWDELu', 'Јован', 'Савић', 'друго', 'Булевар краља Александра 15', '063 222 333', 'jovanzsavic@gmail.com', NULL, '300122223333444', 'туриста', 'активан'); -- Jova12!
INSERT INTO User VALUES ('gagson', '$2a$10$hnGVSzzInn4aKHiZslXNWu1hswYJ7DX7ETUs0/wq.guZDJCBWDELu', 'Драган', 'Црњаковић', 'мушки', 'Патриса Лумумбе 16', '063 221 334', 'draganc@gmail.com', NULL, '300122223333555', 'власник', 'активан'); -- Jova12!
INSERT INTO User VALUES ('Milena123', '$2a$10$uV0kXMIEz1GqZJotl0ztiePPtyuodwpt6MZzAN6DJ3/MjWgI2B3c.', 'Милена', 'Ракита', 'женски', 'Рузвелтова 67', '065 467 8901', 'milenar@gmail.com', NULL, '4716111122223333', 'власник', 'активан'); -- MiLeNa456@

CREATE TABLE Cottage(
	idC INT PRIMARY KEY AUTO_INCREMENT,
    name NVARCHAR(100) NOT NULL,
    location NVARCHAR(100) NOT NULL,
    services NVARCHAR(200),
    phoneNumber VARCHAR(100),
    capacity INT NOT NULL,
    ownerUsername VARCHAR(20),
    FOREIGN KEY (ownerUsername) REFERENCES User(username) ON DELETE SET NULL
);

INSERT INTO Cottage (name, location, services, phoneNumber, capacity, ownerUsername) VALUES ('Апартмани Милинковић', 'Обућина Баре 150, 71423 Јахорина, Босна и Херцеговина', 'Паркинг, бесплатан интернет, Flat-screen TV, кухиња', '065 1222 567', 10, 'Milena123');
INSERT INTO Cottage (name, location, services, phoneNumber, capacity, ownerUsername) VALUES ('Горштак 1 и 2', 'Обућина Баре bb, 71423 Јахорина, Босна и Херцеговина', 'Бесплатан интернет, Flat-screen TV, кухиња, ски школа', '065 1222 567', 15, 'Milena123');
INSERT INTO Cottage (name, location, services, phoneNumber, capacity, ownerUsername) VALUES ('Olimpik House Jahorina', 'Olimpijska 46 Jahorina, 71423 Jahorina, Bosnia and Herzegovina', 'Паркинг, бесплатан интернет, доручак', '065 1234 890', 8, 'gagson');

CREATE TABLE RoomRate (
	idRR INT PRIMARY KEY AUTO_INCREMENT,
    periodName NVARCHAR(50) NOT NULL,
    periodStart DATE NOT NULL,
    periodEnd DATE NOT NULL,
    priceAdult DECIMAL(10, 2) NOT NULL,
    priceChild DECIMAL(10, 2) NOT NULL,
    idC INT,
    FOREIGN KEY (idC) REFERENCES Cottage(idC) ON DELETE CASCADE
);

INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('летњи', '2026-05-01', '2026-08-31', 3000, 1800, 1);
INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('зимски', '2025-12-01', '2026-02-28', 4000, 3000, 1);
INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('летњи', '2026-05-01', '2026-08-31', 3000, 1800, 2);
INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('зимски', '2025-12-01', '2026-02-28', 4000, 3000, 2);
INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('летњи', '2026-05-01', '2026-08-31', 3000, 1800, 3);
INSERT INTO RoomRate(periodName, periodStart, periodEnd, priceAdult, priceChild, idC) VALUES ('зимски', '2025-12-01', '2026-02-28', 4000, 3000, 3);

CREATE TABLE Picture (
	idP INT PRIMARY KEY AUTO_INCREMENT,
    picture MEDIUMBLOB NOT NULL,
    idC INT,
    FOREIGN KEY (idC) REFERENCES Cottage(idC) ON DELETE CASCADE
);

CREATE TABLE Reservation (
	idR INT PRIMARY KEY AUTO_INCREMENT,
	reservationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
    numberOfAdults INT NOT NULL,
    numberOfChildren INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    idC INT NOT NULL,
    touristUsername VARCHAR(20) NOT NULL,
    additionalRequests NVARCHAR(500),
    status NVARCHAR(10) NOT NULL CHECK (status IN ('непознат', 'прихваћена', 'одбијена')),
    comment NVARCHAR(200),
    FOREIGN KEY (idC) REFERENCES Cottage(idC) ON DELETE CASCADE,
    FOREIGN KEY (touristUsername) REFERENCES User(username) ON DELETE CASCADE
);