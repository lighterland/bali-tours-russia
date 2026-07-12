# Panduan Aset Pexels dan Video Premium

Status: panduan produksi untuk website final. Semua aset harus dicatat di manifest; stock dan AI adalah **media atmosfer**, bukan bukti supplier atau fulfilment.

## Cara download manual

1. Cari di Pexels memakai keyword bahasa Inggris di tabel berikut.
2. Buka halaman aset individual, bukan hasil Google Images.
3. Pilih resolusi terbesar yang masuk akal—minimal lebar 2400 px untuk hero dan 1600 px untuk kartu.
4. Hindari gambar dengan logo, merek, wajah yang sangat dominan, kendaraan spesifik, kamar hotel, atau guide yang dapat disalahartikan sebagai bagian paket.
5. Simpan memakai nama file persis di bawah ke `public/media/`.
6. Catat URL halaman Pexels, nama contributor, tanggal download, dan penggunaan di `public/media/MANIFEST.md`.

Kirimkan atau letakkan file hasil download di `public/media/`; setelah itu saya dapat mengganti URL sementara di `lib/catalogue.ts` menjadi aset lokal.

## Shot list foto

| File tujuan | Bentuk | Kegunaan | Keyword Pexels yang disarankan |
| --- | --- | --- | --- |
| `hero-bali-rice-terrace.jpg` | landscape 16:9, ≥3000×1688 | Hero utama; ruang gelap/kosong di kiri untuk headline | `Bali rice terrace cinematic morning mist`, `Jatiluwih Bali aerial sunrise`, `Bali tropical landscape wide` |
| `route-ubud.jpg` | landscape 4:3 | Kartu Ubud/Central | `Ubud Bali rice terrace palm trees`, `Bali waterfall jungle`, `Bali temple garden` |
| `route-east-bali.jpg` | landscape 4:3 | Kartu East Bali | `East Bali water palace`, `Bali temple mountain sunrise`, `Bali coastal temple` |
| `route-north-bali.jpg` | landscape 4:3 | Kartu North Bali | `North Bali waterfall`, `Bali mountain lake aerial`, `Bali jungle waterfall cinematic` |
| `route-south-uluwatu.jpg` | landscape 4:3 | Kartu South/Uluwatu | `Uluwatu Bali cliff sunset`, `Bali ocean cliff golden hour`, `Bali beach aerial sunset` |
| `route-nusa-penida.jpg` | landscape 4:3 | Kartu Nusa Penida | `Nusa Penida cliffs aerial`, `Kelingking beach aerial`, `Bali turquoise coast drone` |
| `trust-local-team.jpg` | landscape atau portrait 4:5 | Trust/team proof—pakai hanya foto tim nyata dengan izin tertulis | Jangan pakai stock untuk mengaku sebagai tim. Minta foto Partner Operasional Bali. |
| `texture-bali-detail.jpg` | portrait 4:5 | Transisi editorial/dekoratif | `Balinese textile close up`, `Bali palm shadow wall`, `Bali stone carving detail` |

## Paket unduhan yang diminta sekarang

Download **10 file** berikut terlebih dahulu. Untuk hasil yang konsisten, pilih foto dengan warna natural, tanpa HDR berlebihan, tanpa logo, dan minim wajah yang mudah dikenali.

1. Hero: `Bali rice terraces sunrise mist wide cinematic` — landscape 16:9, ruang kosong di kiri.
2. Ubud: `Ubud rice terraces palm trees morning` — landscape, lapisan hijau yang dalam.
3. East Bali: `Tirta Gangga Bali water palace` — landscape, arsitektur dan air terlihat jelas.
4. North Bali: `Bali waterfall jungle vertical` — portrait atau 4:5, air terjun penuh dan vegetasi gelap.
5. South Bali: `Uluwatu cliff sunset aerial` — landscape, tebing di kanan dan laut luas.
6. Nusa Penida: `Kelingking beach aerial Bali` — landscape, bentuk tebing terbaca jelas.
7. Custom journey: `Bali winding road tropical aerial` — landscape, memberi kesan perjalanan fleksibel.
8. Detail budaya: `Balinese temple stone carving close up` — portrait, tekstur tanpa orang.
9. Detail premium: `palm shadow warm wall tropical` — portrait, minimal dan banyak negative space.
10. Trust/background: `Bali local hospitality hands detail` — hanya tangan atau aktivitas dari jauh; jangan menggambarkan model sebagai tim kita.

