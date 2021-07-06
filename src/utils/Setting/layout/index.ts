import logo from '@/assets/logo.svg';
import { Settings as ProSettings } from '@ant-design/pro-layout';

/**
 * @module 全局配置框架部分
 *
 * @param default Ant Design Pro 原有的配置对象
 * @param collapse 下方小按钮的位置，默认为menu
 */

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};
interface LayoutProps {
  default: DefaultSettings;
  collapse?: 'header' | 'menu';
  logo?: React.ReactNode;
}

export type { LayoutProps, DefaultSettings };

const layoutSy: LayoutProps = {
  default: {
    navTheme: 'dark',
    primaryColor: '#1890ff',
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: false,
    colorWeak: false,
    title: 'Domesy',
    menu: {
      locale: false,
    },
    pwa: false,
    iconfontUrl: '',
  },
  collapse: 'header',
  logo,
};

export default layoutSy;
