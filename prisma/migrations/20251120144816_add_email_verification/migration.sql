-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userType` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verificationCode` VARCHAR(191) NULL,
    `verificationCodeExpiry` DATETIME(3) NULL,
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

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
