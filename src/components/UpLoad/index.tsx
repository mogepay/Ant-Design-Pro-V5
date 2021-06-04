import { Upload, message, Modal, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Method } from '@/utils';
import { useState } from 'react';
import './index.less';

/**
 * @module UpLoad 图片上传
 *
 * @param amount 数量 可设置上传的数量，默认为1张
 * @param rules 规则 判断规则不可传入的条件
 *
 */

const rules = {
  type: '', // 可字符串可数组，
  typeMsg: '', // 错误提示信息
};

interface rulesProps {
  type?: string | Array<string>;
  typeMsg?: string;
}

interface Props extends UploadProps {
  amount?: number;
  rules?: rulesProps;
}

const UpLoadView: React.FC<Props> = ({ amount = 4, children, ...props }) => {
  const [fileList, setFileList] = useState<Array<any>>([]); //总文件数组
  const [previewVisible, setPreviewVisible] = useState<boolean>(false); // 是否打开弹出框
  const [previewTitle, setPreviewTitle] = useState<any>(''); // 图片名称
  const [previewImage, setPreviewImage] = useState<any>(''); // 图片展示的数据

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  // 上传前的操作
  const beforeUpload = async (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    console.log(file.type, '1', isJpgOrPng);

    // if (!isJpgOrPng) {
    //   message.error('只能上传JPG或PNG格式图片!');
    //   // return
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('上传图片大于10M!请重新上传');
    //   // return
    // }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="UpLoadComponents">
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={({ fileList }) => setFileList(fileList)}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= amount ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default UpLoadView;

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
