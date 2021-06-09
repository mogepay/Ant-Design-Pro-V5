import { ButtonProps } from 'antd';
import { ProFormProps } from '@ant-design/pro-form';

interface ButtonRenderProps {
  submitText?: string;
  resetText?: string;
  submitButton?: ButtonProps;
  resetButton?: ButtonProps;
  onSubmit?: () => void;
  onReset?: () => void;
  otherRender?: () => void;
  position?: 'left' | 'right';
  renderStyle?: Object;
  render?:
    | false
    | ((
        props: SubmitterProps<{}> & {
          form?: FormInstance<any> | undefined;
        } & {
          submit: () => void;
          reset: () => void;
        },
        dom: JSX.Element[],
      ) => React.ReactNode | React.ReactNode[])
    | undefined;
}

export interface RuleProps {
  required?: boolean;
  pattern?: RegExp;
  message?: string;
  reMessage?: string;
  min?: number;
  max?: number;
  len?: number;
  method?: 'tel' | 'password' | 'name' | 'card' | 'sfz' | 'emil' | 'telEmil';
}

export interface formProps {
  type?: 'input' | 'select';
  name: string;
  label: string;
  tooltip?: string;
  readonly?: boolean;
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg' | undefined;
  placeholder?: string;
  disabled?: boolean;
  rules: Array<RuleProps>;
  rulesRender: Array<any>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fieldProps?: Object;
}

interface Props extends ProFormProps {
  formList: Array<formProps>;
  footer?: boolean;
  buttonConfig?: ButtonRenderProps;
}

export default Props;
