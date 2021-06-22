import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Select, message, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';
import moment from 'moment';
import { DatePicker, Space } from 'antd';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Welcome: React.FC<any> = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        {/* <Form formList={list} /> */}

        {/* 正常组件 */}
        <OssUpLoad
          getFiles={(file: Array<any>) => {
            message.success('上传和删除都会触发，返回个数组，请打开控制台看传送的文件'),
              console.log('file', file);
          }}
        />

        {/* 裁剪功能 */}
        <OssUpLoad
          amount={5}
          crop
          getFiles={(file: Array<any>) => {
            message.success('上传和删除都会触发，返回个数组，请打开控制台看传送的文件'),
              console.log('file', file);
          }}
        />

        {/* 裁剪功能 */}
        <OssUpLoad
          crop
          getFiles={(file: Array<any>) => {
            message.success('上传和删除都会触发，返回个数组，请打开控制台看传送的文件'),
              console.log('file', file);
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
