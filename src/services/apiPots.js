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

// export async function updatePot(potName, amount) {
//   const { error: potError } = await supabase
//     .from("pots")
//     .update({ total: total + amount })
//     .eq("name", potName);

//   const { error: balanceError } = await supabase
//     .from("balance")
//     .update({ current: current - amount });

//   if (potError) {
//     throw new Error(potError.message);
//   }

//   if (balanceError) {
//     throw new Error(balanceError.message);
//   }
// }
