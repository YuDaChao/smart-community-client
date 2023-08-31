import { ProCard } from '@ant-design/pro-components';
import { Skeleton, Space, Typography } from 'antd';

import iconUser from '../images/icon-user.png';
import iconHouse from '../images/icon-house.png';
import iconBuilding from '../images/icon-building.png';
import iconVerify from '../images/icon-verify.png';
import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import { useModel, useRequest } from '@umijs/max';
import { getResidentOverview } from '@/services/dashboard';
import { useHeaderOverview } from '../hooks';

const { Text } = Typography;

interface HeaderOverviewItemProps {
  icon: any;
  title: string;
  value?: number;
  type: 'down' | 'up';
  typeValue?: number;
}

const HeaderOverviewItem = (props: HeaderOverviewItemProps) => {
  const { icon, title, value = 0, type, typeValue = 0 } = props;
  return (
    <div className="headerOverviewItem">
      <div className="headerOverviewItemTitle">
        <img src={icon} />
        <Text>{title}</Text>
      </div>
      <span className="count">{value}</span>
      <Space>
        <span>较上月</span>
        <Space size={4}>
          {type === 'up' ? (
            <RiseOutlined style={{ color: '#27AE60' }} />
          ) : (
            <FallOutlined style={{ color: '#EB5757' }} />
          )}
          <span style={{ color: type === 'up' ? '#27AE60' : '#EB5757' }}>{typeValue}</span>
        </Space>
      </Space>
    </div>
  );
};

const HeaderOverview = () => {
  const { communityId } = useModel('community');

  const { data, isLoading } = useHeaderOverview(communityId);

  const {
    residentCount = 0,
    lastResidentCount = 0,
    tenantCount = 0,
    lastTenantCount = 0,
    occupancyRate = 0,
    hire = 0,
    idle = 0,
    selfOccupied = 0,
  } = data?.data || {};

  return (
    <ProCard loading={isLoading} className="headerOverview">
      <HeaderOverviewItem
        icon={iconUser}
        title="小区入住人数"
        value={residentCount}
        type="up"
        typeValue={residentCount - lastResidentCount}
      />
      <HeaderOverviewItem
        icon={iconHouse}
        title="小区租户人数"
        value={tenantCount}
        type="down"
        typeValue={tenantCount - lastTenantCount}
      />
      <HeaderOverviewItem
        icon={iconVerify}
        title="小区入住率"
        value={occupancyRate}
        type="up"
        typeValue={1.3}
      />
      <HeaderOverviewItem
        icon={iconBuilding}
        title="房屋数"
        value={hire + idle + selfOccupied}
        type="up"
        typeValue={129}
      />
    </ProCard>
  );
};

export default HeaderOverview;
