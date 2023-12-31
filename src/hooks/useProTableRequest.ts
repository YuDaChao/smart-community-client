import { ProTableProps } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';

export const useProTableRequest = <T, D>(
  queryFun: (...args: any) => Promise<API.TableResponse<T>>,
): ProTableProps<T, D> => {
  const { runAsync } = useRequest((params: any) => queryFun(params), {
    debounceWait: 300,
    debounceTrailing: true,
    manual: true,
  });

  return {
    request: async (params) => {
      const { pageSize, current, ...rest } = params;
      const currentPage = current || 1;
      const size = pageSize || 10;

      const res = await runAsync({ current: currentPage, pageSize: size, ...rest });
      return {
        data: res.data.data,
        total: res.data.count,
        success: true,
      };
    },
  };
};
