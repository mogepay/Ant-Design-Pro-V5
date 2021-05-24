import React, { useEffect, useReducer } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { Button } from '@/components'

export default (): React.ReactNode => {

  const [data, distpath] = useReducer((state:any, action:any) => {
    switch(action){
        case 'add':
            return state+1
        case 'sub':
            return state-1
        default:
            return state
      }
  } , 1)

  useEffect(() => {
    console.log(data, '1')
  }, [])

  return (
    <PageContainer>
      <Card>
        <div>{data}</div>
        <Button onClick={()=> {distpath('add')} }>加1</Button>
        <Button onClick={()=> {distpath('sub')} }>减一</Button>
        <Button onClick={()=> {distpath('test')} }>不变</Button>
      </Card>
    </PageContainer>
  );
};
