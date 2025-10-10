CREATE DATABASE PlaninskaVikendica;
USE PlaninskaVikendica;

CREATE TABLE User(
	username VARCHAR(20) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    gender NCHAR(1) CHECK (gender IN ('М', 'Ж')),
    address NVARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    # Профилну слику накнадно додати!!!
    creditCardNumber VARCHAR(20) NOT NULL,
    type NCHAR(1) NOT NULL CHECK (type IN ('Т', 'В', 'А'))
);

INSERT INTO User VALUES ('Aca2203', '$2a$10$IvbeWIYihkDQAG8A6Mo0dOo6bF1/iB83GIFQ15rOXTw/zfrZPQ1iK', 'Александар', 'Стефановић', 'М', 'Маријане Грегоран 85/23', '063-436-297', 'stefanovicsalex@gmail.com', '5100111122223333', 'А');
