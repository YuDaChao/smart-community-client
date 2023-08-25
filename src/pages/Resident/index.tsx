import { useProTableRequest } from '@/hooks';
import { getResidentList } from '@/services/resident';
import { HouseStatus, ResidentType, VerifyStatus, arrayToEnum } from '@/utils/constant';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import {useModel} from '@umijs/max';

const Resident = () => {
  const { request } = useProTableRequest(getResidentList);
  const { communityId } = useModel('community')
  const columns: ProColumns<API.Resident, 'text'>[] = [
    { title: '序号', valueType: 'index' },
    { title: '住户名称', dataIndex: 'residentName' },
    {
      title: '详细住址',
      dataIndex: 'residentAddress',
      render: (_, record) => `${record.building.buildingName}-${record.house.floorNumber}-${record.house.floorNo}`,
    },
    { title: '住户电话', dataIndex: 'residentPhone' },
    {
      title: '住户身份',
      dataIndex: 'residentType',
      render: (_, record) => (
        <Tag color={ResidentType[record.residentType].status}>
          {ResidentType[record.residentType].text}
        </Tag>
      ),
    },
    {
      title: '房屋状态',
      dataIndex: 'houseStatus',
      render: (_, record) => `${HouseStatus[record.house.houseStatus]}`,
    },
    { title: '认证状态', dataIndex: 'verifyStatus', valueEnum: arrayToEnum(VerifyStatus) },
  ];
  return (
    <ProTable<API.Resident, Partial<API.Resident>>
      rowKey={'id'}
      params={{ communityId }}
      columns={columns}
      request={request}
    />
  );
};

export default Resident;
