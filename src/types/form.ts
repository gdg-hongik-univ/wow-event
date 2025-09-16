export interface FormSubmitDtoType {
  eventId: number;
  participant: { name: string; studentId: string; phone: string };
  afterPartyApplicationStatus: boolean;
}
