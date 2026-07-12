# Alur Booking sampai Pelaksanaan — Pilot

Status: **model pengembangan yang dapat direvisi setelah review partner**.

Alur ini menjaga development tetap berjalan tanpa mengklaim proses partner yang belum disepakati. Contact flow teknis tetap mengikuti `docs/contact-and-enquiry-flow.md`.

## Alur utama

1. **Discover** — pelanggan melihat paket kandidat, harga indikatif USD, inclusions, exclusions, dan CTA enquiry.
2. **Enquire** — pelanggan memakai `wa.me` dengan template Rusia atau form website. Nomor WhatsApp wajib; email opsional kecuali menjadi channel utama.
3. **Qualify** — Partner Pasar Rusia mengumpulkan tanggal/rentang tanggal, peserta, pickup, paket, kebutuhan khusus, dan channel pilihan.
4. **Prepare quote** — sistem/tim membuat quotation manual dengan harga USD, masa berlaku, inclusions, exclusions, dan komponen opsional.
5. **Check availability** — pada pilot selalu berstatus `confirmation required`. Partner Operasional Bali atau supplier terkait dikonfirmasi sebelum pelanggan diminta menyelesaikan booking nyata.
6. **Customer accepts** — pelanggan menyetujui quotation serta syarat pembatalan/refund yang berlaku.
7. **Payment and confirmation** — metode, penerima dana, status pembayaran, dan settlement belum ditetapkan dalam tiket ini. Tidak ada pembayaran nyata pada platform pilot.
8. **Create booking summary** — catat pelanggan, paket, tanggal, peserta, pickup, kebutuhan khusus, harga, kurs, inclusions/exclusions, payment status, dan verification status.
9. **Operational handoff** — Partner Operasional Bali menerima ringkasan booking yang lengkap dan menyatakan diterima. Trigger waktu final masih menunggu review partner.
10. **Reconfirm** — tim mengonfirmasi driver/guide, kendaraan, pickup, perubahan, dan kontak darurat sebelum hari tur.
11. **Deliver** — Partner Operasional Bali menangani pelaksanaan serta insiden lapangan; pelanggan tetap memakai jalur satu pintu.
12. **Aftercare** — catat completion, keluhan/refund bila ada, rekonsiliasi, serta permintaan review hanya untuk booking nyata.

## Status booking minimum untuk development

`enquiry` → `qualified` → `quoted` → `awaiting confirmation` → `confirmed` → `handed off` → `in progress` → `completed`

Cabang yang harus didukung kemudian: `cancelled by customer`, `cancelled by operator`, dan `refund pending/completed`.

## Asumsi pilot yang tidak menjadi komitmen

- Tidak ada instant booking atau inventory real-time.
- Tidak ada payment rail resmi dalam pilot.
- Availability dan supplier dikonfirmasi manual.
- Kontak darurat, response time, handoff cutoff, dan backup owner masih menunggu partner.
- Pembatalan operator mengikuti prinsip refund penuh; detail penalti pembatalan pelanggan tetap menunggu supplier/partner.

## Gerbang menuju penggunaan nyata

Sebelum menerima booking nyata, sekurang-kurangnya harus ada satu paket `publishable`, quotation terms, penerima pembayaran yang sah, supplier/fulfilment owner, handoff acceptance, kebijakan pembatalan, dan kontak eskalasi hari tur.
