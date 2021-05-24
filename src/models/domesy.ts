import type { Reducer, Effect } from 'umi';
import { setAuthority } from '@/utils/authority';

export type StateType = {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: any;
  effects: {
    // login: Effect;
    // logout: Effect;
  };
  reducers: {
    // changeLoginStatus: Reducer<StateType>;
    changeStatus: Reducer<any>;
  };
};

const Domsey: LoginModelType = {
  namespace: 'domesy',
  state: {
    status: 0,
  },

  effects: {
    *add(action:any, { call, put, select }:any){

      yield put({
        type: 'changeStatus',
        payload: {
          data: 1
        }
      })
    }
  },
  reducers: {
    changeStatus(state, { payload }) {
      const { status } = state;
      const add = status + 1
      return {
        status: add,
        // ...state,
        ...payload
      }
    }
  },
};

export default Domsey;
