import { getRepairList } from '@/services/repair';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Space, Tag } from 'antd';
import { FC } from 'react';

interface Props {
  repair: API.Repair;
}

const RepairTop: FC<Props> = ({ repair }) => {
  return (
    <ProDescriptions
      dataSource={repair}
      column={2}
      columns={[
        { title: '问题描述', dataIndex: 'repairDesc', span: 2 },
        {
          title: '服务类型',
          dataIndex: 'repairTypeName',
          render: (_, record) => record.repairType.repairTypeName,
        },
        {
          title: '手机号码',
          dataIndex: 'residentPhone',
          render: (_, record) => record.resident.residentPhone,
        },
        {
          title: '姓名',
          dataIndex: 'residentName',
          render: (_, record) => {
            const { resident } = record;
            const tagName = resident.residentType === 'OWNER' ? '业主' : '租户';
            return (
              <Space>
                <span>{resident.residentName}</span>
                <Tag color={resident.residentType === 'OWNER' ? 'processing' : 'success'}>
                  {tagName}
                </Tag>
              </Space>
            );
          },
        },
        {
          title: '详细地址',
          dataIndex: 'residentName',
          render: (_, record) => {
            const {
              resident: { house, building },
            } = record;
            return `${building.buildingName}-${house.floorNumber}-${house.floorNo}`;
          },
        },
        {
          title: '上门时间',
          dataIndex: 'serviceAt',
          valueType: 'dateTime',
          span: 2,
        },
      ]}
    />
  );
};

export default RepairTop;
