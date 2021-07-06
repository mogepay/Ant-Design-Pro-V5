import logo from '@/assets/logo.svg';
import { Settings as ProSettings } from '@ant-design/pro-layout';

/**
 * @module 全局配置框架部分
 *
 * @param default Ant Design Pro 原有的配置对象
 * @param collapse 下方小按钮的位置，默认为menu
 * @param defaultOpen 是否默认全部打开
 */

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};
interface LayoutProps {
  // default: DefaultSettings;
  collapse?: 'header' | 'menu';
  logo?: React.ReactNode;
  defaultOpen?: boolean;
}

export type { LayoutProps, DefaultSettings };

const layoutSy: LayoutProps = {
  collapse: 'header',
  logo,
  defaultOpen: true,
};

export default layoutSy;
