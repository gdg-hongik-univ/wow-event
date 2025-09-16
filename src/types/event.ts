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
  regularRoleOnlyStatus: "ENABLED" | "DISABLED";
  afterPartyStatus: "ENABLED" | "DISABLED";
  prePaymentStatus: "ENABLED" | "DISABLED";
  postPaymentStatus: "ENABLED" | "DISABLED";
  rsvpQuestionStatus: "ENABLED" | "DISABLED";
  noticeConfirmQuestionStatus: "ENABLED" | "DISABLED";
  mainEventMaxApplicantCount: number;
  afterPartyMaxApplicantCount: number;
}
