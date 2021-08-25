-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: online_store
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_category` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Fruits'),(2,'Vegetables'),(3,'Milk Products&Eggs'),(5,'Bakery'),(6,'Meat&Fish'),(9,'Chocolates &Sweets'),(11,'Drinks'),(12,'Cooked&Baked&Canned'),(13,'Cereal&Chips&Snacks'),(14,'Household Products');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_key` int NOT NULL,
  `shopping_cart_key` int NOT NULL,
  `total_price` int NOT NULL,
  `shipping_city` varchar(200) NOT NULL,
  `shipping_street` varchar(200) NOT NULL,
  `shipping_date` date NOT NULL,
  `order_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `credit_card` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `shopping_cart_fk_idx` (`shopping_cart_key`),
  KEY `customer_fk_idx` (`customer_key`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (106,123456789,37,5,'dwdw','dwdw','2021-06-20','2021-06-20 20:13:56','1212'),(107,123456789,37,9,'dsds','dwdwd','2021-06-20','2021-06-20 20:14:54','1111'),(108,12345,36,15,'fdefe','efefe','2021-06-20','2021-06-20 20:19:02','121323'),(109,444,38,27,'hadera','ovadia yosef 10','2021-06-21','2021-06-20 20:21:09','123456788888'),(110,444,39,124,'hadera','ovadia yosef 10','2021-06-21','2021-06-20 20:57:07','9087070789543363893'),(111,123456789,41,10,'zichron yaakov','maale hakarmel 9','2021-06-22','2021-06-21 08:48:55','54654654'),(112,123456789,41,10,'zichron yaakov','maale hakarmel 9','2021-06-21','2021-06-21 10:07:41','54645646'),(113,123456789,41,0,'fefe','fefe','2021-06-22','2021-06-21 10:08:38','f12121'),(114,123456789,41,4,'rferwe','rwerwe','2021-06-22','2021-06-21 10:09:00','12121'),(115,123456789,41,4,'wewe','wewew','2021-06-23','2021-06-21 10:09:49','11212'),(116,123456789,41,4,'fedf','fefef','2021-06-23','2021-06-21 10:12:18','21212'),(117,123456789,45,18,'eefe','fefefe','2021-07-02','2021-06-21 11:34:21','12121q2'),(118,123456789,46,9,'fee','efef','2021-07-03','2021-06-21 13:00:52','2112121'),(119,123456789,47,4,'fefre','rerew','2021-07-10','2021-06-21 13:01:59','12121'),(120,123456789,47,5,'zichron yaakov','maale hakarmel 9','2021-06-25','2021-06-21 13:05:12','12345'),(121,123456789,49,5,'ffrfr','frfrfr','2021-06-26','2021-06-22 17:48:16','12121'),(122,123456789,55,9,'fefe','fefe','2021-06-23','2021-06-23 13:27:43','12121'),(123,123456789,58,4,'ded','dee','2021-06-24','2021-06-23 15:16:07','1212'),(124,123456789,58,4,'ded','dwd','2021-06-24','2021-06-23 15:18:39','12121'),(125,123456789,59,10,'dsds','dsdw','2021-06-29','2021-06-23 16:10:01','1111'),(126,123456789,60,9,'zichron yaakov','maale hakarmel 9','2021-06-24','2021-06-23 16:58:09','1213214234324'),(127,123456789,60,5,'zichron yaakov','maale hakarmel 9','2021-06-26','2021-06-23 17:00:52','12121'),(128,29368784,61,14,'Haifa','keren hayesod 96','2021-06-25','2021-06-23 21:42:58','2332436'),(129,123456789,72,10,'fefe','erer','2021-06-25','2021-06-24 15:48:51','23232'),(130,2322,74,24,'Haifa','frfe','2021-06-26','2021-06-24 16:07:09','23235464'),(131,123456789,73,8,'jhj','hgj','2021-06-28','2021-06-24 17:25:37','675768'),(132,123456789,77,14,'zichron yaakov','maale hakarmel 9','2021-07-03','2021-06-24 17:37:31','121212'),(133,123456789,81,12,'zichron yaakov','maale hakarmel 9','2021-07-02','2021-06-25 18:41:02','545646556'),(135,123456789,87,32,'zichron yaakov','maale hakarmel 9','2021-06-29','2021-06-28 10:17:31','1212312423423423'),(136,39075809,90,23,'Haifa','hazait 5','2021-07-01','2021-06-29 09:50:24','4545646'),(137,22222,92,19,'Jerusalem','tititi','2021-07-09','2021-07-02 14:05:19','5456465454'),(138,22222,92,18,'Jerusalem','tititi','2021-07-03','2021-07-02 14:16:35','232143254356'),(139,22222,92,8,'Jerusalem','tititi','2021-07-15','2021-07-02 14:19:04','4844999'),(140,123456789,88,129,'zichron yaakov','maale hakarmel 9','2021-07-04','2021-07-02 14:19:34','5456456'),(141,123456789,88,55,'zichron yaakov','maale hakarmel 9','2021-07-04','2021-07-02 14:23:07','5654654456465'),(142,525555,93,124,'Binyamina','king david','2021-07-02','2021-07-02 14:31:10','455');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(150) NOT NULL,
  `category_key` int NOT NULL,
  `price` float NOT NULL,
  `image` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_category_idx` (`category_key`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_key`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'tomato',2,3.5,'pic1.png'),(4,'cucumber',2,9.988,'pic2.png'),(9,'Red Pepper',2,5,'pic3.png'),(10,'Yellow Pepper',2,5,'pic4.png'),(16,'Avocado',2,11.9,'pic5.png'),(17,'Carrots',2,4,'pic6.png'),(18,'White Onion',2,5,'pic7.png'),(19,'Garlic Cloves',2,9,'pic8.png'),(20,'Champignon Mushrooms',2,13.45,'pic9.png'),(53,'Banana',1,6,'pic10.jpg'),(54,'Orange',1,7,'pic11.jpg'),(55,'Red Apple',1,8,'pic12.jpg'),(69,'Watermelom',1,2,'pic15.jpg'),(71,'Nectarine',1,5,'pic18.jpg'),(72,'Blueberries',1,25,'pic19.jpg'),(73,'Melon',1,6,'pic14.jpg'),(74,'Strawberries',1,9,'pic16.jpg'),(75,'Green Kiwi ',1,9,'pic13.jpg'),(76,'Green Grapes',1,20,'pic17.jpg'),(81,'Tenova Milk',3,5.9,'pic20.jpg'),(83,'Bio Yogurt Strawberry Danone 3% – 150g',3,5.9,'pic21.jpg'),(84,'6x Bio Yogurt Strawberry Danone 3%',3,25,'pic22.jpg'),(85,'Danone Bar Plain Yogurt with Mini Chocolate Balls',3,5.9,'pic23.jpg'),(86,'Tnuva Milk Low-Lactose 2% Carton – 1 liter',3,5.9,'pic24.jpg'),(87,'Yotvata Milk 2% – 1 liter',3,7.9,'pic25.jpg'),(88,'Yotvata Choco Chocolate Milk Drink – 250 ml',3,6,'pic26.png'),(89,'Yolo Milk Chocolate ',3,6,'pic27.jpg'),(90,'Yotvata Banana-flavored milk drink – 250 ml',3,6,'pic28.png'),(91,'Tnuva Unsalted Butter – 200g',3,4.5,'pic29.jpg'),(94,'Six Pack Sausage Buns Breads -  Berman',5,14.9,'pic30.png'),(95,'Sliced Bread - 500g - Angel ',5,5.9,'pic31.jpg'),(96,'Wheat Country Style Bread w. No Added Sugar',5,8.8,'pic32.jpeg'),(97,'Tortillas Wrap 10 units - Master Chef',5,10.5,'pic33.jpg'),(98,'Kebab Greek – 400g',6,19.9,'pic34.jpg'),(99,'Tirat Zvi Sausage Hot Dog – Gluten Free',6,13.9,'pic35.jpg'),(100,'Chicken Breast 1kg',6,39.9,'pic36.jpg'),(101,'Amnon Fish',6,7.9,'pic37.jpg'),(102,'Salmon steak sliced ​​frozen',6,25,'pic38.jfif'),(103,'Click Chocolate Covered Cornflakes – 65g',9,5.9,'pic39.jpg'),(104,'Chocolate M & M’s - 50g',9,13.5,'pic40.jpg'),(105,'Elite Cow Milk Chocolate – 4 Pack',9,10.9,'pic41.jpg'),(106,'Elite Cow Milk Chocolate with Strawberry Cream Filling – 100g',9,4.9,'pic42.jfif'),(107,'Kinder Delice Sandwiches - 10 units',9,20,'pic43.jpg'),(108,'Kinder Bueno Milk – 3 pack',9,10.9,'pic44.jpg'),(110,'Click Yellow Chocolate Covered Mini Cookie – 65g',9,5.9,'pic45.jpg'),(111,'Mini Snickers ',9,19.9,'pic46.jpg'),(112,'Kinder Happy Hippo Hazelnut',9,12.5,'pic47.jfif'),(113,'Coca Cola 1.5 ',11,5.9,'pic48.jpg'),(114,'Coca Cola Zero 1.5 ',11,5.9,'pic49.jpg'),(115,'Coca Cola 1.5 - 6 units ',11,30.5,'pic50.png'),(116,'Sprite Lemon 1.5 liter',11,5.9,'pic51.jpg'),(117,'Fanta 1.5 liter',11,5.9,'pic52.jpg'),(118,'Fuze Tea 1.5 liter',11,7.9,'pic53.jpg'),(119,'Spring Orange Juice 1.5 liter',11,6.5,'pic54.jpg'),(120,'Spring Apple Juice 1.5 liter',11,7.9,'pic55.jpg'),(121,'Post Oreo Breakfast Cereal',13,19.9,'pic56.jpg'),(122,'Nestle Trix Breakfast Cereal',13,15.9,'pic57.jpg'),(123,'Frosties Cereal Frosted Flakes',13,21.5,'pic58.jpg'),(124,'Bamba',13,4.3,'pic59.jpg'),(125,'Chips',13,3.5,'pic60.jpg'),(126,'Cheetos',13,4.5,'pic61.jpg'),(127,'Sweet Corn',12,5.5,'pic62.jpg'),(128,'Medium Canned Peas',12,4.9,'pic63.jpg'),(129,'Basmati Rise Sogat',12,10,'pic64.jfif'),(130,'Pasta Osm',12,4.3,'pic65.jpg'),(131,'Sano Sushi Paper Towel – 6 Pack',14,11.9,'pic66.jfif'),(132,'Garbage Bags with drawstring',14,15.9,'pic67.jpg'),(133,'General Cleaning Wipes – 50 pcs',14,13.9,'pic68.jfif'),(134,'Molett+ Toilet Paper 32 Rolls',14,29.9,'pic69.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_key` int NOT NULL,
  `quantity` float DEFAULT NULL,
  `total_price` float NOT NULL,
  `shopping_cart_key` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_idx` (`product_key`),
  KEY `fk_shopping_cart_idx` (`shopping_cart_key`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_key`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_shopping_cart` FOREIGN KEY (`shopping_cart_key`) REFERENCES `shopping_cart` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_cart`
--

LOCK TABLES `products_cart` WRITE;
/*!40000 ALTER TABLE `products_cart` DISABLE KEYS */;
INSERT INTO `products_cart` VALUES (202,1,3,10.5,62),(223,10,1,5,74),(256,1,3,10.5,89),(261,1,3,10.5,90),(262,4,4,39.96,90),(302,53,2,12,93);
/*!40000 ALTER TABLE `products_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_cart`
--

DROP TABLE IF EXISTS `shopping_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `created_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_customer_idx` (`customer_id`),
  CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_cart`
--

LOCK TABLES `shopping_cart` WRITE;
/*!40000 ALTER TABLE `shopping_cart` DISABLE KEYS */;
INSERT INTO `shopping_cart` VALUES (62,29368784,'2021-06-23 21:46:26'),(74,2322,'2021-06-24 16:06:18'),(89,222,'2021-06-28 16:58:07'),(90,39075809,'2021-06-29 09:37:59'),(93,525555,'2021-07-02 14:27:57');
/*!40000 ALTER TABLE `shopping_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street` varchar(200) DEFAULT NULL,
  `phone` varchar(100) NOT NULL,
  `role` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'r','r','sss@gmail.com','1','Petah Tikva','r','',0),(111,'haim','feider','h@gmail.com','4444','Haifa','keren hayesod 90','',0),(123,'idan','amar','idan.eliraz@gmail.com','333','blabla','blabla','',0),(222,'frge','gre','d@gmail.com','123','Binyamina','eree','12323123',0),(444,'idan','amar','idan@gmail.com','12345','hadera','ovadia yosef 10','',0),(555,'sss','sss','ii@gmail.com','111','Jerusalem','fgfgfdd','',0),(567,'bla','bla','blabla@walla.com','9999','tel aviv','shitrit 5','',0),(1111,'haim','feider','h@gmail.com','4444','Haifa','keren hayesod 90','',0),(1123,'fdf','er','s@gmail.com','4','Haifa','fefe','232',0),(2322,'fee','fee','p@gmail.com','123','Haifa','frfe','',0),(2333,'ERWER','ERWERE','sssss@GMAIL.COM','333','Jerusalem','REWRW','',0),(3333,'rrrr','rrr','l@gmail.com','1212','rrrr','rrr','',0),(5555,'shoshi','shosh','k@gmail.com','567','Jerusalem','ufheefjel','',0),(5656,'kk','kkk','e@gmail.com','123','Binyamina','gfgr','3423533653',0),(12345,'feider','feider','feider@gmail.com','1010','jvgfndk','vjnjkvd','',0),(22222,'shimi','shimi','d@gmail.com','12345','Jerusalem','tititi','05456465',0),(33333,'dadi','dsfsdf','d@gmail.com','345','sdfds','fdfsfd','',0),(90909,'shlomo','levi','sh@gmail.com','123','Binyamina','yizhak3','0548455241',0),(123456,'fgf','gdf','jsff@gmail.com','123','f','ffgd','',0),(525555,'1','2','idanamar@gmail.com','890890','Binyamina','king david','0522611',0),(1234567,'oooo','fghfg','ssss@gmail.com','111','dfdgds','dgfdgs','',0),(3435325,'gfgdf','gdfgd','ssss@gmail.com','111','fgdd','gfgd','',0),(29368784,'haim','feider','haimf@tifzoret.co.il','4444','Haifa','keren hayesod 96','',0),(39075809,'arnon','vonsover','a@gmail.com','1234','Haifa','hazait 5','05264864852',0),(123456789,'limor','oren','l@gmail.com','5555','zichron yaakov','maale hakarmel 9','',0),(315682674,'sapir','feider','s@gmail.com','1234','haifa','moshe sharet 74','',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-02 15:09:00
