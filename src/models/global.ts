import type { Reducer, Effect } from 'umi';

import type { NoticeIconData } from '@/components/NoticeIcon';

export type NoticeItem = {
  id: string;
  type: string;
  status: string;
} & NoticeIconData;

export type GlobalModelState = {
  collapsed: boolean;
  notices: NoticeItem[];
};

export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
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
  },
};

export default GlobalModel;
