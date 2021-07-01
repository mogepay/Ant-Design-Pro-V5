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
  const [ref, setRef] = useState<any>(false);

  // input 加入required失效
  const list: any = [
    {
      name: 'input',
      label: '普通输入框',
      tooltip: 'type: input',
      // required:true
      rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
    },
    {
      name: ['input'],
      type: 'dependency',
      // itemRender: ({input}:any) => {
      //   console.log(input)
      //   return <div></div>
      // }
    },
  ];

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        <Form
          formList={list}
          getRef={(fromRef: any) => {
            setRef(fromRef);
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
