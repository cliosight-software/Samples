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

