import { request } from '@umijs/max';

/**
 * 查询通知列表
 * @param params
 * @returns
 */
export async function getNoticeList(
  params: API.TableParams<Partial<API.Notice> & { communityId?: number }>,
) {
  return request<API.TableResponse<API.Notice>>('/api/notice', {
    method: 'GET',
    params,
  });
}
