-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 11 月 24 日 16:55
-- 服务器版本: 5.5.40
-- PHP 版本: 5.3.29

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `platform1`
--

-- --------------------------------------------------------

--
-- 表的结构 `platform1`
--

CREATE TABLE IF NOT EXISTS `platform1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(8) NOT NULL,
  `mobile` char(11) NOT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `user_action` varchar(32) NOT NULL,
  `is_new` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=155 ;

--
-- 转存表中的数据 `platform1`
--

INSERT INTO `platform1` (`id`, `submitted`, `name`, `mobile`, `referrer`, `category`, `url`, `user_action`, `is_new`) VALUES
(141, '2016-11-24 06:31:46', 'atest', '13333333333', 'http://localhost/singles/single8/qdyj/', '贵金属', 'http://localhost/singles/single8/qdyj/mobile.html', '赠送投资教程', b'0'),
(142, '2016-11-24 06:04:14', '回学校', '13333333333', '', '贵金属', 'http://192.168.1.135/singles/single8/qdyj/mobile.html', '体验模拟操作', b'0'),
(143, '2016-11-24 06:04:17', 'yy', '13333333333', '', '贵金属', 'http://192.168.1.135/singles/single8/qdyj/mobile.html', '体验模拟操作', b'0'),
(144, '2016-11-24 06:04:20', 'www', '13333333333', 'http://localhost/singles/single8/', '贵金属', 'http://localhost/singles/single8/qdyj/', '发送盈利宝典', b'0'),
(145, '2016-11-24 06:31:46', 'qwe', '13333333333', 'http://localhost/singles/single1/', '交易中心', 'http://localhost/singles/single1/php/', '', b'0'),
(146, '2016-11-24 06:31:46', 'a', '13333333333', 'http://localhost/singles/single1/php/', '交易中心', 'http://localhost/singles/single1/php/?category=%E4%BA%A4%E6%98%93%E4%B8%AD%E5%BF%83&title=ll&mobile=13333333333', '', b'0'),
(147, '2016-11-24 06:31:46', 'aa', '13333333333', 'http://localhost/singles/single1/php/mobile.html?keywords=', '外汇', 'http://localhost/singles/single1/php/mobile.html?keywords=', '123haha', b'0'),
(148, '2016-11-24 08:31:07', 'aa', '13333333333', 'http://localhost/singles/single1/php/mobile.html?keywords=', '交易中心', 'http://localhost/singles/single1/php/mobile.html?keywords=', '123hahahehehe', b'0'),
(149, '2016-11-24 08:31:07', 'ww', '13333333333', '', '天然气', 'http://localhost/singles/single1/php/', '', b'0'),
(150, '2016-11-24 08:31:07', 'a', '13333333333', '', '交易中心', 'http://localhost/singles/single1/php/', 'qqq', b'0'),
(151, '2016-11-24 08:31:07', 'ztr', '13333333333', '', '股票', 'http://localhost/singles/single1/php/', 'qqq', b'0'),
(152, '2016-11-24 08:31:07', 'z', '13333333333', '', '交易中心', 'http://localhost/singles/single1/php/', '1', b'0'),
(153, '2016-11-24 08:31:07', '12', '13333333333', '', '交易中心', 'http://localhost/singles/single1/php/', '', b'0'),
(154, '2016-11-24 08:31:07', 'q', '13333333333', '', '交易中心', 'http://localhost/singles/single1/php/', '213', b'0');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
