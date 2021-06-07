import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';

const Welcome: React.FC<any> = (props) => {
  const [count, setCount] = useState(0);

  const rules = {
    // type: ['jpg', 'png'],
    // typeMsg: '只允许上传jpg'
    // size: 0.01,
  };

  useEffect(() => {}, []);
  return (
    <PageContainer>
      {/* <Card> */}
      {/* <Button onClick={() => {}}>测试</Button>

      </Card> */}
      {/* <div style={{width: '100%', height: '100%'}}>
        <iframe
          title="resg"
          src={'http://www.domesy.cn/live2d/index.html'}
          style={{ width: '100%', border: '0px', height: '100vh' }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          scrolling="auto"
        />
      </div> */}

      <OssUpLoad />
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
