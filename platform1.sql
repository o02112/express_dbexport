-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 16 日 14:26
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

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
-- 替换视图以便查看 `count_month`
--
CREATE TABLE IF NOT EXISTS `count_month` (
`domain` varchar(255)
,`total` bigint(21)
);
-- --------------------------------------------------------

--
-- 替换视图以便查看 `count_today`
--
CREATE TABLE IF NOT EXISTS `count_today` (
`domain` varchar(255)
,`total` bigint(21)
);
-- --------------------------------------------------------

--
-- 替换视图以便查看 `count_week`
--
CREATE TABLE IF NOT EXISTS `count_week` (
`domain` varchar(255)
,`total` bigint(21)
);
-- --------------------------------------------------------

--
-- 替换视图以便查看 `count_yestoday`
--
CREATE TABLE IF NOT EXISTS `count_yestoday` (
`domain` varchar(255)
,`total` bigint(21)
);
-- --------------------------------------------------------

--
-- 表的结构 `domains`
--

CREATE TABLE IF NOT EXISTS `domains` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) NOT NULL DEFAULT '' COMMENT '推广地址',
  `category` varchar(255) DEFAULT NULL COMMENT '页面内容分类，如：白银、行情等',
  `seo_name` varchar(255) DEFAULT NULL COMMENT '搜索引擎名称，如：百度，360搜索',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='保存在使用中的推广域名' AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `platform1`
--

CREATE TABLE IF NOT EXISTS `platform1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(8) NOT NULL,
  `mobile` char(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `user_action` varchar(32) NOT NULL,
  `is_new` bit(1) NOT NULL DEFAULT b'1',
  `remote_ip` varchar(128) DEFAULT NULL COMMENT '远程客户端IP地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1540 ;

-- --------------------------------------------------------

--
-- 表的结构 `platform_jingu618`
--

CREATE TABLE IF NOT EXISTS `platform_jingu618` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `submitted` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(8) NOT NULL,
  `mobile` char(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `referrer` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `user_action` varchar(32) NOT NULL,
  `is_new` bit(1) NOT NULL DEFAULT b'1',
  `remote_ip` varchar(128) DEFAULT NULL COMMENT '远程客户端IP地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4984 ;

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '登陆用户名',
  `email` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '管理登录用户资料email地址',
  `password` char(32) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '登陆密码md5加密',
  `register_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '用户注册时间',
  `checked` bit(1) NOT NULL DEFAULT b'0' COMMENT '后台管理用户通过审核才可登录',
  `access_log` varchar(255) DEFAULT '' COMMENT '记录用户最近登录情况，如（f1701110925），f代表登录失败，s代表登录成功，和时间',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=15 ;

-- --------------------------------------------------------

--
-- 视图结构 `count_month`
--
DROP TABLE IF EXISTS `count_month`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `count_month` AS select `d`.`domain` AS `domain`,count(`p`.`id`) AS `total` from (`domains` `d` left join `platform1` `p` on(((`p`.`url` like concat('%',`d`.`domain`,'%')) and (`p`.`submitted` > (curdate() - interval 1 month))))) group by `d`.`domain`;

-- --------------------------------------------------------

--
-- 视图结构 `count_today`
--
DROP TABLE IF EXISTS `count_today`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `count_today` AS select `d`.`domain` AS `domain`,count(`p`.`id`) AS `total` from (`domains` `d` left join `platform1` `p` on(((`p`.`url` like concat('%',`d`.`domain`,'%')) and (to_days(`p`.`submitted`) = to_days(now()))))) group by `d`.`domain`;

-- --------------------------------------------------------

--
-- 视图结构 `count_week`
--
DROP TABLE IF EXISTS `count_week`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `count_week` AS select `d`.`domain` AS `domain`,count(`p`.`id`) AS `total` from (`domains` `d` left join `platform1` `p` on(((`p`.`url` like concat('%',`d`.`domain`,'%')) and (`p`.`submitted` > (curdate() - interval 1 week))))) group by `d`.`domain`;

-- --------------------------------------------------------

--
-- 视图结构 `count_yestoday`
--
DROP TABLE IF EXISTS `count_yestoday`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `count_yestoday` AS select `d`.`domain` AS `domain`,count(`p`.`id`) AS `total` from (`domains` `d` left join `platform1` `p` on(((`p`.`url` like concat('%',`d`.`domain`,'%')) and (`p`.`submitted` > (curdate() - interval 1 day))))) group by `d`.`domain`;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
