# Catatan Negosiasi dengan Partner Operasional Bali

Status: draf untuk dipertegas; belum merupakan kesepakatan.

## Posisi yang diusulkan

- Erland menerima bagian bersih sebesar 20-25% dari harga final yang dibayar pelanggan.
- Kata "bersih" berarti biaya domain, iklan atau akuisisi, payment processing, konversi mata uang, dan biaya channel tidak mengurangi bagian tersebut, kecuali kedua pihak kemudian menyetujui struktur lain secara tertulis.
- Harga net operasional Bali harus sudah mencakup biaya supplier dan margin Partner Operasional Bali sesuai inclusions paket.
- Kontribusi Erland untuk kebutuhan operasional bukan potongan otomatis. Setiap kontribusi harus mempunyai tujuan, nominal atau batas, periode, dan bukti penggunaan yang jelas.
- Harga pelanggan, harga net partner, inclusions, exclusions, refund, dan pembagian pendapatan harus tercatat per booking agar dapat direkonsiliasi.

## Model harga katalog sementara

- Untuk katalog website tahap sekarang, model operasional yang dipakai adalah **markup 20% atas harga dasar OpenBali atau referensi partner yang dapat diverifikasi**.
- Rumus kerja: `harga katalog USD = harga dasar referensi × 1,20`, dengan pembulatan wajar ke atas bila hasilnya desimal.
- Model markup ini tidak sama dengan komisi 20% dari harga jual final. Struktur komisi atau pembagian pendapatan final tetap merupakan hal terpisah yang harus disepakati.
- Harga tanpa dasar terverifikasi tidak boleh dinaikkan otomatis. Price list RUB dan USD bersifat tetap; availability, inclusions, dan kanal pembayaran dikonfirmasi manual.
- Rincian dasar, perhitungan, pembulatan, dan paket yang perlu konfirmasi tercatat di [`pricing-markup-audit.md`](pricing-markup-audit.md).

## Hal yang harus dipertegas

- Apakah 20% atau 25%, dan kondisi yang membedakannya.
- Basis perhitungan: harga pelanggan sebelum atau sesudah diskon, pajak, refund, dan biaya pihak ketiga.
- Siapa yang membayar domain, iklan, payment processing, konversi RUB-IDR, serta kerugian akibat perubahan kurs.
- Kapan bagian Erland dianggap earned dan kapan dibayarkan.
- Siapa menanggung refund, chargeback, pembatalan supplier, no-show, dan force majeure.
- Siapa memegang dana pelanggan sebelum tur terlaksana dan bagaimana laporan settlement dibuat.

## Klarifikasi baru dari percakapan 17 Juli 2026

- Partner menyampaikan melalui teks bahwa harga saat ini sudah oke, tetapi price sheet final per produk tetap perlu dibuat dan diberi tanggal versi.
- Partner membuka diskon manual maksimal 15% untuk permintaan pelanggan, khususnya lebih dari dua orang atau grup. Ini belum menjadi promo publik dan harus dikonfirmasi per booking.
- Perlu dipastikan apakah booking fee 20% yang diterima Erland adalah bagian/komisi yang langsung earned atau DP pelanggan yang tetap tunduk pada rekonsiliasi dan refund.
- Jika bagian Erland adalah 20%, basis yang disarankan ialah harga pelanggan setelah diskon. Setiap penyimpangan perlu disetujui tertulis agar diskon tidak dibebankan sepihak kepada salah satu partner.
- Sisa pembayaran saat pelanggan tiba perlu dikunci sebagai nominal USD pada booking, meskipun pembayaran aktual kepada partner dilakukan dalam USD atau IDR. Kurs dan fee aktual dicatat terpisah.
- Detail alignment dan pertanyaan konfirmasi ada di `docs/session-alignment-2026-07-17.md`.
- Arahan pemilik 17 Juli 2026: 20% merupakan bagian Erland, sedangkan harga net Partner Operasional Bali adalah 80% dari harga pelanggan yang benar-benar dibayar. Karena itu diskon tambahan tidak dapat mempertahankan kedua nominal tersebut kecuali harga jual reguler memang dinaikkan secara nyata terlebih dahulu.
- Harga coret atau diskon fiktif tidak digunakan. Promo harus memiliki harga reguler, periode, syarat, dan bukti penerapan yang jujur.

## Hipotesis pembayaran RUB-IDR

Pembayaran pelanggan dalam rubel dan settlement operasional dalam rupiah mungkin menciptakan selisih 5-10% dibanding kurs exchange yang dilihat pelanggan. Angka tersebut belum tervalidasi dan tidak boleh dimasukkan sebagai keuntungan tetap. Sebelum digunakan, perlu diverifikasi:

- jalur pembayaran yang legal dan tersedia bagi pelanggan Rusia;
- kurs referensi dan cara pengungkapan kurs kepada pelanggan;
- payment fee, spread aktual, volatilitas, serta waktu settlement;
- perlakuan refund dan chargeback ketika kurs berubah;
- kewajiban pajak, pencatatan, KYC/AML, dan pihak yang secara hukum melakukan penukaran atau menerima dana.

