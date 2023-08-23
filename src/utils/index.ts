export const formatMenus = (menus: API.Menu[]): any => {
  if (!menus || menus.length === 0) {
    return [];
  }
  return menus.map((menu) => {
    return {
      id: menu.id,
      path: menu.menuPath || '',
      name: menu.menuName || '',
      icon: menu.menuIcon || '',
      routes: formatMenus(menu.children),
    };
  });
};
