import type { Reducer, Effect } from 'umi';
import { message } from 'antd';

export type StateType = {
  status?: number;
};

export type DomesyModelType = {
  namespace: string;
  state: StateType;
  effects: {
    initSetting: Effect;
  };
  reducers: {
    domesyInitSetting: Reducer<any>;
  };
};

const Domsey: DomesyModelType = {
  namespace: 'domesy',
  state: {},
  effects: {
    *initSetting(actions, { call, put, select }) {
      // 获取版本信息 获取是PC还是安卓还是ios，并获取版本号
      const { system_version, system_name } = getSystem();

      // development
      // env为true 代表开发环境，false代表生产环境
      const payload = {
        env: process.env.NODE_ENV === 'development' ? true : false,
        system_name, // 当前设备
        system_version, //当前版本
      };

      yield put({
        type: 'domesyInitSetting',
        payload,
      });
    },
  },
  reducers: {
    domesyInitSetting(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
};

// 获取设备信息
const getSystem = () => {
  let system_version: string = '';
  let system_name: string = '';
  const agent = navigator.userAgent;
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isAndroid = agent.indexOf('Android') > -1 || agent.indexOf('Adr') > -1;

  if (isiOS) {
    system_name = 'Ios';
    const match = agent.toLowerCase().match(/cpu iphone os (.*?) like mac os/);
    system_version = match ? match[1] : '';
  } else if (isAndroid) {
    system_name = 'Android';
    const match = agent.toLowerCase().match(/android\s([0-9\.]*)/);
    system_version = match ? match[1] : '';
  } else {
    system_name = 'PC';
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    system_version = isMac
      ? 'mac'
      : agent.toLowerCase().indexOf('win32') >= 0 || agent.toLowerCase().indexOf('wow32') >= 0
      ? 'windows32'
      : 'windows64';
  }

  return {
    system_version,
    system_name,
  };
};

export default Domsey;
