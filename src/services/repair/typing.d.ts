declare namespace API {
  enum RepairStatus {
    DISABLE = 0,
    ENABLE = 1,
  }
  type RepairType = {
    id: number;
    repairTypeName: string;
  };
  type Repair = {
    id: number;
    repairDesc: string;
    serviceAt: string;
    repairStatus: RepairStatus;
    createdAt: Date;
    residentId: number;
    repairType: RepairType;
    resident: API.Resident;
  };
}
