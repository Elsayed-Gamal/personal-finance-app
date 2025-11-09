import { useQuery } from "@tanstack/react-query";
import Table from "../../ui/Table";
import { getTransactions } from "../../services/apiTransactions";
import { format } from "date-fns";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import Loading from "../../ui/Loading";
import Message from "../../ui/Message";
import SearchBar from "./SearchBar";
import useDebounce from "../../hooks/useDebounce";

const PAGE_SIZE = 10;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function TransactionsTable() {
  // 1. State for search query
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  // 2. Get current page and sort from URL search params
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const sort = searchParams.get("sort");
  const category = searchParams.get("category") || "all";

  // 3. Fetch transactions data with React Query
  const {
    data: { transactions, count } = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["transactions", page, debouncedSearchQuery, sort, category],
    queryFn: () => getTransactions(page, debouncedSearchQuery, sort, category),
  });

  // Ensure the "page" param is always set in the URL
  useEffect(() => {
    if (!searchParams.get("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, [searchQuery]);

  // 4. Calculate total number of pages
  const pageCount = Math.ceil(count / PAGE_SIZE);

  // 5. Handlers to navigate pages
  function nextPage() {
    const next = page === pageCount ? page : page + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = page === 1 ? page : page - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  // 6. Handler for search
  function handleSearch(query) {
    setSearchQuery(query);
  }

  return (
    <div className="rounded-xl bg-white p-8">
      <SearchBar onSearch={handleSearch} searchQuery={searchQuery} />
      <Table columns="3fr 1fr 2fr 1fr">
        <Table.Header>
          <div>Recipient / Sender</div>
          <div>Category</div>
          <div>Transaction Date</div>
          <div className="ml-auto">Amount</div>
        </Table.Header>
        <Table.Body>
          {isPending && <Loading />}
          {isError && <Message type="error">{error.message}</Message>}
          {transactions &&
            transactions.map((transaction) => (
              <Table.Row key={transaction.id}>
                <div
                  className="text-grey-900 flex items-center"
                  style={{ font: "var(--text-preset-4-bold)" }}
                >
                  <img
                    src={transaction.avatar}
                    alt={`Avatar of ${transaction.name}`}
                    className="mr-2.5 inline-block h-[40px] w-[40px] rounded-full object-cover align-middle"
                  />
                  {transaction.name}
                </div>
                <div
                  className="text-grey-500"
                  style={{ font: "var(--text-preset-5)" }}
                >
                  {transaction.categories.name}
                </div>
                <div
                  className="text-grey-500"
                  style={{ font: "var(--text-preset-5)" }}
                >
                  {format(new Date(transaction.date), "dd MMM yyyy")}
                </div>
                <div
                  className={`ml-auto ${transaction.amount < 0 ? "text-grey-900" : "text-green"}`}
                  style={{ font: "var(--text-preset-4-bold)" }}
                >
                  {transaction.amount > 0 && "+"}
                  {currencyFormatter.format(transaction.amount)}
                </div>
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer className="mt-8 flex items-center justify-between gap-4">
          <button
            onClick={prevPage}
            disabled={page === 1}
            className="border-beige-500 text-grey-900 flex cursor-pointer items-center gap-4 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ font: "var(--text-preset-4)" }}
          >
            <img src="/assets/images/icon-caret-left.svg" alt="" />
            Prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => {
                  searchParams.set("page", pg);
                  setSearchParams(searchParams);
                }}
                className={`${
                  pg === page
                    ? "bg-grey-900 border-grey-900 text-white"
                    : "text-grey-900"
                } border-beige-500 h-10 w-10 cursor-pointer rounded-lg border`}
                style={{ font: "var(--text-preset-4)" }}
              >
                {pg}
              </button>
            ))}
          </div>
          <button
            onClick={nextPage}
            disabled={page === pageCount}
            className="border-beige-500 text-grey-900 flex cursor-pointer items-center gap-4 rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ font: "var(--text-preset-4)" }}
          >
            Next
            <img src="/assets/images/icon-caret-right.svg" alt="" />
          </button>
        </Table.Footer>
      </Table>
    </div>
  );
}

export default TransactionsTable;
