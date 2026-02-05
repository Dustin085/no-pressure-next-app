# NoPressure

**NoPressure** 是一個輕量、無壓力的血壓紀錄 Web App，目標是讓使用者能 **快速紀錄、清楚查看、安心追蹤** 自己的血壓數據，而不被複雜操作或醫療感焦慮綁架。

> 設計理念：
>
> - **少即是多**：只留下對使用者真正有幫助的功能
> - **即時回饋**：輸入完立刻看到趨勢與狀態
> - **工程上可維護**：清楚的 feature-based 架構，方便擴充

---

## Live Demo

https://no-pressure-next-app.vercel.app

> 部署在 Vercel，使用 Supabase 做 Auth 和 Database

---

## ✨ Features

- 🔐 使用者登入 / 登出（Supabase Auth）
- 📝 快速新增血壓紀錄（收縮壓 / 舒張壓 / 心跳）
- 📊 最近血壓紀錄列表
- 📈 近期平均血壓
- ⚡ TanStack Query 快取與資料同步

---

## 🧱 Tech Stack

### Frontend

- **Next.js**
- **Tailwind CSS**

### State / Data

- **@tanstack/react-query**
- **Supabase (PostgreSQL + Auth)**

### Deployment

- **Vercel**

---

## 📁 Project Structure

```txt
├─ app/                 # Next.js
├─ features/            # 以功能為核心的模組
│  ├─ records/          # 血壓紀錄（CRUD）
│  ├─ insights/         # 統計、平均、狀態判斷
│  └─ auth/             # 登入相關邏輯
├─ lib/                 # 共用工具、共用常數
├─ devtools/            # 開發工具
└─ components/          # 共用元件
```

> 採用 **feature-based architecture**，避免專案成長後難以維護。

---

## 🗄️ Database Schema（Supabase）

### blood_pressure_records

| 欄位        | 型別        | 說明         |
| ----------- | ----------- | ------------ |
| id          | uuid        | Primary key  |
| user_id     | uuid        | 對應使用者   |
| systolic    | int         | 收縮壓       |
| diastolic   | int         | 舒張壓       |
| pulse       | int         | 心跳         |
| measured_at | timestamptz | 實際量測時間 |
| created_at  | timestamptz | 建立時間     |
| status      | text        | 軟刪除狀態   |

---

## 🚀 Getting Started

### 1️⃣ Clone 專案

```bash
git clone https://github.com/Dustin085/no-pressure-next-app.git
cd no-pressure-next-app
```

### 2️⃣ 安裝依賴

```bash
npm install
```

### 3️⃣ 環境變數

這個專案需要 Supabase 專案作為資料庫。
請建立自己的 Supabase 專案並提供 environment variables。


建立 `.env`：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 4️⃣ 啟動開發環境

```bash
npm run dev
```

---

## 🧠 Design Notes

- 血壓紀錄為 **獨立 table**，避免 user table 無限膨脹
- 血壓紀錄使用軟刪除，以 status 判斷此筆紀錄是否已被刪除

---

## 📌 Future Ideas

- 📈 日 / 週 / 月平均趨勢
- ✏️ 標註異常值
- 📚 匯出 CSV / PDF
