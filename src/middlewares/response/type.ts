/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  message?: string;
  description?: string;
  data?: T;
  statuscode?: number;
}
