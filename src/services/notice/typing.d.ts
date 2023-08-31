declare namespace API {
  type Notice = {
    id: number;
    noticeTitle: string;
    noticeType: 1 | 2;
    noticeContent: string;
    noticeStatus: 0 | 1;
    createdAt: string;
    updatedAt: string;
    viewCount: number;
    communityId: number;
    userId: number;
  };
}
