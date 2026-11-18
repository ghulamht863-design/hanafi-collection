/**
 * HANAFI COLLECTIONS — Main Application Logic & Interactivity
 * Author: Senior Full-Stack Developer for HANAFI COLLECTIONS
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initHeroShowcase();
  initCollections();
  initProducts();
  initGallery();
  initCartDrawer();
  initContactForm();
  initSearchModal();
  initVideoModal();
  initScrollSpy();
});

/* ==========================================================================
   1. NAVIGATION & MOBILE MENU
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById("main-navbar");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu-drawer");
  const closeMobile = document.getElementById("close-mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Sticky blur effect on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("bg-[#090909]/95", "shadow-xl", "py-3");
      navbar?.classList.remove("py-5", "bg-transparent");
    } else {
      navbar?.classList.remove("bg-[#090909]/95", "shadow-xl", "py-3");
      navbar?.classList.add("py-5", "bg-transparent");
    }
  });

  // Mobile menu open / close
  mobileToggle?.addEventListener("click", () => {
    mobileMenu?.classList.remove("translate-x-full");
    document.body.style.overflow = "hidden";
  });

  const closeMenu = () => {
    mobileMenu?.classList.add("translate-x-full");
    document.body.style.overflow = "";
  };

  closeMobile?.addEventListener("click", closeMenu);
  mobileLinks.forEach(link => link.addEventListener("click", closeMenu));
}

/* ==========================================================================
   2. HERO SHOWCASE & SLIDER
   ========================================================================== */
function initHeroShowcase() {
  const heroImage = document.getElementById("hero-featured-image");
  const heroBadge = document.getElementById("hero-art-title");
  const prevBtn = document.getElementById("hero-prev-btn");
  const nextBtn = document.getElementById("hero-next-btn");
  const dotsContainer = document.getElementById("hero-dots");

  if (!heroImage) return;

  const showcaseProducts = (window.PRODUCTS_DATA || []).slice(0, 5);
  let currentIndex = 0;
  let autoplayTimer = null;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = showcaseProducts.map((_, i) => `
      <button class="hero-dot w-3 h-1 transition-all duration-300 rounded-full ${i === 0 ? 'bg-[#C6A15B] w-8' : 'bg-[#78614A]'}" data-index="${i}"></button>
    `).join("");

    dotsContainer.querySelectorAll(".hero-dot").forEach(dot => {
      dot.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        goToSlide(idx);
        resetAutoplay();
      });
    });
  }

  function goToSlide(index) {
    currentIndex = (index + showcaseProducts.length) % showcaseProducts.length;
    const current = showcaseProducts[currentIndex];

    heroImage.style.opacity = "0";
    heroImage.style.transform = "scale(0.97)";

    setTimeout(() => {
      heroImage.src = current.image;
      heroImage.alt = current.title;
      if (heroBadge) heroBadge.textContent = current.title;
      heroImage.style.opacity = "1";
      heroImage.style.transform = "scale(1)";

      // Update dots
      const dots = dotsContainer?.querySelectorAll(".hero-dot");
      dots?.forEach((d, i) => {
        if (i === currentIndex) {
          d.className = "hero-dot h-1 transition-all duration-300 rounded-full bg-[#C6A15B] w-8";
        } else {
          d.className = "hero-dot h-1 transition-all duration-300 rounded-full bg-[#78614A] w-3";
        }
      });
    }, 250);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5500);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================================================
   3. COLLECTIONS RENDERER (SECTION 4)
   ========================================================================== */
