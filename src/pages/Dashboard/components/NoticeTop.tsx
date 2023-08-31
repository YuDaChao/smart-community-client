import { useModel } from '@umijs/max';
import { List, Space, Typography } from 'antd';
import { ProField } from '@ant-design/pro-components';
import { SoundOutlined } from '@ant-design/icons';
import { useNoticeTop } from '../hooks';

const NoticeTop = () => {
  const { communityId } = useModel('community');
  const { data, isLoading } = useNoticeTop(communityId);
  return (
    <List
      dataSource={data?.data.data}
      loading={isLoading}
      itemLayout="vertical"
      className="noticeTop"
      renderItem={(notice) => (
        <List.Item key={notice.id}>
          <List.Item.Meta
            title={
              <Space>
                <SoundOutlined style={{ color: '#1677ff' }} />
                {notice.noticeTitle}
              </Space>
            }
          />
          <Typography.Paragraph ellipsis={{ rows: 3 }}>{notice.noticeContent}</Typography.Paragraph>
          <div className="noticeFooter">
            <ProField valueType={'dateTime'} value={notice.createdAt} readonly mode="read" />
            <Typography.Link>查看详情</Typography.Link>
          </div>
        </List.Item>
      )}
    />
  );
};

export default NoticeTop;
