# Katalog Pengembangan Pilot

Status: **internal draft untuk development dan review partner; bukan penawaran aktif**.

Dokumen ini memberi data konkret agar platform dapat dibangun tanpa menunggu konfirmasi operasional. Semua nominal, stop, durasi, kapasitas, availability, dan struktur supplier di bawah adalah **placeholder** sampai Partner Operasional Bali mengonfirmasinya. OpenBali dan Bali.Discount hanya menjadi benchmark field dan model harga; tidak ada copy, identitas, desain, atau aset mereka yang boleh digunakan.

## Status data

- `pilot`: boleh dipakai dalam development/demo dengan penanda internal.
- `confirmed`: partner telah mengonfirmasi isi dan sumbernya.
- `publishable`: telah lolos konfirmasi operasional, hak media, dan review customer-facing.

Tidak ada paket di dokumen ini yang sudah berstatus `confirmed` atau `publishable`.

## Asumsi umum pilot

- Semua tur bersifat private untuk pasangan atau kelompok kecil.
- Harga katalog dan quotation pelanggan memakai USD.
- Availability ditampilkan sebagai **confirmation required**, bukan kalender real-time.
- Area pickup dasar diasumsikan area wisata utama Bali Selatan; surcharge area lain tetap placeholder.
- Bahasa komunikasi pelanggan: Rusia. Bahasa guide/driver belum diklaim sebelum dikonfirmasi.
- Essential dan Practical memakai standar keselamatan serta dukungan yang sama; perbedaannya hanya pada komponen yang termasuk.

## Paket kandidat

| ID | Paket kandidat | Tier | Harga katalog USD | Unit | Stop/tema kandidat | Durasi | Status |
| --- | --- | --- | ---: | --- | --- | --- | --- |
| UBD-E | Ubud & Central Bali | Essential | mulai USD 60 | per kendaraan, maks. 4 | air terjun, pusat Ubud, sawah terasering, viewpoint | 9–10 jam | pilot |
| UBD-P | Ubud & Central Bali | Practical | mulai USD 85 | per orang, min. 2 | rute Central Bali dengan tiket utama dan koordinasi tambahan | 9–10 jam | pilot |
| EST-E | East Bali | Essential | mulai USD 70 | per kendaraan, maks. 4 | pura/viewpoint, desa atau taman air, pantai timur | 10–12 jam | pilot |
| EST-P | East Bali | Practical | mulai USD 95 | per orang, min. 2 | rute East Bali dengan tiket utama dan pengaturan lebih lengkap | 10–12 jam | pilot |
| NTH-E | North Bali | Essential | mulai USD 75 | per kendaraan, maks. 4 | danau/pegunungan, air terjun, viewpoint utara | 11–12 jam | pilot |
| NTH-P | North Bali | Practical | mulai USD 105 | per orang, min. 2 | rute North Bali dengan tiket utama dan koordinasi aktivitas | 11–12 jam | pilot |
| STH-E | South Bali & Uluwatu | Essential | mulai USD 55 | per kendaraan, maks. 4 | pantai selatan, viewpoint, Uluwatu/sunset | 8–10 jam | pilot |
| STH-P | South Bali & Uluwatu | Practical | mulai USD 80 | per orang, min. 2 | rute selatan dengan tiket utama dan pengalaman sunset | 8–10 jam | pilot |
| PEN-E | Nusa Penida Highlights | Essential | mulai USD 80 | per orang, min. 2 | pilihan sisi barat atau timur; transfer lokal | 11–12 jam | pilot |
| PEN-P | Nusa Penida Complete | Practical | mulai USD 115 | per orang, min. 2 | ferry, transfer lokal, tiket utama, dan koordinasi lebih lengkap | 11–12 jam | pilot |
| CST | Custom Private Tour | Custom | berdasarkan permintaan | per itinerary | tempo, stop, dan kebutuhan disusun melalui konsultasi | fleksibel | pilot |

Angka di atas sengaja dibulatkan untuk menguji presentasi harga. Angka tersebut bukan hasil negosiasi supplier dan tidak boleh dipakai untuk menerima pembayaran.

## Perbedaan tier pilot

### Essential

Placeholder inclusions:

- kendaraan ber-AC dan driver;
- pickup/drop-off dalam area dasar;
- penyusunan rute dan koordinasi administratif;
- dukungan satu pintu selama proses booking.

Placeholder exclusions:

