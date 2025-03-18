
type FormErrors<T> = {
  [K in keyof T]?: string[];
};

type FormValues<T> = {
  [K in keyof T]: T[K];
};

export type FormState<T> = void | {
  value: FormValues<T>;
  errors?: FormErrors<T>;
  message?: string,
  success?: boolean
} | undefined;