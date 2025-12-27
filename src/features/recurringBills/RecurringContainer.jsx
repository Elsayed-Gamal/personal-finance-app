import TotalSummary from "./TotalSummary";

function RecurringContainer() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6">
      <TotalSummary />
      <div>right side</div>
    </div>
  );
}

export default RecurringContainer;
