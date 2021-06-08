// import React from 'react';
// import { message } from 'antd';
// import ProForm, { ProFormProps,  ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';

import React, { useState } from 'react';
import { Button, message } from 'antd';
import ProForm, {
  ModalForm,
  DrawerForm,
  QueryFilter,
  LightFilter,
  StepsForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormRadio,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

/**
 * 1. 基本布局 居中响应式，每行一列
 * 2. 各种类型的进行封装，普通的text 选择 开关 日期 单选 多选 图片 textArea
 * 3. 信息带入
 * 4. 特殊组件进行封装
 * 5. 特殊组件的值进行绑定
 * 6. 可控制下列的框
 * 7. 可适用正则来控制对应的值
 *
 */

/**
 * @module Form表单
 */
// interface Props extends ProFormProps {}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Form: React.FC<{}> = ({}) => {
  const [type, setType] = useState('LightFilter');
  const Components = {
    ProForm,
    ModalForm,
    DrawerForm,
    QueryFilter,
    LightFilter,
    StepsForm,
  };
  const FormComponents = Components[type];
  return (
    <>
      <ProFormText
        width="md"
        name="name"
        label="签约客户名称"
        tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
    </>
  );
};

export default Form;
