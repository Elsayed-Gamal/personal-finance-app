import Bills from "./Bills";
import TotalSummary from "./TotalSummary";

function RecurringContainer() {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-6">
      <TotalSummary />
      <div className="rounded-xl bg-white p-8">
        <Bills />
      </div>
    </div>
  );
}

export default RecurringContainer;
