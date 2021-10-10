--
-- Table structure for table `client_table_forms`
--

DROP TABLE IF EXISTS `client_table_forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_table_forms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `table_info` text,
  `label` text,
  `html` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_table_forms`
--

LOCK TABLES `client_table_forms` WRITE;
/*!40000 ALTER TABLE `client_table_forms` DISABLE KEYS */;
INSERT INTO `client_table_forms` VALUES (1,1,'{\"id\":\"11\",\"tableDefinition\":{\"label\":\"Blog\",\"fields\":[{\"label\":\"Title\",\"type\":\"text\",\"id\":1},{\"label\":\"Content\",\"type\":\"text\",\"id\":2}]}}','Blog Form 1','%3Cdiv%3EBlog%20Title%20%3A%26nbsp%3B%3Cinput%20name%3D%22table%5B11%5D%5B1%5D%22%20type%3D%22text%22%20%2F%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3EBlog%20Content%20%3A%26nbsp%3B%3Cinput%20name%3D%22table%5B11%5D%5B2%5D%22%20type%3D%22text%22%20%2F%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%3Cinput%20name%3D%22submit%22%20type%3D%22submit%22%20value%3D%22Submit%20Blog%22%20%2F%3E%3C%2Fdiv%3E%0A'),(2,1,'{\"id\":\"8\",\"tableDefinition\":{\"label\":\"Company\",\"fields\":[{\"label\":\"Name\",\"type\":\"text\",\"id\":1},{\"label\":\"Location\",\"type\":\"text\",\"id\":2}]}}','Company Form 1','%3Cdiv%3EName%20%3A%26nbsp%3B%3Cinput%20id%3D%22table_8_1%22%20name%3D%22table%5B8%5D%5B1%5D%22%20type%3D%22text%22%20%2F%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3ELocation%20%3A%26nbsp%3B%3Cselect%20id%3D%22table_8_2%22%20name%3D%22table%5B8%5D%5B2%5D%22%3E%3Coption%20value%3D%22New%20York%22%3ENew%20York%3C%2Foption%3E%3Coption%20value%3D%22Hershey%22%3EHershey%3C%2Foption%3E%3Coption%20value%3D%22San%20Francisco%22%3ESan%20Francisco%3C%2Foption%3E%3C%2Fselect%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%3Cinput%20name%3D%22submit%22%20type%3D%22submit%22%20value%3D%22Save%22%20%2F%3E%3C%2Fdiv%3E%0A'),(3,1,'{\"id\":\"7\",\"tableDefinition\":{\"label\":\"Contact\",\"fields\":[{\"label\":\"Email\",\"type\":\"text\",\"id\":1},{\"label\":\"Name\",\"type\":\"text\",\"id\":2},{\"label\":\"Phone\",\"type\":\"text\",\"id\":3}]}}','Contact Form 1','%3Cdiv%3E%3Cspan%20style%3D%22background-color%3A%2300ff00%22%3EEmail%20%3C%2Fspan%3E%3A%26nbsp%3B%3Cinput%20id%3D%22table_7_1%22%20name%3D%22table%5B7%5D%5B1%5D%22%20type%3D%22text%22%20%2F%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%3Cspan%20style%3D%22color%3A%23ffffff%22%3E%3Cspan%20style%3D%22background-color%3A%23ff0000%22%3EName%3C%2Fspan%3E%3C%2Fspan%3E%20%3A%26nbsp%3B%3Cinput%20id%3D%22table_7_2%22%20name%3D%22table%5B7%5D%5B2%5D%22%20type%3D%22checkbox%22%20value%3D%22Dikshit%22%20%2F%3E%3Cspan%20style%3D%22background-color%3A%23ffff00%22%3EDikshit%3C%2Fspan%3E%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%3Cspan%20style%3D%22color%3A%23ffffff%22%3E%3Cspan%20style%3D%22background-color%3A%230000cd%22%3EPhone%3C%2Fspan%3E%3C%2Fspan%3E%20%3A%26nbsp%3B%3Cinput%20id%3D%22table_7_3%22%20name%3D%22table%5B7%5D%5B3%5D%22%20type%3D%22radio%22%20value%3D%22123%22%20%2F%3E123%3Cinput%20id%3D%22table_7_3%22%20name%3D%22table%5B7%5D%5B3%5D%22%20type%3D%22radio%22%20value%3D%22456%22%20%2F%3E%3Cspan%20style%3D%22color%3A%23ffffff%22%3E%3Cspan%20style%3D%22background-color%3A%23000000%22%3E456%3C%2Fspan%3E%3C%2Fspan%3E%3Cinput%20id%3D%22table_7_3%22%20name%3D%22table%5B7%5D%5B3%5D%22%20type%3D%22radio%22%20value%3D%22789%22%20%2F%3E789%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%26nbsp%3B%3C%2Fdiv%3E%0A%0A%3Cdiv%3E%3Cinput%20name%3D%22submit%22%20type%3D%22submit%22%20value%3D%22Save%22%20%2F%3E%3C%2Fdiv%3E%0A');
/*!40000 ALTER TABLE `client_table_forms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_tables`
--

DROP TABLE IF EXISTS `client_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `table_definition` text,
  `label` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_tables`
--

LOCK TABLES `client_tables` WRITE;
/*!40000 ALTER TABLE `client_tables` DISABLE KEYS */;
INSERT INTO `client_tables` VALUES (7,1,'{\"label\":\"Contact\",\"fields\":[{\"label\":\"Email\",\"type\":\"text\",\"id\":1},{\"label\":\"Name\",\"type\":\"text\",\"id\":2},{\"label\":\"Phone\",\"type\":\"text\",\"id\":3}]}','Contact'),(8,1,'{\"label\":\"Company\",\"fields\":[{\"label\":\"Name\",\"type\":\"text\",\"id\":1},{\"label\":\"Location\",\"type\":\"text\",\"id\":2}]}','Company'),(9,2,'{\"label\":\"tab1\",\"fields\":[{\"label\":\"col1\",\"type\":\"text\",\"id\":1},{\"label\":\"col2\",\"type\":\"text\",\"id\":2}]}','tab1'),(10,1,'{\"label\":\"Contact Company\",\"fields\":[{\"label\":\"Contact Id\",\"type\":\"text\",\"id\":1},{\"label\":\"Company Id\",\"type\":\"text\",\"id\":2},{\"label\":\"Start Date\",\"type\":\"text\",\"id\":3},{\"label\":\"End Date\",\"type\":\"text\",\"id\":4}]}','Contact Company'),(11,1,'{\"label\":\"Blog\",\"fields\":[{\"label\":\"Title\",\"type\":\"text\",\"id\":1},{\"label\":\"Content\",\"type\":\"text\",\"id\":2}]}','Blog'),(12,1,'{\"label\":\"Comment\",\"fields\":[{\"label\":\"From\",\"type\":\"text\",\"id\":1},{\"label\":\"Content\",\"type\":\"text\",\"id\":2},{\"label\":\"Blog\",\"type\":\"text\",\"id\":3}]}','Comment'),(13,1,'{\"label\":\"Reply\",\"fields\":[{\"label\":\"From\",\"type\":\"text\",\"id\":1},{\"label\":\"Content\",\"type\":\"text\",\"id\":2},{\"label\":\"Comment\",\"type\":\"text\",\"id\":3}]}','Reply');
/*!40000 ALTER TABLE `client_tables` ENABLE KEYS */;
UNLOCK TABLES;


