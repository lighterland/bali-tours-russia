# Prototype website untuk review partner

Prototype ini menjawab pertanyaan: struktur informasi mana yang paling jelas untuk menjelaskan konsep bisnis kepada partner?

Tiga variasi tersedia pada satu route:

- `?variant=A` - trust-first editorial
- `?variant=B` - catalogue-first comparison
- `?variant=C` - concierge-first journey

Jalankan dari root repo:

```powershell
python -m http.server 4173 --directory prototype/partner-website
```

Buka `http://localhost:4173/?variant=A`.

## Batas prototype

- Seluruh paket, harga, inclusions, availability, review, dan kebijakan adalah contoh untuk diskusi.
- Copy Rusia adalah draf dan wajib direview penutur Rusia fasih sebelum publikasi.
- Tidak ada pembayaran, pengiriman form, penyimpanan data, tracking, atau integrasi WhatsApp/Telegram/VK.
- Tidak menggunakan foto, desain, identitas, atau teks kompetitor.

Setelah partner memilih arah, catat keputusan di `NOTES.md` dan hapus variasi yang kalah sebelum implementasi nyata.
