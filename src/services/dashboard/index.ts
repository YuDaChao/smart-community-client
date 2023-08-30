import { request } from '@umijs/max';

/**
 * 统计小区人数信息
 * @param communityId 小区 id
 * @returns
 */
export async function getResidentOverview(communityId?: number) {
  return request<API.Response<API.ResidentOverview>>('/api/dashboard/resident', {
    method: 'GET',
    params: { communityId },
  });
}
