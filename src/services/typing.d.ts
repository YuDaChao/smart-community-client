declare namespace API {
  type Response<T> = {
    code: number;
    data: T;
    message: string;
  };
  type TableResponse<T> = Response<{ count: number; data: T[] }>;
  type TableParams<T> = T & { current: number; pageSize: number };
}
