# Customer trip cart workflow

Status: ready-for-human

Revision implemented and automatically verified on 24 July 2026. Revised Russian customer-facing copy remains gated on fluent review before publication.

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
25. Jika itinerary belum mencakup area tersebut, biaya transfer USD 10 per mobil langsung masuk ke total cart.
26. `Bali Water Sports` (Benoa/Nusa Dua) dan `Romantic Ocean Dinner` (Jimbaran) menjadi pemicu otomatis transfer Craft gratis.
27. Jika plan berubah sebelum pembayaran dan kemudian mencakup Nusa Dua atau Jimbaran, total diperbarui dengan mengubah biaya transfer Craft dari USD 10 menjadi USD 0.
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
42. CTA collection memakai **View collection**, bukan **Select collection** atau tindakan add-to-cart.
43. Ready-made collection adalah rekomendasi kurasi berbasis cerita, bukan target jumlah journey atau promosi diskon. Tiga tema awal: **First Time in Bali**, **Adventure & Energy**, dan **Bali Beyond the Highlights**.
44. Collection card tidak menampilkan persentase diskon. Diskon otomatis cart tetap berlaku secara terpisah tetapi bukan pesan utama collection.
45. Ready-made collection berfungsi sebagai filter katalog dan tidak menambahkan journey ke cart.
46. Hanya satu collection filter dapat aktif. Mengklik collection lain memindahkan filter tanpa mengubah isi cart.
47. Collection aktif memiliki visual state yang jelas dan grid journey hanya menampilkan card yang termasuk collection tersebut.
48. Tombol **All journeys** menghapus filter dan menampilkan seluruh card kembali.
49. Journey hanya masuk atau keluar cart melalui tindakan eksplisit pada journey card atau cart; pilihan yang sudah ada tetap aman saat filter berubah.
50. Ritme warna halaman: `#services` warm cream, How it works dark forest, Booking & terms warm beige, Why us split image/pale green, Enquiry dark forest, dan footer hijau paling gelap.
51. ID enquiry disimpan sebagai kebutuhan backend/admin masa depan dan bukan booking code.
52. Reference enquiry tidak ditampilkan kepada customer dan tidak dimasukkan ke template WhatsApp selama website masih memakai handoff statis.
53. Submit melalui WhatsApp langsung membuka pesan yang sudah disiapkan tanpa status tambahan seperti **Enquiry sent** atau **Your enquiry is ready**. Booking reference baru relevan setelah itinerary dan booking fee dikonfirmasi.
54. Untuk rental berharga tetap, pengguna wajib memilih vehicle option dan jumlah hari langsung pada journey card sebelum **Add to trip** aktif.
55. Jumlah hari rental tetap dapat diedit di cart dan harga ditampilkan sebagai perhitungan eksplisit, misalnya **$35/day × 4 days = $140**.
56. Ringkasan enquiry memakai format ringkas **Transport & Rentals — [vehicle] — [n] days**.
57. Semua channel memuat vehicle dan rental duration. Email/data admin dapat memuat rental subtotal terstruktur, sedangkan WhatsApp cukup membawa total plan tanpa subtotal rental terpisah.
58. Untuk pilihan transport berstatus on request, rental duration tetap dibawa ke enquiry tetapi subtotal tidak dinyatakan final.
59. Heading enquiry tetap singkat dan komersial, misalnya **Tell us about your Bali plan**, dan tidak memuat daftar nama seluruh journey/service.
60. Di bawah heading tampil compact summary berisi jumlah journey, jumlah Bali Service, jumlah tamu, dan total bila tersedia.
61. Enquiry tidak menambahkan tombol **View selected plan** karena floating cart sudah menyediakan akses permanen ke detail pilihan.
62. Detail lengkap pilihan tetap dibawa dalam payload dan template channel, tetapi tidak memenuhi heading atau area awal form.
63. Seluruh kolom footer desktop dimulai dari garis atas yang sama; blok Brand tidak diberi offset vertikal berbeda dari Explore, Support, atau Connect.
64. Collection filter hanya menyaring journey cards. Card Bali Services tetap terlihat karena bersifat optional dan berada di luar kategori collection.
65. Journey partner dianggap selalu dapat dipenuhi; customer flow tidak memakai tahap atau janji **availability check**.
66. Angka pada cart dan enquiry adalah **total harga dalam USD** setelah diskon dan pajak yang berlaku. Pelanggan membayar 20% untuk konfirmasi dan sisa 80% onsite di Bali; konversi mata uang onsite merupakan detail operasional lapangan.
67. Alur konfirmasi adalah: pelanggan mengirim plan dengan total USD, operator mengirim itinerary dan instruksi pembayaran berdasarkan total tersebut, pelanggan membayar booking fee 20%, lalu booking dinyatakan confirmed.
68. WhatsApp hanya wajib jika channel pilihan adalah WhatsApp; email hanya wajib jika channel pilihan adalah Email. Channel lain tidak mewajibkan keduanya karena percakapan dilanjutkan dari akun pengirim.
69. Konfigurasi plan disimpan lokal agar pilihan tidak hilang saat refresh, tetapi nama, nomor telepon, email, tanggal, hotel, dan catatan tidak disimpan.
70. Start dan end date berarti periode pelanggan berada di Bali atau tanggal perjalanan ingin dimulai; pelanggan tidak perlu menentukan tanggal untuk setiap journey.
71. Enquiry tanpa journey/service tetap valid sebagai **Open Bali request**, memakai `requestType: open` tanpa memalsukan pilihan Bali Service, dan menampilkan copy komersial yang mengundang pelanggan menjelaskan kebutuhan.
72. Diskon bundle 8% baru aktif mulai tujuh eligible journeys; lima hingga enam mendapat 5%.
73. Template WhatsApp membawa vehicle option dan rental duration, tetapi tidak menampilkan rental subtotal terpisah karena total plan sudah tersedia.
74. Vehicle option dan rental days di cart ditempatkan di dalam item Transport & Rentals yang sama, tepat bersama line totalnya.
75. Floating cart memakai compact dock di sisi kanan dan tidak lagi membentang hampir sepanjang viewport; progres diskon dipindahkan ke drawer.

