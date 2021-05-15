/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type { MenuDataItem, BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, useIntl, connect, history } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import allIcons from '@@/plugin-antd-icon/icons';

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export type BasicLayoutProps = {
  breadcrumbNameMap: Record<string, MenuDataItem>;
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
} & ProLayoutProps;
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: Record<string, MenuDataItem>;
};

/** Use Authorized check all menu item */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} Produced by Ant Group Experience Technology Department`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const [menuData, setMenuData] = useState<any>([]);

  const menuDataRef = useRef<MenuDataItem[]>([]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
    // const result = [
    //   {
    //     "path": "/welcome",
    //     "name": "welcome",
    //     "icon": "smile",
    //   },
    //   {
    //     "path": "/admin",
    //     "name": "admin",
    //     "icon": "crown",
    //     children: [
    //       {
    //         "path": "/admin/sub-page",
    //         "name": "sub-page"
    //       }
    //     ]
    //   }
    // ]
    // setMenuData(formatter(result || []))
  }, []);
  /** Init variables */

  const toHump = (name: string) => name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

  const formatter = (data: any[]) => {
    data.forEach(item => {
      if (item.icon) {
        const { icon } = item;
        const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
        const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];
        if (NewIcon) {
          try {
            // eslint-disable-next-line no-param-reassign
            item.icon = React.createElement(NewIcon);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (item.routes || item.children) {
        const children = formatter(item.routes || item.children); // Reduce memory usage
        item.children = children;
      }
    })
    return data;
  };

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  const { formatMessage } = useIntl();

  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      {...props}
      {...settings}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (
          menuItemProps.isUrl ||
          !menuItemProps.path ||
          location.pathname === menuItemProps.path
        ) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({ id: 'menu.home' }),
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      footerRender={() => {
        if (settings.footerRender || settings.footerRender === undefined) {
          return defaultFooterDom;
        }
        return null;
      }}
      menuDataRender={menuDataRender}
      rightContentRender={() => <RightContent />}
      postMenuData={(menuData) => {
        menuDataRef.current = menuData || [];
        return menuData || [];
      }}
      waterMarkProps={{
        content: 'Ant Design Pro',
        fontColor: 'rgba(24,144,255,0.15)',
      }}
    >
    <Authorized authority={authorized!.authority} noMatch={noMatch}>
      {children}
    </Authorized>
  </ProLayout>
    // <>
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
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
