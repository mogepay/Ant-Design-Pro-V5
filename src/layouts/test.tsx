// {
//   menuData.length!==0 ?
//   <ProLayout
//     logo={logo}
//     formatMessage={formatMessage}
//     {...props}
//     {...settings}
//     onCollapse={handleMenuCollapse}
//     onMenuHeaderClick={() => history.push('/')}
//     menuItemRender={(menuItemProps, defaultDom) => {
//       if (
//         menuItemProps.isUrl ||
//         !menuItemProps.path ||
//         location.pathname === menuItemProps.path
//       ) {
//         return defaultDom;
//       }
//       return <Link to={menuItemProps.path}>{defaultDom}</Link>;
//     }}
//     breadcrumbRender={(routers = []) => [
//       {
//         path: '/',
//         breadcrumbName: formatMessage({ id: 'menu.home' }),
//       },
//       ...routers,
//     ]}
//     itemRender={(route, params, routes, paths) => {
//       const first = routes.indexOf(route) === 0;
//       return first ? (
//         <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
//       ) : (
//         <span>{route.breadcrumbName}</span>
//       );
//     }}
//     footerRender={() => {
//       if (settings.footerRender || settings.footerRender === undefined) {
//         return defaultFooterDom;
//       }
//       return null;
//     }}
//     menuDataRender={() => menuData}
//     rightContentRender={() => <RightContent />}
//     postMenuData={(menuData) => {
//       menuDataRef.current = menuData || [];
//       return menuData || [];
//     }}
//     waterMarkProps={{
//       content: 'Ant Design Pro',
//       fontColor: 'rgba(24,144,255,0.15)',
//     }}
//   >
//     <Authorized authority={authorized!.authority} noMatch={noMatch}>
//       {children}
//     </Authorized>
//   </ProLayout>
//     :
//     <div></div>
//   }
// </>
