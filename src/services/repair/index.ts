import { request } from '@umijs/max';

/**
 * 查询报修列表
 * @param params
 * @returns
 */
export async function getRepairList(
  params: API.TableParams<Partial<API.Repair> & { communityId?: number }>,
) {
  return request<API.TableResponse<API.Repair>>('/api/repair', {
    method: 'GET',
    params,
  });
}
