# Finance Tracker

A personal finance tracking application built with Next.js and Supabase. Track your income and expenses, visualize monthly trends, and manage your transactions.

**Live Demo:** [finance-tracker-ten-tau.vercel.app](https://finance-tracker-ten-tau.vercel.app/)

---

## Tech Stack

- **Next.js** — App Router, Server Components, API Routes
- **React** — Server Components, Client Components, hooks, props
- **TypeScript** — type safety
- **Tailwind CSS** — styling
- **Supabase** — PostgreSQL database
- **Recharts** — monthly chart
- **Lucide React** — icons

---

## Features

### Dashboard
- **Stats Cards** — Total Income, Total Expenses, and Current Balance filtered by the current month
- **Monthly Chart** — bar chart showing income vs expenses per month
- **Recent Transactions** — last 5 transactions

### Transactions
- **Search** — filter transactions by description
- **Filter by Category** — Income, Food, Entertainment, Bills, Fitness, Others
- **Filter by Type** — Income, Expense
- **Sort** — by date (newest/oldest) or amount (high/low)
- **Add Transaction** — modal with form validation
- **Edit Transaction** — modal pre-filled with existing data
- **Delete Transaction** — confirmation modal
- **Pagination** — 10 transactions per page

---

## Getting Started

### Prerequisites
- Node.js
- A [Supabase](https://supabase.com) account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sebid02/finance-tracker.git
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root:
```env
PROJECT_URL=your_supabase_url
API_KEY=your_service_role_key
```

4. Create a `transactions` table in Supabase:
```sql
CREATE TABLE public.transactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  type text NOT NULL,
  amount bigint NOT NULL,
  CONSTRAINT transactions_pkey PRIMARY KEY (id)
);
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions?limit=5` | Get last 5 transactions |
| POST | `/api/transactions` | Add a new transaction |
| PUT | `/api/transactions` | Update a transaction |
| DELETE | `/api/transactions` | Delete a transaction |

---

## Planned Features

- Authentication — each user sees only their own transactions
- Export transactions to CSV
- Light / Dark mode toggle