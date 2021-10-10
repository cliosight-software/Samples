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



