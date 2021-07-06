export type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};
export interface LayoutProps {
  default: DefaultSettings;
  collapse?: 'header' | 'menu';
  logo?: React.ReactNode;
}
