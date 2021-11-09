import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { PageLayout, Charts } from '@/components';
import { DetailSetting } from '@/commonPages'
import type { Props as DetailSettingListProps } from '@/commonPages/DetailSetting'
import type { AnchorLinkProps } from '@/components'
import { queryDetail } from './services'

const Welcome: React.FC<any> = (props) => {

  const [detail, setDetail] = useState<DetailSettingListProps>({})
  const [anchorList, setAnchorList] = useState<AnchorLinkProps[]>([])

  useEffect(() => {
    queryDetail({detail: 'welcome'}).then((res) => {
      setAnchorList(res.anchorList)
      setDetail({
        ...res.list,
      })
    })
  }, []);

  return (
    <PageLayout
    >
      <Card>
        <Charts data={[]} xField='1' yField='2' />
      </Card>
    </PageLayout>
  );
};

export default Welcome
