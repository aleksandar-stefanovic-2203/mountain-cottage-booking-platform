CREATE DATABASE PlaninskaVikendica;
USE PlaninskaVikendica;

CREATE TABLE User(
	username VARCHAR(20) PRIMARY KEY,
    password VARCHAR(100) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    lastName NVARCHAR(50) NOT NULL,
    gender NCHAR(1) CHECK (gender IN ('М', 'Ж')),
    address NVARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    # Профилну слику накнадно додати!!!
    creditCardNumber VARCHAR(20) NOT NULL
);