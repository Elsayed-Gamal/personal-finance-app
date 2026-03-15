import { useQuery } from "@tanstack/react-query";
import Table from "../../ui/Table";
import { getRecurringBills } from "../../services/apiTransactions";
import Loading from "../../ui/Loading";
import Message from "../../ui/Message";
import { formatCurrency } from "../../utils/helpers";

function Bills() {
  const {
    data: recurringBills,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["recurringBills"],
    queryFn: getRecurringBills,
  });

  return (
    <Table columns="2fr 1fr 1fr">
      <Table.Header>
        <div>Bill Title</div>
        <div>Due Date</div>
        <div className="ml-auto">Amount</div>
      </Table.Header>
      <Table.Body>
        {isPending && <Loading />}
        {isError && <Message type="error">{error.message}</Message>}
        {recurringBills &&
          recurringBills.map((bill) => (
            <Table.Row styles={{ padding: "20px 16px" }} key={bill.name}>
              <div
                className="text-grey-900 flex items-center"
                style={{ font: "var(--text-preset-4-bold)" }}
              >
                <img
                  src={bill.avatar}
                  alt={`Avatar of ${bill.name}`}
                  className="mr-2.5 inline-block h-[32px] w-[32px] rounded-full object-cover align-middle"
                />
                {bill.name}
              </div>
              <div>{bill.day}</div>
              <div className="ml-auto">{formatCurrency(bill.amount)}</div>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}

export default Bills;
