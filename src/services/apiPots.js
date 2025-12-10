import supabase from "./supabase";

export async function getPots() {
  const { data: pots, error } = await supabase
    .from("pots")
    .select("name, target, total, theme");

  if (error) {
    throw new Error(error.message);
  }

  return pots;
}
