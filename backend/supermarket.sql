-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2024 at 02:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;

/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket`
--
-- --------------------------------------------------------
--
-- Table structure for table `bills`
--
CREATE TABLE
  `bills` (
    `bill_id` int (10) NOT NULL,
    `date` date NOT NULL,
    `discount` float NOT NULL,
    `total_summary` float NOT NULL,
    `employee_id` int (10) NOT NULL,
    `member_id` int (10) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--  
-- Table structure for table `employee`
--
CREATE TABLE
  `employee` (
    `employee_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `address` varchar(200) NOT NULL,
    `tel` int (10) NOT NULL,
    `salary` float NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--
INSERT INTO
  `employee` (`employee_id`, `name`, `address`, `tel`, `salary`)
VALUES
  (1, 'สมใจ', 'สมุทรสาคร', 821223333, 9000),
  (2, 'สายหยุด', 'กรุงเทพฯ', 956665555, 7500),
  (3, 'อุงเอิง', 'กรุงเทพฯ', 857566578, 8000);

-- --------------------------------------------------------
--
-- Table structure for table `members`
--
CREATE TABLE
  `members` (
    `member_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `tel` int (10) NOT NULL,
    `point` int (7) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE
  `products` (
    `product_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `product_desc` text NOT NULL,
    `cost` float NOT NULL,
    `price` float NOT NULL,
    `stock` int (4) NOT NULL,
    `shelf` int (4) NOT NULL,
    `supplier_id` int (10) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `products`
--
INSERT INTO
  `products` (
    `product_id`,
    `name`,
    `product_desc`,
    `cost`,
    `price`,
    `stock`,
    `shelf`,
    `supplier_id`
  )
VALUES
  (1, 'เลย์', 'มันฝรั่งทอด', 12, 20, 50, 10, 3),
  (2, 'เขาช่อง', 'กาแฟไทย', 100, 135, 60, 12, 3),
  (3, 'โค้ก', 'น้ำอัดลมสีดำ', 8, 10, 120, 60, 2),
  (4, '123', '123', 123.224, 123.12, 123, 123, 3),
  (5, '123', '123', 123.224, 123.12, 123, 123, 3),
  (6, '123', '123', 123.224, 123.12, 123, 123, 3),
  (7, '123', '123', 123.224, 123.12, 123, 123, 3),
  (8, '23', '322', 223, 32, 23, 23, 2),
  (9, '123', '1232', 123, 1222, 223, 332, 3);

-- --------------------------------------------------------
--
-- Table structure for table `products_bills`
--
CREATE TABLE
  `products_bills` (
    `list_id` int (10) NOT NULL,
    `bill_id` int (10) NOT NULL,
    `product_id` int (10) NOT NULL,
    `quantity` int (4) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `supplier`
--
CREATE TABLE
  `supplier` (
    `supplier_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `address` varchar(200) NOT NULL,
    `contact_name` varchar(50) NOT NULL,
    `tel` varchar(10) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--
INSERT INTO
  `supplier` (
    `supplier_id`,
    `name`,
    `address`,
    `contact_name`,
    `tel`
  )
VALUES
  (1, 'สยามแม็คโคร', 'กรุงเทพฯ', 'จ๋อง', '021234567'),
  (
    2,
    'บริษัทเสริมสุข',
    'นนทบุรี',
    'มาย',
    '023332222'
  ),
  (
    3,
    'บริษัทยูนิลิเวอร์',
    'ปทุมธานี',
    'นก',
    '0812233345'
  );

--
-- Indexes for dumped tables
--
--
-- Indexes for table `bills`
--
ALTER TABLE `bills` ADD PRIMARY KEY (`bill_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee` ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members` ADD PRIMARY KEY (`member_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products` ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `products_bills`
--
ALTER TABLE `products_bills` ADD PRIMARY KEY (`list_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier` ADD PRIMARY KEY (`supplier_id`);

--
-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills` MODIFY `bill_id` int (10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee` MODIFY `employee_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members` MODIFY `member_id` int (10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products` MODIFY `product_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 10;

--
-- AUTO_INCREMENT for table `products_bills`
--
ALTER TABLE `products_bills` MODIFY `list_id` int (10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier` MODIFY `supplier_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;