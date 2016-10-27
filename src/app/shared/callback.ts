export interface SuccessCallback<T> {
  (value: T): void;
}

export interface ErrorResponse {
  isServerFailure: boolean;
  errorCodes: Array<string>;
}

export interface ErrorCallback {
  (error?: ErrorResponse): void;
}
