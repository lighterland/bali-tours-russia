# Alur Booking sampai Pelaksanaan — Pilot

Status: **model pengembangan yang dapat direvisi setelah review partner**.

Alur ini menjaga development tetap berjalan tanpa mengklaim proses partner yang belum disepakati. Contact flow teknis tetap mengikuti `docs/contact-and-enquiry-flow.md`.

## Alur utama

1. **Discover** — pelanggan melihat paket kandidat, harga indikatif USD, inclusions, exclusions, dan CTA enquiry.
2. **Enquire** — pelanggan memakai channel pilihan. Field kontak yang relevan wajib diisi dan jumlah tamu selalu wajib.
3. **Qualify** — Partner Pasar Rusia mengumpulkan tanggal/rentang tanggal, peserta, pickup, paket, kebutuhan khusus, dan channel pilihan.
4. **Prepare quote** — sistem/tim membuat quotation manual dengan harga USD, masa berlaku, inclusions, exclusions, dan komponen opsional.
5. **Confirm details** — Partner Pasar Rusia mengonfirmasi plan, total USD, serta instruksi booking fee 20% tanpa meminta atau menjanjikan final itinerary.
6. **Customer accepts** — pelanggan menyetujui quotation serta syarat pembatalan/refund yang berlaku.
7. **Payment and confirmation** — pembayaran berlangsung di luar website dan diverifikasi manual. Booking dinyatakan confirmed setelah booking fee 20% terverifikasi.
8. **Create booking summary** — catat pelanggan, paket, tanggal, peserta, pickup, kebutuhan khusus, harga, kurs, inclusions/exclusions, payment status, dan verification status.
9. **Operational handoff** — maksimal 24 jam setelah fee terverifikasi, Partner Pasar Rusia memberi tahu customer lalu membuat grup WhatsApp bertiga dan mengirim data minimum yang diperlukan kepada Partner Operasional Bali.
10. **Reconfirm** — tim mengonfirmasi driver/guide, kendaraan, pickup, perubahan, dan kontak darurat sebelum hari tur.
11. **Deliver** — Partner Operasional Bali menangani koordinasi pickup, pelaksanaan, serta insiden lapangan; Partner Pasar Rusia tetap pasif di grup sebagai escalation contact sampai perjalanan selesai.
12. **Aftercare** — catat completion, keluhan/refund bila ada, rekonsiliasi, serta permintaan review hanya untuk booking nyata.

## Status booking minimum untuk development

`enquiry` → `qualified` → `quoted` → `awaiting confirmation` → `confirmed` → `handed off` → `in progress` → `completed`

Cabang yang harus didukung kemudian: `cancelled by customer`, `cancelled by operator`, dan `refund pending/completed`.

## Asumsi pilot yang tidak menjadi komitmen

- Tidak ada instant booking atau inventory real-time.
- Tidak ada payment rail resmi di website; pembayaran dan verifikasinya tetap manual.
- Availability dan supplier dikonfirmasi manual.
- Kontak darurat dan backup owner masih menunggu partner; handoff customer dilakukan maksimal 24 jam setelah fee terverifikasi.

## Template pemberitahuan sebelum handoff

Kirim setelah booking fee terverifikasi dan sebelum kontak atau detail perjalanan dibagikan kepada partner.

**English**

> Your booking is confirmed. I’ll now introduce you to our local Bali operations partner in a WhatsApp group so they can coordinate your pickup and trip arrangements. I’ll stay in the group and help if anything needs escalation.

**Russian — wajib direview penutur fasih sebelum publikasi**

> Ваше бронирование подтверждено. Сейчас я создам общий чат и представлю нашего операционного партнёра на Бали, который будет координировать встречу и детали поездки. Я останусь в группе и подключусь, если потребуется помощь.

## Template pembuka grup handoff

> Booking handoff — [customer name]
>
> - Travel dates: [dates]
> - Guests: [count]
> - Hotel or pickup point: [location or “to be confirmed”]
> - Confirmed plan: [plan]
> - Relevant special requests: [requests or “none”]
> - Local operations: [partner name]
> - Escalation contact: Erland
- Pembatalan operator mengikuti prinsip refund penuh; detail penalti pembatalan pelanggan tetap menunggu supplier/partner.

## Gerbang menuju penggunaan nyata

Sebelum menerima booking nyata, sekurang-kurangnya harus ada satu paket `publishable`, quotation terms, penerima pembayaran yang sah, supplier/fulfilment owner, handoff acceptance, kebijakan pembatalan, dan kontak eskalasi hari tur.
