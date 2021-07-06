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

import { MailTwoTone, HeartOutlined } from '@ant-design/icons';
const { Option } = Select;

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Welcome: React.FC<any> = (props) => {
  useEffect(() => {}, []);
  const [file, setFile] = useState<any>('');
  const [fromRef, setFromRef] = useState<any>(false);

  // input 加入required失效
  // const list: any = [
  //   {
  //     name: 'input',
  //     label: '普通输入框',
  //     tooltip: 'type: input',
  //     // required:true
  //     rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
  //   },
  //   {
  //     name: ['input'],
  //     type: 'dependency',
  //     itemRender: ({ input }: any) => {
  //       return [
  //         {
  //           name: 'input2',
  //           label: `普通输入框${input || ''}`,
  //           tooltip: 'type: input',
  //           // required:true
  //           rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
  //         },
  //       ];
  //     },
  //   },
  // ];

  const list: any = [
    {
      name: 'input',
      label: '输入框',
    },
    {
      name: 'select',
      label: '选择框',
      tooltip: 'onFinish的值是enum的属性名',
      options: [
        { label: '全部1', value: 'all' },
        { label: '未解决', value: 'open' },
        { label: '已解决', value: 'closed' },
        { label: '解决中', value: 'processing' },
      ],
      type: 'select',
    },
    {
      name: 'checkbox',
      label: '多选',
      request: async () => [
        { label: 'React', value: 0 },
        { label: 'Hook', value: 1 },
        { label: 'DomesyPro', value: 2 },
      ],
      type: 'checkbox',
    },
  ];

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        {/* <Form
          formList={list}
          getRef={(fromRef: any) => {
            setRef(fromRef);
          }}
        /> */}

        {/* 表单受控 */}
        <Form
          formList={list}
          onFinish={(value) => {
            message.success('打开控制台查看结果');
            console.log('结果', value);
          }}
          getRef={(fromRef: any) => {
            setFromRef(fromRef);
          }}
        />
        <Button
          onClick={() => {
            console.log(fromRef, '0000');
          }}
        >
          测试
        </Button>
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
