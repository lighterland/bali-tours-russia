# Catatan pajak pada kalkulator harga

## Keputusan tampilan

- Harga di trip planner adalah total akhir setelah diskon.
- Baris pajak ditampilkan sebagai komponen yang **sudah termasuk** di dalam total, bukan biaya tambahan saat pembayaran.
- Label publik memakai frasa "applicable Indonesian taxes" / "применимые налоги Индонезии" karena kewajiban memungut bergantung pada status PKP dan klasifikasi transaksi penjual.

## Dasar perhitungan sementara

Untuk penyerahan jasa biro/agen perjalanan wisata tertentu oleh Pengusaha Kena Pajak, PMK 11 Tahun 2025 merangkum rumus:

`[10% × (11/12)] × 12% × harga jual = 1,1% × harga jual`

Karena total pada website bersifat tax-inclusive, komponen PPN yang ditampilkan dihitung sebagai `total × 1,1% / 101,1%`.

Sumber resmi:

- DJP, ringkasan skema DPP Nilai Lain dan Besaran Tertentu PPN: https://stats.pajak.go.id/sites/default/files/2025-02/SP-4%20PEMERINTAH%20TERBITKAN%20ATURAN%20DPP%20NILAI%20LAIN%20DAN%20BESARAN%20TERTENTU%20PPN.pdf
- JDIH Kementerian Keuangan, PMK 71/PMK.03/2022: https://jdih.kemenkeu.go.id/dok/71-pmk-03-2022/view

## Sebelum transaksi publik

Konfirmasi bersama konsultan pajak Indonesia apakah entitas penjual sudah/harus menjadi PKP, apakah model Bali Closer termasuk penjualan paket wisata atau jasa perantara berbasis komisi, siapa yang menerbitkan faktur, dan apakah komponen tertentu memiliki perlakuan pajak berbeda. Jika klasifikasinya berubah, konstanta di `lib/trip-pricing.ts` harus diperbarui sebelum menerima pembayaran.
