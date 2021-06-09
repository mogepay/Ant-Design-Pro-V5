import React from 'react';
import { message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormCaptcha,
  ProFormDependency,
  ProFormSelect,
  ProFormField,
} from '@ant-design/pro-form';
import { MailTwoTone } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import Props, { formProps, RuleProps } from './interface.d';
import { reTel, rePassword, reName, reCard, reSfz, reEmil, reTelEmil } from '@/utils/Regexp';

/**
 * @module Form表单
 * @author Domesy
 *
 * @param formList 必填 表单配置的数据
 * @param footer 按钮是否显示在页脚，如果自定义按钮则无效 默认：false
 * @param buttonConfig 按钮相关的配置
 * @param formLayout 栅格布局 与col类似,基础col的属性，将表格进行栅格布局，响应式布局等， 现在默认的居中，默认居中，有label字段，包含两个属性labelCol和wrapperCol
 * @param formTailLayout 与formLayout相同，但无label字段
 *
 * @formList
 * @param type 类型，根据不同的类型来判断展示的组件， 默认为input
 * @param name 必填(最后获取的值)，值唯一，你可以这么理解，如果name=‘input’，那么最后返回的字段就是input，所以这个一般是接口所需要的提交字段
 * @param label 字段名称
 * @param width 宽度
 * @param tooltip 提示语
 * @param placeholder 预设时的字段 默认 请输入 + label
 * @param readonly 只读
 * @param disabled 不可编辑
 * @param rulesRender 适用于原本的rules
 * @param rules 设置规则，disabled设置为true，规则不生效，接收一个数组，按照原本的参数传递，并在此基础上做了些方便的功能，如果想使用原本参数的形式，可适用 rulesRender
 * @param fieldProps 属性来支持设置输入组件的props
 * @param prefix 样式前缀
 *
 * @rules
 * @param message 验证失败时返回的字段，可单独设置，下面的字段统一的默认message
 * @param required 必填项 判断是否有该字段 增加whitespace，只输入空格不可校验通过，如果字段无required，则默认加入必填字段，对应message默认字段为 请输入${data.label}
 * @param reMessage 有规则，但无必填字段，默认加入必填字段的message，取数组最后一个的renMessage
 * @param pattern 正则，验证失败时会报错
 * @param min 限定最少几个字符，可与max配合使用
 * @param max 限定最多几个字符，可与min配合使用
 * @param len 只限定几个字符能输入
 * @param method 简化开发设定常用的的值 具体有 'tel'：电话 'password'：密码 'name'：姓名 'card'：银行卡号 'sfz'：身份证 'emil'：邮箱 'telEmil'：电话+邮箱;
 *
 *
 * @buttonConfig
 * @param submitText 提交的按钮文字
 * @param resetText 重置的按钮文字
 * @param submitButton 提交按钮的属性，继承Button
 * @param resetButton 重置按钮的属性，继承Button
 * @param onSubmit 点击提交按钮的事件，不建议使用
 * @param onReset 点击重置按钮的事件，不建议使用
 * @param otherRender 在原有的重置和提交增加其他按钮，如返回上一步，可以加个上一步的按钮，需要自己根据需求设计样式
 * @param position 自定义渲染按钮的位置，‘left’和 'right' 默认’left‘
 * @param render 自定义按钮样式，注：此方法是重置的按钮,继承原有的ProForm中submitter中的render，返回原有的props和dome，一旦由此方法，buttonConfig的其他方法都无法使用
 *
 */

