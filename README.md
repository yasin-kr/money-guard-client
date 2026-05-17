# Money Guard

Money Guard is a React + Vite team project for personal finance tracking. The app includes authentication, protected dashboard routes, transactions, balance, currency rates, and statistics.

Turkish team notes are available in [README_TR.md](./README_TR.md).

## Project Status

The core structure is ready:

- API clients are configured.
- Redux Toolkit store is configured.
- Redux Persist stores the auth token.
- Private and restricted route guards are ready.
- Global loader and toast error flow are wired.
- Vercel SPA routing is configured.
- Page/component skeleton files include short notes about which Redux exports to use.

## Tech Stack

- React
- Vite
- React Router DOM
- Redux Toolkit
- Redux Persist
- Axios
- React Hook Form
- Yup
- React Hot Toast
- React Datepicker
- React Chart.js 2 / Chart.js
- React Loader Spinner
- Modern Normalize style reset in `src/index.css`

Check [package.json](./package.json) for the exact installed dependencies.

## Environment Variables

Create a local `.env` file based on `.env.template`.

```env
VITE_API_BASE_URL=https://wallet.b.goit.study
VITE_MONOBANK_API_URL=https://api.monobank.ua/bank/currency
```

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Vercel Deployment

This project includes [vercel.json](./vercel.json) so React Router pages work after refresh or direct URL access.

Recommended Vercel settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Core Architecture

### API

`src/api/client.js`

- Creates the Axios client for the Money Guard backend.
- Reads `VITE_API_BASE_URL`.
- Exposes `setAuthHeader` for token-based requests.
- Exposes `getApiErrorMessage` for consistent error messages.

`src/api/monobank.js`

- Creates the Axios client for Monobank currency rates.
- Reads `VITE_MONOBANK_API_URL`.

### Redux

`src/redux/store.js`

- Combines all reducers.
- Configures Redux Toolkit.
- Configures Redux Persist.
- Persists only `auth.token`.

`src/redux/auth`

- Handles register, login, logout, and refresh current user.
- Exports auth operations and selectors.

`src/redux/transactions`

- Handles transaction list, add, edit, delete.
- Exports transaction selectors, including total balance.

`src/redux/categories`

- Fetches transaction categories for forms and list display.

`src/redux/statistics`

- Fetches monthly/yearly transaction summary data.
- Stores the selected month and year.

`src/redux/currency`

- Fetches Monobank currency data.
- Uses localStorage cache for one hour.

`src/redux/global`

- Tracks global loading state.
- Stores global async errors for toast display.

## Team Ownership

### Person 1 - Register Flow

Files:

```text
src/pages/RegistrationPage/RegistrationPage.jsx
src/components/RegistrationForm/RegistrationForm.jsx
```

Focus:

- `/register` layout.
- Registration form UI.
- Name, email, password, confirm password.
- Progress bar.
- React Hook Form + Yup validation.
- Link to `/login`.
- Use `registerUser` from `redux/auth/operations`.

### Person 2 - Login Flow

Files:

```text
src/pages/LoginPage/LoginPage.jsx
src/components/LoginForm/LoginForm.jsx
```

Focus:

- `/login` layout.
- Login form UI.
- Email and password validation.
- Link to `/register`.
- Use `loginUser` from `redux/auth/operations`.

### Person 3 - Dashboard Shared Areas

Files:

```text
src/pages/DashboardPage/DashboardPage.jsx
src/components/Header/Header.jsx
src/components/Navigation/Navigation.jsx
src/components/Currency/Currency.jsx
src/components/Balance/Balance.jsx
src/pages/CurrencyTab/CurrencyTab.jsx
```

Focus:

- Dashboard layout.
- Header logo, username, exit button, logout modal.
- Navigation links.
- Balance display.
- Currency UI.
- Use `logoutUser`, `selectUsername`, `selectTotalBalance`, `fetchCurrency`, and `selectFormattedCurrencyRates`.

### Person 4 - Home Transaction List

Files:

```text
src/pages/HomeTab/HomeTab.jsx
src/components/TransactionItem/TransactionItem.jsx
src/components/ButtonAddTransactions/ButtonAddTransactions.jsx
```

Focus:

- `/home` transaction list.
- Empty state.
- Mobile transaction card style.
- Edit/delete button placement.
- Floating add transaction button.
- Use `fetchTransactions`, `fetchCategories`, `selectTransactions`, and `deleteTransaction`.

### Person 5 - Transaction Modals and Forms

Files:

```text
src/components/ModalAddTransaction/ModalAddTransaction.jsx
src/components/AddTransactionForm/AddTransactionForm.jsx
src/components/ModalEditTransaction/ModalEditTransaction.jsx
src/components/EditTransactionForm/EditTransactionForm.jsx
```

Focus:

- Add/edit transaction modals.
- Close on X, Cancel, backdrop, and Escape.
- React Hook Form + Yup forms.
- React Datepicker.
- Category select.
- Use `addTransaction`, `editTransaction`, `selectCategories`, and `selectTransactionById`.

### Person 6 - Statistics

Files:

```text
src/pages/StatisticsTab/StatisticsTab.jsx
src/components/Chart/Chart.jsx
src/components/StatisticsDashboard/StatisticsDashboard.jsx
src/components/StatisticsTable/StatisticsTable.jsx
```

Focus:

- `/statistics` layout.
- Chart.
- Month/year selectors.
- Statistics table.
- Use `fetchSummary`, `setStatisticsPeriod`, `selectExpenseCategories`, `selectIncomeTotal`, and `selectExpenseTotal`.

## Team Rules

- Work only on your own assigned files unless the team lead approves otherwise.
- Do not write API requests inside components.
- Use Redux operations for async requests.
- Use Redux selectors to read state.
- Do not change route structure without team lead approval.
- Do not edit another person's area without asking.
- Do not leave `console.log` in committed code.
- Keep component names in PascalCase.
- Keep variables in camelCase.
- Keep constants in UPPER_SNAKE_CASE.
- Use images from `src/img` when a screen needs the provided design assets.
- Check `package.json` before adding a new library.
- Tell the team lead immediately if you hit an API, store, selector, route, or persist error.

## Branch Rules

Each teammate works on their own branch.

Branch naming:

```text
feature/register-flow
feature/login-flow
feature/dashboard-layout
feature/home-transactions
feature/transaction-modals
feature/statistics
```

Before starting:

```bash
git checkout main
git pull
git checkout -b feature/your-area
```

Before opening a pull request:

```bash
git pull origin main
npm run build
npm run lint
```

Pull request rules:

- Keep PRs focused on your assigned area.
- Add a short description of what changed.
- Mention which route/component was touched.
- Do not commit `.env`.
- Do not commit `node_modules`, `dist`, logs, or temporary files.
