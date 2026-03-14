"use client";

import { useState } from "react";
import { initialTransactions } from "@/app/lib/data";
import { Transaction } from "@/app/types/transaction";
import Separator from "@/app/components/ui/separator";
import TransactionsTable from "@/app/components/ui/transactions/transactions-table";
import TransactionsFilters from "@/app/components/ui/transactions/transactions-filters";
import TransactionsModal from "@/app/components/ui/transactions/transactions-modal";
import TransactionsPagination from "@/app/components/ui/transactions/transactions-pagination";

export default function Transactions() {
    const [transactions, setTransactions] = useState(initialTransactions);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("all");
    const [filterType, setFilterType] = useState("all");
    const [sortType, setSortType] = useState("date_desc");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [edit, setEdit] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState<"income" | "food" | "entertainment" | "bills" | "fitness" | "others">("income");
    const [type, setType] = useState<"income" | "expense">("income");
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState("");
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const filteredTransactions = transactions.filter((t) => {
      const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = filterCategory === "all" || t.category === filterCategory;
      const matchesType = filterType === "all" || t.type === filterType;

      return matchesSearch && matchesCategory && matchesType;
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

    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginatedTransactions = sortedTransactions.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );
    
    function handleSearchChange(value: string) {
      setSearch(value);
      setPage(1);
    }

    function handleCategoryChange(value: string) {
      setFilterCategory(value);
      setPage(1);
    }

    function handleTypeChange(value: string) {
      setFilterType(value);
      setPage(1);
    }

    function handleAddTransaction() {
      if (!description.trim()) {
        alert("Description is required!");
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
      setCategory("income");
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
            filterCategory={filterCategory}
            filterType={filterType}
            sortType={sortType}
            onSearchChange={handleSearchChange}
            onFilterCategoryChange={handleCategoryChange}
            onFilterTypeChange={handleTypeChange}
            onSortTypeChange={setSortType}
            onAddTransaction={() => setIsModalOpen(true)}
          />
        <Separator/>

        {/* Table */}
        <TransactionsTable
          transactions={paginatedTransactions}
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

        {totalPages > 0 && (
          <TransactionsPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    );
}