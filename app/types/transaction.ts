export type Transaction = {
  id: number,
  date: string,
  description: string,
  category: "income" | "food" | "entertainment" | "bills" | "fitness" | "others",
  type: "income" | "expense",
  amount: number
}