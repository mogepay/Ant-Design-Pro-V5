import { PlusOutlined } from '@ant-design/icons';

import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Jump } from '@/utils';
import { Button } from 'antd';
import { useEffect } from 'react';

const TableList: React.FC = () => {
  useEffect(() => {
    const state = Jump.get();
  }, []);

  return (
    <PageContainer>
      <Button
        onClick={() => {
          Jump.back(-2);
        }}
      >
        list
      </Button>
    </PageContainer>
  );
};

export default TableList;
