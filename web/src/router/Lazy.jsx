import React, {Suspense} from 'react';
import {Spin} from 'antd';

// loading 内容
const Loading = () => {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
      <Spin tip="Loading..." />
    </div>
  );
};

// 惰性加载实现
const LazyLoad = (Component) => {
  return (
    // fallback 显示加载中内容
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyLoad;
