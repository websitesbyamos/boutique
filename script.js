/* ==========================================================================
   LOPHIX BOUTIQUE — SCRIPT
   Vanilla JS only. Organized by feature area. Each section is self
   contained and reads DOM nodes it needs at the top.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. PRODUCT DATA ---------- */
  // Single source of truth for products. Product grid, search, and the
  // quick view modal all read from this array instead of the DOM.
  const PRODUCTS = [
    { id: "p01", name: "Amara Wrap Dress", category: "dresses", price: 45000, rating: 4.8, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80", desc: "A fluid wrap dress in georgette, cut to move with you from desk to dinner." },
    { id: "p02", name: "Ife Tailored Blazer", category: "corporate", price: 62000, rating: 4.9, img: "https://images.unsplash.com/photo-1548126466-4470dfd3a209?auto=format&fit=crop&w=600&q=80", desc: "Structured shoulders, a nipped waist, and a lining that breathes through Lagos heat." },
    { id: "p03", name: "Zuri Linen Set", category: "casual", price: 38000, rating: 4.6, img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80", desc: "A two-piece linen set for weekend errands that still needs to look put together." },
    { id: "p04", name: "Nkechi Pointed Heels", category: "shoes", price: 54000, rating: 4.7, img: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80", desc: "A pointed-toe heel in soft leather with a comfort insole for full-day wear." },
    { id: "p05", name: "Adaeze Structured Tote", category: "bags", price: 71000, rating: 4.9, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80", desc: "Full-grain leather tote with an interior laptop sleeve, built for the commute." },
    { id: "p06", name: "Folake Gold Hoops", category: "accessories", price: 18000, rating: 4.5, img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", desc: "14k gold-plated hoops, light enough for all-day wear." },
    { id: "p07", name: "Bimpe Satin Slip Dress", category: "dresses", price: 49000, rating: 4.8, img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80", desc: "Bias-cut satin that skims rather than clings, in a shade that photographs true." },
    { id: "p08", name: "Chidinma Pencil Skirt Suit", category: "corporate", price: 68000, rating: 4.9, img: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=600&q=80", desc: "A two-piece suit with a pencil skirt cut for movement, not restriction." },
    { id: "p09", name: "Yemi Denim Jacket", category: "casual", price: 32000, rating: 4.4, img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", desc: "Mid-weight denim with a relaxed shoulder, worn open or buttoned to the top." },
    { id: "p10", name: "Simisola Ankle Boots", category: "shoes", price: 58000, rating: 4.7, img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80", desc: "Block-heel ankle boots in suede, built for Lagos rain without losing polish." },
    { id: "p11", name: "Titi Quilted Clutch", category: "bags", price: 41000, rating: 4.6, img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80", desc: "A quilted evening clutch with a detachable chain strap." },
    { id: "p12", name: "Lola No. 5 Eau de Parfum", category: "accessories", price: 27000, rating: 4.8, img: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80", desc: "A warm floral with notes of ylang-ylang, amber, and sandalwood." },
  ];

  const GALLERY_IMAGES = [
    { img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80", alt: "Model in a wrap dress" },
    { img: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500&q=80", alt: "Editorial fashion shot" },
    { img: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=500&q=80", alt: "Woman in tailored outfit" },
    { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80", alt: "Fashion detail shot" },
    { img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=500&q=80", alt: "Pair of designer shoes" },
    { img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=500&q=80", alt: "Woman walking in street style outfit" },
    { img: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=500&q=80", alt: "Close up of accessories" },
    { img: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=500&q=80", alt: "Model in corporate wear" },
  ];

  const formatNaira = (value) => "₦" + value.toLocaleString("en-NG");

  /* ---------- 2. LOADING SCREEN ---------- */
  // Hides as soon as the page is interactive rather than waiting for every
  // image to finish downloading (the "load" event can take a long time on
  // a page with this many photos). A hard cap guarantees it never lingers.
  const loader = document.getElementById("loader");
  const hideLoader = () => loader.classList.add("is-hidden");
  setTimeout(hideLoader, 350);
  setTimeout(hideLoader, 1500); // hard cap, in case something above fails

  /* ---------- 3. STICKY NAV + ACTIVE LINK HIGHLIGHT ---------- */
  const header = document.getElementById("siteHeader");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = Array.from(navLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);

    let currentId = sections[0] ? sections[0].id : null;
    const scrollPos = window.scrollY + window.innerHeight * 0.35;
    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });

    const backToTop = document.getElementById("backToTop");
    backToTop.classList.toggle("is-visible", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. MOBILE MENU ---------- */
  const hamburger = document.getElementById("hamburger");
  const navbarMenu = document.getElementById("navbarMenu");
  hamburger.addEventListener("click", () => {
    const isOpen = navbarMenu.classList.toggle("is-open");
    hamburger.classList.toggle("is-active", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("is-open");
      hamburger.classList.remove("is-active");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 5. SEARCH ---------- */
  const searchToggle = document.getElementById("searchToggle");
  const searchPanel = document.getElementById("searchPanel");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  const openSearch = () => {
    searchPanel.classList.add("is-open");
    searchToggle.setAttribute("aria-expanded", "true");
    setTimeout(() => searchInput.focus(), 350);
  };
  const closeSearch = () => {
    searchPanel.classList.remove("is-open");
    searchToggle.setAttribute("aria-expanded", "false");
    searchInput.value = "";
    searchResults.innerHTML = "";
  };
  searchToggle.addEventListener("click", () => {
    searchPanel.classList.contains("is-open") ? closeSearch() : openSearch();
  });
  searchClose.addEventListener("click", closeSearch);

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) { searchResults.innerHTML = ""; return; }
    const matches = PRODUCTS.filter((p) => p.name.toLowerCase().includes(query) || p.category.includes(query));
    searchResults.innerHTML = matches.length
      ? matches.map((p) => `
          <a class="search-result" href="#products" data-product-id="${p.id}">
            <img src="${p.img}" alt="" loading="lazy" />
            <span>${p.name}</span>
          </a>`).join("")
      : `<p class="search-empty">No products match "${searchInput.value}".</p>`;

    searchResults.querySelectorAll(".search-result").forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        closeSearch();
        document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
        setTimeout(() => openQuickView(el.dataset.productId), 500);
      });
    });
  });

  /* ---------- 6. RENDER PRODUCT GRID ---------- */
  const productGrid = document.getElementById("productGrid");

  function renderProducts(list) {
    productGrid.innerHTML = list.map((p, i) => `
      <article class="product-card" data-category="${p.category}" style="animation-delay:${(i % 4) * 0.06}s">
        <div class="product-card__media">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          <button class="product-card__wishlist" data-wishlist-id="${p.id}" aria-label="Add ${p.name} to wishlist">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.1C.5 8.5 2 5 5.6 5c2 0 3.4 1 4.4 2.4C11 6 12.4 5 14.4 5 18 5 19.5 8.5 22 11.9 19.5 16.4 12 21 12 21z"/></svg>
          </button>
          <button class="product-card__quick" data-quickview-id="${p.id}">Quick View</button>
        </div>
        <div class="product-card__body">
          <h3 class="product-card__name">${p.name}</h3>
          <div class="product-card__rating">${"★".repeat(Math.round(p.rating))}${"☆".repeat(5 - Math.round(p.rating))} <span style="color:var(--color-ink-soft)">(${p.rating})</span></div>
          <div class="product-card__footer">
            <span class="product-card__price">${formatNaira(p.price)}</span>
            <button class="product-card__add" data-cart-id="${p.id}" aria-label="Add ${p.name} to cart">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>
      </article>`).join("");
    bindProductCardEvents();
  }
  renderProducts(PRODUCTS);

  /* ---------- 7. PRODUCT FILTERING ---------- */
  const filterChips = document.querySelectorAll(".filter-chip");
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const filter = chip.dataset.filter;
      const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
      renderProducts(filtered);
    });
  });

  document.querySelectorAll(".collection-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = card.dataset.filter;
      const chip = document.querySelector(`.filter-chip[data-filter="${target}"]`);
      if (chip) {
        e.preventDefault();
        chip.click();
        document.getElementById("products").scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ---------- 8. RENDER GALLERY ---------- */
  const galleryGrid = document.getElementById("galleryGrid");
  galleryGrid.innerHTML = GALLERY_IMAGES.map((g) => `
    <div class="gallery-item reveal" data-full="${g.img.replace("w=500", "w=1400")}">
      <img src="${g.img}" alt="${g.alt}" loading="lazy" />
    </div>`).join("");

  /* ---------- 9. LIGHTBOX ---------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector("img").alt;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });

  /* ---------- 10. CART + WISHLIST STATE ---------- */
  const cart = new Map();      // productId -> quantity
  const wishlist = new Set();  // productId

  const cartToggle = document.getElementById("cartToggle");
  const wishlistToggle = document.getElementById("wishlistToggle");
  const cartPanel = document.getElementById("cartPanel");
  const wishlistPanel = document.getElementById("wishlistPanel");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const cartCount = document.getElementById("cartCount");
  const wishlistCount = document.getElementById("wishlistCount");
  const cartItemsEl = document.getElementById("cartItems");
  const wishlistItemsEl = document.getElementById("wishlistItems");
  const cartSubtotalEl = document.getElementById("cartSubtotal");

  function openDrawer(panel) {
    document.querySelectorAll(".drawer").forEach((d) => d.classList.remove("is-open"));
    panel.classList.add("is-open");
    drawerBackdrop.classList.add("is-visible");
  }
  function closeDrawers() {
    document.querySelectorAll(".drawer").forEach((d) => d.classList.remove("is-open"));
    drawerBackdrop.classList.remove("is-visible");
  }
  cartToggle.addEventListener("click", () => openDrawer(cartPanel));
  wishlistToggle.addEventListener("click", () => openDrawer(wishlistPanel));
  drawerBackdrop.addEventListener("click", closeDrawers);
  document.querySelectorAll("[data-close-drawer]").forEach((btn) => btn.addEventListener("click", closeDrawers));

  function renderCart() {
    cartCount.textContent = cart.size;
    if (cart.size === 0) {
      cartItemsEl.innerHTML = `<p class="drawer__empty">Your bag is empty.</p>`;
      cartSubtotalEl.textContent = formatNaira(0);
      return;
    }
    let subtotal = 0;
    cartItemsEl.innerHTML = Array.from(cart.entries()).map(([id, qty]) => {
      const p = PRODUCTS.find((pr) => pr.id === id);
      subtotal += p.price * qty;
      return `
        <div class="drawer-item">
          <img src="${p.img}" alt="${p.name}" />
          <div class="drawer-item__info">
            <h4>${p.name}</h4>
            <span>Qty ${qty} · ${formatNaira(p.price)}</span>
            <button class="drawer-item__remove" data-remove-cart="${id}">Remove</button>
          </div>
        </div>`;
    }).join("");
    cartSubtotalEl.textContent = formatNaira(subtotal);
    cartItemsEl.querySelectorAll("[data-remove-cart]").forEach((btn) => {
      btn.addEventListener("click", () => { cart.delete(btn.dataset.removeCart); renderCart(); });
    });
  }

  function renderWishlist() {
    wishlistCount.textContent = wishlist.size;
    if (wishlist.size === 0) {
      wishlistItemsEl.innerHTML = `<p class="drawer__empty">Nothing saved yet.</p>`;
      return;
    }
    wishlistItemsEl.innerHTML = Array.from(wishlist).map((id) => {
      const p = PRODUCTS.find((pr) => pr.id === id);
      return `
        <div class="drawer-item">
          <img src="${p.img}" alt="${p.name}" />
          <div class="drawer-item__info">
            <h4>${p.name}</h4>
            <span>${formatNaira(p.price)}</span>
            <button class="drawer-item__remove" data-remove-wishlist="${id}">Remove</button>
          </div>
        </div>`;
    }).join("");
    wishlistItemsEl.querySelectorAll("[data-remove-wishlist]").forEach((btn) => {
      btn.addEventListener("click", () => {
        wishlist.delete(btn.dataset.removeWishlist);
        renderWishlist();
        syncWishlistButtons();
      });
    });
  }

  function syncWishlistButtons() {
    document.querySelectorAll("[data-wishlist-id]").forEach((btn) => {
      btn.classList.toggle("is-active", wishlist.has(btn.dataset.wishlistId));
    });
  }

  function bindProductCardEvents() {
    document.querySelectorAll("[data-cart-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.cartId;
        cart.set(id, (cart.get(id) || 0) + 1);
        renderCart();
        openDrawer(cartPanel);
      });
    });
    document.querySelectorAll("[data-wishlist-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.wishlistId;
        wishlist.has(id) ? wishlist.delete(id) : wishlist.add(id);
        btn.classList.toggle("is-active");
        renderWishlist();
      });
    });
    document.querySelectorAll("[data-quickview-id]").forEach((btn) => {
      btn.addEventListener("click", () => openQuickView(btn.dataset.quickviewId));
    });
  }
  renderCart();
  renderWishlist();

  /* ---------- 11. QUICK VIEW MODAL ---------- */
  const quickViewModal = document.getElementById("quickViewModal");
  const quickViewBody = document.getElementById("quickViewBody");
  const quickViewClose = document.getElementById("quickViewClose");

  function openQuickView(id) {
    const p = PRODUCTS.find((pr) => pr.id === id);
    if (!p) return;
    quickViewBody.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <div class="modal__info">
        <p class="eyebrow" style="color:var(--color-accent)">${p.category}</p>
        <h3 id="quickViewTitle">${p.name}</h3>
        <div class="price">${formatNaira(p.price)}</div>
        <p>${p.desc}</p>
        <button class="btn btn--primary btn--full" data-cart-id="${p.id}">Add to Cart</button>
      </div>`;
    quickViewBody.querySelector("[data-cart-id]").addEventListener("click", () => {
      cart.set(p.id, (cart.get(p.id) || 0) + 1);
      renderCart();
      closeQuickView();
      openDrawer(cartPanel);
    });
    quickViewModal.classList.add("is-open");
    quickViewModal.setAttribute("aria-hidden", "false");
  }
  function closeQuickView() {
    quickViewModal.classList.remove("is-open");
    quickViewModal.setAttribute("aria-hidden", "true");
  }
  quickViewClose.addEventListener("click", closeQuickView);
  quickViewModal.addEventListener("click", (e) => { if (e.target === quickViewModal) closeQuickView(); });

  /* ---------- 12. ESCAPE KEY CLOSES ALL OVERLAYS ---------- */
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeDrawers();
    closeQuickView();
    closeLightbox();
    closeSearch();
  });

  /* ---------- 13. BACK TO TOP ---------- */
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 14. SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  // Re-observe gallery items and product cards, which are injected after
  // the initial DOMContentLoaded pass above.
  document.querySelectorAll(".gallery-item.reveal").forEach((el) => revealObserver.observe(el));

  
  /* ---------- 15. FORM VALIDATION ---------- */
  function showError(input, message) {
    const row = input.closest(".form-row") || input.parentElement;
    const errorEl = document.querySelector(`.form-error[data-for="${input.id}"]`);
    if (row.classList) row.classList.add("has-error");
    if (errorEl) errorEl.textContent = message;
  }
  function clearError(input) {
    const row = input.closest(".form-row") || input.parentElement;
    const errorEl = document.querySelector(`.form-error[data-for="${input.id}"]`);
    if (row.classList) row.classList.remove("has-error");
    if (errorEl) errorEl.textContent = "";
  }
  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Contact form
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    const name = document.getElementById("cfName");
    const email = document.getElementById("cfEmail");
    const message = document.getElementById("cfMessage");

    [name, email, message].forEach(clearError);

    if (name.value.trim().length < 2) { showError(name, "Enter your full name."); valid = false; }
    if (!isValidEmail(email.value.trim())) { showError(email, "Enter a valid email address."); valid = false; }
    if (message.value.trim().length < 10) { showError(message, "Message should be at least 10 characters."); valid = false; }

    if (!valid) { formSuccess.hidden = true; return; }

    formSuccess.hidden = false;
    contactForm.reset();
  });

  // Newsletter form
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterSuccess = document.getElementById("newsletterSuccess");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletterEmail");
    clearError(email);
    if (!isValidEmail(email.value.trim())) {
      showError(email, "Enter a valid email address.");
      newsletterSuccess.hidden = true;
      return;
    }
    newsletterSuccess.hidden = false;
    newsletterForm.reset();
  });

  /* ---------- 16. FOOTER YEAR ---------- */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

});