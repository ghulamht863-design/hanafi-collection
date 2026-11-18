/**
 * HANAFI COLLECTIONS — Product & Brand Data
 * Strictly adheres to Brand Palette:
 * Luxury Black: #090909
 * Royal Gold:   #C6A15B
 * Elegant Ivory: #F5F0E6
 * Rich Brown:   #78614A
 */

const BRAND_CONFIG = {
  name: "HANAFI COLLECTIONS",
  tagline: "Premium Luxury Islamic Decor & Islamic Wall Art",
  founder: "Rizwan Raza Qadri",
  location: "Hyderabad, India",
  phone: "+91 8341886299",
  phoneClean: "918341886299",
  whatsappUrl: "https://wa.me/918341886299",
  instagramUrl: "https://www.instagram.com/hanafi_collections?avpt=NjltOTltbXR1NzM5",
  youtubeUrl: "https://youtube.com/@rizwan_raza_official?si=WvzEyx-tyOE_WNFv",
  currency: "₹",
  copyright: "© 2026 HANAFI COLLECTIONS. All Rights Reserved."
};

const COLLECTIONS_DATA = [
  {
    id: "calligraphy-frames",
    title: "Islamic Calligraphy Frames",
    subtitle: "Sacred script crafted in 3D royal relief",
    description: "Museum-grade Arabic calligraphy featuring classical Thuluth, Diwani, and Kufic scripts adorned with genuine gold foil finishing.",
    image: "assets/images/ayat-al-kursi-royal-gold.jpg",
    badge: "Most Revered"
  },
  {
    id: "allah-99-names",
    title: "Allah & 99 Names",
    subtitle: "Asma-ul-Husna Masterpieces",
    description: "The 99 Divine Names of Allah enshrined in illuminated geometric arches surrounding the majestic central Ism-e-Zat.",
    image: "assets/images/asma-ul-husna-99-names.jpg",
    badge: "Grand Statement"
  },
  {
    id: "quranic-wall-art",
    title: "Quranic Wall Art",
    subtitle: "Verses of Protection & Grace",
    description: "Ayat al-Kursi, Surah Al-Ikhlas, and powerful Quranic prayers rendered in botanical relief and imperial gold accents.",
    image: "assets/images/hasbunallah-wanikmal-wakeel.jpg",
    badge: "Spiritual Aura"
  },
  {
    id: "islamic-decorative-frames",
    title: "Islamic Decorative Frames",
    subtitle: "Harmonious balance of art and faith",
    description: "Handcrafted high-density baroque moldings finished in antique gold leaf and obsidian lacquer, built to last generations.",
    image: "assets/images/ya-hayyu-ya-qayyum-luxury.jpg",
    badge: "Artisanal Heritage"
  },
  {
    id: "kaaba-madina-artwork",
    title: "Kaaba & Madina Artwork",
    subtitle: "Sanctuaries of peace and longing",
    description: "Magnificent visual homages to the Holy Kaaba al-Musharrafah, the Green Dome of Madina Munawwarah, and blessed spiritual shrines.",
    image: "assets/images/kaaba-madina-sacred-shrines.jpg",
    badge: "Sacred Longing"
  },
  {
    id: "premium-islamic-wall-decor",
    title: "Premium Islamic Wall Decor",
    subtitle: "Bespoke architectural focal points",
    description: "Large-format wall panels, dual-tone leather and canvas reliefs designed exclusively for upscale residences, villas, and majlis.",
    image: "assets/images/ya-hayyu-ya-qayyum-luxury.jpg",
    badge: "Bespoke Commissions"
  }
];

