import React from 'react';
import {Navigate, useRoutes} from 'react-router';
import AdminLayout from '../components/layout/AdminLayout.jsx';
import LazyLoad from './Lazy.jsx';

// 路由数据
export const RouteData = [
  {
    path: '/', // 首页跳转;
    element: <Navigate to="/dashboard" />,
  },
  {
    // 后台路由
    path: '/',
    element: <AdminLayout />,
    // 子页面
    children: [
      {
        path: 'dashboard', // 工作台
        element: LazyLoad(React.lazy(() => import('/src/pages/dashboard/Dashboard.jsx'))),
      },
      {
        path: '403', // 403
        element: LazyLoad(React.lazy(() => import('/src/pages/error/403.jsx'))),
      },
      {
        path: '404', // 404
        element: LazyLoad(React.lazy(() => import('/src/pages/error/404.jsx'))),
      },
      {
        path: '500', // 404
        element: LazyLoad(React.lazy(() => import('/src/pages/error/500.jsx'))),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/404" />,
  },
];

// 生成路由列表
const RouteList = () => {
  return useRoutes(RouteData);
};

export default RouteList;
