import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';
import MDEditor from '@uiw/react-md-editor';

const str = `
import React from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';

export default function App() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="container">
      <MDEditor
        value={value}
        onChange={setValue}
      />
      <MDEditor.Markdown source={value} />
    </div>
  );
}
`;

// const md = require('./README.md')

const Welcome: React.FC<any> = (props) => {
  const [count, setCount] = useState(0);
  const [value, setValue] = React.useState<string | undefined>(`${'```jsx'}${str}${'```'}`);
  const rules = {
    // type: ['jpg', 'png'],
    // typeMsg: '只允许上传jpg'
    // size: 0.01,
  };

  useEffect(() => {}, []);

  //

  return (
    <PageContainer>
      <Card>
        {/* <Button onClick={() => {}}>测试</Button> */}
        {/* <Form /> */}
        {/* <MDEditor
          value={value}
          onChange={(v) => setValue(v)}
        /> */}
        <MDEditor.Markdown source={value} />
      </Card>
    </PageContainer>
  );
};

export default connect(({ domesy }: ConnectState) => ({ domesy }))(Welcome);