const PRODUCTS_DATA = [
  {
    id: "ayat-al-kursi-royal-gold",
    title: "Royal Teardrop Ayat Al-Kursi",
    collectionId: "quranic-wall-art",
    collectionName: "Quranic Wall Art",
    shortDescription: "3D embossed metallic gold Thuluth calligraphy in an imperial teardrop silhouette crowned with 'Allah', set in an ornate baroque gilt frame.",
    fullDescription: "A breathtaking centerpiece of divine majesty. This artwork presents Ayat al-Kursi (The Throne Verse - Surah Al-Baqarah 2:255), revered across the Islamic world for its divine protection. The sacred verses are sculpted in 3D metallic gold relief, flowing in a regal teardrop medallion crowned with the supreme name of Allah. Encased in a lavishly carved baroque gold leaf frame with velvet black backing.",
    script: "Thuluth Calligraphy",
    translation: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Editable placeholder — Custom sizing upon request",
    dimensions: "36\" x 24\" (Standard) | 48\" x 32\" (Large)",
    materials: "Sculpted 3D Metallic Gold Relief, High-Density Gilt Polymer Molding, Anti-Glare Glass",
    weight: "approx. 6.8 kg",
    finish: "Royal Gold Leaf & Textured Obsidian Black",
    image: "assets/images/ayat-al-kursi-royal-gold.jpg",
    featured: true,
    tags: ["Ayat al-Kursi", "Quranic", "Throne Verse", "Gold Frame", "Bestseller"]
  },
  {
    id: "asma-ul-husna-99-names",
    title: "Asma-ul-Husna (The 99 Divine Names)",
    collectionId: "allah-99-names",
    collectionName: "Allah & 99 Names",
    shortDescription: "The complete 99 Beautiful Names of Allah in rhythmic Islamic arch medallions surrounding the monumental centerpiece 'Allah'.",
    fullDescription: "An expansive spiritual tapestry immortalizing the 99 Divine Attributes of Allah (Asma-ul-Husna). Each sacred name is individually delineated within delicate arabesque tessellation arches, guiding the eye toward the profound diamond centerpiece bearing the Ism-e-Zat 'Allah'. The frame is an architectural tour-de-force with classical acanthus filigree and ebony accents.",
    script: "Classical Naskh & Thuluth",
    translation: "And to Allah belong the best names, so invoke Him by them... (Surah Al-A'raf 7:180)",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Editable placeholder — Custom sizing upon request",
    dimensions: "48\" x 30\" (Grand Statement)",
    materials: "Multi-layered Arch Inlay, Baroque Gold Leaf & Matte Obsidian Frame, Reinforced Gallery Backing",
    weight: "approx. 9.2 kg",
    finish: "Illuminated Slate Blue, Ivory & Antique Gold",
    image: "assets/images/asma-ul-husna-99-names.jpg",
    featured: true,
    tags: ["99 Names", "Asma-ul-Husna", "Allah", "Grand Gallery", "Islamic Calligraphy"]
  },
  {
    id: "hasbunallah-wanikmal-wakeel",
    title: "Hasbunallahu Wa Ni'mal Wakeel (Floral Relief)",
    collectionId: "quranic-wall-art",
    collectionName: "Quranic Wall Art",
    shortDescription: "Delicately raised 3D ivory calligraphy flanked by sculpted blossoming cherry branches upon a rich black velvet field.",
    fullDescription: "A sanctuary of peace for the heart. This exquisite artwork features the eternal Quranic affirmation: 'Hasbunallahu Wa Ni'mal Wakeel' (Allah is sufficient for us, and He is the best Disposer of affairs - Surah Ali 'Imran 3:173). The pure ivory Arabic calligraphy rises gracefully from the canvas, entwined with meticulously sculpted pearlescent floral branches and framed in museum-grade ornate gold.",
    script: "Thuluth Jali Script",
    translation: "Allah is sufficient for us, and He is the best Disposer of affairs.",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Editable placeholder — Custom sizing upon request",
    dimensions: "42\" x 26\" (Panoramic Statement)",
    materials: "Hand-sculpted Bas-Relief Blossom Elements, 3D Resin Calligraphy, Gilded Acanthus Frame",
    weight: "approx. 7.5 kg",
    finish: "Sculpted Pearl White, Royal Gold & Midnight Black",
    image: "assets/images/hasbunallah-wanikmal-wakeel.jpg",
    featured: true,
    tags: ["Hasbunallah", "Floral Relief", "Surah Ali Imran", "Ivory Calligraphy"]
  },
  {
    id: "ya-hayyu-ya-qayyum-luxury",
    title: "Ya Hayyu Ya Qayyum (Dual-Tone Leather & Ivory)",
    collectionId: "islamic-calligraphy-frames",
    collectionName: "Islamic Calligraphy Frames",
    shortDescription: "Monumental Thuluth calligraphy over a two-tone rich saddle brown and ivory arabesque damask canvas, framed in royal gold.",
    fullDescription: "Inspired by the prophetic supplication taught by the Messenger of Allah ﷺ: 'Ya Hayyu Ya Qayyum, bi-rahmatika astagheeth' (O Ever-Living, O Self-Sustaining, in Your Mercy do I seek relief). The bold, sweeping black strokes commanding the upper rich saddle-brown field contrast harmoniously with the delicate ivory arabesque scrollwork below. Finished with a heavy-gauge gilded molding.",
    script: "Monumental Thuluth",
    translation: "O Ever-Living, O Self-Sustaining, by Your Mercy I seek assistance.",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Editable placeholder — Custom sizing upon request",
    dimensions: "40\" x 26\" (Refined Landscape)",
    materials: "Embossed Textured Dual Canvas, Archival Pigment, Ornate Corner Fluted Gold Frame",
    weight: "approx. 7.0 kg",
    finish: "Rich Saddle Brown, Elegant Ivory & Burnished Gold",
    image: "assets/images/ya-hayyu-ya-qayyum-luxury.jpg",
    featured: true,
    tags: ["Ya Hayyu Ya Qayyum", "Dual Tone", "Rich Brown", "Thuluth", "Dua"]
  },
  {
    id: "kaaba-madina-sacred-shrines",
    title: "Sacred Shrines & Holy Kaaba Heritage Frame",
    collectionId: "kaaba-madina-artwork",
    collectionName: "Kaaba & Madina Artwork",
    shortDescription: "The Kaaba al-Musharrafah, Green Dome of Madina Munawwarah, Baghdad Sharif & blessed shrines with Durood and Raza poetry.",
    fullDescription: "A deeply moving tribute to the spiritual centers of Islamic heritage. This artwork brings together the blessed Kaaba, the luminous Green Dome of Madina Munawwarah, the golden domes of sacred heritage, and reverent Durood-o-Salaam. Adorned with the beloved poetic verse: 'Kaise Aaqao Ka Banda Hoon Raza, Bol Baale Meri Sarkaro Ke' in crisp, elegant script with high-gloss black and gold framing.",
    script: "Arabic Durood & Nastaliq Poetry",
    translation: "Sending peace and blessings upon our Master Muhammad ﷺ and honoring the sacred heritage.",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Editable placeholder — Custom sizing upon request",
    dimensions: "36\" x 24\" (Classic Gallery)",
    materials: "Ultra-High-Definition Archival Print on Silk Canvas, Black Lacquer Frame with Inner Gold Fillet",
    weight: "approx. 5.5 kg",
    finish: "Full Spectrum Sacred Imagery with Gilt Inlay",
    image: "assets/images/kaaba-madina-sacred-shrines.jpg",
    featured: true,
    tags: ["Kaaba", "Madina", "Green Dome", "Durood Shareef", "Sacred Shrines"]
  },
  {
    id: "custom-bespoke-curation",
    title: "Custom Bespoke Islamic Wall Art Commission",
    collectionId: "premium-islamic-wall-decor",
    collectionName: "Premium Islamic Wall Decor",
    shortDescription: "Bespoke commissions tailored to your interior architecture. Choose your Ayah, dimensions, font script, and museum-grade frame.",
    fullDescription: "Collaborate directly with founder Rizwan Raza Qadri to create a one-of-a-kind Islamic art installation for your luxury residence, villa majlis, or corporate office. From 6-foot panoramic Ayat al-Kursi panels to personalized family crest calligraphy with genuine 24K gold foil application.",
    script: "Custom (Thuluth, Kufic, Diwani, Naskh)",
    translation: "Customized to your chosen Quranic passage or invocation",
    priceNumber: 0,
    priceDisplay: "₹000",
    priceNote: "Direct consultation with Rizwan Raza Qadri via WhatsApp",
    dimensions: "Customized from 24\" up to 96\" (8 Feet)",
    materials: "Hand-selected hardwoods, 3D laser-cut acrylic/resin relief, 24K gold foil leaf",
    weight: "Varies by dimension",
    finish: "Bespoke to your interior color palette",
    image: "assets/images/ayat-al-kursi-royal-gold.jpg",
    featured: false,
    tags: ["Bespoke", "Custom Order", "Majlis Decor", "Villa Framing"]
  }
];

const WHY_CHOOSE_DATA = [
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/></svg>`,
    title: "Beautiful Islamic Artwork",
    description: "Every stroke is crafted with profound reverence for authentic Arabic calligraphy, preserving the sacred integrity of Quranic verses and Asma-ul-Husna."
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
    title: "Premium Decorative Designs",
    description: "Multi-layered 3D bas-reliefs, museum-grade gilt moldings, and anti-glare protection designed to endure for generations without fading."
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
    title: "Elegant Home Styling",
    description: "Designed specifically to elevate contemporary luxury villas, classic drawing rooms, prayer spaces, and presidential majlis environments."
  },
  {
    icon: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>`,
    title: "Customer-Focused Service",
    description: "Direct personal consultation with founder Rizwan Raza Qadri in Hyderabad, with tailored size customization and secure insured white-glove shipping."
  }
];

// Export to window
if (typeof window !== "undefined") {
  window.BRAND_CONFIG = BRAND_CONFIG;
  window.COLLECTIONS_DATA = COLLECTIONS_DATA;
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.WHY_CHOOSE_DATA = WHY_CHOOSE_DATA;
}
