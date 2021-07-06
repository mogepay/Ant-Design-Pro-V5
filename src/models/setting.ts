import type { DefaultSettings } from '@/utils/Setting';
import { layoutSy } from '@/utils/Setting';

export type SettingModelType = {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {};
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: layoutSy.default,
  reducers: {},
};
export default SettingModel;
