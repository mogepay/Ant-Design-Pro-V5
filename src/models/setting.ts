import type { DefaultSettings } from '../../config/defaultSettings';
import defaultSettings from '../../config/defaultSettings';

export type SettingModelType = {
  namespace: 'settings';
  state: DefaultSettings;
  reducers: {};
};

const SettingModel: SettingModelType = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {},
};
export default SettingModel;