function initCollections() {
  const container = document.getElementById("collections-grid");
  if (!container || !window.COLLECTIONS_DATA) return;

  container.innerHTML = window.COLLECTIONS_DATA.map(col => `
    <div class="luxury-card group rounded-none flex flex-col justify-between p-6 relative border border-[#C6A15B]/30 hover:border-[#C6A15B]">
      <!-- Background Image with Dark Vignette -->
      <div class="h-64 sm:h-72 w-full overflow-hidden mb-6 relative bg-black/60 border border-[#C6A15B]/20">
        <img 
          src="${col.image}" 
          alt="${col.title}" 
          class="product-frame-image w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute top-3 left-3">
          <span class="gold-pill-badge text-[10px]">${col.badge}</span>
        </div>
      </div>

      <!-- Collection Info -->
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <h3 class="font-serif-luxury text-xl text-[#F5F0E6] mb-1 font-semibold group-hover:text-[#C6A15B] transition-colors">
            ${col.title}
          </h3>
          <p class="text-xs uppercase tracking-wider text-[#C6A15B] mb-3">${col.subtitle}</p>
          <p class="text-sm text-[#F5F0E6]/80 line-clamp-2 leading-relaxed mb-6 font-light">
            ${col.description}
          </p>
        </div>

        <button 
          onclick="filterProductsByCollection('${col.id}')"
          class="btn-luxury-outline w-full text-center text-xs py-3 group-hover:bg-[#C6A15B] group-hover:text-[#090909]"
        >
          <span>Explore Collection</span>
          <svg class="w-4 h-4 ml-1 inline-block transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </button>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   4. FEATURED PRODUCTS (SECTION 5)
   ========================================================================== */
let activeCategory = "all";
let searchQuery = "";

function initProducts() {
  renderProductFilters();
  renderProducts();
}

function renderProductFilters() {
  const filterContainer = document.getElementById("product-filter-tabs");
  if (!filterContainer) return;

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "quranic-wall-art", label: "Quranic Verses" },
    { id: "allah-99-names", label: "Allah & 99 Names" },
    { id: "islamic-calligraphy-frames", label: "Calligraphy Frames" },
    { id: "kaaba-madina-artwork", label: "Kaaba & Madina" },
    { id: "premium-islamic-wall-decor", label: "Bespoke Decor" }
  ];

  filterContainer.innerHTML = categories.map(cat => `
    <button 
      class="filter-tab-btn px-4 py-2 text-xs md:text-sm uppercase tracking-wider border transition-all duration-300 font-serif-luxury ${activeCategory === cat.id ? 'border-[#C6A15B] bg-[#C6A15B] text-[#090909] font-bold' : 'border-[#C6A15B]/30 text-[#F5F0E6]/80 hover:border-[#C6A15B]'}"
      onclick="setProductCategory('${cat.id}')"
    >
      ${cat.label}
    </button>
  `).join("");
}

window.setProductCategory = function(catId) {
  activeCategory = catId;
  renderProductFilters();
  renderProducts();
};

window.filterProductsByCollection = function(colId) {
  activeCategory = colId;
  renderProductFilters();
  renderProducts();

  const shopSection = document.getElementById("shop");
  if (shopSection) {
    shopSection.scrollIntoView({ behavior: "smooth" });
  }
};

function renderProducts() {
  const container = document.getElementById("products-grid");
  if (!container || !window.PRODUCTS_DATA) return;

  const filtered = window.PRODUCTS_DATA.filter(prod => {
    const matchCategory = activeCategory === "all" || prod.collectionId === activeCategory;
    const matchSearch = !searchQuery || 
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.collectionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center border border-[#C6A15B]/20 bg-[#121212]/40 p-8">
        <p class="font-serif-luxury text-xl text-[#F5F0E6] mb-2">No Sacred Artworks Match Your Selection</p>
        <p class="text-sm text-[#F5F0E6]/60 mb-6">Explore our complete collection or speak directly with our founder for bespoke creations.</p>
        <button onclick="setProductCategory('all')" class="btn-luxury-outline text-xs">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prod => `
    <div class="luxury-card group p-5 flex flex-col justify-between border border-[#C6A15B]/25 hover:border-[#C6A15B]">
      <!-- Frame Art Display -->
      <div class="relative h-72 sm:h-80 w-full overflow-hidden mb-5 bg-[#050505] border border-[#C6A15B]/20 flex items-center justify-center p-3">
        <img 
          src="${prod.image}" 
          alt="${prod.title}" 
          class="product-frame-image max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105 cursor-pointer"
          onclick="openProductModal('${prod.id}')"
          loading="lazy"
        />
        <div class="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onclick="openProductModal('${prod.id}')" 
            title="Inspect Details"
            class="w-9 h-9 rounded-full bg-[#090909]/90 border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909] flex items-center justify-center shadow-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
          </button>
          <button 
            onclick="openImageLightbox('${prod.image}', '${prod.title}')" 
            title="Full Screen View"
            class="w-9 h-9 rounded-full bg-[#090909]/90 border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909] flex items-center justify-center shadow-lg transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
          </button>
        </div>
        <div class="absolute bottom-3 left-3">
          <span class="gold-pill-badge text-[10px] bg-[#090909]/80 backdrop-blur-sm">${prod.dimensions}</span>
        </div>
      </div>

      <!-- Info Area -->
      <div class="flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between text-xs text-[#C6A15B] mb-1 font-serif-luxury uppercase tracking-wider">
            <span>${prod.collectionName}</span>
            <span>${prod.script}</span>
          </div>
          <h3 
            class="font-serif-luxury text-lg text-[#F5F0E6] mb-2 font-medium hover:text-[#C6A15B] transition-colors cursor-pointer"
            onclick="openProductModal('${prod.id}')"
          >
            ${prod.title}
          </h3>
          <p class="text-xs text-[#F5F0E6]/70 line-clamp-2 leading-relaxed mb-4 font-light">
            ${prod.shortDescription}
          </p>
        </div>

        <div>
          <!-- Price Placeholder with Clear Label -->
          <div class="flex items-baseline justify-between pt-3 border-t border-[#C6A15B]/20 mb-4">
            <div>
              <span class="font-serif-luxury text-xl font-bold text-[#C6A15B]">${prod.priceDisplay}</span>
              <p class="text-[10px] text-[#F5F0E6]/50 uppercase tracking-wider mt-0.5">${prod.priceNote}</p>
            </div>
          </div>

          <!-- 3 Mandatory Buttons: View Details, Add to Cart, WhatsApp Order -->
          <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <button 
                onclick="openProductModal('${prod.id}')"
                class="btn-luxury-outline text-[11px] py-2 px-3 text-center border-[#C6A15B]/50 hover:border-[#C6A15B]"
              >
                View Details
              </button>
              <button 
                onclick="window.hanafiCart.addItem('${prod.id}')"
                class="btn-gold-primary text-[11px] py-2 px-3 text-center"
              >
                Add to Cart
              </button>
            </div>

            <!-- WhatsApp Order Button -->
            <a 
              href="https://wa.me/918341886299?text=${encodeURIComponent('Assalamu Alaikum Rizwan Bhai, I am interested in ordering the ' + prod.title + ' (' + prod.priceDisplay + '). Please provide dimensions, framing options and delivery details.')}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp-direct w-full justify-center text-xs py-2 bg-[#090909] border border-[#C6A15B] text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909]"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

/* ==========================================================================
   5. SPECIAL GALLERY (SECTION 7) & LIGHTBOX
   ========================================================================== */
function initGallery() {
  const container = document.getElementById("gallery-masonry-grid");
  if (!container || !window.PRODUCTS_DATA) return;

  const galleryItems = [
    ...window.PRODUCTS_DATA.filter(p => p.id !== "custom-bespoke-curation")
  ];

  container.innerHTML = galleryItems.map(item => `
    <div class="relative group overflow-hidden border border-[#C6A15B]/30 hover:border-[#C6A15B] transition-all duration-500 bg-[#090909]">
      <div class="h-64 sm:h-72 w-full overflow-hidden bg-black flex items-center justify-center p-2">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 cursor-pointer"
          onclick="openImageLightbox('${item.image}', '${item.title}')"
          loading="lazy"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4">
        <p class="text-[10px] uppercase text-[#C6A15B] tracking-widest font-serif-luxury">${item.script || 'Sacred Collection'}</p>
        <p class="text-sm font-serif-luxury text-[#F5F0E6] font-medium">${item.title}</p>
      </div>
      <button 
        onclick="openImageLightbox('${item.image}', '${item.title}')"
        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#090909]/80 border border-[#C6A15B] text-[#C6A15B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
      </button>
    </div>
  `).join("");
}

// Lightbox controller
window.openImageLightbox = function(imageSrc, imageTitle) {
  const modal = document.getElementById("luxury-lightbox-modal");
  const img = document.getElementById("lightbox-image");
  const title = document.getElementById("lightbox-title");

  if (!modal || !img) return;

  img.src = imageSrc;
  if (title) title.textContent = imageTitle || "HANAFI COLLECTIONS Sacred Artwork";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeImageLightbox = function() {
  const modal = document.getElementById("luxury-lightbox-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
};

/* ==========================================================================
   6. PRODUCT DETAILS MODAL
   ========================================================================== */
window.openProductModal = function(productId) {
  const product = (window.PRODUCTS_DATA || []).find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("luxury-product-modal");
  const content = document.getElementById("product-modal-body");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
      <!-- Left: High-Res Frame Showcase -->
      <div class="flex flex-col items-center justify-center bg-[#050505] border border-[#C6A15B]/30 p-4 relative">
        <img 
          src="${product.image}" 
          alt="${product.title}" 
          class="max-h-[460px] w-full object-contain shadow-2xl"
        />
        <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#C6A15B] bg-[#090909]/90 backdrop-blur-sm p-2 border border-[#C6A15B]/30">
          <span>Dimensions: ${product.dimensions}</span>
          <button 
            onclick="openImageLightbox('${product.image}', '${product.title}')"
            class="text-[#F5F0E6] hover:text-[#C6A15B] underline"
          >
            Zoom Fullscreen
          </button>
        </div>
      </div>

      <!-- Right: Detailed Specifications & Ordering -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <span class="gold-pill-badge">${product.collectionName}</span>
            <span class="text-xs uppercase tracking-widest text-[#C6A15B]">${product.script}</span>
          </div>

          <h2 class="font-serif-luxury text-2xl md:text-3xl text-[#F5F0E6] mb-3">
            ${product.title}
          </h2>

          <div class="font-serif-luxury text-2xl font-bold text-[#C6A15B] mb-1">
            ${product.priceDisplay}
          </div>
          <p class="text-xs text-[#F5F0E6]/50 mb-6 uppercase tracking-wider">${product.priceNote}</p>

          <p class="text-sm text-[#F5F0E6]/90 leading-relaxed mb-6 font-light">
            ${product.fullDescription}
          </p>

          ${product.translation ? `
            <div class="bg-[#121212] border-l-2 border-[#C6A15B] p-4 mb-6">
              <p class="text-xs uppercase text-[#C6A15B] font-serif-luxury tracking-widest mb-1">Sacred Translation / Meaning</p>
              <p class="text-xs text-[#F5F0E6]/80 italic">"${product.translation}"</p>
            </div>
          ` : ''}

          <!-- Specifications Table -->
          <div class="border border-[#C6A15B]/20 bg-[#121212]/50 p-4 mb-6 space-y-2 text-xs">
            <div class="flex justify-between py-1 border-b border-[#C6A15B]/10">
              <span class="text-[#F5F0E6]/60">Dimensions</span>
              <span class="text-[#F5F0E6] font-medium">${product.dimensions}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-[#C6A15B]/10">
              <span class="text-[#F5F0E6]/60">Materials</span>
              <span class="text-[#F5F0E6] font-medium">${product.materials}</span>
            </div>
            <div class="flex justify-between py-1 border-b border-[#C6A15B]/10">
              <span class="text-[#F5F0E6]/60">Artisan Finish</span>
              <span class="text-[#F5F0E6] font-medium">${product.finish}</span>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-[#F5F0E6]/60">Weight</span>
              <span class="text-[#F5F0E6] font-medium">${product.weight}</span>
            </div>
          </div>
        </div>

        <!-- Action CTAs -->
        <div class="space-y-3 pt-4 border-t border-[#C6A15B]/20">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onclick="window.hanafiCart.addItem('${product.id}'); closeProductModal();"
              class="btn-gold-primary text-xs py-3 w-full"
            >
              Add to Shopping Bag
            </button>
            <a 
              href="https://wa.me/918341886299?text=${encodeURIComponent('Assalamu Alaikum Rizwan Bhai, I want to discuss/order ' + product.title + ' (' + product.priceDisplay + '). Please provide available frame sizes and custom framing options.')}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-whatsapp-direct justify-center text-xs py-3 bg-[#090909] text-[#C6A15B] border border-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909]"
            >
              <svg class="w-4 h-4 fill-current mr-1" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Instant WhatsApp Order</span>
            </a>
          </div>
          <p class="text-[11px] text-center text-[#F5F0E6]/50">
            Handcrafted in Hyderabad, India • Insured shipping across India & international destinations
          </p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
};

window.closeProductModal = function() {
  const modal = document.getElementById("luxury-product-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
};

/* ==========================================================================
   7. SHOPPING CART DRAWER
   ========================================================================== */
function initCartDrawer() {
  const openButtons = document.querySelectorAll(".cart-drawer-toggle");
  const closeBtn = document.getElementById("close-cart-drawer");
  const drawer = document.getElementById("cart-drawer-panel");
  const backdrop = document.getElementById("cart-drawer-backdrop");

  const openDrawer = () => {
    drawer?.classList.remove("translate-x-full");
    backdrop?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    drawer?.classList.add("translate-x-full");
    backdrop?.classList.add("hidden");
    document.body.style.overflow = "";
  };

  openButtons.forEach(btn => btn.addEventListener("click", openDrawer));
  closeBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  // Subscribe to cart changes
  window.hanafiCart.subscribe((items) => {
    renderCartDrawerContent(items);
  });
}

function renderCartDrawerContent(items) {
  const listContainer = document.getElementById("cart-items-list");
  const emptyState = document.getElementById("cart-empty-state");
  const footerArea = document.getElementById("cart-drawer-footer");
  const totalDisplay = document.getElementById("cart-total-amount");

  if (!listContainer) return;

  if (items.length === 0) {
    listContainer.innerHTML = "";
    emptyState?.classList.remove("hidden");
    footerArea?.classList.add("hidden");
    return;
  }

  emptyState?.classList.add("hidden");
  footerArea?.classList.remove("hidden");

  listContainer.innerHTML = items.map(item => `
    <div class="flex items-center gap-4 py-4 border-b border-[#C6A15B]/20 bg-[#121212]/40 p-3">
      <div class="w-16 h-16 shrink-0 bg-[#050505] border border-[#C6A15B]/30 p-1 flex items-center justify-center">
        <img src="${item.image}" alt="${item.title}" class="max-h-full max-w-full object-contain" />
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-serif-luxury text-xs text-[#F5F0E6] truncate font-medium">${item.title}</h4>
        <p class="text-[11px] text-[#C6A15B] font-semibold">${item.priceDisplay || "₹000"}</p>
        <p class="text-[10px] text-[#F5F0E6]/50">${item.dimensions}</p>

        <!-- Qty selector -->
        <div class="flex items-center gap-3 mt-2">
          <div class="flex items-center border border-[#C6A15B]/40">
            <button 
              onclick="window.hanafiCart.updateQuantity('${item.id}', ${item.quantity - 1})"
              class="w-6 h-6 flex items-center justify-center text-xs text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909]"
            >-</button>
            <span class="w-8 text-center text-xs text-[#F5F0E6] font-mono">${item.quantity}</span>
            <button 
              onclick="window.hanafiCart.updateQuantity('${item.id}', ${item.quantity + 1})"
              class="w-6 h-6 flex items-center justify-center text-xs text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#090909]"
            >+</button>
          </div>
          <button 
            onclick="window.hanafiCart.removeItem('${item.id}')"
            class="text-[11px] text-[#78614A] hover:text-[#C6A15B] underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join("");

  const total = window.hanafiCart.getTotalAmount();
  if (totalDisplay) {
    totalDisplay.textContent = window.hanafiCart.formatCurrency(total);
  }
}

window.checkoutCartViaWhatsApp = function() {
  const url = window.hanafiCart.generateWhatsAppOrderUrl();
  window.open(url, "_blank", "noopener,noreferrer");
};

/* ==========================================================================
   8. CONTACT FORM WITH REAL WHATSAPP REDIRECT (HONEST FLOW)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("enquiry-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("enquiry-name")?.value.trim();
    const phone = document.getElementById("enquiry-phone")?.value.trim();
    const interest = document.getElementById("enquiry-interest")?.value;
    const message = document.getElementById("enquiry-message")?.value.trim();

    if (!name || !phone) {
      alert("Please provide your name and WhatsApp contact number.");
      return;
    }

    let text = `*Assalamu Alaikum Rizwan Bhai (HANAFI COLLECTIONS),*\n\n`;
    text += `I would like to inquire about your Islamic wall art pieces.\n\n`;
    text += `*Enquiry Details:*\n`;
    text += `• *Name:* ${name}\n`;
    text += `• *Mobile / WhatsApp:* ${phone}\n`;
    text += `• *Artwork of Interest:* ${interest || 'General Collection / Custom Commission'}\n`;
    if (message) {
      text += `• *Message / Custom Size:* ${message}\n`;
    }
    text += `\nLooking forward to your guidance on availability and delivery. JazakAllah Khair!`;

    const cleanPhone = window.BRAND_CONFIG?.phoneClean || "918341886299";
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

    // User is honestly redirected to WhatsApp
    window.open(waUrl, "_blank", "noopener,noreferrer");
    form.reset();
  });
}

/* ==========================================================================
   9. SEARCH MODAL & INSTANT FILTER
   ========================================================================== */
function initSearchModal() {
  const searchModal = document.getElementById("search-modal");
  const openSearchBtn = document.getElementById("open-search-modal");
  const closeSearchBtn = document.getElementById("close-search-modal");
  const searchInput = document.getElementById("site-search-input");

  const openSearch = () => {
    searchModal?.classList.remove("hidden");
    searchModal?.classList.add("flex");
    searchInput?.focus();
    document.body.style.overflow = "hidden";
  };

  const closeSearch = () => {
    searchModal?.classList.add("hidden");
    searchModal?.classList.remove("flex");
    document.body.style.overflow = "";
  };

  openSearchBtn?.addEventListener("click", openSearch);
  closeSearchBtn?.addEventListener("click", closeSearch);

  searchInput?.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderProducts();

    // Scroll to products if query is entered
    if (searchQuery.length >= 2) {
      closeSearch();
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }
  });
}

/* ==========================================================================
   10. VIDEO MODAL (WALL ART SHOWCASE)
   ========================================================================== */
function initVideoModal() {
  const modal = document.getElementById("luxury-video-modal");
  const openBtn = document.getElementById("open-video-showcase");
  const closeBtn = document.getElementById("close-video-modal");
  const videoPlayer = document.getElementById("showcase-video-player");

  openBtn?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
    modal?.classList.add("flex");
    videoPlayer?.play();
    document.body.style.overflow = "hidden";
  });

  const closeVideo = () => {
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
    videoPlayer?.pause();
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", closeVideo);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeVideo();
  });
}

/* ==========================================================================
   11. SCROLL SPY & ACTIVE NAV
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.add("text-[#C6A15B]");
        link.classList.remove("text-[#F5F0E6]");
      } else {
        link.classList.remove("text-[#C6A15B]");
        link.classList.add("text-[#F5F0E6]");
      }
    });
  });
}
