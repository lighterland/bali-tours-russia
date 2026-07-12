# Prototype customer and operator journey

Pertanyaan prototype: **struktur journey mana yang paling jelas membawa pelanggan dari inspirasi dan katalog menuju enquiry terbantu, sekaligus memperlihatkan state booking dan handoff kepada tim?**

Tiga varian tersedia pada satu route:

- `?variant=A` — Guided concierge: storytelling dan konsultasi bertahap.
- `?variant=B` — Catalogue to brief: perbandingan paket lebih dominan.
- `?variant=C` — Journey transparency: status customer/operator terlihat paling jelas.

Semua varian memakai fondasi visual premium yang sama: concierge-first, katalog terstruktur, dan trust/team proof.

Jalankan dari root repo:

```powershell
python -m http.server 4174 --directory prototype/booking-journey
```

Buka `http://localhost:4174/?variant=A`.

## Batas prototype

- Data hanya hidup di memori browser dan hilang saat reload.
- Tidak ada pengiriman form, email, WhatsApp nyata, pembayaran, atau penyimpanan.
- Seluruh harga, itinerary, availability, supplier, dan fulfilment adalah placeholder pilot.
- Copy Rusia wajib direview penutur fasih sebelum publikasi.
- Foto Pexels adalah media atmosfer, bukan bukti operasional. Lihat `MEDIA.md`.
- Kode ini throwaway dan tidak boleh dipromosikan langsung ke production.
