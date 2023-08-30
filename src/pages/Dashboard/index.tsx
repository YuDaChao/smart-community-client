import { ProCard } from '@ant-design/pro-components';
import HeaderOverview from './components/HeaderOverview';
import { useModel, useRequest } from '@umijs/max';

import './index.less';
import RepairTop from './components/RepairTop';
import { getRepairList } from '@/services/repair';

const Dashboard = () => {
  const { communityId } = useModel('community');
  const { initialState } = useModel('@@initialState');
  console.log(communityId, initialState?.currentUser);

  const { data, loading } = useRequest(
    () => getRepairList({ pageSize: 4, current: 1, communityId }),
    { refreshDeps: [communityId] },
  );

  return (
    <ProCard ghost direction="column" className="dashboard">
      <HeaderOverview />
      <ProCard ghost gutter={[12, 24]} direction="row">
        <ProCard gutter={12} loading={loading}>
          {data?.data.map((repair) => (
            <ProCard
              key={repair.id}
              bordered
              size="small"
              colSpan={{ md: 12 }}
              actions={[<a key={'1'}>派单</a>, <a key={'2'}>作废</a>]}
            >
              <RepairTop repair={repair} />
            </ProCard>
          ))}
        </ProCard>
        <ProCard title="公告" colSpan={{ md: '390px' }}>
          2
        </ProCard>
      </ProCard>
    </ProCard>
  );
};

export default Dashboard;
