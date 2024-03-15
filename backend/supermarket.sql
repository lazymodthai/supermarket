-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 15, 2024 at 02:13 AM
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
    `date` datetime NOT NULL DEFAULT current_timestamp(),
    `discount` float NOT NULL,
    `total_summary` float NOT NULL,
    `employee_id` int (10) NOT NULL,
    `member_id` int (10) DEFAULT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `bills`
--
INSERT INTO
  `bills` (
    `bill_id`,
    `date`,
    `discount`,
    `total_summary`,
    `employee_id`,
    `member_id`
  )
VALUES
  (9, '2024-03-15 01:40:16', 50, 545, 1, 4),
  (10, '2024-03-15 01:49:00', 0, 380, 1, NULL),
  (11, '2024-03-15 02:34:27', 50, 1025, 2, 2),
  (12, '2024-03-15 02:41:31', 50, 60, 2, 4),
  (13, '2024-03-15 02:44:05', 50, 10, 2, 4),
  (14, '2024-03-15 03:25:15', 50, 860, 1, 2),
  (15, '2024-03-15 03:25:37', 50, 1030, 1, 3);

-- --------------------------------------------------------
--
-- Table structure for table `employee`
--
CREATE TABLE
  `employee` (
    `employee_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `address` varchar(200) NOT NULL,
    `tel` varchar(10) NOT NULL,
    `salary` float NOT NULL,
    `password` varchar(4) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--
INSERT INTO
  `employee` (
    `employee_id`,
    `name`,
    `address`,
    `tel`,
    `salary`,
    `password`
  )
VALUES
  (
    1,
    'สมใจ',
    'สมุทรสาคร',
    '0821223333',
    9000,
    '1234'
  ),
  (
    2,
    'สายหยุด',
    'กรุงเทพฯ',
    '0956665555',
    7500,
    '5555'
  ),
  (
    3,
    'อุงเอิง',
    'กรุงเทพฯ',
    '0857566578',
    8000,
    '0000'
  );

-- --------------------------------------------------------
--
-- Table structure for table `members`
--
CREATE TABLE
  `members` (
    `member_id` int (10) NOT NULL,
    `name` varchar(50) NOT NULL,
    `tel` varchar(10) NOT NULL,
    `point` int (7) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

--
-- Dumping data for table `members`
--
INSERT INTO
  `members` (`member_id`, `name`, `tel`, `point`)
VALUES
  (1, 'สมบัติ', '0826665555', 200),
  (2, 'ปราชิก', '0958885555', 7888),
  (3, 'สาว', '0889998889', 2632),
  (4, 'จุ๋ม', '0989989998', 7698);

-- --------------------------------------------------------
--
-- Table structure for table `products`
--
CREATE TABLE
  `products` (
    `product_id` int (10) NOT NULL,
    `product_name` varchar(50) NOT NULL,
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
    `product_name`,
    `product_desc`,
    `cost`,
    `price`,
    `stock`,
    `shelf`,
    `supplier_id`
  )
VALUES
  (1, 'เลย์', 'มันฝรั่งทอด', 12, 20, 50, 71, 3),
  (2, 'เขาช่อง', 'กาแฟไทย', 100, 135, 60, 34, 3),
  (3, 'โค้ก', 'น้ำอัดลมสีดำ', 8, 10, 120, 0, 2),
  (10, 'ฮานามิ', 'ขนมขบเคี้ยว', 17.5, 20, 100, 0, 1);

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

--
-- Dumping data for table `products_bills`
--
INSERT INTO
  `products_bills` (`list_id`, `bill_id`, `product_id`, `quantity`)
VALUES
  (9, 9, 10, 3),
  (10, 9, 2, 3),
  (11, 9, 1, 1),
  (12, 9, 3, 6),
  (13, 10, 2, 2),
  (14, 10, 1, 1),
  (15, 10, 10, 4),
  (16, 10, 3, 1),
  (17, 11, 1, 3),
  (18, 11, 2, 7),
  (19, 11, 10, 1),
  (20, 12, 10, 3),
  (21, 13, 1, 3),
  (22, 14, 10, 1),
  (23, 14, 2, 6),
  (24, 14, 1, 3),
  (25, 14, 3, 2),
  (26, 15, 2, 8);

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
ALTER TABLE `bills` MODIFY `bill_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 16;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee` MODIFY `employee_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `members`
--
ALTER TABLE `members` MODIFY `member_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products` MODIFY `product_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 15;

--
-- AUTO_INCREMENT for table `products_bills`
--
ALTER TABLE `products_bills` MODIFY `list_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 27;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier` MODIFY `supplier_id` int (10) NOT NULL AUTO_INCREMENT,
AUTO_INCREMENT = 4;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;