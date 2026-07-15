# Audit Markup Harga Katalog

Tanggal audit: 16 Juli 2026  
Status: harga website tetap **indicative**; availability, inclusions, dan final quote dikonfirmasi manual.

## Aturan sementara

- Rumus untuk harga dasar yang terverifikasi: `harga website = harga dasar referensi × 1,20`.
- Ini adalah markup 20% atas harga dasar, bukan komisi 20% dari harga jual final.
- Unit harga sumber dipertahankan.
- Hasil desimal dibulatkan secara wajar ke atas. Pada audit ini seluruh hasil terverifikasi berupa nominal USD bulat sehingga tidak diperlukan pembulatan tambahan.
- Harga `on request` tidak diubah.
- Harga tanpa dasar OpenBali atau referensi partner yang dapat diverifikasi tidak ditebak dan tidak dinaikkan otomatis.

## Sumber

- `docs/research/package-catalogue-and-media-benchmark.md`: Kintamani USD 55/mobil sampai empat orang plus USD 5/orang tambahan; Bali Beach USD 50/mobil sampai empat orang plus USD 5/orang tambahan dengan maksimum enam tamu; Nusa Penida USD 80/orang; dan Mount Batur privat USD 70/orang.
- `docs/partner-negotiation-notes.md` dan instruksi audit: Northwest Bali serta East Bali memakai dasar USD 65/mobil dan harga website USD 78/mobil.
- `lib/catalogue.ts`: snapshot harga website sebelum audit.

## Matriks audit

Persentase kenaikan di tabel adalah perubahan dari harga website sebelumnya ke harga website baru. Untuk baris terverifikasi, harga baru tetap setara markup 20% atas harga dasar.

| Paket | Harga dasar | Perhitungan dan pembulatan | Harga website sebelumnya | Harga baru | Persentase kenaikan | Status |
| --- | ---: | --- | ---: | ---: | ---: | --- |
| Kintamani & the heart of Bali | USD 55/mobil; tambahan USD 5/orang di atas 4 tamu | 55 × 1,20 = 66; 5 × 1,20 = 6; tanpa pembulatan | USD 65/mobil; tambahan USD 10/orang | USD 66/mobil; tambahan USD 6/orang | 1,54% (harga mobil); turun 40% (tambahan tamu) | diubah |
| Northwest Bali | USD 65/mobil | 65 × 1,20 = 78; tanpa pembulatan | USD 78/mobil | USD 78/mobil | 0% | sudah sesuai |
| East Bali | USD 65/mobil | 65 × 1,20 = 78; tanpa pembulatan | USD 78/mobil | USD 78/mobil | 0% | sudah sesuai |
| Temples of Bali | belum terverifikasi | tidak dihitung | USD 65/mobil | USD 65/mobil | — | perlu konfirmasi |
| Bali Beach Journey | USD 50/mobil; tambahan USD 5/orang di atas 4 tamu; maksimum 6 tamu | 50 × 1,20 = 60; 5 × 1,20 = 6; tanpa pembulatan | USD 60/mobil; tambahan tamu belum ditampilkan | USD 60/mobil; tambahan USD 6/orang; maksimum 6 tamu | 0% (harga mobil); komponen tambahan baru ditampilkan | diubah |
| Jungle Rafting | belum terverifikasi | tidak dihitung | mulai USD 45/orang | mulai USD 45/orang | — | perlu konfirmasi |
| Private Sea Fishing | belum terverifikasi | tidak dihitung | USD 390/4 tamu | USD 390/4 tamu | — | perlu konfirmasi |
| Turtle Island & Snorkeling | belum terverifikasi | tidak dihitung | USD 38/orang | USD 38/orang | — | perlu konfirmasi |
| Private Surf Lesson | belum terverifikasi | tidak dihitung | USD 70/orang | USD 70/orang | — | perlu konfirmasi |
| Bali Safari | belum terverifikasi | tidak dihitung | mulai USD 75/orang | mulai USD 75/orang | — | perlu konfirmasi |
| Mount Batur Sunrise | USD 70/orang | 70 × 1,20 = 84; tanpa pembulatan | USD 80/orang | USD 84/orang | 5% | diubah |
| Bali Water Sports | belum terverifikasi | tidak dihitung | mulai USD 30 | mulai USD 30 | — | perlu konfirmasi |
| Bali ATV Adventure | belum terverifikasi | tidak dihitung | mulai USD 65/orang | mulai USD 65/orang | — | perlu konfirmasi |
| Nusa Penida | USD 80/orang | 80 × 1,20 = 96; tanpa pembulatan | USD 90/orang | USD 96/orang | 6,67% | diubah |
| Craft & Jewellery Studios | belum terverifikasi | tetap `on request` | on request | on request | — | perlu konfirmasi |
| Romantic Ocean Dinner | belum terverifikasi | tidak dihitung | mulai USD 25/meja | mulai USD 25/meja | — | perlu konfirmasi |
| Cars & Scooters | belum terverifikasi | tetap `on request` | on request | on request | — | perlu konfirmasi |
| Java: Bromo & Ijen | belum terverifikasi | tetap `on request` | on request | on request | — | perlu konfirmasi |
| Java: Yogyakarta | belum terverifikasi | tetap `on request` | on request | on request | — | perlu konfirmasi |

## Tindak lanjut konfirmasi

Untuk paket berstatus `perlu konfirmasi`, minta URL atau snapshot harga OpenBali yang menyebut nominal, unit harga, inclusions, kapasitas atau minimum peserta, dan tanggal pemeriksaan. Setelah dasar tervalidasi, hitung markup satu kali dan catat perubahan di dokumen ini agar markup tidak diterapkan ganda.
