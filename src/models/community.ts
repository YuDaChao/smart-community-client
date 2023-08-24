import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [communityId, setCommunityId] = useState<number | undefined>(undefined);
  useEffect(() => {
    if (initialState?.currentUser?.communityId) {
      setCommunityId(initialState?.currentUser?.communityId);
    }
  }, [initialState?.currentUser?.communityId]);
  return {
    communityId,
    setCommunityId,
  };
};
