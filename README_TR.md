# Money Guard

Money Guard, kişisel finans takibi için geliştirilen React + Vite tabanlı bir ekip projesidir. Uygulamada auth, protected dashboard route'ları, transaction işlemleri, balance, currency ve statistics alanları bulunur.

## Projede Hazır Olan Core Kısımlar

Benim kurduğum temel iskelet:

- API client yapısı.
- Redux Toolkit store yapısı.
- Redux Persist ile token saklama.
- Private/restricted route guard sistemi.
- Global loader sistemi.
- Global hata/toast akışı.
- Backend operations.
- Monobank currency operation ve 1 saat localStorage cache mantığı.
- Vercel refresh/direct URL sorunu için `vercel.json`.
- Her ekip dosyasının üstünde hangi Redux export'unun kullanılacağını gösteren kısa yorumlar.

## Kullanılan Teknolojiler

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
- Modern Normalize benzeri global reset, `src/index.css` içinde kod olarak yazıldı

Yüklü paketleri görmek için [package.json](./package.json) dosyasına bakabilirsiniz.

## Environment Variables

Local çalışma için `.env.template` dosyasından `.env` oluşturun.

```env
VITE_API_BASE_URL=https://wallet.b.goit.study
VITE_MONOBANK_API_URL=https://api.monobank.ua/bank/currency
```

```text
VITE_API_BASE_URL=https://wallet.b.goit.study
VITE_MONOBANK_API_URL=https://api.monobank.ua/bank/currency
```

