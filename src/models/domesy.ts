import type { Reducer, Effect } from 'umi';

export type StateType = {
  status?: number;
};

export type DomesyModelType = {
  namespace: string;
  state: StateType;
  effects: {
    add: Effect;
  };
  reducers: {
    changeStatus: Reducer<any>;
  };
};

const Domsey: DomesyModelType = {
  namespace: 'domesy',
  state: {
    status: 0,
  },

  effects: {
    *add(action, { call, put, select }){
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
