import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4221474_9skmjh3qnrp.js', // 在 iconfont.cn 上生成
});

export const fixMenuIcon = (menus: API.Menu[]): any => {
  if (!menus || menus.length === 0) {
    return [];
  }
  return menus.map((menu) => {
    return {
      id: menu.id,
      path: menu.menuPath || '',
      name: menu.menuName || '',
      icon: React.cloneElement(<Icon type={`icon-${menu.menuIcon}`} />),
      routes: fixMenuIcon(menu.children),
    };
  });
};
