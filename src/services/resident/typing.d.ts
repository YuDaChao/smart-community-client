declare namespace API {
  enum ResidentVerifyStatus {
    DEFAULT = 'DEFAULT', /// 未认证
    PROCESSING = 'PROCESSING', /// 认证中
    SUCCESS = 'SUCCESS', /// 已认证
    ERROR = 'ERROR', /// 认证失败
  }
  enum HouseStatus {
    SELF_OCCUPIED = 'SELF_OCCUPIED', /// 自住
    HIRE = 'HIRE', /// 出租
    IDLE = 'IDLE', /// 空闲
  }
  enum ResidentType {
    OWNER = 'OWNER', /// 业主
    TENANT = 'TENANT', /// 租户
  }
  type Building = {
    id: number;
    buildingName: string;
  };
  type House = {
    id: number;
    floorNumber: number;
    floorNo: string;
    houseStatus: HouseStatus;
  };
  type Resident = {
    id: number;
    residentName: string;
    residentPhone: string;
    createdAt: string;
    updatedAt: string;
    communityId: number;
    residentType: ResidentType;
    community: API.Community;
    buildingId: number;
    building: Building;
    houseId: number;
    house: House;
    verifyStatus: ResidentVerifyStatus;
  };
}
