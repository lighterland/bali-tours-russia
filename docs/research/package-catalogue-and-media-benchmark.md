# Benchmark katalog paket dan penggunaan media

Tanggal pemeriksaan: 12 Juli 2026  
Status: riset first-party untuk struktur produk; **bukan** daftar harga aktif, bukti availability, atau izin menggunakan aset kompetitor.

## Batas penggunaan benchmark

OpenBali dan Bali.Discount hanya dipakai untuk mengenali pola informasi yang berguna bagi katalog kita. Nama merek, desain, susunan visual, copy, foto, video, logo, dan aset mereka tidak boleh disalin. Setiap rute dan harga yang disebut di bawah adalah klaim publik pemilik situs pada saat pemeriksaan, bukan bukti bahwa paket masih tersedia atau dapat dipenuhi oleh partner kita.

## Fakta benchmark: OpenBali

### Struktur katalog dan keluarga rute

Halaman utama OpenBali mengelompokkan penawaran sebagai kartu-kartu rute/aktivitas. Contoh yang terlihat mencakup Kintamani, Bali barat laut, Bali timur, tur pura, tur pantai, rafting, memancing, snorkeling, surfing, safari, pendakian Batur, olahraga air, ATV, Nusa Penida, makan malam romantis, penyewaan kendaraan, serta perjalanan ke Jawa. Ini mendukung pola katalog yang memisahkan **tur kawasan**, **aktivitas**, dan **layanan tambahan**, tanpa perlu meniru urutan atau penamaannya. Sumber: [halaman utama OpenBali](https://openbali.com.ua/).

OpenBali juga mengklaim perjalanan privat untuk keluarga atau rombongan, pengemudi-pemandu lokal berbahasa Rusia dan Inggris, kendaraan ber-AC, serta kendaraan/minibus untuk kelompok 10–30 orang atau lebih. Klaim ini menunjukkan bahwa atribut seperti tipe perjalanan, bahasa pemandu, jenis kendaraan, dan kapasitas layak tampil sebagai field produk; klaim tersebut tidak membuktikan kapabilitas partner kita. Sumber: [halaman utama OpenBali](https://openbali.com.ua/).

### Unit harga dan inclusions

Beberapa pola unit harga terlihat pada halaman paket first-party:

| Contoh benchmark | Unit harga yang diklaim | Cakupan yang diklaim | Catatan struktur |
|---|---:|---|---|
| Kintamani | USD 55 per mobil untuk sampai 4 orang; tambah USD 5 per orang di atas 4 | Transfer mobil dan pengemudi-pemandu; tiket masuk dibayar pelanggan di lokasi | Model **per kendaraan / essential** dengan biaya kunjungan terpisah |
| Tur pantai | USD 50 per mobil untuk sampai 4 orang; tambah USD 5 per orang, maksimum 6 | Transfer mobil dan pengemudi-pemandu; tiket masuk tidak termasuk | Kapasitas dan surcharge dibuat eksplisit |
| Nusa Penida | USD 80 per orang; halaman juga menampilkan varian IDR 1,1–1,4 juta | Diklaim all-inclusive, pemandu berbahasa Inggris, pilihan lima program | Model **per orang / practical** dengan beberapa varian itinerary |
| Pendakian Batur privat | USD 70 per orang; minimum 2 orang | Diklaim all-inclusive, transfer, pendakian berpemandu, sekitar 02.00–08.00 | Minimum peserta dan rentang waktu dibuat eksplisit |

Sumber: [Kintamani](https://openbali.com.ua/tour/kintamani-tour/), [tur pantai](https://openbali.com.ua/tour/beaches-tour/), [Nusa Penida](https://openbali.com.ua/tour/nusa-penida/), dan [pendakian Batur privat](https://openbali.com.ua/tour/batur-individual/).

Angka di atas hanya snapshot benchmark. Tidak ada bukti dari halaman tersebut mengenai tanggal efektif harga, inventory real-time, atau ketersediaan supplier. Karena itu, angka tersebut tidak boleh diterbitkan sebagai harga kita tanpa penetapan internal dan review operasional.

### Pola field paket yang dapat dipelajari

Halaman paket OpenBali secara konsisten memunculkan kombinasi: tujuan/stop, perkiraan jam mulai-selesai, unit harga, kapasitas atau minimum peserta, bahasa pemandu, inclusions, exclusions, dan batasan tertentu. Contohnya, Kintamani menyebut kira-kira 09.00–19.00 dan tiket dibayar terpisah, sedangkan Nusa Penida menyebut kira-kira 06.00–18.00 dan menawarkan beberapa program. Sumber: [Kintamani](https://openbali.com.ua/tour/kintamani-tour/) dan [Nusa Penida](https://openbali.com.ua/tour/nusa-penida/).

## Fakta benchmark: Bali.Discount

Halaman publik Bali.Discount yang dapat diakses mengelompokkan penawaran ke tur keliling, petualangan gunung berapi, diving/snorkeling/olahraga air, tur pulau, dan rafting. Mereka juga menonjolkan pemandu berbahasa Rusia, harga yang diklaim transparan, respons cepat, itinerary/logistik yang sudah disiapkan, dan pendampingan sejak pesan pertama hingga akhir liburan. Sumber: [Bali.Discount versi Rusia](https://bali.discount/ru).

Halaman yang sama menyediakan jalur WhatsApp, Telegram, VK, Instagram, dan email, serta CTA untuk meminta daftar tur. Sumber: [Bali.Discount versi Rusia](https://bali.discount/ru).

Tautan “detail” pada halaman tersebut mengarah ke katalog Notion yang tidak dapat diambil saat riset ini. Karena itu, **tidak ada harga, unit harga, itinerary detail, atau inclusions Bali.Discount yang dicatat sebagai fakta terverifikasi** dalam dokumen ini.

## Inferensi dan rekomendasi untuk katalog pengembangan

Bagian ini adalah rancangan kita, bukan fakta tentang benchmark.

1. Enam keluarga katalog awal—Ubud/Central Bali, East Bali, North Bali, South Bali/Uluwatu, Nusa Penida, dan Custom Private Tour—cukup terdukung sebagai struktur permintaan umum tanpa menyalin paket referensi.
2. Setiap paket sebaiknya menyimpan field berikut: `route family`, judul kerja Rusia, ringkasan, stop kandidat, durasi/rentang waktu, tipe private/shared, bahasa layanan, kapasitas/minimum peserta, unit harga, inclusions, exclusions, pickup area, surcharge, aturan anak, catatan aksesibilitas/risiko, availability mode, dan status verifikasi.
3. Dua opsi produk dapat digunakan bila beda cakupannya nyata:
   - **Essential:** kendaraan/pengemudi dan koordinasi; tiket serta aktivitas tertentu dibayar terpisah.
   - **Practical:** lebih banyak tiket, aktivitas, atau pengaturan sudah termasuk.
4. Untuk development, sistem sebaiknya mendukung beberapa model harga sebagai placeholder: per kendaraan, per orang, minimum peserta, surcharge peserta tambahan, dan `from price`. Jangan tampilkan placeholder seolah-olah penawaran final.
5. Setiap paket perlu status operasional yang tegas, misalnya `draft`, `internal-ready`, `partner-review`, dan `publishable`. Dengan begitu development tidak menunggu partner, tetapi klaim publik tetap terkendali.

## Fakta first-party: Pexels

Ringkasan lisensi Pexels menyatakan foto dan video dapat digunakan gratis, atribusi tidak wajib, media dapat dimodifikasi, dan penggunaan pada website serta kampanye pemasaran diperbolehkan. Sumber: [Pexels License](https://www.pexels.com/legal-pages/license/).

Lisensi penuh memberi hak non-eksklusif dan bebas royalti untuk menggunakan, menyalin, memodifikasi, atau mengadaptasi konten untuk tujuan komersial maupun nonkomersial. Namun, Pexels melarang penjualan/distribusi konten dalam bentuk standalone, penggunaan yang menyiratkan endorsement orang atau merek, klaim kepemilikan/eksklusivitas yang menyesatkan, dan penggunaan konten sebagai merek dagang atau nama usaha. Sumber: [Pexels Terms of Service, bagian 5](https://www.pexels.com/terms-of-service/).

Pexels juga memperingatkan bahwa konten dapat melibatkan hak tambahan—misalnya orang yang dapat dikenali, logo/merek, bangunan, properti, audio, atau organisasi—dan Pexels tidak menjamin semua consent atau release yang mungkin diperlukan sudah tersedia. Pengguna bertanggung jawab menentukan izin tambahan, terutama untuk penggunaan komersial. Sumber: [Pexels Terms of Service, bagian 5](https://www.pexels.com/terms-of-service/).

Terms melarang pengambilan data secara otomatis tanpa izin, bulk/systematic copying, dan pengumpulan konten untuk machine learning. Larangan ini penting bila alur produksi AI hendak memakai Pexels sebagai dataset atau input massal. Sumber: [Pexels Terms of Service, bagian 8](https://www.pexels.com/terms-of-service/).

## Rekomendasi workflow media

Bagian ini adalah rekomendasi operasional, bukan nasihat hukum.

- Pexels dapat digunakan sebagai sumber stock individual untuk mockup dan produksi, asalkan setiap aset dicatat dan pemakaiannya memenuhi lisensi yang berlaku saat diunduh.
- Simpan manifest media minimal berisi URL halaman aset, contributor, tanggal unduh, tipe lisensi, halaman tujuan, status review hak pihak ketiga, dan catatan modifikasi. Kredit tidak diwajibkan oleh lisensi, tetapi pencatatan internal tetap disarankan.
- Hindari aset dengan logo/merek yang menonjol, orang yang dapat dikenali dalam konteks yang dapat memberi kesan endorsement, properti privat yang sensitif, atau konten yang dapat menyesatkan pelanggan seolah-olah menggambarkan paket/supplier aktual.
- Untuk animasi scroll, gunakan stock sebagai bahan komposisi visual website—misalnya crop, color treatment, masking, motion, typography, dan transisi—bukan menjual atau mendistribusikan file stock secara standalone.
- Jangan memasukkan aset Pexels ke layanan generative-AI atau pipeline pelatihan secara otomatis hanya karena aset boleh “dimodifikasi”. Periksa terlebih dahulu syarat layanan AI yang dipakai, cara input disimpan/dilatih, hak output, serta hak pihak ketiga pada aset sumber. Untuk video premium yang sepenuhnya dibuat AI, lebih aman membuatnya dari prompt/original inputs dan menyimpan provenance serta syarat lisensi model/output secara terpisah.
- Setiap visual destinasi harus diberi perlakuan sebagai **representasi suasana**, bukan bukti bahwa lokasi, kendaraan, kamar, pemandu, atau aktivitas tertentu termasuk dalam paket. Detail paket harus ditentukan oleh data produk, bukan oleh stock footage.

## Kesimpulan yang aman dipakai sekarang

- **Fakta benchmark:** pasar referensi menampilkan katalog menurut kawasan/aktivitas, beberapa unit harga, inclusions/exclusions, durasi, kapasitas, dan bahasa layanan.
- **Keputusan pengembangan yang layak:** dukung enam keluarga paket, tier Essential/Practical, serta beberapa model harga dan status verifikasi tanpa menunggu partner.
- **Placeholder:** itinerary, nominal harga kita, supplier, availability, dan fulfilment aktual.
- **Media:** Pexels memungkinkan penggunaan website/komersial dalam batas lisensinya; aset harus dilacak dan ditinjau untuk hak pihak ketiga. Pipeline video AI memerlukan review syarat layanan tersendiri dan tidak boleh mengandalkan scraping atau pengumpulan massal Pexels.
