export interface MemberDtoType {
  memberId: 0;
  role: "GUEST" | "ASSOCIATE" | "REGULAR";
  basicInfo: {
    memberId: 0;
    studentId: string;
    name: string;
    phone: string;
  };
}
