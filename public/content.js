export const content={
 brand:{name:'Tangkas',company:'PT The Agung Pamungkas',email:'admin@tangkasmotor.co.id',official:'https://tangkasmotor.co.id/'},
 chapters:[{eyebrow:'100% ELECTRIC. SEPENUHNYA TANGKAS.',title:'ENERGI BARU.<br><em>LANGKAH BESAR.</em>',body:'Dari rutinitas kota hingga perjalanan berikutnya.<br>Temukan cara baru untuk terus bergerak.'},{eyebrow:'01 / DIRANCANG UNTUK KESEHARIAN',title:'ISI ENERGI.<br><em>LANJUT LAGI.</em>',body:'Kemudahan pengisian di rumah, dengan konfigurasi baterai yang sesuai perjalananmu.'},{eyebrow:'02 / TEMUKAN RITMEMU',title:'JALANMU.<br><em>TANGKASMU.</em>',body:'Kenali pilihannya. Rasakan langsung perbedaannya.<br>Perjalanan baru dimulai dari sini.'}],
 models:[
 {id:'x7',name:'X7 New',tag:'The urban explorer',battery:'Lithium / SLA',image:'assets/x7-full.png',range:'Hingga 120 km*',power:'Konfirmasi varian',description:'Postur tegas. Ruang untuk perjalanan yang lebih besar.',source:'https://tangkasmotor.co.id/produk-kami/',note:'Klaim jarak dari publikasi X7. Spesifikasi berbeda menurut konfigurasi; konfirmasikan kepada showroom.'},
 {id:'p6',name:'P6 Pro',tag:'Your everyday companion',battery:'Lithium / SLA',image:'assets/p6.png',range:'100–120 km*',power:'2.000 W*',description:'Karakter klasik, energi baru untuk keseharianmu.',source:'https://tangkasmotor.co.id/wp-content/uploads/2025/05/P6-Pro-LTH-1-scaled.png',note:'Katalog Lithium: LFP 72V/48Ah, 2.000 W, kecepatan maksimum 70 km/jam. Klaim katalog, bukan jaminan kondisi nyata. Data SLA perlu konfirmasi.'},
 {id:'e6',name:'E6 Box',tag:'Made for city life',battery:'SLA',image:'assets/e6-cutout.png',range:'80–100 km*',power:'1.200 W*',description:'Praktis untuk berangkat, singgah, dan pulang.',source:'https://tangkasmotor.co.id/wp-content/uploads/2025/05/E6-Box-scaled.png',note:'Visual E6 merupakan ilustrasi berbasis katalog. Katalog E6 Box: SLA 72V/20Ah, 1.200 W, kecepatan maksimum 45 km/jam, klaim jarak 80–100 km. Berbeda dari beberapa listing regional; konfirmasi revisi unit sebelum membeli.'}
 ],
 branches:[
 ['bsd','BSD','Tangerang Selatan','Jl. Ciater Raya No.60, Rawa Buntu, Serpong, Banten 15310','6281250030060'],
 ['kranggan','Kranggan · Cibubur','Bekasi','Jl. Raya Kranggan No.97A, RT006/RW005, Jatiranggon, Jatisampurna, Jawa Barat 17433','6281220200056'],
 ['wisata','Kota Wisata','Bogor','Ruko Commpark, Canadian Broadway G02–G03, Kota Wisata Ciangsana, Limus Nunggal, Cileungsi, Jawa Barat 16968','6281250030070'],
 ['mustika','Mustika Jaya','Bekasi','Jl. H. Djole No.28, RT002/RW002, Padurenan, Mustika Jaya, Jawa Barat','6281252000075'],
 ['depok','Depok Dua','Depok','Jl. Proklamasi No.8–9, Mekar Jaya, Sukmajaya, Jawa Barat 16411','6281220200086'],
 ['prambanan','Prambanan','Yogyakarta','Jl. Raya Piyungan–Prambanan No.121, RT08/RW08, Klurak Baru, Bokoharjo, Sleman 55572','6281216668100'],
 ['bandung','Bandung Kota','Bandung','Jl. Moch. Ramdan No.21, Ancol, Regol, Jawa Barat 40252','6281220200076'],
 ['cimahi','Cimahi','Bandung Barat','Jl. Raya Gadobangkong No.115, Gadobangkong, Ngamprah, Jawa Barat 40552','6281216665868'],
 ['raffles','Raffles Hills','Depok','Raffles Hills Ruko ST No.2, Harjamukti, Tapos, Jawa Barat 16454','6281398363353'],
 ['selor','Tanjung Selor','Kalimantan Utara','Jl. Sabanar Lama RT57/RW21, Tanjung Selor Hilir','6282352470286'],
 ['surabaya','Kali Rungkut','Surabaya','Jl. Raya Kali Rungkut No.75, RT004/RW07, Kali Rungkut, Rungkut','6281267890060'],
 ['sidoarjo','Jenggolo','Sidoarjo','Jl. Jenggolo Utara Blok A No.10, RT010/RW002, Siwalanpanji, Buduran','6281267890535']
 ].map(([id,name,city,address,phone])=>({id,name,city,address,phone,source:'https://tangkasmotor.co.id/showroom-kami/',checked:'2026-09-30'}))
};
