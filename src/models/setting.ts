import type { DefaultSettings } from '@/utils/Setting';
import { layoutSy } from '@/utils/Setting';

export type SettingModelType = {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {};
};

const updateColorWeak: (colorWeak: boolean) => void = (colorWeak) => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: layoutSy.default,
  reducers: {},
};
export default SettingModel;
