# Customer trip cart workflow

Status: ready-for-human

Revision implemented and automatically verified on 23 July 2026. Revised Russian customer-facing copy remains gated on fluent review before publication.

## Goal

Membantu pelanggan menyusun journeys dan layanan Bali dalam satu rencana yang jelas, tanpa menutupi halaman atau mencampur harga final dengan layanan yang masih memerlukan quotation.

## Trigger

Pelanggan memilih journey atau Bali Service dari halaman katalog.

## Confirmed decisions

1. Cart hanya relevan setelah setidaknya satu journey atau service dipilih.
2. Journeys dan Bali Services menggunakan satu unified cart.
3. Isi cart dipisahkan menjadi:
   - **Journeys**: menampilkan harga dan berkontribusi pada total/diskon.
   - **Services — price on request**: tidak menambah total sampai quotation dikonfirmasi.
4. Semua pilihan dikirim bersama dalam satu enquiry.
5. Craft & Jewellery Studios tidak memakai label "Complimentary add-on".
6. Transfer Craft gratis hanya dari Nusa Dua dan Jimbaran; area lain dikenai USD 10 per mobil.
7. Kartu katalog harus memiliki tinggi dan susunan konten yang konsisten.
8. Seluruh grid journey dan satu card Bali Services berada dalam section induk `#services`; section Bali Services terpisah dihapus.
9. Footer perlu ditata ulang agar navigasi dan kanal sosial memiliki hirarki yang jelas.
10. Setelah ada pilihan, cart mengikuti scroll sebagai floating bar kecil.
11. Cart yang dibuka menggunakan side drawer di desktop dan bottom sheet di mobile.
12. Cart tidak boleh memakai panel besar inline atau scrollbar bertumpuk yang menutupi isi rencana.
13. Menambahkan journey atau service tidak membuka cart secara otomatis.
14. Cart yang minimized memberi animasi singkat dan memperbarui badge jumlah item serta total journey.
15. Drawer hanya terbuka setelah pelanggan menekan cart atau CTA "View your plan".
16. Service card memiliki tahap konfigurasi/pemilihan opsi di dalam card sebelum tombol "Add to cart" aktif.
17. Menekan service card saja tidak langsung menambahkan item ke cart.
18. Katalog tidak boleh menampilkan service yang menduplikasi journey/card lain, termasuk rental mobil dan scooter.
19. Scooter, mobil, mobil dengan sopir, minivan, dan transfer dikonsolidasikan menjadi satu card utama **Transport & Rentals** di katalog trip.
20. Card Transport & Rentals meminta pengguna memilih jenis kendaraan/layanan sebelum "Add to cart".
21. Card **Bali Services** menawarkan enam pilihan multi-select: Visa & immigration, Land & property documentation, Other documents, Villa construction & renovation, Business setup, dan Local bank account assistance.
22. Pelanggan tidak perlu memilih pickup area ketika menambahkan Craft & Jewellery Studios.
23. Sistem menentukan transfer Craft secara otomatis dari journeys yang sudah dipilih.
24. Jika itinerary mencakup Nusa Dua atau Jimbaran, transfer Craft bernilai USD 0.
25. Jika itinerary belum mencakup area tersebut, cart menampilkan estimasi USD 10 per mobil; status dan harga akhir tetap dikonfirmasi sebelum booking karena kondisi lapangan dapat berubah.
26. `Bali Water Sports` (Benoa/Nusa Dua) dan `Romantic Ocean Dinner` (Jimbaran) menjadi pemicu otomatis transfer Craft gratis.
27. Sebelum pembayaran booking, operator memeriksa rute/hotel aktual. Jika rute nyata melewati Nusa Dua atau Jimbaran tetapi belum terdeteksi website, confirmation tertulis mengubah biaya transfer Craft dari USD 10 menjadi USD 0 sebelum pelanggan membayar.
28. Craft & Jewellery Studios tidak ditambahkan otomatis ke cart.
29. Setelah ada journey berbayar, Craft dapat ditampilkan sebagai suggested add-on, tetapi hanya masuk cart setelah tindakan eksplisit pelanggan.
30. Saat Craft ditambahkan, sistem menghitung biaya transfer USD 0 atau USD 10 per mobil berdasarkan itinerary.
31. Footer desktop kembali memakai empat kolom: Brand, Explore, Support, dan Connect.
32. Dalam kolom Brand, logo berada paling atas dan tagline tepat di bawahnya dengan alignment kiri serta lebar terbatas. Keempat kolom memiliki alignment atas dan jarak yang seimbang.
33. Bar bawah footer memuat copyright di kiri serta Privacy dan Terms di kanan.
34. Lebar footer mengikuti container utama; pada mobile kolom ditumpuk secara rapi tanpa ruang kosong berlebihan.
35. Bali Services sepenuhnya optional dan tidak menjadi syarat untuk menyusun journey, membuka cart, atau mengirim enquiry.
36. Card Bali Services memakai copy komersial: **Bali support, made simple.** From visas and property matters to business and banking support, connect with trusted local assistance through one shared plan. Select everything you may need—we’ll review your request and prepare a tailored quotation.
37. Minimal satu request type harus dipilih sebelum Bali Services dapat ditambahkan.
38. Di cart, semua request type dikelompokkan sebagai satu item **Bali Services — price on request** dan dapat diedit tanpa kembali ke card.
39. Card Craft menampilkan harga normal **$10 / car** dan catatan kecil **Free transfer from Nusa Dua or Jimbaran** tepat di bawah harga.
40. Jika itinerary memenuhi syarat, harga **$10 / car** dicoret, harga baru menjadi **Free**, dan badge **Included with your selected itinerary** tampil; penjelasan teknis pemeriksaan rute/hotel tidak ditampilkan pada card.
41. Seluruh permukaan card Ready-made collection dapat diklik, memiliki hover/focus state yang kuat, dan dapat diaktifkan dengan keyboard Enter atau Space.
42. Label "Select collection" tetap boleh tampil sebagai petunjuk visual, tetapi bukan satu-satunya click target.
43. Ready-made collection adalah rekomendasi kurasi berbasis cerita, bukan target jumlah journey atau promosi diskon. Tiga tema awal: **First Time in Bali**, **Adventure & Energy**, dan **Bali Beyond the Highlights**.
44. Collection card tidak menampilkan persentase diskon. Diskon otomatis cart tetap berlaku secara terpisah tetapi bukan pesan utama collection.
45. Memilih collection bersifat additive: journey yang belum ada ditambahkan, journey yang sudah ada tidak diduplikasi, dan pilihan Bali Services tetap dipertahankan.
46. Collection lain dapat ditambahkan kemudian; hasil akhirnya adalah union dari seluruh journey yang dipilih secara manual atau melalui collection.
47. Setelah collection diklik, toast singkat tampil di atas floating cart. Card memiliki state **Added** jika semua journey masih ada dan **Partially added** jika sebagian journey dihapus.
48. Mengklik collection **Partially added** menambahkan kembali journey yang hilang. Mengklik collection **Added** tidak membuat duplikasi dan menampilkan toast **Already in your plan**.
49. Cart menampilkan chip asal collection pada journey terkait; satu journey dapat memiliki beberapa chip tanpa dibuat sebagai item ganda.
50. Ritme warna halaman: `#services` warm cream, How it works dark forest, Booking & terms warm beige, Why us split image/pale green, Enquiry dark forest, dan footer hijau paling gelap.