/* Cliosuite out-of-the-box metadata  */

CREATE TABLE `cliosuite_config` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`config_name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
`config_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cliosuite_schema_info` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`schema_name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
`table_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`table_schema` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
`unique_key_set` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`number_fields` varchar(255) COLLATE utf8mb4_unicode_ci,
`max_row_count` int(3) COLLATE utf8mb4_unicode_ci NOT NULL,
`max_col_count` int(3) COLLATE utf8mb4_unicode_ci NOT NULL,
`is_accessible` int(1) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `table_name` (`table_name`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `db_table_backup` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`backup_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL, 
`table_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`json_data` varchar(3000) COLLATE utf8mb4_unicode_ci,
`user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `backup_id` (`backup_id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `db_ops` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`op_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL, 
`op_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`entity_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`user_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `op_id` (`op_id`)
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/* contacts and groups */
CREATE TABLE `contacts` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`contact_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`contact_first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`contact_middle_name` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_last_name` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
`contact_email1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
`contact_email2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
`contact_mobile_country_code` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_mobile_number` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE,
`contact_mobile_country_code1` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_mobile_number1` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE,
`contact_address_home` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_address_work` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_ssn` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE,
`contact_company_name` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_website` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_birthday` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_social_media` varchar(255) COLLATE utf8mb4_unicode_ci,
`contact_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, 
`start_time_to_call` varchar(255) COLLATE utf8mb4_unicode_ci, 
`end_time_to_call` varchar(255) COLLATE utf8mb4_unicode_ci, 
`status_change_reason` varchar(300) COLLATE utf8mb4_unicode_ci,
`multimedia_filename` varchar(255) COLLATE utf8mb4_unicode_ci, 
`multimedia_filename1` varchar(255) COLLATE utf8mb4_unicode_ci, 
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY`contact_id` (`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `status_change_history` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`contact_group_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`status_change_reason` varchar(300) COLLATE utf8mb4_unicode_ci,
`personnel_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
UNIQUE KEY `group_contact_id` (`group_id`,`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `groups` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`group_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_desc` varchar(255) COLLATE utf8mb4_unicode_ci,
`group_tag_line` varchar(400) COLLATE utf8mb4_unicode_ci,
`group_category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_scope` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`status_change_reason` varchar(300) COLLATE utf8mb4_unicode_ci,
`group_admin_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_email_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`group_storage_drive_link` varchar(255) COLLATE utf8mb4_unicode_ci,
`group_website` varchar(255) COLLATE utf8mb4_unicode_ci,
`group_social_media` varchar(255) COLLATE utf8mb4_unicode_ci,
`group_start` varchar(255) COLLATE utf8mb4_unicode_ci, 
`group_end` varchar(255) COLLATE utf8mb4_unicode_ci,
`multimedia_filename` varchar(255) COLLATE utf8mb4_unicode_ci, 
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `group_id` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `group_members` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`group_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`contact_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`contact_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `group_contact_id` (`group_id`,`contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `group_category` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`group_cat_id` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`category_name` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`category_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, -- OOB or custom --
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `group_cat_id` (`group_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `contact_category` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`contact_cat_id` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`category_name` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`category_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, -- OOB or custom --
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `group_cat_id` (`group_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `OOB_tables` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`table_id` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`table_name` varchar(255) COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
`table_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL, -- OOB or user defined --
`is_accessible` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL, -- yes or no --
`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`),
 UNIQUE KEY `table_id` (`table_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



