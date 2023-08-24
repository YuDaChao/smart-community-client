import { getCommunityDictList } from '@/services/community';
import { useModel, useRequest } from '@umijs/max';
import { Select, Space, Typography } from 'antd';
import { useDebounce } from 'ahooks';
import { useEffect, useState } from 'react';

const CommunitySelect = () => {
  const { initialState } = useModel('@@initialState');
  const { communityId, setCommunityId } = useModel('community');
  const [communityName, setCommunityName] = useState<string>('');
  const debouncedCommunityName = useDebounce(communityName, { wait: 500 });
  if (initialState?.currentUser?.communityId) {
    return null;
  }
  const { loading, data } = useRequest(() => getCommunityDictList(debouncedCommunityName), {
    refreshDeps: [debouncedCommunityName],
  });
  const options = data?.map((item) => ({ value: item.id, label: item.communityName }));

  useEffect(() => {
    if (!communityId && data) {
      setCommunityId(data[0]?.id);
    }
  }, [communityId, data]);

  return (
    <Space style={{ height: 44 }}>
      <Typography.Text>当前小区</Typography.Text>
      <Select
        value={communityId}
        loading={loading}
        options={options}
        size="middle"
        filterOption={false}
        allowClear={false}
        showSearch
        onSearch={(val) => setCommunityName(val)}
        onSelect={(val) => {
          setCommunityId(val);
          setCommunityName('');
        }}
        style={{ width: 200 }}
      />
    </Space>
  );
};

export default CommunitySelect;
