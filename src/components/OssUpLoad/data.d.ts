import { UploadProps } from 'antd';

interface rulesProps {
  type?: string | Array<string>;
  typeMsg?: string;
  size?: number;
  sizeMsg?: string;
}

interface configProps {
  check?: boolean;
  text?: string;
  uploadNode?: Function | React.ReactNode;
}

interface Props extends UploadProps {
  getFiles?: Function;
  amount?: number;
  rules?: rulesProps;
  _config?: configProps;
}

export default Props;
