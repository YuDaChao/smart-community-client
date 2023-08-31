import { ProCard } from '@ant-design/pro-components';
import HeaderOverview from './components/HeaderOverview';
import { useModel } from '@umijs/max';

import './index.less';
import RepairTop from './components/RepairTop';
import NoticeTop from './components/NoticeTop';
import { Typography } from 'antd';

const Dashboard = () => {
  const { communityId } = useModel('community');
  const { initialState } = useModel('@@initialState');
  console.log(communityId, initialState?.currentUser);

  return (
    <ProCard ghost direction="column" className="dashboard">
      <HeaderOverview />
      <ProCard ghost gutter={[12, 24]} direction="row">
        <ProCard
          title="报事报修"
          bodyStyle={{ padding: 0 }}
          extra={<Typography.Link>全部</Typography.Link>}
        >
          <RepairTop />
        </ProCard>
        <ProCard
          title="公告"
          colSpan={{ md: '390px' }}
          bodyStyle={{ paddingBlock: 0 }}
          extra={<Typography.Link>全部</Typography.Link>}
        >
          <NoticeTop />
        </ProCard>
      </ProCard>
    </ProCard>
  );
};

export default Dashboard;
