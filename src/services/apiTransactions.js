import supabase from "./supabase";

export async function getTransactions(
  page = 1,
  searchQuery = "",
  sort,
  category,
  limit = 10,
) {
  console.log(category);

  const query = supabase
    .from("transactions")
    .select("name, categories!inner(name), date, amount, avatar, id", {
      count: "exact",
    })
    .range((page - 1) * limit, page * limit - 1);

  if (searchQuery) {
    query.ilike("name", `%${searchQuery}%`);
  }

  if (sort) {
    const [field, order] = sort.split("_");
    query.order(field, { ascending: order === "asc" });
  }

  if (category && category !== "all") {
    query.eq("categories.name", category);
  }

  const { data: transactions, error, count } = await query;
  if (error) {
    throw new Error(error.message);
  }

  return { transactions, count };
}
