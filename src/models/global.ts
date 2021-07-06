import type { Reducer, Effect } from 'umi';
import type { NoticeIconData } from '@/components/NoticeIcon';
import { layoutSy } from '@/utils/Setting';

export type NoticeItem = {
  id: string;
  type: string;
  status: string;
} & NoticeIconData;

export type GlobalModelState = {
  layoutSy?: any;
  collapsed: boolean;
  notices: NoticeItem[];
};

export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    getInitData: Reducer<any>;
  };
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
  },
  effects: {},
  reducers: {
    changeLayoutCollapsed(state = { notices: [], collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    getInitData(state) {
      return {
        ...state,
        layoutSy,
      };
    },
  },
};

export default GlobalModel;
