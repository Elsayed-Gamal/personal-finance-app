import RecurringContainer from "../features/recurringBills/RecurringContainer";

function RecurringBills() {
  return (
    <div className="flex flex-col gap-8">
      <h1
        className="text-gray-900"
        style={{
          font: "var(--text-preset-1)",
        }}
      >
        Recurring Bills
      </h1>
      <RecurringContainer />
    </div>
  );
}

export default RecurringBills;
