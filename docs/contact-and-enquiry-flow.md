# Contact and Enquiry Flow

Status: keputusan discovery untuk task implementasi berikutnya.

## Jalur masuk

### WhatsApp langsung

CTA utama membuka `wa.me` ke nomor WhatsApp Business milik tim dengan pesan Rusia yang sudah terisi. Nomor bisnis belum ditentukan dan tidak boleh memakai nomor pelanggan atau nomor pribadi dari transkrip.

Format URL:

```text
https://wa.me/<WHATSAPP_NUMBER>?text=<URL_ENCODED_MESSAGE>
```

`WHATSAPP_NUMBER` memakai format internasional tanpa `+`, spasi, tanda kurung, atau strip.

Template pesan Rusia, masih memerlukan review penutur fasih:

```text
Здравствуйте! Хочу узнать о частном туре на Бали.

Маршрут / пакет: {package}
Дата: {date}
Количество гостей: {group_size}
Отель или район: {pickup_area}
Пожелания: {notes}

Пожалуйста, пришлите финальные детали и стоимость в USD.
```

Website mengisi placeholder dari pilihan pengguna lalu melakukan URL encoding di browser. Jangan memasukkan data sensitif yang tidak diperlukan ke URL.

### Form enquiry

Form website mengirim submission ke inbox bisnis. Tim kemudian menghubungi calon pelanggan terlebih dahulu melalui WhatsApp atau channel pilihan mereka.

Field minimum:

- Nama.
- Nomor WhatsApp dengan country code — wajib.
- Email — opsional, kecuali pelanggan memilih email sebagai channel utama.
- Preferred contact channel: WhatsApp, Telegram, VK, atau email.
- Tanggal atau rentang tanggal tur.
- Jumlah peserta.
- Paket/rute yang diminati.
- Hotel atau area pickup, boleh diisi kemudian.
- Pesan/kebutuhan khusus.
- Bahasa pilihan.
- Consent untuk dihubungi dan pemrosesan data enquiry.
- Source/campaign secara internal melalui hidden field, tanpa fingerprinting berlebihan.

Email notification kepada tim harus memuat nomor WhatsApp pelanggan, channel pilihan, detail enquiry, timestamp, source, dan unique enquiry ID. Jangan menjadikan isi email sebagai sumber kebenaran booking; setelah qualified, pindahkan ke ringkasan booking terstruktur.

## Provider awal

- Deployment target: Vercel.
- Pilihan utama: Resend API untuk mengirim email notifikasi enquiry melalui serverless/API route milik website.
- Alur: browser mengirim form ke Vercel Function atau framework route handler; endpoint memvalidasi dan membersihkan input, menjalankan proteksi spam/rate limit, lalu memanggil Resend untuk mengirim email ke inbox bisnis.
- `RESEND_API_KEY`, alamat tujuan internal, dan konfigurasi sensitif wajib disimpan sebagai environment variable server-side. Browser tidak boleh memanggil Resend secara langsung atau menerima API key.
- Konfigurasikan environment variables terpisah untuk Development, Preview, dan Production. Perubahan environment variable memerlukan deployment baru agar berlaku.
- Gunakan idempotency key berbasis enquiry ID untuk mencegah email ganda saat request diulang.
- Set `reply_to` hanya jika pelanggan memberikan alamat email yang valid; jika tidak, email notifikasi tetap menampilkan nomor WhatsApp dan preferred channel.
- Netlify Forms atau Web3Forms hanya fallback jika versi awal sengaja dibuat tanpa serverless/API route.
- Provider dan hosting final tetap harus diperiksa dari sisi data location, spam protection, retention, export, privacy terms, serta kemampuan menghapus data.

Endpoint/key provider tidak boleh ditulis langsung sebagai secret di repo. Variabel seperti `RESEND_API_KEY` dan alamat inbox tujuan tidak boleh memiliki nilai nyata dalam source control.

## Proteksi dan UX

- Honeypot dan spam filtering.
- Rate limiting atau CAPTCHA hanya bila spam nyata muncul; jangan menambah friction sejak awal tanpa kebutuhan.
- Validasi nomor WhatsApp dan country code.
- Success state yang menjelaskan perkiraan jam respons, bukan janji 24/7.
- Fallback link langsung ke WhatsApp, Telegram, VK, dan alamat email bisnis.
- Copy Rusia wajib direview penutur fasih.

## Sumber dokumentasi

- Vercel Functions: https://vercel.com/docs/functions
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Resend Send Email API: https://resend.com/docs/api-reference/emails/send-email
- Resend with Next.js: https://resend.com/docs/send-with-nextjs
- Resend API authentication: https://resend.com/docs/api-reference/introduction
- Resend pricing: https://resend.com/docs/knowledge-base/what-is-resend-pricing
- Netlify Forms: https://docs.netlify.com/manage/forms/usage-and-billing/
- Netlify pricing: https://www.netlify.com/pricing/
- Web3Forms: https://docs.web3forms.com/
