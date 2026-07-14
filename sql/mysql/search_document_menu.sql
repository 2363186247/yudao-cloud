-- 插入【全文检索】目录
INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('全文检索', '', 1, 99, 0, '/search', 'ep:search', '', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);

-- 获取刚刚插入的目录ID并存入变量
SELECT @parent_id := LAST_INSERT_ID();

-- 插入【检索管理】菜单
INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('检索管理', 'search:document:query', 2, 1, @parent_id, 'document', 'ep:document', 'search/document/index', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);

-- 获取刚刚插入的菜单ID并存入变量
SELECT @menu_id := LAST_INSERT_ID();

-- 插入【检索管理】的增删改查按钮权限
INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('文档查询', 'search:document:query', 3, 1, @menu_id, '', '', '', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);

INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('文档创建', 'search:document:create', 3, 2, @menu_id, '', '', '', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);

INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('文档更新', 'search:document:update', 3, 3, @menu_id, '', '', '', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);

INSERT INTO `system_menu` (`name`, `permission`, `type`, `sort`, `parent_id`, `path`, `icon`, `component`, `status`, `visible`, `keep_alive`, `always_show`, `creator`, `create_time`, `updater`, `update_time`, `deleted`)
VALUES ('文档删除', 'search:document:delete', 3, 4, @menu_id, '', '', '', 0, TRUE, TRUE, TRUE, 'admin', NOW(), 'admin', NOW(), FALSE);