## Customer flow

1. Pelanggan membuka journey card atau card Bali Services di section `#services` dan memilih opsi yang diperlukan.
2. Tombol "Add to cart" menambahkan pilihan tanpa membuka cart otomatis.
3. Floating cart muncul hanya setelah item pertama ditambahkan, memberikan animasi singkat, lalu tetap minimized saat pelanggan menjelajah halaman.
4. Pelanggan membuka cart secara eksplisit; desktop menampilkan side drawer dan mobile menampilkan bottom sheet.
5. Drawer memisahkan priced journeys dari optional services berstatus "Price on request".
6. Total hanya menghitung journey, diskon, pajak yang berlaku, rental terpilih, serta biaya transfer Craft jika ada. Service on-request tidak masuk total.
7. Pelanggan dapat menghapus item, mengubah opsi, atau melanjutkan ke satu enquiry yang membawa seluruh pilihan.
8. Pelanggan juga dapat memilih seluruh Ready-made collection dengan menekan area mana pun pada card; journey baru digabungkan secara deduplicated sementara journey lama dan Bali Services dipertahankan.

## Edge cases

- Cart tidak dirender ketika kosong.
- Service tanpa konfigurasi lengkap tidak dapat ditambahkan.
- Menghapus semua item menutup drawer dan menyembunyikan floating cart.
- Craft tidak pernah masuk otomatis dan tidak memakai label "Complimentary add-on".
- Craft bernilai USD 0 jika plan memuat Bali Water Sports atau Romantic Ocean Dinner; selain itu estimasi USD 10 per mobil.
- Jika pemeriksaan rute sebelum pembayaran membuktikan itinerary nyata melewati Nusa Dua/Jimbaran, confirmation tertulis mengoreksi estimasi Craft menjadi USD 0.
- Item on-request selalu terlihat terpisah dan tidak boleh membuat total seolah-olah sudah final untuk service tersebut.
- Hanya satu card Transport & Rentals; tidak ada card service scooter, car, atau minivan yang redundan.
- Hanya satu card Bali Services di grid `#services`; tidak ada section layanan kedua atau card terpisah untuk tiap request type.
- Memilih beberapa request type tidak membuat beberapa baris service terpisah di cart.
- Memilih beberapa Ready-made collection menghasilkan union journeys tanpa menghapus pilihan lama atau Bali Services.
- Menghapus sebagian journey dari sebuah collection mengubah state card menjadi Partially added.

## Acceptance criteria

- Floating cart tidak menyebabkan nested scrollbar dan tidak menutupi isi plan seperti implementasi lama.
- Cart dapat dibuka/minimized dari seluruh bagian halaman setelah ada item.
- Card Bali Services berada di grid `#services`, mendukung enam pilihan multi-select dengan copy komersial, dan service tetap optional.
- Pilihan Bali Services dikelompokkan sebagai satu item on-request yang dapat diedit di cart.
- Card katalog memiliki tinggi, alignment, dan posisi CTA yang konsisten.
- Card Craft beralih dari $10/car menjadi harga dicoret + Free ketika itinerary eligible, dengan note lokasi yang ringkas.
- Footer mengikuti struktur empat kolom dengan logo dan tagline tersusun sebagai satu blok rapi serta bar bawah copyright/Privacy/Terms.
- Collection card menjual cerita rekomendasi, menjadi click target yang aksesibel, bersifat additive/deduplicated, dan memiliki toast serta state Added/Partially added.
- Pergantian warna antar-section tetap memiliki ritme terang–gelap setelah section Bali Services terpisah dihapus.
- Payload enquiry mempertahankan journey, opsi transport, Craft, service on-request, dan detail pengguna sebagai data terstruktur.
- Copy RU dan EN memiliki perilaku serta hirarki yang sama; copy Rusia melewati review penutur fasih sebelum publikasi.

## Definition of done

Implementer dapat membangun seluruh workflow tanpa pertanyaan produk tambahan, seluruh acceptance criteria lulus, dan tidak ada item katalog yang redundant.
