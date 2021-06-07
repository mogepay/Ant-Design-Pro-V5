import React from 'react';
import ProForm, { ProFormProps } from '@ant-design/pro-form';

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
interface Props extends ProFormProps {}

const Form: React.FC<Props> = ({}) => {
  return <div className="Form"></div>;
};

export default Form;
