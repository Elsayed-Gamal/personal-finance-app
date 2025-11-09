import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getCategories } from "../../services/apiCategories";

const SearchBar = ({ searchQuery, onSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "date_desc");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    searchParams.set("sort", sort);
    searchParams.set("category", selectedCategory);
    setSearchParams(searchParams);
  }, [sort, selectedCategory]);

  return (
    <div className="mb-6 flex items-center justify-between">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search transaction"
        className="border-beige-500 placeholder:text-beige-500 w-[320px] rounded-lg border bg-[url('/assets/images/icon-search.svg')] bg-position-[center_right_1rem] bg-no-repeat py-3 pr-12 pl-5 focus:outline-none"
      />

      <div className="flex items-center gap-6">
        <div>
          <label htmlFor="sort">Sort by</label>
          <select
            name=""
            id="sort"
            className="border-beige-500 ml-4 rounded-lg border bg-white px-4 py-3 focus:outline-none"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="date_desc">Latest</option>
            <option value="date_asc">Oldest</option>
            <option value="name_asc">A to Z</option>
            <option value="name_desc">Z to A</option>
            <option value="amount_desc">Highest</option>
            <option value="amount_asc">Lowest</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name=""
            id="category"
            className="border-beige-500 ml-4 rounded-lg border bg-white px-4 py-3 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Transactions</option>
            {categories &&
              categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
