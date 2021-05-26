import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';

import { Card } from 'antd';
import { connect } from 'umi';
import { Button } from '@/components'

const Welcome: React.FC<any> = (props) => {

  const [count, setCount] = useState(0)
  return (
    <PageContainer>
      <Card>
        <Button onClick={()=> {
          setCount(count + 1)
        } }>测试</Button>
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }:ConnectState) => ({domesy}))(Welcome)
