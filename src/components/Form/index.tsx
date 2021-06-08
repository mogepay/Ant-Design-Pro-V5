import React from 'react';
import { message } from 'antd';
import ProForm, {
  ProFormProps,
  ProFormText,
  ProFormDependency,
  ProFormSelect,
} from '@ant-design/pro-form';
import { FooterToolbar } from '@ant-design/pro-layout';

/**
 * @module Form表单
 *
 *
 */

/**
 * 1. 基本布局 居中响应式，每行一列
 * 2. 各种类型的进行封装，普通的text 选择 开关 日期 单选 多选 图片 textArea
 * 3. 信息带入
 * 4. 特殊组件进行封装
 * 5. 特殊组件的值进行绑定
 * 6. 可控制下列的框
 * 7. 可适用正则来控制对应的值
 * 8. 多个表单，最后统一提交
 */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

/**
 * @module Form表单
 */
interface Props extends ProFormProps {}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Form: React.FC<Props> = ({}) => {
  return (
    <>
      <ProForm
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        layout="horizontal"
        // submitter={{
        //   render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
        // }}
        submitter={{
          searchConfig: {
            submitText: '你好',
          },
          render: (props, dom) => {
            return (
              <div style={{ width: '70%', display: 'flex', justifyContent: 'center' }}>{dom}</div>
            );
          },
          submitButtonProps: {
            // size: 'large',
            style: {
              marginLeft: 12,
            },
          },
          resetButtonProps: {
            // style: {
            //   marginRight: 12
            // },
          },
        }}
      >
        <ProFormText
          // fieldProps={{
          //   size: 'large',
          // }}
          {...formItemLayout}
          name="phone"
          placeholder="请输入手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号!',
            },
            {
              pattern: /^1\d{10}$/,
              message: '不合法的手机号格式!',
            },
          ]}
        />
        <ProFormText
          {...formItemLayout}
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />

        <ProFormText
          {...formItemLayout}
          width="md"
          name="company"
          label="我方公司名称"
          placeholder="请输入名称"
        />
        <ProFormText
          {...formItemLayout}
          name="project"
          width="md"
          disabled
          label="项目名称"
          initialValue="xxxx项目"
        />
        <ProFormText
          {...formItemLayout}
          name="mangerName"
          disabled
          label="商务经理"
          initialValue="启途"
        />
        <ProFormText
          {...formItemLayout}
          width="md"
          name="name"
          label="签约客户名称"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
      </ProForm>
    </>
  );
};

export default Form;