## Komutlar

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
```

## Vercel Notu

Projede [vercel.json](./vercel.json) dosyası var. Bu dosya React Router kullanan sayfalarda refresh atınca veya direkt `/login`, `/home`, `/statistics` gibi route'a girince 404 almamak için eklendi.

Vercel ayarları:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## API Klasörü

`src/api/client.js`

- Backend için Axios client oluşturur.
- `VITE_API_BASE_URL` değerini kullanır.
- Token'ı request header'a eklemek için `setAuthHeader` fonksiyonunu sağlar.
- Backend hata mesajlarını ortak formatta almak için `getApiErrorMessage` fonksiyonunu sağlar.

`src/api/monobank.js`

- Monobank currency API için Axios client oluşturur.
- `VITE_MONOBANK_API_URL` değerini kullanır.

## Redux Klasörü

`src/redux/store.js`

- Tüm reducer'ları birleştirir.
- Redux Toolkit store'u kurar.
- Redux Persist ayarlarını yapar.
- Sadece `auth.token` localStorage'da saklanır.

`src/redux/auth`

- Register, login, logout ve refresh user işlemlerini yönetir.
- Header ve route guard tarafında kullanılacak auth selector'larını sağlar.

`src/redux/transactions`

- Transaction listeleme, ekleme, düzenleme ve silme işlemlerini yönetir.
- Balance için toplam değer selector'ı buradadır.

`src/redux/categories`

- Transaction category listesini backend'den alır.
- Add transaction formunda category select için kullanılır.

`src/redux/statistics`

- Ay/yıl bazlı statistics summary verisini alır.
- Chart ve statistics table bu state'ten beslenir.

`src/redux/currency`

- Monobank currency verisini alır.
- 1 saatlik localStorage cache mantığı burada bulunur.

`src/redux/global`

- Global loading state'i yönetir.
- Async hataları toast olarak göstermek için global error state'i tutar.

## Ekip Dağılımı

### Kişi 1 - Register Akışı

Dosyalar:

```text
src/pages/RegistrationPage/RegistrationPage.jsx
src/components/RegistrationForm/RegistrationForm.jsx
```

Odak:

- `/register` ekranı.
- Registration form UI.
- Name, email, password, confirm password.
- Progress bar.
- React Hook Form + Yup validasyon.
- `/login` linki.
- Redux tarafında `registerUser` kullanılacak.

### Kişi 2 - Login Akışı

Dosyalar:

```text
src/pages/LoginPage/LoginPage.jsx
src/components/LoginForm/LoginForm.jsx
```

Odak:

- `/login` ekranı.
- Login form UI.
- Email/password validasyon.
- `/register` linki.
- Redux tarafında `loginUser` kullanılacak.

### Kişi 3 - Dashboard Ortak Alanları

Dosyalar:

```text
src/pages/DashboardPage/DashboardPage.jsx
src/components/Header/Header.jsx
src/components/Navigation/Navigation.jsx
src/components/Currency/Currency.jsx
src/components/Balance/Balance.jsx
src/pages/CurrencyTab/CurrencyTab.jsx
```

Odak:

- Dashboard layout.
- Header logo, kullanıcı adı, exit butonu, logout modalı.
- Navigation linkleri.
- Balance gösterimi.
- Currency ekranı.
- Redux tarafında `logoutUser`, `selectUsername`, `selectTotalBalance`, `fetchCurrency`, `selectFormattedCurrencyRates` kullanılacak.

### Kişi 4 - Home Transaction Listeleme

Dosyalar:

```text
src/pages/HomeTab/HomeTab.jsx
src/components/TransactionItem/TransactionItem.jsx
src/components/ButtonAddTransactions/ButtonAddTransactions.jsx
```

Odak:

- `/home` transaction listesi.
- Empty state.
- Mobil transaction card görünümü.
- Edit/delete butonları.
- Sağ altta add transaction butonu.
- Redux tarafında `fetchTransactions`, `fetchCategories`, `selectTransactions`, `deleteTransaction` kullanılacak.

### Kişi 5 - Transaction Modal/Form

Dosyalar:

```text
src/components/ModalAddTransaction/ModalAddTransaction.jsx
src/components/AddTransactionForm/AddTransactionForm.jsx
src/components/ModalEditTransaction/ModalEditTransaction.jsx
src/components/EditTransactionForm/EditTransactionForm.jsx
```

Odak:

- Add/edit transaction modal.
- X, Cancel, backdrop ve Escape ile modal kapatma.
- React Hook Form + Yup formları.
- React Datepicker.
- Category select.
- Redux tarafında `addTransaction`, `editTransaction`, `selectCategories`, `selectTransactionById` kullanılacak.

### Kişi 6 - Statistics

Dosyalar:

```text
src/pages/StatisticsTab/StatisticsTab.jsx
src/components/Chart/Chart.jsx
src/components/StatisticsDashboard/StatisticsDashboard.jsx
src/components/StatisticsTable/StatisticsTable.jsx
```

Odak:

- `/statistics` ekranı.
- Chart.
- Ay/yıl seçimi.
- Statistics table.
- Redux tarafında `fetchSummary`, `setStatisticsPeriod`, `selectExpenseCategories`, `selectIncomeTotal`, `selectExpenseTotal` kullanılacak.

## Ortak Çalışma Kuralları

- Herkes sadece kendi sorumlu olduğu dosyalarda çalışmalı.
- Component içinde doğrudan API isteği yazılmamalı.
- API işlemleri için Redux operation kullanılmalı.
- State okumak için Redux selector kullanılmalı.
- Route yapısı izinsiz değiştirilmemeli.
- Başkasının alanına dokunmadan önce haber verilmeli.
- Commit içinde `console.log` bırakılmamalı.
- Component isimleri PascalCase olmalı.
- Değişkenler camelCase olmalı.
- Sabit değerler UPPER_SNAKE_CASE olmalı.
- Yeni paket eklemeden önce [package.json](./package.json) kontrol edilmeli.
- Tasarımdaki görseller gerekiyorsa `src/img` klasöründeki asset'ler kullanılmalı.
- API, store, selector, route veya persist tarafında hata alınırsa hemen team lead'e bilgi verilmeli.

## Branch Kuralları

Herkes kendi branch'inde çalışacak.

Önerilen branch isimleri:

```text
feature/register-flow
feature/login-flow
feature/dashboard-layout
feature/home-transactions
feature/transaction-modals
feature/statistics
```

Çalışmaya başlarken:

```bash
git checkout main
git pull
git checkout -b feature/kendi-alanin
```

Pull request açmadan önce:

```bash
git pull origin main
npm run build
npm run lint
```

PR kuralları:

- PR sadece kendi alanını içermeli.
- Kısa açıklama yazılmalı.
- Hangi route/component değişti belirtilmeli.
- `.env` commitlenmemeli.
- `node_modules`, `dist`, log dosyaları veya geçici dosyalar commitlenmemeli.

## Ek Notlar

- `Loader` global async state'e bağlıdır. Herkes kendi lokal loader'ını yazmadan önce mevcut yapıya bakmalı.
- Auth token persist sistemi hazırdır; auth state doğrudan localStorage'dan okunmamalı.
- Backend endpoint response formatında beklenmeyen bir fark görülürse ilgili Redux operation/slice güncellenmelidir.
- Tasarımda kullanılacak background veya görsel asset'ler için `src/img` klasörüne bakılmalıdır.
- Route yapısı ekip kararı olmadan değiştirilmemelidir.
