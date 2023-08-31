import { getResidentOverview } from '@/services/dashboard';
import { getNoticeList } from '@/services/notice';
import { getRepairList } from '@/services/repair';
import { useQuery } from 'react-query';

export const useHeaderOverview = (communityId?: number) =>
  useQuery(['HeaderOverview', communityId], () => getResidentOverview(communityId));

export const useRepairTop = (communityId?: number) =>
  useQuery(['RepairTop', communityId], () =>
    getRepairList({ pageSize: 4, current: 1, communityId }),
  );

export const useNoticeTop = (communityId?: number) =>
  useQuery(['NoticeTop', communityId], () =>
    getNoticeList({ pageSize: 4, current: 1, communityId }),
  );
