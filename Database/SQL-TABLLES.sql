-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: tapstrapapp
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `codinggame`
--

DROP TABLE IF EXISTS `codinggame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `codinggame` (
  `UserID` int NOT NULL,
  `recordeAccuracy` int NOT NULL DEFAULT '0',
  `recordeScore` int NOT NULL DEFAULT '0',
  `G1` int NOT NULL DEFAULT '0',
  `G2` int NOT NULL DEFAULT '0',
  `G3` int NOT NULL DEFAULT '0',
  `G4` int NOT NULL DEFAULT '0',
  `G5` int NOT NULL DEFAULT '0',
  `G6` int NOT NULL DEFAULT '0',
  `G7` int NOT NULL DEFAULT '0',
  `G8` int NOT NULL DEFAULT '0',
  `G9` int NOT NULL DEFAULT '0',
  `G10` int NOT NULL DEFAULT '0',
  `G11` int NOT NULL DEFAULT '0',
  `G12` int NOT NULL DEFAULT '0',
  `G13` int NOT NULL DEFAULT '0',
  `G14` int NOT NULL DEFAULT '0',
  `G15` int NOT NULL DEFAULT '0',
  `G16` int NOT NULL DEFAULT '0',
  `G17` int NOT NULL DEFAULT '0',
  `G18` int NOT NULL DEFAULT '0',
  `G19` int NOT NULL DEFAULT '0',
  `G20` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID_UNIQUE` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doubletap`
--

DROP TABLE IF EXISTS `doubletap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doubletap` (
  `userID` int NOT NULL,
  `sid_3` int DEFAULT '0',
  `sid_4` int DEFAULT '0',
  `sid_5` int DEFAULT '0',
  `sid_7` int DEFAULT '0',
  `sid_8` int DEFAULT '0',
  `sid_9` int DEFAULT '0',
  `sid_10` int DEFAULT '0',
  `sid_11` int DEFAULT '0',
  `sid_13` int DEFAULT '0',
  `sid_14` int DEFAULT '0',
  `sid_15` int DEFAULT '0',
  `sid_17` int DEFAULT '0',
  `sid_18` int DEFAULT '0',
  `sid_19` int DEFAULT '0',
  `sid_21` int DEFAULT '0',
  `sid_22` int DEFAULT '0',
  `sid_23` int DEFAULT '0',
  `sid_26` int DEFAULT '0',
  `sid_27` int DEFAULT '0',
  `sid_31` int DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `doubletapstars`
--

DROP TABLE IF EXISTS `doubletapstars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doubletapstars` (
  `userID` int NOT NULL,
  `U1_L1` int DEFAULT '0',
  `U1_L2` int DEFAULT '0',
  `U2_L1` int DEFAULT '0',
  `U2_L2` int DEFAULT '0',
  `U2_L3` int DEFAULT '0',
  `U3_L1` int DEFAULT '0',
  `U3_L2` int DEFAULT '0',
  `U3_L3` int DEFAULT '0',
  `U4_L1` int DEFAULT '0',
  `U4_L2` int DEFAULT '0',
  `U4_L3` int DEFAULT '0',
  `U5_L1` int DEFAULT '0',
  `U5_L2` int DEFAULT '0',
  `U5_L3` int DEFAULT '0',
  `U6_L1` int DEFAULT '0',
  `U6_L2` int DEFAULT '0',
  `U6_L3` int DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `fivetimes`
--

DROP TABLE IF EXISTS `fivetimes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fivetimes` (
  `userID` int NOT NULL,
  `recordeScore` int NOT NULL DEFAULT '0',
  `recordeAccuracy` int NOT NULL DEFAULT '0',
  `G1` int NOT NULL DEFAULT '0',
  `G2` int NOT NULL DEFAULT '0',
  `G3` int NOT NULL DEFAULT '0',
  `G4` int NOT NULL DEFAULT '0',
  `G5` int NOT NULL DEFAULT '0',
  `G6` int NOT NULL DEFAULT '0',
  `G7` int NOT NULL DEFAULT '0',
  `G8` int NOT NULL DEFAULT '0',
  `G9` int NOT NULL DEFAULT '0',
  `G10` int NOT NULL DEFAULT '0',
  `G11` int NOT NULL DEFAULT '0',
  `G12` int NOT NULL DEFAULT '0',
  `G13` int NOT NULL DEFAULT '0',
  `G14` int NOT NULL DEFAULT '0',
  `G15` int NOT NULL DEFAULT '0',
  `G16` int NOT NULL DEFAULT '0',
  `G17` int NOT NULL DEFAULT '0',
  `G18` int NOT NULL DEFAULT '0',
  `G19` int NOT NULL DEFAULT '0',
  `G20` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `gamesentence`
--

DROP TABLE IF EXISTS `gamesentence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gamesentence` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fiveTime` varchar(255) DEFAULT NULL,
  `coding` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `id` int NOT NULL,
  `righthand` varchar(45) NOT NULL,
  `lefthand` varchar(45) NOT NULL,
  `single` varchar(45) NOT NULL,
  `doubletap` varchar(45) DEFAULT NULL,
  `doublekeycombi` varchar(45) DEFAULT NULL,
  `triple` varchar(45) DEFAULT NULL,
  `triplekeycombi` varchar(45) DEFAULT NULL,
  `switch` varchar(45) DEFAULT NULL,
  `switchkeycombi` varchar(45) DEFAULT NULL,
  `shift` varchar(45) DEFAULT NULL,
  `shiftkeycombi` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idlevel_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `overviewmenu`
