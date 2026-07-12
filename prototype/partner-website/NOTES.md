# Prototype verdict

Status: arah dipilih oleh Erland; menunggu validasi partner.

## Pertanyaan

Struktur mana yang paling tepat untuk menjelaskan penawaran dan mendorong enquiry manual tanpa memberi kesan bahwa layanan sudah production-ready?

## Pilihan

- A - trust-first editorial
- B - catalogue-first comparison
- C - concierge-first journey

## Keputusan

Variant C menjadi kerangka utama karena konsultasi dan customer handling merupakan tanggung jawab Erland. Arah implementasi berikutnya adalah hybrid: alur concierge dari C, katalog/perbandingan paket dari B, dan bukti trust/team dari A.

Benchmark OpenBali mengonfirmasi bahwa partner kemungkinan mengharapkan harga terlihat, katalog rute, manfaat, kendaraan, serta beberapa jalur kontak. Elemen kategori tersebut dapat dipelajari, tetapi visual, copy, foto, identitas, dan aset OpenBali tidak boleh disalin.

Prototype switcher dipertahankan sementara untuk review eksternal partner. Setelah partner mengonfirmasi arah, variasi yang kalah harus dihapus dan pemenang ditulis ulang sebagai implementasi nyata.

## Hal yang perlu diminta dari partner

- Paket dan itinerary yang benar-benar tersedia.
- Harga net USD, unit harga, kapasitas, serta masa berlaku.
- Inclusions, exclusions, tiket, pickup area, durasi, dan kebutuhan khusus.
- Identitas operator, kendaraan, guide, supplier, dan bukti operasional yang boleh dipublikasikan.
- Jam layanan, kontak darurat, kebijakan pembatalan, dan alur handoff.
- Preferensi partner atas struktur hybrid C + B + A.

## Contact flow yang dipilih

- CTA WhatsApp memakai `wa.me` dengan template pesan Rusia yang sudah terisi.
- Form enquiry mengirim notifikasi email kepada tim dan mewajibkan nomor WhatsApp pelanggan agar tim dapat memulai percakapan.
- Email pelanggan bersifat opsional kecuali pelanggan memilih email sebagai channel utama.
- Resend API menjadi pilihan utama untuk notifikasi email melalui serverless/API route; API key tidak boleh berada di browser.
- Deployment target yang dipilih adalah Vercel; framework production belum dipilih dalam discovery ini.
- Detail implementasi dan field tercatat di `docs/contact-and-enquiry-flow.md`.