Simpan semuanya ke `public/media/incoming/` dengan nama sederhana. Saya akan melakukan crop, optimasi, penamaan final, dan memasukkannya ke halaman.

## Gambar khusus untuk dianimasikan

Untuk image-to-video, cari/download master yang tajam dan memiliki lapisan foreground–midground–background. Hindari air terjun yang sangat kompleks, kerumunan, wajah close-up, serta daun kecil memenuhi seluruh frame karena mudah menghasilkan artefak.

| Master | Keyword Pexels | Gerak yang cocok |
| --- | --- | --- |
| Hero terrace | `Bali rice terrace sunrise mist wide` | slow push-in, kabut bergerak tipis, daun foreground bergerak lembut |
| Uluwatu ocean | `Uluwatu cliff sunset wide` | slow lateral drift, ombak halus, cahaya sore berubah sangat pelan |
| Nusa Penida aerial | `Nusa Penida cliff aerial wide` | slow drone push, gerak laut natural, tanpa perubahan bentuk tebing |
| Temple silhouette | `Bali temple sunset silhouette wide` | very slow orbit, awan dan kabut lembut |
| Palm shadow | `palm shadow beige wall` | bayangan daun bergerak pelan untuk loop transisi |

### Prompt image-to-video universal untuk Google/Omni

```text
Animate this still image as a refined premium Bali travel film. Preserve the exact geography, architecture, people, and composition of the source image. Add only subtle realistic motion: a very slow cinematic camera push-in, gentle natural movement in foliage, soft atmospheric haze, and physically accurate water movement where visible. Keep the focal point stable and leave the negative space clear for website text. Natural color, elegant editorial mood, seamless 8-second loop, 24 fps, photorealistic, no scene change.
```

### Negative prompt image-to-video

```text
no new people, no altered faces, no warped buildings, no changing cliff shape, no duplicated trees, no added vehicles, no logo, no text, no watermark, no camera shake, no fast movement, no aggressive zoom, no oversaturation, no fantasy elements, no flicker, no sudden lighting change, no cut
```

Untuk hero mobile, ulangi generasi dari master portrait atau gunakan instruksi tambahan: `9:16 vertical composition, keep the main focal point in the center, safe empty area behind the headline`.

## Media tambahan yang masih dibutuhkan untuk katalog 19 produk

File yang sudah tersedia dan layak dipakai: Ubud/rice terraces, East Bali, temple detail, Uluwatu coast, Nusa Penida, hospitality detail, Bromo, Borobudur, surfing, dan rafting.

Download tambahan berikut agar setiap produk mempunyai visual yang benar-benar relevan:

| Nama file | Keyword Pexels |
| --- | --- |
| `north-bali-lake-temple.jpg` | `Ulun Danu Beratan Bali lake temple wide` |
| `bali-private-fishing.jpg` | `fishing boat tropical ocean Indonesia` |
| `bali-turtle-snorkeling.jpg` | `sea turtle snorkeling tropical ocean` |
| `bali-safari-wildlife.jpg` | `Bali safari wildlife tropical` |
| `mount-batur-sunrise.jpg` | `Mount Batur sunrise Bali volcano` |
| `bali-water-sports.jpg` | `parasailing jet ski tropical beach` |
| `bali-atv-jungle.jpg` | `ATV jungle mud adventure Bali` |
| `bali-romantic-dinner.jpg` | `Jimbaran beach dinner sunset Bali` |
| `bali-car-driver.jpg` | `private driver car Bali tropical road` |

