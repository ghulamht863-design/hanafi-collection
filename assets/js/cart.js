/**
 * HANAFI COLLECTIONS — Luxury Shopping Cart & WhatsApp Order Engine
 * Handles client-side reactive cart, persistent state, itemized calculations,
 * and transparent direct WhatsApp ordering with founder Rizwan Raza Qadri.
 */

class HanafiCart {
  constructor() {
    this.storageKey = "hanafi_cart_items_v1";
    this.items = this.loadCart();
    this.subscribers = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load cart from storage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart to storage", e);
    }
    this.notify();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    callback(this.items);
  }

  notify() {
    this.subscribers.forEach(cb => {
      try {
        cb(this.items);
      } catch (e) {
        console.error("Cart subscriber error", e);
      }
    });
    this.updateBadges();
  }

  addItem(productId, quantity = 1, customNote = "") {
    const product = (window.PRODUCTS_DATA || []).find(p => p.id === productId);
    if (!product) return false;

    const existingIndex = this.items.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
      if (customNote) this.items[existingIndex].customNote = customNote;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        priceNumber: product.priceNumber,
        priceDisplay: product.priceDisplay,
        image: product.image,
        dimensions: product.dimensions,
        quantity: quantity,
        customNote: customNote
      });
    }

    this.saveCart();
    this.showToast(`"${product.title}" added to your bag`, "success");
    return true;
  }

  removeItem(productId) {
    const item = this.items.find(i => i.id === productId);
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    if (item) {
      this.showToast(`Removed "${item.title}" from bag`, "info");
    }
  }

  updateQuantity(productId, newQty) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    if (newQty <= 0) {
      this.removeItem(productId);
    } else {
      item.quantity = newQty;
      this.saveCart();
    }
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.showToast("Shopping bag cleared", "info");
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalAmount() {
    return this.items.reduce((total, item) => total + (item.priceNumber * item.quantity), 0);
  }

  formatCurrency(num) {
    if (!num || num === 0) return "₹000";
    return "₹" + num.toLocaleString("en-IN");
  }

  updateBadges() {
    const count = this.getTotalCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove("hidden");
      } else {
        badge.classList.add("hidden");
      }
    });
  }

  generateWhatsAppOrderUrl(customerDetails = {}) {
    if (this.items.length === 0) {
      return `https://wa.me/${window.BRAND_CONFIG?.phoneClean || "918341886299"}?text=${encodeURIComponent("Assalamu Alaikum Rizwan Bhai, I am browsing Hanafi Collections and would like to inquire about your Islamic wall art.")}`;
    }

    let text = `*Assalamu Alaikum HANAFI COLLECTIONS,*\n\n`;
    text += `I would like to place an order / inquire about the following bespoke pieces:\n\n`;

    this.items.forEach((item, index) => {
      text += `*${index + 1}. ${item.title}*\n`;
      text += `   • Quantity: ${item.quantity}\n`;
      text += `   • Dimensions: ${item.dimensions}\n`;
      text += `   • Price: ${item.priceDisplay || "₹000"}\n`;
      if (item.customNote) {
        text += `   • Note: ${item.customNote}\n`;
      }
      text += `\n`;
    });

    const total = this.getTotalAmount();
    if (total > 0) {
      text += `*Estimated Total: ${this.formatCurrency(total)}*\n\n`;
    }

    if (customerDetails.name) {
      text += `*Customer Details:*\n`;
      text += `• Name: ${customerDetails.name}\n`;
      if (customerDetails.phone) text += `• Contact: ${customerDetails.phone}\n`;
      if (customerDetails.city) text += `• Delivery City: ${customerDetails.city}\n`;
      if (customerDetails.message) text += `• Special Request: ${customerDetails.message}\n`;
      text += `\n`;
    }

    text += `Kindly confirm availability, custom sizing options, and delivery timeline to Hyderabad / all-India. JazakAllah Khair!`;

    const cleanPhone = window.BRAND_CONFIG?.phoneClean || "918341886299";
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  }

  showToast(message, type = "info") {
    let container = document.getElementById("luxury-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "luxury-toast-container";
      container.className = "fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `pointer-events-auto flex items-center gap-3 px-5 py-3 rounded border text-sm tracking-wide shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 font-sans`;
    toast.style.backgroundColor = "#090909";
    toast.style.borderColor = "#C6A15B";
    toast.style.color = "#F5F0E6";
    toast.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 0 15px rgba(198, 161, 91, 0.25)";

    const icon = `<svg class="w-4 h-4 text-[#C6A15B] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
    toast.innerHTML = `${icon} <span>${message}</span>`;

    container.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-4", "opacity-0");
    });

    // Animate out
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 3200);
  }
}

// Global cart instance
window.hanafiCart = new HanafiCart();
