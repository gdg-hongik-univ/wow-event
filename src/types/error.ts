export type ErrorCodeType =
  | "EVENT_NOT_VIEWABLE_OUTSIDE_APPLICATION_PERIOD"
  | "EVENT_NOT_VIEWABLE_MAX_APPLICANT_COUNT_EXCEEDED"
  | "PARTICIPATION_DUPLICATE"
  | "EVENT_NOT_APPLICABLE_NOT_REGULAR_ROLE"
  | "EVENT_NOT_FOUND";

export interface ErrorDataType {
  errorCodeName: ErrorCodeType;
  errorMessage: string;
}
