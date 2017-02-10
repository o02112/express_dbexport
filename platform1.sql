-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 02 月 10 日 10:08
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

DELIMITER $$
--
-- 函数
--
CREATE DEFINER=`root`@`localhost` FUNCTION `SimpleCompare`(n INT, m INT) RETURNS varchar(20) CHARSET gbk
BEGIN
    DECLARE s VARCHAR(20);

    IF n > m THEN SET s = '>';
    ELSEIF n = m THEN SET s = '=';
    ELSE SET s = '<';
    END IF;

    SET s = CONCAT(n, ' ', s, ' ', m);

    RETURN s;
  END$$

DELIMITER ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='保存在使用中的推广域名' AUTO_INCREMENT=87 ;

-- --------------------------------------------------------

--
-- 表的结构 `menu`
--

CREATE TABLE IF NOT EXISTS `menu` (
  `Id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL DEFAULT '' COMMENT '菜单名称',
  `path` varchar(255) DEFAULT NULL COMMENT '菜单指向路径，跳转地址',
  `icon_class_name` varchar(16) DEFAULT NULL COMMENT '菜单CSS类，用于添加UI图标',
  `permission` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '不同权限显示不同菜单项，比如：5代表用户权限大于等于5时该菜单出现，并可访问',
  `order` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '菜单排序依据，数值越小越靠前',
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='后台菜单项管理，用于权限控制' AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- 表的结构 `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '' COMMENT '权限名称，唯一标识权限',
  `value` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '定义执行该操作所需的最小权限值',
  `description` varchar(255) DEFAULT NULL COMMENT '对权限的详细描述',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COMMENT='定义各种操作所需要的权限值，用户权限大于等于定义值时，代表该用户拥有此权限' AUTO_INCREMENT=2 ;

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
  `remote_ip` varchar(128) DEFAULT '' COMMENT '远程客户端IP地址',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=264 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=926 ;

--
-- 触发器 `platform_jingu618`
--
DROP TRIGGER IF EXISTS `platform_trigger`;
DELIMITER //
CREATE TRIGGER `platform_trigger` AFTER INSERT ON `platform_jingu618`
 FOR EACH ROW insert into platform1 (name, mobile, category, user_action, url, referrer) 
values( new.name, new.mobile, new.category, new.user_action, new.url, new.referrer)
//
DELIMITER ;

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
  `permission` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '用户账户权限，数值越大权限越大，默认为0（普通用户0~255）',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM  DEFAULT CHARSET=gbk AUTO_INCREMENT=14 ;

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
