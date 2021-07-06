import React, { useRef, useEffect } from 'react';
import { message } from 'antd';
import moment from 'moment';
import type { FormInstance } from 'antd';
import ProForm, {
  ProFormText,
  ProFormCaptcha,
  ProFormDependency,
  ProFormSelect,
  ProFormField,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDateRangePicker,
  ProFormDateTimeRangePicker,
  ProFormTimePicker,
  ProFormSwitch,
  ProFormCheckbox,
  ProFormRadio,
  ProFormTextArea,
  ProFormRate,
  ProFormSlider,
} from '@ant-design/pro-form';
import { MailTwoTone } from '@ant-design/icons';
import { FooterToolbar } from '@ant-design/pro-layout';
import Props, { formProps, RuleProps } from './interface.d';
import { Method } from '@/utils';
import { reTel, rePassword, reName, reCard, reSfz, reEmil, reTelEmil } from '@/utils/Regexp';
import { Loading } from '../../.umi/plugin-dva/connect';
import Item from 'antd/lib/list/Item';

// 输入规则不一定要必填，因为可以不填，如果填了就必须按照规定去填

/**
 * 1. 基本布局 居中响应式，每行一列 栅格 按钮的问题 自定义文本框
 * 9. 样式垂直，formTailLayout无效的问题
 *
 * // 日期的预设的范围， 日期的选择范围
 */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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
    sm: { span: 8, offset: 8 },
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
  getRef,
  formList = [],
  footer = false,
  buttonConfig,
  formLayout,
  formTailLayout,
  initValues,
  ...props
}) => {
  const formRef = useRef<FormInstance>();

  useEffect(() => {
    if (getRef) getRef(formRef);
  }, []);

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
    // if(data.required && !data.rules){
    //   require.flag = true;
    //   const result = {
    //     required: true,
    //     message: data.message || `请输入${data.label || ''}`,
    //   };
    //   rules = [...rules, result];
    // }
    if (!require.flag && !data.noRequired) {
      const result = {
        required: true,
        message: require.message || `请输入${data.label || ''}`,
      };
      rules = [...rules, result];
    }
    return rules;
  };

  /**
   * @module 公共配置Props
   * @param type 传入的类型，通用但不是全部的Props，可以不用传
   */
  const commonProps = (item: any, type: string | boolean) => {
    const formLayout = item.label ? formItemLayout : formItemTailLayout;
    let commonType: any = {};

    if (type) {
      const typeTip =
        type === 'select' ||
        item.type === 'checkbox' ||
        item.type === 'radio' ||
        type === 'date' ||
        type === 'rate'
          ? '请选择'
          : '请输入';
      commonType.placeholder = item.placeholder || `${typeTip}${item.label || ''}`;

      // 只读和禁用不能设置必填
      if (!item.readonly && !item.disabled) {
        commonType.rules =
          type === 'input' || type === 'password' || type === 'captcha'
            ? ruleRender(item)
            : item.required
            ? [
                {
                  required: true,
                  message: item.message || `${typeTip}${item.label}`,
                },
              ]
            : item.rules
            ? item.rules
            : undefined;
      }

      if (item.type === 'select' || item.type === 'checkbox' || item.type === 'radio') {
        commonType.valueEnum = item.enum;
        commonType.options = item.options;
        commonType.request = item.request;
      }

      commonType.width = type === 'date' ? undefined : item.width || 'md';
    }

    return {
      ...item,
      ...commonType,
      ...formLayout,
      name: item.name,
      label: item.label,
      extra: item.extra,
      initialValue: item.default,
      readonly: item.readonly,
      tooltip: item.tooltip,
      disabled: item.disabled,
    };
  };

  // 日期限定规则规则
  const DateRender = (item: any) => {
    const dateRule = (current: any) => {
      if (!item.dateLimit || Object.keys(item.dateLimit).length === 0) return undefined;
      const { add = 0, subtract = 0, method = 'days', type = 0, start, end } = item.dateLimit;
      if (type === 1) return current && current < moment().endOf('day');
      if (type === 2) return current && current > moment().endOf('day');

      if (start || end) {
        const startDate = new Date(start || Method.getDate());
        const endDate = new Date(end || Method.getDate());

        if (type !== 3) {
          return (
            current >
              moment()
                .year(startDate.getFullYear())
                .month(startDate.getMonth())
                .date(startDate.getDate() - 1) &&
            current <
              moment().year(endDate.getFullYear()).month(endDate.getMonth()).date(endDate.getDate())
          );
        } else {
          return (
            current <
              moment()
                .year(startDate.getFullYear())
                .month(startDate.getMonth())
                .date(startDate.getDate() - 1) ||
            current >
              moment().year(endDate.getFullYear()).month(endDate.getMonth()).date(endDate.getDate())
          );
        }
      }

      return (
        current > moment().add(add, method) ||
        current < moment().subtract(method === 'days' ? subtract + 1 : subtract, method)
      );
    };

    return {
      disabledDate: (current: any) => dateRule(current),
      ranges: item.ranges,
      placeholder:
        item.method === 'dateRange' ||
        item.method === 'timeRange' ||
        item.method === 'dateTimeRange'
          ? ['开始时间', '结束时间']
          : undefined,
      ...item.fieldProps,
    };
  };

  const TextRender = (item: any) => {
    return {
      addonAfter: item.addonAfter,
      addonBefore: item.addonBefore,
      suffix: item.suffix,
      prefix: item.prefix,
      ...item.fieldProps,
    };
  };

  // 自定义渲染
  const fieldRender = (item: any) => {
    if (item.fieldValue !== undefined && item.name) {
      let payload: any = {};
      payload[item.name] = item.fieldValue;
      formRef?.current?.setFieldsValue(payload);
    }
    return (
      <ProFormField
        {...commonProps(item, item.type)}
        renderFormItem={() => {
          if (!item.fieldRender) return <div></div>;
          return item.fieldRender;
        }}
        render={111}
        fieldProps={{
          value: '222',
        }}
      />
    );
  };

  // 列表渲染
  const formListRender = (item: formProps) => {
    return item.type === 'field' ? (
      fieldRender(item)
    ) : item.type === 'select' ? (
      <ProFormSelect
        {...commonProps(item, item.type)}
        fieldProps={{
          optionItemRender: (ele: any) => {
            if (item.optionItemRender) {
              return item.optionItemRender(ele);
            }
          },
          ...item.fieldProps,
        }}
      />
    ) : item.type === 'slider' ? (
      <ProFormSlider
        {...commonProps(item, item.type)}
        range={item.range}
        max={item.max}
        min={item.min}
        marks={item.marks}
        step={item.step ? Math.abs(item.step) : undefined}
      />
    ) : item.type === 'rate' ? (
      <ProFormRate
        {...commonProps(item, item.type)}
        fieldProps={{
          allowHalf: !item.half,
          count: item.max,
          tooltips: item.tooltips,
          character: item.styleNode,
          style: { color: item.color || '#1890ff' },
          ...item.fieldProps,
        }}
      />
    ) : item.type === 'textArea' ? (
      <ProFormTextArea
        {...commonProps(item, item.type)}
        fieldProps={{
          autoSize: item.rows ? { minRows: item.rows } : item.autoSize,
          showCount: item.showCount || item.max,
          maxLength: item.max,
          ...item.fieldProps,
        }}
      />
    ) : item.type === 'checkbox' ? (
      <ProFormCheckbox.Group {...commonProps(item, item.type)} />
    ) : item.type === 'radio' ? (
      <ProFormRadio.Group {...commonProps(item, item.type)} />
    ) : item.type === 'switch' ? (
      <ProFormSwitch
        {...commonProps(item, item.type)}
        fieldProps={{
          checkedChildren: item.openText,
          unCheckedChildren: item.closeText,
          loading: item.loading,
          ...item.fieldProps,
        }}
      />
    ) : item.type === 'date' ? (
      item.method === 'time' ? (
        <ProFormTimePicker {...commonProps(item, item.type)} />
      ) : item.method === 'dateTime' ? (
        <ProFormDateTimePicker {...commonProps(item, item.type)} fieldProps={DateRender(item)} />
      ) : item.method === 'dateRange' ? (
        <ProFormDateRangePicker {...commonProps(item, item.type)} fieldProps={DateRender(item)} />
      ) : item.method === 'timeRange' ? (
        <ProFormTimePicker.RangePicker {...commonProps(item, item.type)} />
      ) : item.method === 'dateTimeRange' ? (
        <ProFormDateTimeRangePicker
          {...commonProps(item, item.type)}
          fieldProps={DateRender(item)}
        />
      ) : (
        <ProFormDatePicker {...commonProps(item, item.type)} fieldProps={DateRender(item)} />
      )
    ) : item.type === 'captcha' ? (
      <ProFormCaptcha
        {...commonProps(item, item.type)}
        onGetCaptcha={async (phone: any) => {
          if (item.getCaptcha) item.getCaptcha(phone);
        }}
        countDown={item.max}
        fieldProps={TextRender(item)}
      />
    ) : item.type === 'password' ? (
      <ProFormText.Password {...commonProps(item, item.type)} fieldProps={TextRender(item)} />
    ) : (
      <ProFormText {...commonProps(item, 'input')} fieldProps={TextRender(item)} />
    );
  };

  return (
    <>
      <ProForm
        {...props}
        formRef={formRef}
        onFinish={async (values) => {
          // await waitTime(2000);
          console.log(values, '--2');
          message.success('提交成功');
        }}
        initialValues={initValues}
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
            {item.type === 'dependency' ? (
              <ProFormDependency name={typeof item.name === 'string' ? [...item.name] : item.name}>
                {(data) => {
                  // item.itemRender ? item.itemRender(name) :
                  if (item.itemRender) {
                    item.itemRender(data);
                    return;
                  }
                  return (
                    <div style={{ textAlign: 'center', fontSize: 16, color: '#ff4d4f' }}>
                      请在itemRender操作
                    </div>
                  );
                }}
              </ProFormDependency>
            ) : (
              formListRender(item)
            )}
          </div>
        ))}
        {/* {formListRender(formList)} */}
      </ProForm>
    </>
  );
};

export default Form;