Sampai file tersebut tersedia, website memakai treatment editorial gelap tanpa foto. Ini sengaja dipilih agar tidak menampilkan destinasi atau aktivitas yang salah.

## Kriteria kurasi visual

- Palet: hijau gelap, krem hangat, terracotta, golden hour; hindari warna neon/turquoise berlebihan.
- Komposisi: subjek tidak selalu di tengah; sisakan negative space untuk copy.
- Cahaya: sunrise, overcast lembut, atau sunset; hindari midday yang keras.
- Sudut: campur wide aerial, eye-level landscape, dan close-up tekstur.
- Konsistensi: pilih satu treatment warna yang tenang; jangan mencampur HDR ekstrem dengan film look lembut.
- Manusia: gunakan siluet atau figur kecil untuk skala. Jangan gunakan wajah stock sebagai customer testimonial atau anggota tim.

## Video AI untuk hero premium

### Deliverable

- `hero-bali.mp4` — 16:9, 1920×1080 atau 2560×1440, 8–12 detik, 24 fps, tanpa audio, loop halus, target ≤8 MB.
- Opsional `hero-bali-mobile.mp4` — 9:16, 1080×1920, crop yang mempertahankan focal point di tengah/kanan.
- Simpan master kualitas tinggi terpisah; website memakai H.264 MP4 dan, bila tersedia, WebM terkompresi.

### Konsep yang paling aman

**Atmospheric establishing shot**, bukan dokumentasi tur. Kamera bergerak perlahan melewati lanskap Bali tanpa guide, kendaraan, customer, logo, atau aktivitas yang mengklaim fulfilment tertentu.

### Prompt utama

```text
Cinematic premium travel film of Bali at first light, slow aerial push over layered rice terraces and tropical palms, soft morning mist, deep emerald green and warm muted gold color palette, natural realistic light, calm elegant camera movement, subtle parallax, refined luxury editorial mood, wide composition with negative space on the left for website typography, no people in foreground, seamless loop, photorealistic, 16:9
```

### Negative prompt

```text
no logo, no text, no watermark, no hotel branding, no tour guide, no identifiable customer, no vehicle, no crowd, no exaggerated saturation, no fantasy architecture, no floating objects, no time-lapse flicker, no fast drone movement, no shaky camera, no sudden cut, no documentary claim
```

### Alternatif shot untuk scroll section

1. **Rice terrace reveal**  
   Keyword/prompt: `slow cinematic reveal through palm leaves to Bali rice terraces, morning haze, premium editorial travel film`.
2. **Ocean cliff transition**  
   Keyword/prompt: `gentle drone orbit above Bali ocean cliffs at golden hour, calm turquoise water, slow elegant movement, no people`.
3. **Temple silhouette**  
   Keyword/prompt: `distant Balinese temple silhouette at sunset, soft ocean mist, minimal composition, respectful non-documentary atmosphere`.
4. **Texture interlude**  
   Keyword/prompt: `macro cinematic palm shadow moving across warm limestone wall, subtle tropical breeze, luxury resort editorial texture, seamless loop`.

## Animasi scroll yang direkomendasikan

- Hero: video bergerak pelan sementara headline tetap stabil; hindari scrubbing berat pada mobile.
- Route cards: gambar scale 1.00 → 1.05 ketika masuk viewport.
- Process: nomor dan garis muncul bertahap, maksimal 300–500 ms.
- Trust section: image reveal dengan mask vertikal sederhana.
- Gunakan `prefers-reduced-motion` dan fallback foto untuk perangkat hemat data/gerak.

## Hal yang tidak boleh dilakukan

- Jangan memasukkan foto Pexels ke pipeline training atau scraping massal.
- Jangan membuat AI video seolah-olah merekam customer, driver, kendaraan, atau paket nyata.
- Jangan menyalin visual, shot, logo, atau identitas OpenBali/Bali.Discount.
- Jangan memakai foto tim/supplier tanpa izin tertulis untuk website, iklan, dan sosial.
