import { getRepairList } from '@/services/repair';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import { Space, Tag, Typography } from 'antd';
import { useRepairTop } from '../hooks';

const RepairTop = () => {
  const { communityId } = useModel('community');
  const { data, isLoading } = useRepairTop(communityId);

  return (
    <ProCard
      loading={isLoading}
      gutter={[24, 24]}
      wrap
      bodyStyle={{ paddingInline: 12, paddingBlock: 4 }}
    >
      {data?.data.data.map((repair) => (
        <ProCard
          key={repair.id}
          bordered
          size="small"
          colSpan={{ md: 12 }}
          actions={[
            <Typography.Link key={'1'}>派单</Typography.Link>,
            <Typography.Link key={'2'}>作废</Typography.Link>,
          ]}
        >
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
        </ProCard>
      ))}
    </ProCard>
  );
};

export default RepairTop;
