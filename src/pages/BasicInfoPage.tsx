import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Button from "wowds-ui/Button";
import Flex from "../components/Flex";
import MemberAuthModal from "../components/MemberAuthModal";
import ShortAnswer from "../components/ShortAnswer";
import type { FormSubmitDtoType } from "../types/form";

const BasicInfoPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, watch } = useFormContext<FormSubmitDtoType>();
  const {
    participant: { name, studentId, phone },
  } = watch();
  const isValid = name && studentId && phone;

  return (
    <Flex direction="column" gap={60}>
      {modalOpen && <MemberAuthModal onClose={() => setModalOpen(false)} />}

      <ShortAnswer
        question="이름을 입력해주세요."
        required
        placeholder="Ex. 홍길동"
        register={register("participant.name")}
      />
      <ShortAnswer
        question="학번을 입력해주세요."
        required
        placeholder="Ex. C123456"
        register={register("participant.studentId")}
      />
      <ShortAnswer
        question="전화번호를 입력해주세요."
        required
        placeholder="Ex. 010-1234-5678"
        register={register("participant.phone")}
      />

      <Button
        disabled={!isValid}
        style={{ width: 120 }}
        onClick={() => setModalOpen(true)}
      >
        다음
      </Button>
    </Flex>
  );
};

export default BasicInfoPage;
