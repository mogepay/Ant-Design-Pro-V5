/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 *
 * @see You can view component api by: https://github.com/ant-design/ant-design-pro-layout
 */
import type {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import ProLayout from '@ant-design/pro-layout';
import { Footer } from '@/commonPages';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { Dispatch } from 'umi';
import { Link, connect, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import type { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import logo from '../assets/logo.svg';
import allIcons from '@@/plugin-antd-icon/icons';
import { LiveSetting } from '@/commonPages';
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
  }, []);
  /** Init variables */

  const toHump = (name: string) =>
    name.replace(/-(\w)/g, (all: string, letter: any) => letter.toUpperCase());

  const formatter = (data: any[]) => {
    data.forEach((item) => {
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
    });
    return data;
  };

  const handleMenuCollapse = (payload: boolean): void => {
    console.log('1');

    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );
  return (
    <>
      <ProLayout
        logo={logo}
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
            breadcrumbName: '首页',
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          const secound = route.path === '/' ? false : true;
          return first && secound ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => {
          if (settings.footerRender || settings.footerRender === undefined) {
            return <Footer />;
          }

          return null;
        }}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        postMenuData={(menuData) => {
          menuDataRef.current = menuData || [];
          return menuData || [];
        }} // waterMarkProps={{
        //   content: 'Domesy',
        //   fontColor: 'rgba(24,144,255,0.15)',
        // }}
      >
        <Authorized authority={authorized!.authority} noMatch={noMatch}>
          {children}
        </Authorized>
      </ProLayout>

      <LiveSetting />
    </> // {
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
