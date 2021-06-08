import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';

const Welcome: React.FC<any> = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        <Form />
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
