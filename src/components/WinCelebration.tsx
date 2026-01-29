import { useEffect, useState } from "react";
import { BucketConfig } from "../config/gameConfig";
import CupBadge from "./CupBadge";
import clsx from "clsx";

interface WinCelebrationProps {
  multiplier: string;
  multiplierValue: number;
  show: boolean;
  onClose: () => void;
  lastResultBucket: BucketConfig;
}

export function WinCelebration({
  multiplierValue,
  show,
  onClose,
  lastResultBucket,
}: WinCelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  const headerBaseClass =
    "text-white text-center font-bold leading-normal font-montserrat";

  const LoserHeaderText = () => (
    <div className={clsx(headerBaseClass, "text-[24px] px-5")}>
      Chúc bạn may mắn lần sau!
    </div>
  );

  const PrizeText = ({ text }: { text: string }) => (
    <div className="relative h-[30px]">
      <div
        className={clsx(
          headerBaseClass,
          "absolute inset-0 text-[#FF39B7] text-[24px] blur-[4.5px]",
        )}
      >
        {text}
      </div>

      <div
        className={clsx(
          headerBaseClass,
          "absolute inset-0 text-[24px] [-webkit-text-stroke:2px_#FF39B7]",
        )}
      >
        {text}
      </div>

      <div
        className={clsx(
          headerBaseClass,
          "absolute inset-0 -top-[1px] text-[24px] [-webkit-text-stroke:2px_rgba(255,57,183,0.3)]",
        )}
      >
        {text}
      </div>

      <div className={clsx(headerBaseClass, "absolute inset-0 text-[24px]")}>
        {text}
      </div>
    </div>
  );

  const WinnerHeaderText = () => (
    <div className={clsx(headerBaseClass, "text-[18px]")}>
      Chúc mừng bạn đã trúng
      <PrizeText text="300k tiền thưởng" />
    </div>
  );

  const ModalHeaderText = () =>
    multiplierValue === 0 ? <LoserHeaderText /> : <WinnerHeaderText />;

  return (
    <div className="w-[97.5%] h-[97%] absolute top-[5.5px] left-1 z-[100] winner_modal_bg rounded-[20px]">
      <div className="relative w-full h-full">
        <div className="mt-7">{ModalHeaderText()}</div>
        <div className="w-[188px] h-[188px] absolute bottom-[60px] left-1/2 transform -translate-x-1/2">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-[40px]">
            <CupBadge
              className="w-[56px] h-[36px]"
              isWinning={true}
              text={lastResultBucket.multiplier}
              textColor={lastResultBucket.color}
              mainBgColor={lastResultBucket.bgColor}
              bgImage={lastResultBucket.bgImage}
              strokeColor={lastResultBucket.strokeColor}
              hasResult={lastResultBucket !== null}
            />
          </div>
          <img
            src={multiplierValue === 0 ? "/looser_cup.png" : "/winner_cup.png"}
            alt="winner cup"
          />
          <div className="text-[#464646] text-center text-[12px] font-bold leading-[24px] w-fit absolute top-[88px] left-1/2 transform -translate-x-1/2">
            300K
          </div>
        </div>
      </div>
    </div>
  );
}
