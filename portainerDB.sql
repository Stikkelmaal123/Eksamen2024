-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Dec 19, 2024 at 07:52 PM
-- Server version: 8.4.3
-- PHP Version: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portainer`
--

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `education_id` int NOT NULL,
  `education_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`education_id`, `education_name`) VALUES
(1, 'Webudvikler'),
(2, 'Softwareudvikler'),
(3, 'Underviser');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `group_id` int NOT NULL,
  `group_name` varchar(200) DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `education_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`group_id`, `group_name`, `expiration_date`, `education_id`) VALUES
(6, 'Team Alpha', '2026-09-09', 3);

-- --------------------------------------------------------

--
-- Table structure for table `groups_users`
--

CREATE TABLE `groups_users` (
  `groups_users_id` int NOT NULL,
  `group_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `groups_users`
--

INSERT INTO `groups_users` (`groups_users_id`, `group_id`, `user_id`) VALUES
(1, 6, 101);

-- --------------------------------------------------------

--
-- Table structure for table `groups_users_stacks`
--

CREATE TABLE `groups_users_stacks` (
  `groups_users_stacks_id` int NOT NULL,
  `groups_users_id` int DEFAULT NULL,
  `stack_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stacks`
--

CREATE TABLE `stacks` (
  `stack_id` int NOT NULL,
  `stack_name` varchar(50) DEFAULT NULL,
  `template_name` varchar(100) DEFAULT NULL,
  `sub_domain` varchar(200) DEFAULT NULL,
  `creation_date` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `template_id` int NOT NULL,
  `template_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ymlfile` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`template_id`, `template_name`, `ymlfile`) VALUES
(2, 'Nginx', '{\"networks\":{\"traefik-proxy\":{\"external\":true}},\"services\":{\"test\":{\"image\":\"nginx:latest\",\"networks\":[\"traefik-proxy\"],\"deploy\":{\"labels\":[\"traefik.enable=true\",\"traefik.http.routers.RANDOMSTRING.rule=Host(SUBDOMAIN.kubelab.dk)\",\"traefik.http.routers.RANDOMSTRING.entrypoints=web,websecure\",\"traefik.http.routers.RANDOMSTRING.tls.certresolver=letsencrypt\",\"traefik.http.services.RANDOMSTRING.loadbalancer.server.port=80\"]}}}}');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `email`, `password`, `admin`) VALUES
(101, 'admin', 'admin@admin.dk', '123', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`education_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`group_id`),
  ADD UNIQUE KEY `group_name` (`group_name`),
  ADD KEY `fk_groups_education` (`education_id`);

--
-- Indexes for table `groups_users`
--
ALTER TABLE `groups_users`
  ADD PRIMARY KEY (`groups_users_id`),
  ADD UNIQUE KEY `group_id` (`group_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `groups_users_stacks`
--
ALTER TABLE `groups_users_stacks`
  ADD PRIMARY KEY (`groups_users_stacks_id`),
  ADD UNIQUE KEY `groups_users_id` (`groups_users_id`,`stack_id`),
  ADD KEY `stack_id` (`stack_id`);

--
-- Indexes for table `stacks`
--
ALTER TABLE `stacks`
  ADD PRIMARY KEY (`stack_id`),
  ADD UNIQUE KEY `stack_name` (`stack_name`),
  ADD UNIQUE KEY `sub_domain` (`sub_domain`),
  ADD KEY `template_name` (`template_name`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`template_id`),
  ADD UNIQUE KEY `template_name` (`template_name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `educations`
--
ALTER TABLE `educations`
  MODIFY `education_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `group_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `groups_users`
--
ALTER TABLE `groups_users`
  MODIFY `groups_users_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `groups_users_stacks`
--
ALTER TABLE `groups_users_stacks`
  MODIFY `groups_users_stacks_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `stacks`
--
ALTER TABLE `stacks`
  MODIFY `stack_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `template_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `fk_groups_education` FOREIGN KEY (`education_id`) REFERENCES `educations` (`education_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `groups_users`
--
ALTER TABLE `groups_users`
  ADD CONSTRAINT `groups_users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  ADD CONSTRAINT `groups_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `groups_users_stacks`
--
ALTER TABLE `groups_users_stacks`
  ADD CONSTRAINT `groups_users_stacks_ibfk_1` FOREIGN KEY (`groups_users_id`) REFERENCES `groups_users` (`groups_users_id`),
  ADD CONSTRAINT `groups_users_stacks_ibfk_2` FOREIGN KEY (`stack_id`) REFERENCES `stacks` (`stack_id`);

--
-- Constraints for table `stacks`
--
ALTER TABLE `stacks`
  ADD CONSTRAINT `stacks_ibfk_1` FOREIGN KEY (`template_name`) REFERENCES `templates` (`template_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
