import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import {
  AlertOutlined,
  FileProtectOutlined,
  GithubOutlined,
  HomeOutlined,
  InsuranceOutlined,
  PartitionOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu } from 'antd';
import { Logo, LogoWithTitle } from '../../common/Resource.jsx';

const { Header, Sider, Content, Footer } = Layout;

// 生成菜单结构
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// 菜单数据
const menus = [
  getItem('工作空间', '/dashboard', <HomeOutlined />),
  getItem('监控告警', '100', <AlertOutlined />, [
    getItem('监控大盘', '101'),
    getItem('告警规则', '102'),
    getItem('告警媒介', '103'),
    getItem('告警历史', '104'),
  ]),
  getItem('项目维护', '610', <PartitionOutlined />, [getItem('项目列表', '611'), getItem('应用列表', '612')]),
  getItem('用户中心', '/users', <TeamOutlined />, [
    getItem('用户管理', '/users/user'),
    getItem('分组管理', '/users/group'),
    getItem('角色管理', '/users/role'),
  ]),
  getItem('系统配置', '/system', <SettingOutlined />, [
    getItem('菜单管理', '/system/menu'),
    getItem('接口管理', '/system/api'),
    getItem('服务配置', '/system/setting'),
  ]),
  getItem('日志审计', '2000', <InsuranceOutlined />, [
    getItem('操作日志', '2001'),
    getItem('登录日志', '2002'),
    getItem('改密日志', '2003'),
    getItem('机器日志', '2004'),
  ]),
  getItem('个人中心', '/me', <UserOutlined />),
  getItem('获取帮助', '/help', <FileProtectOutlined />),
];

// 下拉菜单
const dropdownMenus = [
  {
    key: '1',
    label: (
      <a rel="noopener noreferrer" href="">
        @Dylan Kuang
      </a>
    ),
    disabled: true,
  },
  {
    type: 'divider',
  },
  {
    key: '2',
    label: (
      <a rel="noopener noreferrer" href="">
        关于我们 <GithubOutlined />
      </a>
    ),
  },
  {
    key: '10',
    label: (
      <a rel="noopener noreferrer" href="">
        注销登录
      </a>
    ),
  },
];

const AdminLayout = () => {
  // 路由跳转
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        className="admin-sider"
        width={220}
        collapsedWidth={60}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}>
        <div
          className="admin-layout-logo"
          style={{
            width: collapsed ? '60px' : '220px',
          }}>
          <img src={collapsed ? Logo : LogoWithTitle} alt="" />
        </div>
        <Menu
          className="admin-sider-menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={menus}
          onClick={({ key }) => {
            console.log(key);
            navigate(key); // 路由跳转
          }}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? '60px' : '220px',
          minHeight: '100vh',
          backgroundColor: '#ffffff',
        }}>
        <Header className="admin-header">
          <div className="admin-header-title">
            <span>工作空间</span>
          </div>
          <div className="admin-header-menu">
            <Dropdown menu={{ items: dropdownMenus }}>
              <div className="admin-header-dropdown">
                <Avatar src="/src/assets/image/avatar/default.png" size={28} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <Footer className="admin-footer">
          🌼 Pandora <GithubOutlined /> Copyright ©2024 EZOPS.CN, All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