## Customer flow

1. Pelanggan membuka journey card atau card Bali Services di section `#services` dan memilih opsi yang diperlukan.
2. Tombol "Add to cart" menambahkan pilihan tanpa membuka cart otomatis.
3. Floating cart muncul hanya setelah item pertama ditambahkan, memberikan animasi singkat, lalu tetap minimized saat pelanggan menjelajah halaman.
4. Pelanggan membuka cart secara eksplisit; desktop menampilkan side drawer dan mobile menampilkan bottom sheet.
5. Drawer memisahkan priced journeys dari optional services berstatus "Price on request".
6. Total hanya menghitung journey, diskon, pajak yang berlaku, rental terpilih, serta biaya transfer Craft jika ada. Service on-request tidak masuk total.
7. Pelanggan dapat menghapus item, mengubah opsi, atau melanjutkan ke satu enquiry yang membawa seluruh pilihan.
8. Pelanggan dapat memakai Ready-made collection sebagai filter rekomendasi, lalu memilih journey satu per satu. Tombol **All journeys** memulihkan seluruh katalog.
9. Pada rental, pelanggan memilih kendaraan dan jumlah hari sebelum menambahkan item; konfigurasi dan subtotal dapat ditinjau serta diedit kembali di cart.
10. Saat melanjutkan ke enquiry, pelanggan melihat heading singkat dan compact summary; detail plan tetap tersedia melalui floating cart.
11. Form menyesuaikan field kontak wajib dengan channel yang dipilih dan menjelaskan bahwa date range adalah periode perjalanan.
12. Setelah plan dikirim, operator langsung menyusun itinerary dan instruksi pembayaran berdasarkan total yang sudah tampil tanpa meminta pelanggan menunggu pemeriksaan availability.
13. Setelah booking fee 20% diterima, operator mengirim konfirmasi booking tertulis.

## Edge cases

