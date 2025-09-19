export type QuestionStatus = "ENABLED" | "DISABLED";
export type AfterPartyStatus = "NONE" | "NOT_APPLIED" | "APPLIED";

export interface EventDtoType {
  eventId: number;
  name: string;
  venue: string;
  startAt: string;
  applicationDescription: string;
  applicationPeriod: {
    startDate: string;
    endDate: string;
  };
  regularRoleOnlyStatus: QuestionStatus;
  afterPartyStatus: QuestionStatus;
  prePaymentStatus: QuestionStatus;
  postPaymentStatus: QuestionStatus;
  rsvpQuestionStatus: QuestionStatus;
  noticeConfirmQuestionStatus: QuestionStatus;
  mainEventMaxApplicantCount: number;
  afterPartyMaxApplicantCount: number;
}

export interface EventApplyDtoType {
  eventId: number;
  participant: { name: string; studentId: string; phone: string };
  afterPartyApplicationStatus: AfterPartyStatus;
}
