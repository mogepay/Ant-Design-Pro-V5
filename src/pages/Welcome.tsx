import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card } from 'antd';
import { connect } from 'umi';
import { Button } from '@/components';
import { Jump } from '@/utils';

const Welcome: React.FC<any> = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(process.env.REACT_APP_ENV);
  }, []);

  return (
    <PageContainer>
      <Card>
        <Button onClick={() => {}}>测试</Button>
      </Card>
      {/* <div style={{width: '100%', height: '100%'}}>
        <iframe
          title="resg"
          src={'http://www.domesy.cn/live2d/index.html'}
          style={{ width: '100%', border: '0px', height: '100vh' }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          scrolling="auto"
        />
      </div> */}
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