- tiket destinasi dan aktivitas;
- makan/minum;
- pengeluaran pribadi;
- guide khusus berbahasa Rusia;
- surcharge pickup, overtime, dan perubahan besar.

### Practical

Placeholder inclusions:

- seluruh komponen Essential;
- tiket utama yang disebut pada quotation;
- reservasi/koordinasi aktivitas yang termasuk;
- itinerary dan estimasi biaya tambahan yang lebih lengkap.

Placeholder exclusions:

- pengeluaran pribadi;
- aktivitas opsional di luar quotation;
- perubahan mendadak dan overtime;
- komponen yang secara eksplisit dinyatakan tidak termasuk.

## Opsi model harga yang harus didukung platform

1. **Per kendaraan** — cocok untuk tur darat Essential hingga kapasitas tertentu.
2. **Per orang** — cocok untuk paket yang mengandung ferry, tiket, aktivitas, atau guide per peserta.
3. **Minimum peserta** — contoh pilot: harga per orang berlaku untuk minimal dua peserta.
4. **Tambahan peserta** — surcharge setelah kapasitas dasar, bila kendaraan memungkinkan.
5. **Mulai dari** — harga pembuka; quotation final bergantung pada tanggal, peserta, pickup, dan kebutuhan.
6. **Berdasarkan permintaan** — untuk Custom Private Tour.

## Model harga sementara untuk katalog website

- Untuk paket yang mempunyai harga dasar OpenBali atau referensi partner yang dapat diverifikasi, harga katalog USD dihitung sebagai `harga dasar × 1,20`.
- Model ini adalah **markup 20% atas harga dasar referensi**, bukan komisi 20% dari harga jual final.
- Hasil desimal dibulatkan secara wajar ke atas ke nominal USD yang mudah ditampilkan dan pembulatannya harus dicatat.
- Unit asli tetap dipertahankan: per mobil, per orang, per grup, atau `mulai dari`.
- Paket `on request` tetap `on request`. Paket tanpa harga dasar terverifikasi tidak dinaikkan otomatis dan harus masuk daftar konfirmasi.
- Pengecualian model sementara berdasarkan arahan pemilik: biaya tamu tambahan Kintamani dipertahankan USD 10/orang; markup 20% tetap berlaku untuk harga utama paketnya.
- Katalog memakai USD sebagai harga acuan untuk pasar Rusia maupun internasional.
- Booking fee 20% dapat dikutip dalam RUB menggunakan quote yang berlaku 24 jam dan dibulatkan ke atas ke kelipatan RUB 100 berikutnya. Nominal RUB tidak menjadi price list permanen di kartu paket.
- Saldo tetap dicatat sebagai 80% harga acuan USD; availability, inclusions, mata uang pembayaran aktual, dan nilai quote dikonfirmasi manual sebelum booking.
- Audit penerapan per 16 Juli 2026 tercatat di [`pricing-markup-audit.md`](pricing-markup-audit.md).

## Opsi availability pilot

- Default semua paket: `confirmation required`.
- Lead-time UI yang dapat diuji: same/next-day request, 2–3 hari, atau 7+ hari; semuanya tetap memerlukan konfirmasi manusia.
- Jika partner kelak menyediakan jadwal supplier, status dapat berkembang menjadi `limited dates` atau `available dates`; jangan membuat klaim real-time sebelum ada sumber inventory.

## Struktur supplier pilot

Platform tidak membutuhkan nama supplier untuk development. Simpan peran berikut sebagai slot yang dapat diisi kemudian:

- `primary_fulfilment_owner`: Partner Operasional Bali.
- `transport_supplier`: primary/backup, belum ditentukan.
- `guide_or_driver`: nama, bahasa, dan kontak hanya pada ringkasan internal setelah dikonfirmasi.
- `ticket_or_activity_supplier`: per komponen Practical, belum ditentukan.
- `emergency_owner`: kontak hari tur, belum ditentukan.

## Aturan tampilan

- Preview internal/partner boleh menampilkan angka dengan badge `Draft / Indicative`.
- Build publik tidak boleh menampilkan paket pilot sebagai tersedia atau menerima pembayaran.
- Tombol tetap mengarah ke enquiry terbantu; tidak ada instant booking.
- Media stock/generatif diberi provenance internal sebagai `Media atmosfer` dan tidak diasosiasikan dengan supplier tertentu.

## Sumber struktur

Lihat [benchmark katalog dan media](research/package-catalogue-and-media-benchmark.md). Snapshot benchmark tidak menetapkan harga kita.
