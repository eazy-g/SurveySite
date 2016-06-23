-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'guests'
--
-- ---

USE survey;

DROP TABLE IF EXISTS `guests`;

CREATE TABLE `guests` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `identity` VARCHAR (50),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'question_data'
--
-- ---

DROP TABLE IF EXISTS `question_data`;

CREATE TABLE `question_data` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `guest_id` INTEGER (11),
  `question_id` INTEGER (11),
  `user_answer` CHAR(1),
  `answered_yet` ENUM ('yes', 'no'),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'questions'
--
-- ---

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `question_text` VARCHAR (1000),
  `admin_id` INTEGER (11),
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'admins'
--
-- ---

DROP TABLE IF EXISTS `admins`;

CREATE TABLE `admins` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` CHAR,
  `password` CHAR,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `question_data` ADD FOREIGN KEY (guest_id) REFERENCES `guests` (`id`);
ALTER TABLE `question_data` ADD FOREIGN KEY (question_id) REFERENCES `questions` (`id`);
ALTER TABLE `questions` ADD FOREIGN KEY (admin_id) REFERENCES `admins` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `guests` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `question_data` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `admins` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `guests` (`id`,`identity`) VALUES
-- ('','');
-- INSERT INTO `question_data` (`id`,`guest_id`,`question_id`,`user_answer`,`answered_yet`) VALUES
-- ('','','','','');
-- INSERT INTO `questions` (`id`,`question_text`,`admin_id`) VALUES
-- ('','','');
-- INSERT INTO `admins` (`id`,`username`,`password`) VALUES
-- ('','','');
