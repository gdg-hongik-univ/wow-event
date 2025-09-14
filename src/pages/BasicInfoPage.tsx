import { useState } from "react";
import Button from "wowds-ui/Button";
import Flex from "../components/Flex";
import MemberAuthModal from "../components/MemberAuthModal";
import ShortAnswer from "../components/ShortAnswer";

const BasicInfoPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Flex direction="column" gap={60}>
      {modalOpen && <MemberAuthModal onClose={() => setModalOpen(false)} />}
      <ShortAnswer
        question="이름을 입력해주세요."
        required
        placeholder="Ex. 홍길동"
      />
      <ShortAnswer
        question="학번을 입력해주세요."
        required
        placeholder="Ex. C123456"
      />
      <ShortAnswer
        question="전화번호를 입력해주세요."
        required
        placeholder="Ex. 010-1234-5678"
      />

      <Button
        disabled={false}
        style={{ width: 120 }}
        onClick={() => setModalOpen(true)}
      >
        다음
      </Button>
    </Flex>
  );
};

export default BasicInfoPage;
