import React, { useEffect, useReducer } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';

import { Card } from 'antd';
import { connect } from 'umi';
import { Button } from '@/components'

const Welcome: React.FC<any> = (props) => {

  useEffect(() => {
    console.log(props,'--')
  }, [props.domesy])

  return (
    <PageContainer>
      <Card>
        <div>{props.domesy.status}</div>
        <Button onClick={()=> {
          const { dispatch } = props

          dispatch({
            type: 'domesy/add',
            payload: {
              data: 1
            },
            data:{
              list: '1'
            }
          })

        } }>测试</Button>
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }:ConnectState) => ({domesy}))(Welcome)
