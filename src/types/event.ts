export type QuestionStatus = "ENABLED" | "DISABLED";
export type AfterPartyStatus = "NONE" | "NOT_APPLIED" | "APPLIED";

type Participant = { name: string; studentId: string; phone: string };

export interface ParticipantValidationDto {
  eventId: number;
  participant: Participant;
}
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
  participant: Participant;
  afterPartyApplicationStatus: AfterPartyStatus;
}

export interface ParticipantValidationResponse {
  isParticipable: boolean;
  errorCodeName: string;
}
