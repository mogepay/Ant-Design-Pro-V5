import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ConnectState } from '@/models/connect';
import { Card, Col, Dropdown, Menu, Row } from 'antd';
import { connect } from 'umi';
import { Button, OssUpLoad, Form } from '@/components';
import { Jump } from '@/utils';
import { text } from 'express';
import ProCard from '@ant-design/pro-card';
import moment from 'moment';
import { DatePicker, Space } from 'antd';

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
  //   default: '111',
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
  // {
  //   name: 'input22',
  //   label: '前缀图标(自定义)',
  //   tooltip: 'fieldProps若存在该属性，则suffix无效',
  //   suffix: <MailTwoTone />,
  // },
  // {
  //   name: 'input23',
  //   placeholder: '没有 label，自动对齐'
  // },
  // {
  //   name: 'password',
  //   label: '密码',
  //   type: 'password',
  // },
  // {
  //   name: 'password1',
  //   label: '密码',
  //   placeholder: '配合规则，图标',
  //   rules: [
  //     {
  //       method: 'password',
  //       message: '密码，长度必须为6至20位',
  //     },
  //   ],
  //   prefix: <MailTwoTone />,
  //   type: 'password',
  // },
  // {
  //   name: 'date',
  //   label: '日期',
  //   type: 'date',
  // },
  // {
  //   name: 'date1',
  //   label: '必填日期',
  //   type: 'date',
  //   required: true
  // },
  // {
  //   name: 'date2',
  //   label: '日期',
  //   type: 'date',
  // },
  // {
  //   name: 'date3',
  //   label: '前五天',
  //   tooltip: `dateLimit: { subtract: 5 }`,
  //   type: 'date',
  //   dateLimit: {
  //     subtract: 5,
  //   },
  // },
  // {
  //   name: 'date4',
  //   label: '后五天',
  //   tooltip: `dateLimit: { add: 5 }`,
  //   type: 'date',
  //   dateLimit: {
  //     add: 5,
  //   },
  // },
  // {
  //   name: 'date5',
  //   label: '前五天，后五天',
  //   tooltip: `dateLimit: { add: 5, subtract: 5 }`,
  //   type: 'date',
  //   dateLimit: {
  //     add: 5,
  //     subtract: 5,
  //   },
  // },
  // {
  //   name: 'date6',
  //   label: '前1个月',
  //   tooltip: `dateLimit: { subtract: 1, method: 'months' }`,
  //   type: 'date',
  //   dateLimit: {
  //     subtract: 1,
  //     method: 'months'
  //   },
  // },
  // {
  //   name: 'date7',
  //   label: '后1个月',
  //   tooltip: `dateLimit: { add: 1, method: 'months' }`,
  //   type: 'date',
  //   dateLimit: {
  //     add: 1,
  //     method: 'months'
  //   },
  // },
  // {
  //   name: 'date8',
  //   label: '前后1个月',
  //   tooltip: `dateLimit: { add: 1, subtract: 1, method: 'months' }`,
  //   type: 'date',
  //   dateLimit: {
  //     add: 1,
  //     subtract: 1,
  //     method: 'months'
  //   },
  // },
  // {
  //   name: 'date9',
  //   label: '禁用时间段',
  //   tooltip: `dateLimit: { start: '2021-06-07' ,end: '2021-06-12'}`,
  //   type: 'date',
  //   dateLimit: {
  //     start: '2021-06-07',
  //     end: '2021-06-12',
  //   },
  // },
  // {
  //   name: 'date10',
  //   label: '只能选择今天之后的日期',
  //   tooltip: `dateLimit: { type: 1, method: 'months' }`,
  //   type: 'date',
  //   dateLimit: {
  //     type: 1,
  //     method: 'months',
  //   },
  // },
  // {
  //   name: 'date11',
  //   label: '只能选择今天之前的日期（包含当天）',
  //   tooltip: `dateLimit: { type: 2, method: 'months' }`,
  //   type: 'date',
  //   dateLimit: {
  //     type: 2,
  //     method: 'months',
  //   },
  // },
  // {
  //   name: 'date12',
  //   label: '只选择时间段',
  //   tooltip: `dateLimit: { type: 3, start: '2021-06-07', end: '2021-06-12' }`,
  //   type: 'date',
  //   dateLimit: {
  //     type: 3,
  //     start: '2021-06-07',
  //     end: '2021-06-12',
  //   },
  // },
  // {
  //   name: 'date13',
  //   label: '时间',
  //   method: 'time',
  //   tooltip: `method: 'time'`,
  //   type: 'date',
  // },
  // {
  //   name: 'date14',
  //   label: '日期+时间',
  //   method: 'dateTime',
  //   tooltip: `method: 'dateTime',`,
  //   type: 'date',
  // },
  // {
  //   name: 'date15',
  //   label: '日期时间段',
  //   method: 'dateRange',
  //   tooltip: `dateLimit: { type: 3, start: '2021-06-07', end: '2021-06-12' }`,
  //   type: 'date',
  // },
  // {
  //   name: 'date16',
  //   label: '时间+时间段',
  //   method: 'timeRange',
  //   tooltip: `dateLimit: { type: 3, start: '2021-06-07', end: '2021-06-12' }`,
  //   type: 'date',
  // },
  // {
  //   name: 'date17',
  //   label: '日期时间+日期时间段',
  //   method: 'dateTimeRange',
  //   tooltip: `dateLimit: { type: 3, start: '2021-06-07', end: '2021-06-12' }`,
  //   type: 'date',
  // },
  // {
  //   name: 'date18',
  //   label: '预设状态',
  //   method: 'dateTimeRange',
  //   tooltip: ``,
  //   ranges: {
  //     今天: [moment(), moment()],
  //     本月: [moment().startOf('month'), moment().endOf('month')],
  //   },
  //   type: 'date',
  // },
  // {
  //   name: 'switch',
  //   label: '开关',
  //   tooltip: `type: 'switch'`,
  //   type: 'switch',
  // },
  // {
  //   name: 'switch1',
  //   label: '开关文字',
  //   openText: '开启',
  //   closeText: '关闭',
  //   tooltip: `openText: '开启',closeText: '关闭',`,
  //   type: 'switch',
  // },
  // {
  //   name: 'switch2',
  //   label: '开关图标',
  //   openText: <MailTwoTone />,
  //   tooltip: ` openText: <MailTwoTone />,`,
  //   type: 'switch',
  // },
  // {
  //   name: 'switch3',
  //   label: '默认开启',
  //   default: true,
  //   tooltip: `default: true,`,
  //   type: 'switch',
  // },
  // {
  //   name: 'switch4',
  //   label: '开关加载',
  //   default: true,
  //   loading: true,
  //   tooltip: `default: true,loading: true,`,
  //   type: 'switch',
  // },
  // {
  //   name: 'select',
  //   label: 'options字符串',
  //   tooltip: '可以是数组为字符串，最后的值就是字符串本身',
  //   options: [
  //     '已选择',
  //     '未选择',
  //     '待选择'
  //   ],
  //   type: 'select',
  // },
  // {
  //   name: 'select1',
  //   label: '选择options',
  //   tooltip: 'onFinish的值是enum的属性名',
  //   options: [
  //     { label: '全部1', value: 'all' },
  //     { label: '未解决', value: 'open' },
  //     { label: '已解决', value: 'closed' },
  //     { label: '解决中', value: 'processing' },
  //   ],
  //   type: 'select',
  // },
  // {
  //   name: 'select2',
  //   label: '选择valueEnum',
  //   tooltip: `enum,简化options`,
  //   enum: {
  //     0: '已选择',
  //     1: '未选择',
  //     2: '待选择',
  //   },
  //   type: 'select',
  // },
  // {
  //   name: 'select3',
  //   label: '选择request',
  //   tooltip: '接收一个函数，可以动态调取接口，返回的值需要有label，和value，onFinish的值是value,并且层级大于enum',
  //   request: async () => [
  //     { label: '全部', value: 'all' },
  //     { label: '未解决', value: 'open' },
  //     { label: '已解决', value: 'closed' },
  //     { label: '解决中', value: 'processing' },
  //   ],
  //   type: 'select',
  // },
  // {
  //   name: 'select4',
  //   label: '必填',
  //   enum: {
  //     0: '已选择',
  //     1: '未选择',
  //     2: '代选择',
  //   },
  //   placeholder: '选择规则',
  //   required: true,
  //   type: 'select',
  // },
  // {
  //   name: 'select5',
  //   label: '自定义下拉框样式',
  //   enum: {
  //     0: '已选择',
  //     1: '未选择',
  //     2: '代选择',
  //   },
  //   type: 'select',
  //   optionItemRender: (item: any) => {
  //     return item.label + ' - ' + item.value;
  //   },
  // },
  // {
  //   name: 'checkbox',
  //   label: 'option',
  //   tooltip: `type: 'checkbox'，option为字符串`,
  //   options: [
  //     'React',
  //     'Hook',
  //     'DomesyPro'
  //   ],
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox1',
  //   label: 'option',
  //   tooltip: `option为对象`,
  //   options: [
  //     { label: 'React', value: 0 },
  //     { label: 'Hook', value: 1 },
  //     { label: 'DomesyPro', value: 2 },
  //   ],
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox2',
  //   label: 'enum',
  //   tooltip: `enum,简化options`,
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox3',
  //   label: 'request',
  //   tooltip: '接收一个函数，可以动态调取接口，返回的值需要有label，和value，onFinish的值是value,并且层级大于enum',
  //   request: async () => [
  //     { label: 'React', value: 0 },
  //     { label: 'Hook', value: 1 },
  //     { label: 'DomesyPro', value: 2 }
  //   ],
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox4',
  //   label: '必填',
  //   required: true,
  //   tooltip: 'required: true',
  //   message: '请选择checkbox',
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox5',
  //   label: '设置默认值',
  //   tooltip: `default: ['2', '0'] `,
  //   default: ['2', '0'],
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'checkbox',
  // },
  // {
  //   name: 'checkbox6',
  //   label: '禁用',
  //   tooltip: `disabled: true, default: ['2']`,
  //   disabled: true,
  //   default: ['2'],
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'checkbox',
  // },
  // {
  //   name: 'radio',
  //   label: 'option',
  //   tooltip: `type: 'radio'，option为字符串`,
  //   options: ['React', 'Hook', 'DomesyPro'],
  //   type: 'radio',
  // },
  // {
  //   name: 'radio1',
  //   label: 'option',
  //   tooltip: `option为对象`,
  //   options: [
  //     { label: 'React', value: 0 },
  //     { label: 'Hook', value: 1 },
  //     { label: 'DomesyPro', value: 2 },
  //   ],
  //   type: 'radio',
  // },
  // {
  //   name: 'radio2',
  //   label: 'enum',
  //   tooltip: `enum,简化options`,
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'radio',
  // },
  // {
  //   name: 'radio3',
  //   label: 'request',
  //   tooltip:
  //     '接收一个函数，可以动态调取接口，返回的值需要有label，和value，onFinish的值是value,并且层级大于enum',
  //   request: async () => [
  //     { label: 'React', value: 0 },
  //     { label: 'Hook', value: 1 },
  //     { label: 'DomesyPro', value: 2 },
  //   ],
  //   type: 'radio',
  // },
  // {
  //   name: 'radio4',
  //   label: '必填',
  //   required: true,
  //   tooltip: 'required: true',
  //   message: '请选择radio',
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'radio',
  // },
  // {
  //   name: 'radio5',
  //   label: '设置默认值',
  //   tooltip: `default: '2' `,
  //   default: '2',
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'radio',
  // },
  // {
  //   name: 'radio6',
  //   label: '禁用',
  //   tooltip: `disabled: true, default: '2'`,
  //   disabled: true,
  //   default: '2',
  //   enum: {
  //     0: 'React',
  //     1: 'Hook',
  //     2: 'DomesyPro',
  //   },
  //   type: 'radio',
  // },
  // {
  //   name: 'textArea',
  //   label: '文本框',
  //   tooltip: `type: 'textArea'`,
  //   type: 'textArea',
  // },
  // {
  //   name: 'textArea1',
  //   label: '限制输入字数',
  //   tooltip: `showCount: true`,
  //   showCount: true,
  //   type: 'textArea',
  // },
  // {
  //   name: 'textArea2',
  //   label: '限制最大值',
  //   tooltip: `max: 200`,
  //   max: 200,
  //   type: 'textArea',
  // },
  // {
  //   name: 'textArea3',
  //   label: '自适应高度',
  //   tooltip: `高度自适应 { autoSize: true }`,
  //   type: 'textArea',
  //   autoSize: true
  // },
  // {
  //   name: 'textArea4',
  //   label: '限制高度',
  //   tooltip: `高度限制 { rows: 8 }`,
  //   rows: 8,
  //   type: 'textArea',
  // },
  // {
  //   name: 'textArea5',
  //   label: '默认值',
  //   tooltip: `default: 'DomeSy TextArea'`,
  //   default: 'DomeSy TextArea',
  //   type: 'textArea',
  // },
  {
    name: 'textArea6',
    label: '禁用',
    tooltip: `disabled: true`,
    disabled: true,
    type: 'textArea',
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
