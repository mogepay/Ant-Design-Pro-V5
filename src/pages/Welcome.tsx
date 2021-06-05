import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';

const Welcome: React.FC<any> = (props) => {
  const [count, setCount] = useState(0);

  const rules = {
    // type: ['jpg', 'png'],
    // typeMsg: '只允许上传jpg'
    // size: 0.01,
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        <OssUpLoad
          multiple
          rules={rules}
          crop
          amount={4}
          OSS
          _config={{
            ossUrl: '000',
            ossText: '年是哦',
          }}
          getFiles={(file: Array<any>) => {
            console.log(file);
          }}
        ></OssUpLoad>
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