- Cart tidak dirender ketika kosong.
- Service tanpa konfigurasi lengkap tidak dapat ditambahkan.
- Menghapus semua item menutup drawer dan menyembunyikan floating cart.
- Craft tidak pernah masuk otomatis dan tidak memakai label "Complimentary add-on".
- Craft bernilai USD 0 jika plan memuat Bali Water Sports atau Romantic Ocean Dinner; selain itu biayanya USD 10 per mobil.
- Jika plan berubah sebelum pembayaran dan kemudian mencakup Nusa Dua/Jimbaran, total diperbarui dengan biaya Craft USD 0.
- Item on-request selalu terlihat terpisah dan tidak boleh membuat total seolah-olah sudah final untuk service tersebut.
- Hanya satu card Transport & Rentals; tidak ada card service scooter, car, atau minivan yang redundan.
- Hanya satu card Bali Services di grid `#services`; tidak ada section layanan kedua atau card terpisah untuk tiap request type.
- Memilih beberapa request type tidak membuat beberapa baris service terpisah di cart.
- Mengganti collection filter tidak menambah, menghapus, atau mengubah item yang sudah berada di cart.
- Hanya satu filter aktif; **All journeys** mengembalikan katalog penuh.
- Bali Services tetap terlihat ketika collection filter aktif.
- Rental fixed-price tanpa vehicle option atau jumlah hari valid tidak dapat ditambahkan.
- Rental on-request membawa jumlah hari tetapi tidak menampilkan subtotal seolah sudah final.
- Browser yang memblokir local storage tetap dapat menggunakan cart; persistence hanya enhancement.
- Data identitas dan detail perjalanan yang diketik di form tidak pernah dimasukkan ke penyimpanan plan lokal.
- Perubahan itinerary setelah booking dapat tetap memerlukan penyesuaian operasional, tetapi hal itu bukan availability gate pada flow awal.

## Acceptance criteria

- Floating cart tidak menyebabkan nested scrollbar dan tidak menutupi isi plan seperti implementasi lama.
- Cart dapat dibuka/minimized dari seluruh bagian halaman setelah ada item.
- Card Bali Services berada di grid `#services`, mendukung enam pilihan multi-select dengan copy komersial, dan service tetap optional.
- Pilihan Bali Services dikelompokkan sebagai satu item on-request yang dapat diedit di cart.
- Card katalog memiliki tinggi, alignment, dan posisi CTA yang konsisten.
- Card Craft beralih dari $10/car menjadi harga dicoret + Free ketika itinerary eligible, dengan note lokasi yang ringkas.
- Footer mengikuti struktur empat kolom dengan logo dan tagline tersusun sebagai satu blok rapi serta bar bawah copyright/Privacy/Terms.
- Keempat kolom footer sejajar atas pada desktop tanpa offset khusus pada Brand.
- Collection card menjual cerita rekomendasi dan menjadi click target yang aksesibel; satu filter aktif menyaring grid tanpa mengubah cart, sedangkan **All journeys** memulihkan katalog penuh.
- Collection filter tidak menyembunyikan card Bali Services.
- Pergantian warna antar-section tetap memiliki ritme terang–gelap setelah section Bali Services terpisah dihapus.
- Payload enquiry mempertahankan journey, opsi transport, Craft, service on-request, dan detail pengguna sebagai data terstruktur.
- Card, cart, WhatsApp, email, dan payload admin menampilkan vehicle serta rental duration secara konsisten. Untuk opsi fixed-price, subtotal terstruktur dapat tetap tersedia di email/admin; WhatsApp hanya membawa total plan.
- Heading enquiry tidak pernah berubah menjadi daftar panjang; compact summary menggantikan daftar tersebut tanpa CTA yang menduplikasi floating cart.
- Cart dan enquiry secara konsisten menyebut total harga dalam USD, booking fee 20%, dan sisa onsite 80% tanpa menampilkan disclaimer kurs kepada customer.
- Contact field wajib mengikuti preferred channel dan tidak memaksa WhatsApp untuk pengguna Email, Telegram, atau VK.
- Plan pilihan bertahan setelah refresh tanpa menyimpan informasi pribadi atau isi form enquiry.
- Website menampilkan tiga langkah konfirmasi ringkas dan tidak menyebut availability check dalam customer flow.
- Date range dijelaskan sebagai periode berada di Bali atau waktu journey dimulai; tidak ada field atau kewajiban tanggal per journey.
- Empty enquiry tampil sebagai Open Bali request dan tetap dapat dilanjutkan secara profesional.
- Diskon 8% tidak diterapkan sebelum tujuh eligible journeys.
- WhatsApp tidak menampilkan rental subtotal terpisah.
- Rental controls dan line total berada dalam satu visual item di cart.
- Compact cart dock tidak menutupi sebagian besar lebar halaman pada desktop maupun mobile.
- Copy RU dan EN memiliki perilaku serta hirarki yang sama; copy Rusia melewati review penutur fasih sebelum publikasi.

## Definition of done

Implementer dapat membangun seluruh workflow tanpa pertanyaan produk tambahan, seluruh acceptance criteria lulus, dan tidak ada item katalog yang redundant.
