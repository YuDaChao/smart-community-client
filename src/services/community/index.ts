import { request } from '@umijs/max';

/**
 * 查询小区列表
 * @param communityName
 * @returns
 */
export async function getCommunityDictList(communityName?: string) {
  return request<API.Response<API.Community[]>>('/api/community/dict', {
    method: 'GET',
    params: { communityName },
  });
}
