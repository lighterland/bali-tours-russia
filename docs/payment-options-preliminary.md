# Opsi Pembayaran Awal

Status: riset pendahuluan untuk keputusan business model; bukan nasihat hukum dan belum menyelesaikan tiket legal/payment.

Tanggal pemeriksaan: 11 Juli 2026.

## Fakta awal

- Bank Indonesia mengatur penyedia jasa pembayaran, termasuk acquiring, payment gateway, dompet elektronik, dan layanan remitansi. Jalur lintas batas oleh penyedia pembayaran dilakukan melalui kerja sama yang tunduk pada kebijakan Bank Indonesia.
- Midtrans hanya memproses charge dalam IDR. Merchant boleh menampilkan harga mata uang lain, tetapi jumlah harus dikonversi ke IDR saat checkout dan kurs disarankan ditampilkan untuk mengurangi sengketa.
- Xendit menyatakan transaksi kartu asing dapat diterima, tetapi settlement kartu untuk merchant Indonesia dilakukan dalam IDR.
- Bank Rusia menyatakan Visa dan Mastercard yang diterbitkan bank Rusia tetap berfungsi di Rusia tetapi tidak berfungsi di luar negeri atau toko online asing. Karena itu, kartu internasional biasa bukan jalur yang dapat diasumsikan tersedia bagi target awal.
- Wise tidak menerima pendaftaran pelanggan yang tinggal di Rusia. Ketersediaan transfer ke Indonesia tidak berarti pelanggan Rusia dapat menggunakannya sebagai pengirim.
- Bank Indonesia mensyaratkan izin untuk pihak yang menjalankan usaha penukaran valuta asing dan mengatur penyedia transfer dana. Menerima RUB secara pribadi lalu menjual RUB-IDR dengan spread sebagai pola bisnis berulang perlu pemeriksaan hukum khusus.

## Rekomendasi bertahap

## Konteks kapabilitas Erland

Erland sudah mengenal dan dapat menangani pertukaran RUB-IDR yang lazim digunakan di kalangan mahasiswa atau diaspora Rusia. Ini dapat membantu memahami perilaku pembayaran target market dan menguji kebutuhan nyata. Namun, praktik komunitas tersebut belum dianggap sebagai jalur pembayaran komersial resmi untuk bisnis tur. Penggunaan untuk pelanggan publik perlu dipisahkan dan dinilai berdasarkan legalitas, volume, frekuensi, margin, sumber dana, identifikasi pihak, bukti underlying booking, refund, dan pencatatan.

Klarifikasi business model: kapabilitas tersebut terutama dibayangkan sebagai layanan tambahan agar pelanggan memperoleh IDR untuk pengeluaran pribadi selama berada di Bali, bukan sebagai jalur utama pembayaran paket tur. Pemisahan ini harus terlihat pada kontrak, pencatatan, komunikasi pelanggan, dan pemeriksaan legal.

### Tahap validasi kecil

- Gunakan enquiry terbantu melalui chat sebagai alur utama; checkout otomatis bukan kebutuhan MVP.
- Tampilkan harga katalog utama dalam USD. Konversi harga pelanggan ke RUB atau IDR menggunakan kurs harga paket yang ditetapkan bisnis, misalnya USD 70 dikalikan Rp18.500. Kurs komersial ini harus dibedakan dari kurs spot atau kurs penukaran komunitas dan mempunyai aturan peninjauan.
- Gunakan payment link dari penyedia pembayaran Indonesia berizin untuk metode yang benar-benar dapat digunakan pelanggan. Midtrans atau Xendit layak diuji sebagai checkout IDR, bukan diasumsikan menerima kartu bank Rusia.
- Jika pelanggan sudah berada di Bali, tawarkan metode IDR lokal yang tersedia melalui penyedia berizin, misalnya payment link atau QRIS.
- Untuk pelanggan di Rusia, lakukan eksperimen pembayaran tanpa dana nyata atau nominal minimum yang dapat dikembalikan hanya setelah penyedia pembayaran menyetujui merchant, bisnis, negara pembayar, metode, dan refund flow.
- Jangan menjanjikan RUB checkout sebelum ada mitra pembayaran berizin yang secara tertulis mendukung payer dari Rusia dan settlement ke Indonesia.

### Tahap setelah demand tervalidasi

- Gunakan badan usaha atau merchant of record yang jelas sebagai pihak dalam kontrak pelanggan.
- Tambahkan multi-currency display (RUB, USD, IDR), tetapi simpan satu currency kontraktual dan aturan kurs per booking.
- Pilih penyedia lintas batas berizin yang menangani KYC/AML, screening, konversi, receipt, settlement, refund, dan chargeback.
- Pisahkan pendapatan jasa dari selisih kurs. Spread kurs hanya boleh menjadi bagian model jika legal, transparan, tercatat, dan ditangani pihak berizin.

## Urutan preferensi

1. Penyedia pembayaran berizin, checkout yang dapat diakses pelanggan Rusia, settlement IDR ke badan usaha.
2. Invoice melalui badan usaha/merchant partner dengan transfer lintas batas yang disediakan bank atau penyedia remitansi berizin.
3. Deposit IDR setelah pelanggan tiba di Bali, hanya sebagai fallback operasional dan bukan solusi utama untuk booking dari Rusia.
4. Penerimaan RUB pribadi dan konversi informal: tidak direkomendasikan sebagai alur bisnis.

## Hal yang harus diuji

- Siapa merchant legal dan pemegang dana pelanggan.
- Apakah merchant Indonesia dapat di-onboard untuk jasa tur dan menerima payer Rusia.
- Metode yang benar-benar dimiliki target pelanggan: kartu non-Rusia, transfer bank, Mir, SBP, atau alternatif lain yang legal.
- Currency invoice, nilai kurs harga paket, jadwal atau pemicu peninjauan kurs, masa berlaku quote, buffer volatilitas, dan timestamp quote.
- Deposit versus pembayaran penuh, jadwal settlement partner, refund, chargeback, no-show, serta pembatalan.
- Pajak, perlindungan konsumen, KYC/AML, screening, privasi, dan penyimpanan bukti pembayaran.

## Sumber primer dan dokumentasi penyedia

- Bank Indonesia, Penyedia Jasa Sistem Pembayaran: https://www.bi.go.id/id/publikasi/peraturan/Pages/PBI_230621.aspx
- Bank Indonesia, sistem perizinan pembayaran: https://www.bi.go.id/en/fungsi-utama/sistem-pembayaran/perizinan/default.aspx
- Bank Indonesia, KUPVA dan transfer dana: https://www.bi.go.id/en/fungsi-utama/sistem-pembayaran/ritel/kupva-bb-ptd/default.aspx
- Bank Indonesia, kewajiban penggunaan Rupiah: https://www.bi.go.id/en/publikasi/peraturan/Pages/se_171115.aspx
- Midtrans, transaksi selain IDR: https://docs.midtrans.com/docs/can-i-receive-payments-using-other-currency-than-idr
- Midtrans, Payment Link: https://docs.midtrans.com/docs/payment-link-overview
- Xendit, penerimaan currency asing: https://help.xendit.co/hc/en-us/articles/360035083551-Can-Xendit-help-me-accept-payments-in-USD-or-other-currencies
- Bank of Russia, kartu bank Rusia: https://www.cbr.ru/press/event/?id=12748
- Wise, pendaftaran di Rusia: https://wise.com/help/articles/1BiZug47g2xLksV6BoaO4I/i-cant-sign-up-for-wise-in-russia
