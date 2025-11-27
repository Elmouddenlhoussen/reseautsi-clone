-- TSI Registration Database Setup

-- Create database
CREATE DATABASE IF NOT EXISTS tsi CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Use the database
USE tsi;

-- Create User table
CREATE TABLE IF NOT EXISTS `User` (
  `id` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `userType` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  `isVerified` BOOLEAN NOT NULL DEFAULT false,
  `verificationCode` VARCHAR(191) NULL,
  `codeExpiry` DATETIME(3) NULL,
  `firstName` VARCHAR(191) NULL,
  `lastName` VARCHAR(191) NULL,
  `phone` VARCHAR(191) NULL,
  `companyName` VARCHAR(191) NULL,
  `service` VARCHAR(191) NULL,
  `jobTitle` VARCHAR(191) NULL,
  `birthDate` VARCHAR(191) NULL,
  `birthPlace` VARCHAR(191) NULL,
  `birthCountry` VARCHAR(191) NULL,
  `nationality` VARCHAR(191) NULL,
  `siretNumber` VARCHAR(191) NULL,
  `address` VARCHAR(191) NULL,
  `hasDriverLicense` BOOLEAN NOT NULL DEFAULT false,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `User_email_key`(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Show tables
SHOW TABLES;

-- Show User table structure
DESCRIBE `User`;