/**
 * 1. 基本布局 居中响应式，每行一列 栅格 按钮的问题 自定义文本框
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
    sm: { span: 12 },
    lg: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    lg: { span: 12 },
  },
};

const formItemTailLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    lg: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 12 },
    lg: { span: 12, offset: 12 },
  },
};

/**
 * @module Form表单
 */
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const Form: React.FC<Props> = ({
  formList = [],
  footer = false,
  buttonConfig,
  formLayout,
  formTailLayout,
  ...props
}) => {
  // 规则设定
  const ruleRender = (data: formProps) => {
    if (data.readonly || data.disabled || (!data.rules && !data.rulesRender)) return undefined;
    if (data.rulesRender) return data.rulesRender;
    let rules: Array<RuleProps> = [];
    let require = {
      flag: false,
      message: '',
    };
    data.rules.map((item) => {
      if (item.reMessage) require.message = item.reMessage;
      if (item.pattern) {
        const result = {
          pattern: item.pattern,
          message: item.message || `请输入合法的字符`,
        };
        rules = [...rules, result];
      } else if (item.min || item.max) {
        const message =
          item.max && item.min
            ? `请输入${item.min}~${item.max}个字符`
            : item.max
            ? `请输入最多${item.max}个字符`
            : `请输入至少${item.min}个字符`;
        const result = {
          min: item.min || undefined,
          max: item.max || undefined,
          message: item.message || message,
        };
        rules = [...rules, result];
      } else if (item.max) {
        const result = {
          max: item.max,
          message: item.message || `请输入最多${item.max}个字符`,
        };
        rules = [...rules, result];
      } else if (item.len) {
        const result = {
          len: item.len,
          message: item.message || `请输入${item.len}个字符`,
        };
        rules = [...rules, result];
      } else if (item.method) {
        // , rePassword, reName, reCard, reSfz, reEmil, reTelEmil
        const pattern =
          item.method === 'tel'
            ? reTel
            : item.method === 'password'
            ? rePassword
            : item.method === 'name'
            ? reName
            : item.method === 'card'
            ? reCard
            : item.method === 'sfz'
            ? reSfz
            : item.method === 'emil'
            ? reEmil
            : reTelEmil;
        const message =
          item.method === 'tel'
            ? '电话号码'
            : item.method === 'password'
            ? '密码，长度必须为6至20位'
            : item.method === 'name'
            ? '姓名'
            : item.method === 'card'
            ? '银行卡号'
            : item.method === 'sfz'
            ? '身份证'
            : item.method === 'emil'
            ? '邮箱'
            : '邮箱活电话号码';
        const result = {
          pattern: pattern,
          message: item.message || `请输入正确的${message}`,
        };
        rules = [...rules, result];
      } else if (item.required) {
        require.flag = true;
        const result = {
          required: true,
          message: item.message || `请输入${data.label || ''}`,
        };
        rules = [...rules, result];
      }
    });
    if (!require.flag) {
      const result = {
        required: true,
        message: require.message || `请输入${data.label || ''}`,
      };
      rules = [...rules, result];
    }
    return rules;
  };

  return (
    <>
      <ProForm
        {...props}
        onFinish={async (values) => {
          // await waitTime(2000);
          console.log(values, '--2');
          message.success('提交成功');
        }}
        // initialValues={
        // {
        //   input4: '11'
        // }
        // }
        layout="horizontal"
        submitter={{
          searchConfig: {
            submitText: buttonConfig?.submitText || '提交',
            resetText: buttonConfig?.resetButton || '重置',
          },
          onSubmit: () => {
            if (buttonConfig?.onSubmit) buttonConfig.onSubmit();
          },
          onReset: () => {
            if (buttonConfig?.onReset) buttonConfig.onReset();
          },
          render: (props, dom) => {
            if (buttonConfig?.render) {
              return buttonConfig.render(props, dom);
            }
            const position = buttonConfig?.position || 'left';

            let otherRender: any = '';
            if (buttonConfig?.otherRender) {
              otherRender = buttonConfig.otherRender();
            }
            // ProFormSelect
            return (
              <>
                {footer ? (
                  <FooterToolbar>
                    {position === 'left' && otherRender}
                    {dom}
                    {position === 'right' && otherRender}
                  </FooterToolbar>
                ) : (
                  // <div
                  //   style={
                  //     buttonConfig?.renderStyle || {
                  //       width: '70%',
                  //       display: 'flex',
                  //       justifyContent: 'center',
                  //     }
                  //   }
                  // >
                  //   {position === 'left' && otherRender}
                  //   {dom}
                  //   {position === 'right' && otherRender}
                  // </div>
                  <ProFormField
                    labelCol={formTailLayout?.labelCol || formItemTailLayout.labelCol}
                    wrapperCol={formTailLayout?.wrapperCol || formItemTailLayout.wrapperCol}
                    renderFormItem={() => (
                      <>
                        {position === 'left' && otherRender}
                        {dom}
                        {position === 'right' && otherRender}
                      </>
                    )}
                  ></ProFormField>
                )}
              </>
            );
          },
          submitButtonProps: {
            style: {
              marginLeft: 12,
            },
            ...buttonConfig?.submitButton,
          },
          resetButtonProps: { ...buttonConfig?.resetButton },
        }}
      >
        {formList.map((item, index) => (
          <div key={index}>
            {
              // item.type === 'select' ? '' :
              <ProFormText
                labelCol={
                  item.label
                    ? formLayout?.labelCol || formItemLayout.labelCol
                    : formTailLayout?.labelCol || formItemTailLayout.labelCol
                }
                wrapperCol={
                  item.label
                    ? formLayout?.wrapperCol || formItemLayout.wrapperCol
                    : formTailLayout?.wrapperCol || formItemTailLayout.wrapperCol
                }
                readonly={item.readonly}
                width={item.width || 'md'}
                name={item.name}
                label={item.label}
                tooltip={item.tooltip}
                disabled={item.disabled}
                placeholder={item.placeholder || `请输入${item.label || ''}`}
                rules={ruleRender(item)}
                fieldProps={{
                  suffix: item.suffix,
                  prefix: item.prefix,
                  ...item.fieldProps,
                }}
              />
            }
          </div>
        ))}
        {/* <ProFormText
                {...formTailLayout}
                width={ 'md'}
                name={12}
              /> */}
        {/* <ProFormCaptcha
          {...formItemLayout}
          fieldProps={{
            size: 'large',
            prefix: <MailTwoTone />,
          }}
          captchaProps={{
            size: 'large',
          }}
          label={'11'}
          width='md'
          // 手机号的 name，onGetCaptcha 会注入这个值
          phoneName="phone"
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
          placeholder="请输入验证码"
          // 如果需要失败可以 throw 一个错误出来，onGetCaptcha 会自动停止
          // throw new Error("获取验证码错误")
          onGetCaptcha={async (phone) => {
            await waitTime(1000);
            message.success(`手机号 ${phone} 验证码发送成功!`);
          }}
        /> */}
      </ProForm>
    </>
  );
};

export default Form;
