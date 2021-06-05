import { UploadProps } from 'antd';

interface rulesProps {
  type?: string | Array<string>;
  typeMsg?: string;
  size?: number;
  sizeMsg?: string;
}

interface configProps {
  noCheck?: boolean;
  text?: string;
  uploadNode?: Function | React.ReactNode;
  ossUrl?: string;
  ossText?: string;
}

interface Props extends UploadProps {
  getFiles?: Function;
  amount?: number;
  rules?: rulesProps;
  _config?: configProps;
  OSS?: boolean;
}

export default Props;
