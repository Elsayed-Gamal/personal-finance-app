import TransactionsTable from "../features/transactions/TransactionsTable";

function Transactions() {
  return (
    <div className="flex flex-col gap-8">
      <h1
        className="text-gray-900"
        style={{
          font: "var(--text-preset-1)",
        }}
      >
        Transactions
      </h1>
      <TransactionsTable />
    </div>
  );
}

export default Transactions;
