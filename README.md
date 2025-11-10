# Formula-Verse

Formula-Verse adalah aplikasi web yang didedikasikan untuk para penggemar Formula 1. Aplikasi ini menyediakan informasi terkini mengenai klasemen pembalap dan konstruktor, jadwal balapan, serta detail mendalam tentang pembalap dan tim favorit Anda.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=nextauth.js&logoColor=white)](https://next-auth.js.org/)

## 🚀 Fitur Utama

-   **Klasemen F1**: Lihat klasemen terbaru untuk pembalap dan konstruktor.
-   **Jadwal Balapan**: Dapatkan informasi lengkap mengenai jadwal balapan sepanjang musim.
-   **Detail Pembalap & Tim**: Halaman dinamis yang menampilkan informasi rinci tentang setiap pembalap dan tim.
-   **Autentikasi Pengguna**: Sistem login dan registrasi menggunakan NextAuth.js.
-   **Fitur Favorit**: Pengguna dapat menyimpan pembalap dan tim favorit mereka di halaman profil.
-   **Profil Pengguna**: Halaman personal untuk mengelola daftar favorit.

## 🛠️ Teknologi yang Digunakan

-   **Framework**: Next.js (App Router)
-   **Bahasa**: TypeScript
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Styling**: Tailwind CSS
-   **Autentikasi**: NextAuth.js
-   **Linting**: ESLint

## 📂 Struktur Proyek

```
formula-verse/
├── prisma/               # Skema dan migrasi database Prisma
├── public/               # Aset statis (gambar, ikon)
├── src/
│   ├── app/
│   │   ├── api/          # Route handler untuk API backend
│   │   ├── components/   # Komponen React yang dapat digunakan kembali
│   │   ├── (pages)/      # Struktur routing Next.js App Router
│   │   ├── layout.tsx    # Layout utama aplikasi
│   │   └── globals.css   # Style global
│   ├── lib/              # Utilitas dan helper (klien Prisma)
│   └── types/            # Definisi tipe TypeScript kustom
├── .gitignore
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🏁 Cara Menjalankan Proyek

### Prasyarat

-   Node.js (v18 atau lebih tinggi)
-   Package manager (npm, yarn, atau pnpm)
-   Database SQL (misalnya PostgreSQL)

### Langkah-langkah Instalasi

1.  **Clone repository ini:**
    ```bash
    git clone https://github.com/SahrulRamadhanHardiansyah/formula-verse.git
    cd formula-verse
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Setup variabel lingkungan:**
    Buat file `.env` di root proyek dan salin konten dari `.env.example` (jika ada). Isi dengan konfigurasi Anda.
    ```env
    # URL koneksi database untuk Prisma
    DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"

    # Konfigurasi NextAuth.js
    NEXTAUTH_URL="http://localhost:3000"
    NEXTAUTH_SECRET="your-super-secret-key"

    # Tambahkan kredensial provider jika ada (contoh: GitHub, Google)
    # GITHUB_ID=...
    # GITHUB_SECRET=...
    ```

4.  **Jalankan migrasi database:**
    Perintah ini akan membuat tabel di database Anda sesuai dengan skema Prisma.
    ```bash
    npx prisma migrate dev
    ```

5.  **Jalankan server development:**
    ```bash
    npm run dev
    ```

6.  Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔌 Endpoint API

Berikut adalah daftar endpoint API yang tersedia di aplikasi:

| Method | Endpoint                      | Deskripsi                                        |
| :----- | :---------------------------- | :----------------------------------------------- |
| `GET`  | `/api/f1-standings`           | Mendapatkan data klasemen pembalap & konstruktor |
| `GET`  | `/api/races`                  | Mendapatkan jadwal balapan                       |
| `GET`  | `/api/teams`                  | Mendapatkan daftar semua tim F1                  |
| `GET`  | `/api/team-detail`            | Mendapatkan detail tim berdasarkan ID            |
| `GET`  | `/api/driver-detail`          | Mendapatkan detail pembalap berdasarkan ID       |
| `GET`  | `/api/player-stats`           | Mendapatkan statistik pengguna (misal: jumlah favorit) |
| `GET`  | `/api/favorites`              | Mendapatkan daftar ID favorit pengguna           |
| `POST` | `/api/favorites`              | Menambahkan item (pembalap/tim) ke favorit       |
| `DELETE`| `/api/favorites`              | Menghapus item dari favorit                      |
| `GET`  | `/api/favorites-details`      | Mendapatkan detail dari item yang difavoritkan   |
| `*`    | `/api/auth/[...nextauth]`     | Endpoint untuk proses autentikasi NextAuth.js    |
