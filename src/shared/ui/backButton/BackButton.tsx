import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { memo } from "react";

export const BackButton = memo(function BackButton() {
  const navigate = useNavigate();

  // 뒤로가기
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <button
        onClick={handleBack}
        className="w-10 h-10 rounded-full bg-glass-white hover:bg-white/40 transition-colors duration-250 flex items-center justify-center mb-5 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
    </>
  );
});
