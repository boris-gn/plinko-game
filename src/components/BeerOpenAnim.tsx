import clsx from "clsx";

type Props = {
  isWinning: boolean;
};

export default function BeerOpenAnim({ isWinning }: Props) {
  return (
    <div className={clsx("beer-frame", isWinning ? "block" : "hidden")}>
      <div
        key={isWinning ? "win" : "idle"}
        className={clsx("beer-sprite", isWinning && "beer-open")}
      />
    </div>
  );
}
