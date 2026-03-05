# Identity Verification Prototype - Dummy Version

Sistem simulasi verifikasi identitas yang menampilkan alur proses tanpa koneksi API asli.

## 📋 Fitur

### Metode Verifikasi (Dummy):
- **Input NIK** - Simulasi verifikasi berdasarkan NIK
- **Input Email** - Simulasi verifikasi berdasarkan Email  
- **Scan QR Code** - Auto-generate QR code, user dapat regenerate

### QR Code Generation:
- ✅ Auto-generate QR code ketika method QR dipilih
- ✅ Unique QR code ID dengan timestamp
- ✅ Button untuk regenerate QR code baru
- ✅ Display QR code visual yang dapat di-scan

### Dummy Logic:
```
NIK: 1234567890123456 → VERIFIED
Email: user@example.com → VERIFIED
QR Code: Always VERIFIED
Lainnya → NOT VERIFIED
```

## 🎯 Alur Proses

### 1️⃣ Halaman Verifikasi (Home)
- User memilih metode verifikasi
- Input data sesuai metode
- Tekan tombol VERIFY

### 2️⃣ Simulasi Processing
- Loading screen dengan spinner animation
- Delay 2 detik (simulasi API call)

### 3️⃣ Halaman Result
- Tampil status VERIFIED atau NOT VERIFIED
- Jika verified: Tampil data lengkap
- Jika not verified: Tampil alasan

### 4️⃣ Face Comparison
- Hanya muncul jika identity verified
- Simulasi scanning face (3 detik)
- Tampil similarity score (85-98%)
- Status MATCH atau NO MATCH

## 🚀 Cara Menjalankan

### 1. Install Dependencies
```bash
cd /Users/HCMPublic/Documents/Damar/jasuindo/projects/identity-verification
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Akses di Browser
```
http://localhost:3000
```

## 📂 Struktur Folder

```
app/
├── layout.tsx           # Root layout
├── globals.css          # Global styles
├── page.tsx             # Halaman Home/Verification
├── result/
│   └── page.tsx         # Halaman Result
└── face-comparison/
    └── page.tsx         # Halaman Face Comparison

package.json             # Dependencies
next.config.js          # Next.js config
tsconfig.json           # TypeScript config
```

## 🔐 Test Credentials (Dummy - All Return Verified)

### NIK Method (All will return VERIFIED):
- `1234567890123456` → John Doe
- `3275123456789012` → Budi Santoso
- `5109876543210123` → Siti Nurhaliza
- `3514567890123456` → Ahmad Wijaya
- `1234567890000001` → Sarah Johnson
- **Any other 16-digit number** → Also VERIFIED

### Email Method (All will return VERIFIED):
- `user@example.com` → Jane Smith
- `john.doe@company.com` → John Corporate
- `admin@verification.io` → Admin User
- `test@email.com` → Test Account
- `demo@system.dev` → Demo System
- **Any valid email format** → Also VERIFIED

### QR Code Method:
- **Any input** → Always VERIFIED

### Face Comparison:
- **Always MATCH** with similarity score 92-98%
- No failure scenarios in this demo

## 🎨 Styling

- Gradient background (Purple to Blue)
- Card-based layout
- Responsive design (mobile & desktop)
- Smooth animations & transitions
- Clean and modern UI

## 📝 Catatan Developer

Ini adalah **PROTOTYPE DUMMY** untuk:
- ✅ Melakukan diskusi UX/Flow
- ✅ Menentukan data yang dibutuhkan dari API
- ✅ Testing UI/UX sebelum integrasi API real
- ✅ Dokumentasi requirement untuk backend

**Belum ada:**
- ❌ Integrasi API real
- ❌ Database connection
- ❌ AI Face Recognition
- ❌ Authentication system
- ❌ Error handling production-ready

## 🔄 Next Steps

1. Diskusi UX flow dengan stakeholder
2. Validasi data yang dibutuhkan
3. Membuat API endpoint untuk verifikasi
4. Integrasi AI/ML untuk face recognition
5. Implementasi database dan authentication

## 📧 Support

Untuk pertanyaan atau feedback, silakan hubungi tim development.
# Jasuindo-Demo