## Prinsip rekomendasi

Nilai utama bisnis sebaiknya berasal dari margin jasa yang transparan, bukan spekulasi kurs. Selisih kurs, jika legal dan benar-benar terjadi, diperlakukan sebagai buffer risiko sampai data transaksi nyata menunjukkan margin bersih yang stabil.

## Batas sementara penerimaan dana

- Penerimaan RUB ke rekening pribadi Erland lalu konversi dan penerusan IDR tidak dijadikan alur bisnis resmi sebelum ditinjau dari sisi izin, KYC/AML, pajak, perlindungan konsumen, dan aturan transfer dana.
- Preferensi awal adalah penyedia pembayaran berizin atau badan usaha yang menerima pembayaran, mencatat booking, dan melakukan settlement dalam IDR.
- Dukungan RUB, USD, atau IDR dipisahkan antara mata uang tampilan, mata uang invoice/kontrak, mata uang yang dibayar pelanggan, dan mata uang settlement partner.
- Posisi saat ini: USD menjadi acuan internal dan katalog menampilkan price list tetap dalam RUB serta USD. Kanal pembayaran, mata uang invoice/kontrak, dan settlement masih harus dipertegas bersama partner serta penyedia pembayaran.
- Konversi katalog menggunakan kurs harga paket yang ditetapkan bisnis dan dipisahkan dari kurs aktual pertukaran RUB-IDR. Partner perlu menyepakati siapa yang menetapkan kurs, kapan ditinjau, dan siapa menanggung selisih ketika pasar bergerak.
- Detail opsi dan sumber awal tercatat di `docs/payment-options-preliminary.md`.
- Erland mempunyai pengalaman konversi RUB-IDR dalam konteks komunitas mahasiswa atau diaspora Rusia. Partner perlu memahami bahwa kapabilitas ini belum otomatis menjadi kewajiban Erland untuk bertindak sebagai payment processor atau penanggung risiko dana pelanggan.
- Tujuan yang dibayangkan untuk konversi RUB-IDR adalah layanan tambahan agar pelanggan memiliki rupiah untuk belanja selama di Bali, bukan metode utama membayar paket tur. Kelayakan legal dan operasionalnya tetap harus diperiksa terpisah.

## Prinsip pembatalan dan refund

- Pembatalan oleh Partner Operasional Bali atau supplier pada prinsipnya menghasilkan refund penuh kepada pelanggan, dengan biaya ditanggung pihak operasional yang menyebabkan kegagalan.
- Pembatalan pelanggan dapat dikurangi biaya pihak ketiga yang benar-benar tidak dapat dikembalikan dan penalti waktu yang telah diinformasikan sebelum pembayaran.
- Refund dikembalikan berdasarkan jumlah dan mata uang yang benar-benar diterima, bukan dihitung ulang menggunakan kurs terbaru.
- Batas 72 jam dan 24 jam adalah proposal awal, belum kebijakan final. Batas, persentase refund, no-show, cuaca, force majeure, serta tiket non-refundable harus dibahas dengan supplier dan partner.

## Customer service dan eskalasi

- Pelanggan berkomunikasi melalui satu nomor WhatsApp bisnis.
- Erland menangani enquiry, konsultasi paket, quotation, pembayaran, perubahan booking, serta keluhan administratif pada jam layanan normal.
- Partner Operasional Bali menangani penjemputan, keterlambatan, kendaraan, pemandu, destinasi, kebutuhan khusus, dan insiden lapangan.
- Partner perlu menyediakan penanggung jawab serta kontak darurat pada hari tur. Ini bukan janji layanan customer service umum 24/7.
- Jam layanan normal, target waktu respons, bahasa dukungan, prosedur eskalasi, dan pengganti ketika Erland atau partner tidak tersedia masih harus ditetapkan.

## Penyesuaian harga kendaraan rute timur dan barat

- Pada 15 Juli 2026, Partner Operasional Bali meminta ongkos mobil untuk rute Bali Timur dan Bali Barat dinaikkan 20%.
- Untuk katalog saat ini, arahan tersebut diterapkan pada `east-bali` dan `northwest-bali`: harga kendaraan berubah dari USD 65 menjadi USD 78 per mobil.
- Kenaikan ini hanya berlaku pada komponen mobil untuk kedua rute tersebut; harga aktivitas, tiket, dan paket lain tidak ikut berubah.
- Nominal price list tetap; ketersediaan dan inclusions dikonfirmasi sebelum booking.

## Arti kebutuhan "di Moscow"

- Kebutuhan ditafsirkan sebagai kehadiran pasar Rusia: promosi kepada pelanggan di Rusia, identitas atau domain yang terasa lokal, customer service yang dijalankan dari Rusia, serta kemampuan menampilkan atau menerima metode pembayaran yang relevan.
- Scope awal tidak mencakup pembentukan badan usaha atau kantor fisik di Moscow.
- Domain `.ru`, dukungan RUB, hosting, channel promosi, dan kebutuhan badan usaha tetap merupakan keputusan terpisah yang harus divalidasi dari sisi efektivitas, legalitas, biaya, dan operasional.
