import { ProCard } from '@ant-design/pro-components';
import HeaderOverview from './components/HeaderOverview';
import { useModel } from '@umijs/max';

const Dashboard = () => {
  const { communityId } = useModel('community');
  const { initialState } = useModel('@@initialState');
  console.log(communityId, initialState?.currentUser);

  return (
    <ProCard ghost>
      <HeaderOverview />
      {communityId}
    </ProCard>
  );
};

export default Dashboard;
