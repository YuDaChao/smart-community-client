import { PresetStatusColorType } from 'antd/es/_util/colors';

export const HouseStatus: Record<API.HouseStatus, string> = {
  SELF_OCCUPIED: '自住',
  HIRE: '出租',
  IDLE: '空闲',
};

export const ResidentType: Record<
  API.ResidentType,
  { text: string; status: PresetStatusColorType }
> = {
  OWNER: { text: '业主', status: 'success' },
  TENANT: { text: '租户', status: 'default' },
};

export const VerifyStatus: {
  value: string;
  text: string;
  status: PresetStatusColorType;
}[] = [
  { value: 'DEFAULT', text: '待认证', status: 'default' },
  { value: 'PROCESSING', text: '认证中', status: 'processing' },
  { value: 'SUCCESS', text: '认证成功', status: 'success' },
  { value: 'ERROR', text: '认证失败', status: 'error' },
];

export const arrayToEnum = (data: { value: any; text: any; status: PresetStatusColorType }[]) => {
  return data.reduce((prev, cur) => ({ ...prev, [cur.value]: cur }), {});
};
