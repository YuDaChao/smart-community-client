import { request } from '@umijs/max';

/**
 * 查询住户列表
 * @param params
 * @returns
 */
export async function getResidentList(params: API.TableParams<Partial<API.Resident>>) {
  return request<API.TableResponse<API.Resident>>('/api/resident', {
    method: 'GET',
    params,
  });
}
