import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';

const list: any = [
  // {
  //   name: 'input',
  //   label: '普通输入框',
  // },
  // {
  //   name: 'input1',
  //   label: '宽度',
  //   width: 'sm'
  // },
  // {
  //   name: 'input2',
  //   label: '提示语',
  //   tooltip: '我是提示语'
  // },
  // {
  //   name: 'input3',
  //   label: '为空时的文本样式',
  //   placeholder: '自定义placeholder'
  // },
  // {
  //   name: 'input4',
  //   label: '禁用',
  //   disabled:true
  // },
  {
    name: 'input5',
    label: '必填',
    tooltip: '此选项必填，并且不能为空格',
    rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
  },
  {
    name: 'input6',
    label: '正则',
    tooltip: '所有有规则的都会加入required，并且不能为空格，简化开发',
    rules: [
      {
        pattern: /^1\d{10}$/,
        message: '满足规则为校验正确否则不正确',
        reMessage: '为空时的提示语',
      },
    ],
  },
];

const Welcome: React.FC<any> = (props) => {
  useEffect(() => {}, []);

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        <Form formList={list} />
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
