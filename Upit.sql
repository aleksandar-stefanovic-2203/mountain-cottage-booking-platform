CREATE DATABASE PlaninskaVikendica;
USE PlaninskaVikendica;

CREATE TABLE User(
	username VARCHAR(20) PRIMARY KEY,
    password CHAR(60) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    gender NCHAR(1) NOT NULL CHECK (gender IN ('М', 'Ж', 'Д')),
    address NVARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    profilePicture MEDIUMBLOB,
    creditCardNumber VARCHAR(20) NOT NULL,
    type NCHAR(1) NOT NULL CHECK (type IN ('Т', 'В', 'А')),
    status NVARCHAR(10) NOT NULL CHECK (status IN ('непознат', 'активан', 'неактиван'))
);

INSERT INTO User VALUES ('Aca2203', '$2a$10$IvbeWIYihkDQAG8A6Mo0dOo6bF1/iB83GIFQ15rOXTw/zfrZPQ1iK', 'Александар', 'Стефановић', 'М', 'Маријане Грегоран 85/23', '063-436-297', 'stefanovicsalex@gmail.com', NULL, '5100111122223333', 'А', 'активан');
INSERT INTO User VALUES ('jovanzsavic', '$2a$10$hnGVSzzInn4aKHiZslXNWu1hswYJ7DX7ETUs0/wq.guZDJCBWDELu', 'Јован', 'Савић', 'М', 'Булевар краља Александра 15', '063 222 333', 'jovanzsavic@gmail.com', NULL, '300122223333444', 'Т', 'активан'); -- Jova12!
INSERT INTO User VALUES ('Milena123', '$2a$10$uV0kXMIEz1GqZJotl0ztiePPtyuodwpt6MZzAN6DJ3/MjWgI2B3c.', 'Милена', 'Ракита', 'Ж', 'Рузвелтова 67', '065 467 8901', 'milenar@gmail.com', NULL, '4716111122223333', 'В', 'активан'); -- MiLeNa456@