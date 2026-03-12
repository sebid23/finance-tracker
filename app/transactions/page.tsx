"use client";

import { useState } from "react";
import Separator from "@/app/components/ui/separator";
import TransactionsTable from "@/app/components/ui/transactions/transactions-table";
import TransactionsFilters from "@/app/components/ui/transactions/transactions-filters";
import TransactionsModal from "@/app/components/ui/transactions/transactions-modal";

type Transaction = {
  id: number,
  date: string,
  description: string,
  category: string,
  type: "income" | "expense",
  amount: number
}

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([
      { id: 1, date: "Mar 6, 2026", description: "Salary", category: "Income", type: "income", amount: 3000 },
      { id: 2, date: "Mar 5, 2026", description: "Groceries", category: "Food", type: "expense", amount: 42 },
      { id: 3, date: "Mar 4, 2026", description: "Netflix", category: "Entertainment", type: "expense", amount: 12 },
      { id: 4, date: "Mar 3, 2026", description: "Electricity bill", category: "Bills", type: "expense", amount: 85 },
      { id: 5, date: "Mar 2, 2026", description: "Freelance payment", category: "Income", type: "income", amount: 500 },
      { id: 6, date: "Mar 1, 2026", description: "Gym", category: "Fitness", type: "expense", amount: 100 },
      { id: 7, date: "Feb 28, 2026", description: "Internet", category: "Bills", type: "expense", amount: 150 },
      { id: 8, date: "Feb 27, 2026", description: "Discord Nitro", category: "Entertainment", type: "expense", amount: 100 }
    ]);

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [sortType, setSortType] = useState("date_desc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edit, setEdit] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [type, setType] = useState<"income" | "expense">("income");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");

    const filteredTransactions = transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesType;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
      if (sortType === "date_desc") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (sortType === "date_asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }

      if (sortType === "amount_desc") {
        return b.amount - a.amount;
      }

      if (sortType === "amount_asc") {
        return a.amount - b.amount;
      }

      return 0;
    })

    function handleAddTransaction() {
      if (!description.trim()) {
        alert("Description is required!");
        return;
      }

      if (!category.trim()) {
        alert("Category is required!");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        alert("Amount must be greater than 0.")
        return;
      }

      if (!date) {
        alert("Date is required!");
        return;
      }

      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      setTransactions((prevTransactions) => {
        const newId = prevTransactions.length > 0 ? Math.max(...prevTransactions.map((t) => t.id)) + 1 : 1;
        const newTransaction = {
          id: newId,
          date: formattedDate,
          description,
          category,
          type,
          amount: Number(amount)
        }

        return [newTransaction, ...prevTransactions];
      });
      
      resetForm();
      setIsModalOpen(false);
    }

    function handleDelete(id: number) {
      if (!confirm("Are you sure you want to delete this transaction?")) {
        return;
      }

      setTransactions(
        transactions.filter((t) => t.id !== id)
      )
    }

    function handleEdit(transaction: Transaction) {
      setEdit(transaction.id);

      setDescription(transaction.description);
      setCategory(transaction.category);
      setType(transaction.type);
      setAmount(String(transaction.amount));

      const parsedDate = new Date(transaction.date);
      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
      const day = String(parsedDate.getDate()).padStart(2, "0");

      setDate(`${year}-${month}-${day}`);

      setIsModalOpen(true);
    }

    function handleUpdateTransaction() {
      if (!edit) return;

      if (!description.trim()) {
        alert("Description is required!");
        return;
      }

      if (!category.trim()) {
        alert("Category is required!");
        return;
      }

      if (!amount || Number(amount) <= 0) {
        alert("Amount must be greater than 0.")
        return;
      }

      if (!date) {
        alert("Date is required!");
        return;
      }

      const formattedDate = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      const updatedTransaction = {
        id: edit,
        date: formattedDate,
        description,
        category,
        type,
        amount: Number(amount)
      }

      setTransactions(
        transactions.map((t) => {
          if (t.id === edit) {
            return updatedTransaction;
          }
          return t;
        })
      )

      resetForm();
      setIsModalOpen(false);
    }

    function resetForm() {
      setEdit(null);
      setDescription("");
      setCategory("")
      setType("income");
      setAmount("");
      setDate("");
    }

    function handleCloseModal() {
      resetForm();
      setIsModalOpen(false);
    }

    return (
      <div className="py-6">
        <span className="text-lg font-bold">Transactions</span>
          <TransactionsFilters
            search={search}
            filterType={filterType}
            sortType={sortType}
            onSearchChange={setSearch}
            onFilterTypeChange={setFilterType}
            onSortTypeChange={setSortType}
            onAddTransaction={() => setIsModalOpen(true)}
          />
        <Separator/>

        {/* Table */}
        <TransactionsTable
          transactions={sortedTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}>
        </TransactionsTable>
        
        <TransactionsModal
          isOpen={isModalOpen}
          edit={edit}
          description={description}
          category={category}
          type={type}
          amount={amount}
          date={date}
          onClose={handleCloseModal}
          onDescriptionChange={setDescription}
          onCategoryChange={setCategory}
          onTypeChange={setType}
          onAmountChange={setAmount}
          onDateChange={setDate}
          onSubmit={edit ? handleUpdateTransaction : handleAddTransaction}
        />
      </div>
    );
}