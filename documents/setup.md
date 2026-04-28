# Setup Guide

Huong dan thiet lap project booking hotel backend.

## 1. Cai dependency

```bash
npm install
```

## 2. Tao bien moi truong

Tao file `.env` o thu muc goc va cau hinh cac gia tri can dung:

```env
PORT=5000
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_URL=your_database_url
```

Neu ban chi chay local voi PostgreSQL, chi can `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`.

## 3. Chay project

```bash
npm run dev
```

## 4. Tuy chinh base

- Them route cho nghiep vu booking hotel.
- Tao model nhu `User`, `Hotel`, `Room`, `Booking`.
- Gan controller, validator va middleware theo nhu cau.