--

DROP TABLE IF EXISTS `overviewmenu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `overviewmenu` (
  `id` int NOT NULL,
  `nameModus` text,
  `singletap` text,
  `doubletap` text,
  `tripletap` text,
  `shift` text,
  `switch` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shift`
--

DROP TABLE IF EXISTS `shift`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shift` (
  `userID` int NOT NULL,
  `sid_1` int NOT NULL DEFAULT '0',
  `sid_2` int NOT NULL DEFAULT '0',
  `sid_3` int NOT NULL DEFAULT '0',
  `sid_4` int NOT NULL DEFAULT '0',
  `sid_5` int NOT NULL DEFAULT '0',
  `sid_6` int NOT NULL DEFAULT '0',
  `sid_7` int NOT NULL DEFAULT '0',
  `sid_8` int NOT NULL DEFAULT '0',
  `sid_9` int NOT NULL DEFAULT '0',
  `sid_10` int NOT NULL DEFAULT '0',
  `sid_11` int NOT NULL DEFAULT '0',
  `sid_13` int NOT NULL DEFAULT '0',
  `sid_14` int NOT NULL DEFAULT '0',
  `sid_15` int NOT NULL DEFAULT '0',
  `sid_17` int NOT NULL DEFAULT '0',
  `sid_18` int NOT NULL DEFAULT '0',
  `sid_19` int NOT NULL DEFAULT '0',
  `sid_21` int NOT NULL DEFAULT '0',
  `sid_22` int NOT NULL DEFAULT '0',
  `sid_23` int NOT NULL DEFAULT '0',
  `sid_24` int NOT NULL DEFAULT '0',
  `sid_26` int NOT NULL DEFAULT '0',
  `sid_27` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `shiftstars`
--

DROP TABLE IF EXISTS `shiftstars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shiftstars` (
  `userID` int NOT NULL,
  `U1_L1` int NOT NULL DEFAULT '0',
  `U1_L2` int NOT NULL DEFAULT '0',
  `U1_L3` int NOT NULL DEFAULT '0',
  `U2_L1` int NOT NULL DEFAULT '0',
  `U2_L2` int NOT NULL DEFAULT '0',
  `U2_L3` int NOT NULL DEFAULT '0',
  `U3_L1` int NOT NULL DEFAULT '0',
  `U3_L2` int NOT NULL DEFAULT '0',
  `U3_L3` int NOT NULL DEFAULT '0',
  `U4_L1` int NOT NULL DEFAULT '0',
  `U4_L2` int NOT NULL DEFAULT '0',
  `U4_L3` int NOT NULL DEFAULT '0',
  `U5_L1` int NOT NULL DEFAULT '0',
  `U5_L2` int NOT NULL DEFAULT '0',
  `U5_L3` int NOT NULL DEFAULT '0',
  `U6_L1` int NOT NULL DEFAULT '0',
  `U6_L2` int NOT NULL DEFAULT '0',
  `U6_L3` int NOT NULL DEFAULT '0',
  `U7_L1` int NOT NULL DEFAULT '0',
  `U7_L2` int NOT NULL DEFAULT '0',
  `U7_L3` int NOT NULL DEFAULT '0',
  `U8_L1` int NOT NULL DEFAULT '0',
  `U8_L2` int NOT NULL DEFAULT '0',
  `U8_L3` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `singletab`
--

DROP TABLE IF EXISTS `singletab`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `singletab` (
  `userID` int NOT NULL,
  `a` int DEFAULT '0',
  `b` int DEFAULT '0',
  `c` int DEFAULT '0',
  `d` int DEFAULT '0',
  `e` int DEFAULT '0',
  `f` int DEFAULT '0',
  `g` int DEFAULT '0',
  `h` int DEFAULT '0',
  `i` int DEFAULT '0',
  `j` int DEFAULT '0',
  `k` int DEFAULT '0',
  `l` int DEFAULT '0',
  `m` int DEFAULT '0',
  `n` int DEFAULT '0',
  `o` int DEFAULT '0',
  `p` int DEFAULT '0',
  `q` int DEFAULT '0',
  `r` int DEFAULT '0',
  `s` int DEFAULT '0',
  `t` int DEFAULT '0',
  `u` int DEFAULT '0',
  `v` int DEFAULT '0',
  `w` int DEFAULT '0',
  `x` int DEFAULT '0',
  `y` int DEFAULT '0',
  `z` int DEFAULT '0',
  `Enter` int DEFAULT '0',
  `Backspace` int DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `singletabstars`
--

DROP TABLE IF EXISTS `singletabstars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `singletabstars` (
  `id` int NOT NULL,
  `U1_L1` int DEFAULT '0',
  `U1_L2` int DEFAULT '0',
  `U2_L1` int DEFAULT '0',
  `U2_L2` int DEFAULT '0',
  `U2_L3` int DEFAULT '0',
  `U3_L1` int DEFAULT '0',
  `U3_L2` int DEFAULT '0',
  `U3_L3` int DEFAULT '0',
  `U4_L1` int DEFAULT '0',
  `U4_L2` int DEFAULT '0',
  `U4_L3` int DEFAULT '0',
  `U5_L1` int DEFAULT '0',
  `U5_L2` int DEFAULT '0',
  `U5_L3` int DEFAULT '0',
  `U6_L1` int DEFAULT '0',
  `U6_L2` int DEFAULT '0',
  `U6_L3` int DEFAULT '0',
  `U7_L1` int DEFAULT '0',
  `U7_L2` int DEFAULT '0',
  `U7_L3` int DEFAULT '0',
  `U8_L1` int DEFAULT '0',
  `U8_L2` int DEFAULT '0',
  `U8_L3` int DEFAULT '0',
  `U9_L1` int DEFAULT '0',
  `U9_L2` int DEFAULT '0',
  `U9_L3` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `switch`
--

DROP TABLE IF EXISTS `switch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switch` (
  `userID` int NOT NULL,
  `sid_1` int NOT NULL DEFAULT '0',
  `sid_2` int NOT NULL DEFAULT '0',
  `sid_3` int NOT NULL DEFAULT '0',
  `sid_4` int NOT NULL DEFAULT '0',
  `sid_5` int NOT NULL DEFAULT '0',
  `sid_6` int NOT NULL DEFAULT '0',
  `sid_7` int NOT NULL DEFAULT '0',
  `sid_8` int NOT NULL DEFAULT '0',
  `sid_9` int NOT NULL DEFAULT '0',
  `sid_15` int NOT NULL DEFAULT '0',
  `sid_14` int NOT NULL DEFAULT '0',
  `sid_12` int NOT NULL DEFAULT '0',
  `sid_13` int NOT NULL DEFAULT '0',
  `sid_17` int NOT NULL DEFAULT '0',
  `sid_19` int NOT NULL DEFAULT '0',
  `sid_21` int NOT NULL DEFAULT '0',
  `sid_22` int NOT NULL DEFAULT '0',
  `sid_23` int NOT NULL DEFAULT '0',
  `sid_24` int NOT NULL DEFAULT '0',
  `sid_26` int NOT NULL DEFAULT '0',
  `sid_27` int NOT NULL DEFAULT '0',
  `sid_29` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `switchstars`
--

DROP TABLE IF EXISTS `switchstars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switchstars` (
  `userID` int NOT NULL,
  `U1_L1` int NOT NULL DEFAULT '0',
  `U1_L2` int NOT NULL DEFAULT '0',
  `U1_L3` int NOT NULL DEFAULT '0',
  `U2_L1` int NOT NULL DEFAULT '0',
  `U2_L2` int NOT NULL DEFAULT '0',
  `U2_L3` int NOT NULL DEFAULT '0',
  `U3_L1` int NOT NULL DEFAULT '0',
  `U3_L2` int NOT NULL DEFAULT '0',
  `U3_L3` int NOT NULL DEFAULT '0',
  `U4_L1` int NOT NULL DEFAULT '0',
  `U4_L2` int NOT NULL DEFAULT '0',
  `U4_L3` int NOT NULL DEFAULT '0',
  `U5_L1` int NOT NULL DEFAULT '0',
  `U5_L2` int NOT NULL DEFAULT '0',
  `U5_L3` int NOT NULL DEFAULT '0',
  `U6_L1` int NOT NULL DEFAULT '0',
  `U6_L2` int NOT NULL DEFAULT '0',
  `U6_L3` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timetohitscore`
--

DROP TABLE IF EXISTS `timetohitscore`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timetohitscore` (
  `userID` int NOT NULL,
  `recordeHit` int NOT NULL DEFAULT '0',
  `recordeAccuracy` int NOT NULL DEFAULT '0',
  `G1` int NOT NULL DEFAULT '0',
  `G2` int NOT NULL DEFAULT '0',
  `G3` int NOT NULL DEFAULT '0',
  `G4` int NOT NULL DEFAULT '0',
  `G5` int NOT NULL DEFAULT '0',
  `G6` int NOT NULL DEFAULT '0',
  `G7` int NOT NULL DEFAULT '0',
  `G8` int NOT NULL DEFAULT '0',
  `G9` int NOT NULL DEFAULT '0',
  `G10` int NOT NULL DEFAULT '0',
  `G11` int NOT NULL DEFAULT '0',
  `G12` int NOT NULL DEFAULT '0',
  `G13` int NOT NULL DEFAULT '0',
  `G14` int NOT NULL DEFAULT '0',
  `G15` int NOT NULL DEFAULT '0',
  `G16` int NOT NULL DEFAULT '0',
  `G17` int NOT NULL DEFAULT '0',
  `G18` int NOT NULL DEFAULT '0',
  `G19` int NOT NULL DEFAULT '0',
  `G20` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tripletap`
--

DROP TABLE IF EXISTS `tripletap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripletap` (
  `userID` int NOT NULL,
  `sid_5` int NOT NULL DEFAULT '0',
  `sid_7` int NOT NULL DEFAULT '0',
  `sid_8` int NOT NULL DEFAULT '0',
  `sid_10` int NOT NULL DEFAULT '0',
  `sid_11` int NOT NULL DEFAULT '0',
  `sid_13` int NOT NULL DEFAULT '0',
  `sid_14` int NOT NULL DEFAULT '0',
  `sid_15` int NOT NULL DEFAULT '0',
  `sid_18` int NOT NULL DEFAULT '0',
  `sid_19` int NOT NULL DEFAULT '0',
  `sid_21` int NOT NULL DEFAULT '0',
  `sid_22` int NOT NULL DEFAULT '0',
  `sid_23` int NOT NULL DEFAULT '0',
  `sid_26` int NOT NULL DEFAULT '0',
  `sid_27` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tripletapstars`
--

DROP TABLE IF EXISTS `tripletapstars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripletapstars` (
  `userID` int NOT NULL,
  `U1_L1` int NOT NULL DEFAULT '0',
  `U1_L2` int DEFAULT '0',
  `U2_L1` int NOT NULL DEFAULT '0',
  `U2_L2` int NOT NULL DEFAULT '0',
  `U2_L3` int NOT NULL DEFAULT '0',
  `U3_L1` int NOT NULL DEFAULT '0',
  `U3_L2` int NOT NULL DEFAULT '0',
  `U3_L3` int NOT NULL DEFAULT '0',
  `U4_L1` int NOT NULL DEFAULT '0',
  `U4_L2` int NOT NULL DEFAULT '0',
  `U4_L3` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`),
  UNIQUE KEY `userID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `hand` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usertracking`
--

DROP TABLE IF EXISTS `usertracking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertracking` (
  `userID` int NOT NULL,
  `event` text NOT NULL,
  `eventName` text NOT NULL,
  `location` text NOT NULL,
  `TIMESTAMP` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-05 12:58:44
