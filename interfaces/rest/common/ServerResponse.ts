export interface ServerResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type ApiResponse<T> = Promise<ServerResponse<T>>;
export type Paginated<T, K extends string = 'items'> = {
  [P in K]: T[];
} & {
  total: number;
};

export type PaginatedApiResponse<T, K extends string = 'items'> = Promise<ServerResponse<Paginated<T, K>>>;