import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';

import { MailTwoTone } from '@ant-design/icons';
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
  //   label: '只读',
  //   readonly: true,
  //   tooltip: '只读层级高于disabled',
  //   rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
  // },
  // {
  //   name: 'input5',
  //   label: '禁用',
  //   disabled:true
  // },
  // {
  //   name: 'input6',
  //   label: '必填',
  //   tooltip: '此选项必填，并且不能为空格',
  //   rules: [{ required: true, message: '此选项必填，并且不能为空格' }],
  // },
  // {
  //   name: 'input7',
  //   label: '正则手机号',
  //   tooltip: '所有有规则的都会加入required，并且不能为空格，简化开发',
  //   rules: [
  //     {
  //       pattern: /^1\d{10}$/,
  //       message: '满足规则为校验正确否则不正确',
  //       reMessage: '为空时的提示语',
  //     },
  //   ],
  // },
  // {
  //   name: 'input8',
  //   label: '最小位数',
  //   rules: [
  //     {
  //       min: 3,
  //     },
  //   ],
  // },
  // {
  //   name: 'input9',
  //   label: '最大位数',
  //   rules: [
  //     {
  //       max: 5,
  //     },
  //   ],
  // },
  // {
  //   name: 'input10',
  //   label: '最小和最大',
  //   rules: [
  //     {
  //       min: 3,
  //       max: 5,
  //     },
  //   ],
  // },
  // {
  //   name: 'input11',
  //   label: '最小和最大',
  //   tooltip: '同时支持最小和最大位数,但提示语不同',
  //   rules: [
  //     {
  //       min: 3,
  //     },
  //     {
  //       max: 5,
  //     },
  //   ],
  // },
  // {
  //   name: 'input12',
  //   label: '手机号验证',
  //   tooltip: "method: 'tel', 对应utils/Regexp的reTel",
  //   rules: [
  //     {
  //       method: 'tel',
  //       message: '11'
  //     },
  //   ],
  // },
  // {
  //   name: 'input13',
  //   label: '密码',
  //   tooltip: "method: 'password', 对应utils/Regexp的rePassword",
  //   rules: [
  //     {
  //       method: 'password',
  //     },
  //   ],
  // },
  // {
  //   name: 'input14',
  //   label: '姓名',
  //   tooltip: "method: 'name', 对应utils/Regexp的reName",
  //   rules: [
  //     {
  //       method: 'name'
  //     },
  //   ],
  // },
  // {
  //   name: 'input15',
  //   label: '身份证',
  //   tooltip: "method: 'sfz', 对应utils/Regexp的reSfz",
  //   rules: [
  //     {
  //       method: 'sfz'
  //     },
  //   ],
  // },
  // {
  //   name: 'input16',
  //   label: '银行卡号',
  //   tooltip: "method: 'card', 对应utils/Regexp的reCard",
  //   rules: [
  //     {
  //       method: 'card'
  //     },
  //   ],
  // },
  // {
  //   name: 'input17',
  //   label: '邮箱',
  //   tooltip: "method: 'emil', 对应utils/Regexp的reEmil",
  //   rules: [
  //     {
  //       method: 'emil'
  //     },
  //   ],
  // },
  // {
  //   name: 'input18',
  //   label: '电话或邮箱',
  //   tooltip: "method: 'name', 对应utils/Regexp的reTelEmil",
  //   rules: [
  //     {
  //       method: 'telEmil'
  //     },
  //   ],
  // },
  // {
  //   name: 'input19',
  //   label: '规则rulesRender',
  //   tooltip: "走原本的rules，原本的必填，输入空格也可校验过",
  //   rulesRender: [
  //     {
  //       required: 'true'
  //     },
  //   ],
  // },
  // {
  //   name: 'input20',
  //   label: 'fieldProps',
  //   tooltip: "支持原本的输入组件，如大小，placeholder",
  //   fieldProps: {
  //     size: 'large'
  //   }
  // },
  // {
  //   name: 'input21',
  //   label: '前缀图标(自定义)',
  //   tooltip: 'fieldProps若存在该属性，则prefix无效',
  //   prefix: <MailTwoTone />,
  // },
  {
    name: 'input22',
    label: '前缀图标(自定义)',
    tooltip: 'fieldProps若存在该属性，则suffix无效',
    suffix: <MailTwoTone />,
  },
  // {
  //   name: 'input23',
  //   placeholder: '没有 label，自动对齐'
  // },
  {
    name: 'password',
    label: '密码',
    type: 'password',
  },
  {
    name: 'password1',
    label: '密码',
    placeholder: '配合规则，图标',
    rules: [
      {
        method: 'password',
        message: '密码，长度必须为6至20位',
      },
    ],
    prefix: <MailTwoTone />,
    type: 'password',
  },
  {
    name: 'select',
    label: '选择',
    placeholder: '选择规则',
    // rules: [
    //   {
    //     method: 'password',
    //     message: '密码，长度必须为6至20位'
    //   }
    // ],
    prefix: <MailTwoTone />,
    type: 'select',
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
