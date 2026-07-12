# Prototype booking journey — verdict

Status: keputusan diserap ke implementasi production.

## Pertanyaan

Struktur journey mana yang paling jelas membawa pelanggan dari inspirasi/katalog menuju enquiry terbantu, sekaligus memberi tim state booking dan handoff yang cukup?

## Varian

- **A — Guided concierge**: perjalanan emosional dan konsultatif; katalog mendukung cerita, lalu form dan booking summary muncul sebagai satu alur panjang.
- **B — Catalogue to brief**: pelanggan membandingkan paket lebih awal; form/brief tetap terlihat di sisi katalog pada desktop.
- **C — Journey transparency**: timeline dan peralihan customer/operator paling eksplisit; katalog menjadi pendukung journey.

Semua varian memakai keputusan visual yang sama: concierge-first sebagai fondasi, katalog terstruktur, dan trust proof. Perbedaannya adalah hierarki serta alur, bukan identitas visual.

## QA 12 Juli 2026

- JavaScript lolos pemeriksaan sintaks Node.
- Varian A, B, dan C dapat diganti melalui URL dan switcher keyboard/tombol.
- Pemilihan paket mengubah enquiry brief.
- Form simulasi menerima WhatsApp/tanggal/consent dan mengubah state `enquiry` menjadi `qualified` tanpa pengiriman eksternal.
- Customer view dan operator view pada varian C ter-render dengan state verifikasi yang eksplisit.
- Render desktop diperiksa secara visual dan tidak menunjukkan masalah blocking.
- Breakpoint mobile tersedia pada 950px dan 620px. QA visual mobile langsung belum selesai karena sesi browser localhost masuk halaman error setelah server QA timeout; periksa pada perangkat/browser lokal sebelum verdict final.

## Keputusan

- Erland menegaskan satu arah final, bukan varian lanjutan: fondasi visual dan concierge journey memakai Variant C dari `prototype/partner-website`.
- Katalog terstruktur dan trust proof tetap dimasukkan sebagai bagian dari halaman yang sama.
- Dua contact flow sama-sama tersedia: form website agar tim menghubungi pelanggan lebih dulu, dan direct `wa.me` agar pelanggan memulai WhatsApp.
- Transparansi state/operator dari varian journey C dipakai sebagai bahasa proses, bukan sebagai dashboard publik pada versi awal.

## Batas historis

- Tidak ada form/email/WhatsApp/payment nyata.
- Media Pexels hanya atmosfer dan tercatat di `MEDIA.md`.
- Copy Rusia tetap memerlukan review penutur fasih.
- Kode prototype tidak dipromosikan langsung; implementasi production ditulis ulang pada Next.js app di root repo.
