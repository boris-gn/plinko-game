import clsx from "clsx";

const BonusBanner = () => {
  return (
    <div
      className={clsx(
        "bg-[url('/bonus_banner.png')] bg-no-repeat bg-center bg-cover",
        "w-[200px] h-[46px] z-10",
        "absolute pointer-events-none left-1/2 transform -translate-x-1/2 top-6",
      )}
    >
      <div
        className={clsx(
          "absolute w-fit right-0 top-1/2 transform -translate-y-1/2 mr-4",
          "text-[#FFDB55] text-center [text-shadow:0_0_4px_#FFDB55] font-['Digital_Numbers'] text-[20px] font-normal leading-[24px]",
        )}
      >
        786K
      </div>
    </div>
  );
};

export default BonusBanner;

BonusBanner.displayName = "BonusBanner";
