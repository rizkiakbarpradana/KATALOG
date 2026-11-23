/* ==========================================================================
   1. DATA PRODUK (DATABASE KECIL)
   ========================================================================== */
const products = [
    // BRAND: POLO
    {
        id: 1,
        brand: "Polo",
        name: "Polo 74213 #18 Black",
        category: "Backpack",
        price: 349000,
        description: "Backpack bergaya klasik dengan kompartemen praktis untuk aktivitas harian, kuliah, atau jalan-jalan.",
        className: "polo",
        image: "foto_produk_1.jpg"
    },
    {
        id: 2,
        brand: "Polo",
        name: "Polo USB Charging Backpack",
        category: "Backpack",
        price: 379000,
        description: "Backpack minimalis dengan ruang utama lega dilengkapi dengan USB port charging dan tampilan clean untuk membawa perlengkapan harian.",
        className: "polo",
        image: "foto_produk.2.jpg"
    },
    {
        id: 3,
        brand: "Polo",
        name: "Polo Travel Ransel",
        category: "Travel",
        price: 399000,
        description: "Duffel bag elegan dengan ruang penyimpanan luas untuk perjalanan singkat dan kebutuhan akhir pekan.",
        className: "polo",
        image: "foto_produk.3.jpg"
    },

    // BRAND: EIGER
    {
        id: 4,
        brand: "Eiger",
        name: "Eiger Adventure Pack",
        category: "Backpack",
        price: 579000,
        description: "Backpack bernuansa adventure yang tangguh dan fungsional untuk aktivitas outdoor maupun urban.",
        className: "eiger",
        image: "foto_produk.4.jpg"
    },
    {
        id: 5,
        brand: "Eiger",
        name: "Eiger City Sling",
        category: "Sling Bag",
        price: 329000,
        description: "Sling bag compact dengan gaya sporty-modern. Praktis untuk membawa barang penting saat beraktivitas.",
        className: "eiger",
        image: "foto_produk.5.jpg"
    },
    {
        id: 6,
        brand: "Eiger",
        name: "Eiger Trail Waist",
        category: "Waist Bag",
        price: 289000,
        description: "Waist bag ringan dan sporty untuk kegiatan santai, bersepeda, travelling, dan aktivitas outdoor.",
        className: "eiger",
        image: "foto_produk.6.jpg"
    },

    // BRAND: NAVYCLUB
    {
        id: 7,
        brand: "Navyclub",
        name: "Navyclub Campus Pack",
        category: "Backpack",
        price: 319000,
        description: "Tas punggung casual dengan desain modern untuk sekolah, kuliah, and kegiatan sehari-hari.",
        className: "navy",
        image: "foto_produk.7.jpg"
    },
    {
        id: 8,
        brand: "Navyclub",
        name: "Navyclub Urban Sling",
        category: "Sling Bag",
        price: 259000,
        description: "Sling bag ringkas dengan gaya urban yang cocok untuk membawa gadget dan barang penting.",
        className: "navy",
        image: "foto_produk.8.jpg"
    },
    {
        id: 9,
        brand: "Navyclub",
        name: "Navyclub Weekend Bag",
        category: "Travel Bag",
        price: 399000,
        description: "Tas weekend dengan kapasitas nyaman dan desain sederhana untuk perjalanan atau aktivitas santai.",
        className: "navy",
        image: "foto_produk.9.jpg"
    }
];

/* ==========================================================================
   2. PENGATURAN KONTAK TOKO
   ========================================================================== */
const WA_NUMBER = "6281234567890"; 
const INSTAGRAM_URL = "https://instagram.com";

/* ==========================================================================
   3. SELEKSI ELEMEN HTML (DOM)
   ========================================================================== */
const productGrid = document.getElementById("productGrid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");

const productModal = document.getElementById("productModal");
const modalProduct = document.getElementById("modalProduct");
const modalBrand = document.getElementById("modalBrand");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPrice = document.getElementById("modalPrice");
const modalCategory = document.getElementById("modalCategory");

let activeFilter = "all";
let selectedProduct = null;

/* ==========================================================================
   4. FUNGSI UTAS & HELPER
   ========================================================================== */
function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function productArt(product) {
    return `
        <div class="art">
            <img src="${product.image}" alt="${product.name}" class="product-real-img">
        </div>
    `;
}

/* ==========================================================================
   5. LOGIKA RENDER & TAMPILAN KATALOG
   ========================================================================== */
function renderProducts() {
    const keyword = search.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const matchBrand = activeFilter === "all" || product.brand.toLowerCase() === activeFilter.toLowerCase();
        const matchSearch = `${product.brand} ${product.name} ${product.category}`.toLowerCase().includes(keyword);
        return matchBrand && matchSearch;
    });

    productGrid.innerHTML = filteredProducts.map(product => {
        return `
            <article class="product-card" data-id="${product.id}" tabindex="0">
                <div class="product-image">
                    <span class="badge">${product.category.toUpperCase()}</span>
                    ${productArt(product)}
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand.toUpperCase()}</span>
                    <h3>${product.name}</h3>
                    <div class="product-bottom">
                        <span class="price">${rupiah(product.price)}</span>
                        <span class="detail">Lihat detail ↗</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    empty.style.display = filteredProducts.length === 0 ? "block" : "none";
    initCardEvents();
}

/* ==========================================================================
   6. LOGIKA MODAL POP-UP (DETAIL & PESANAN)
   ========================================================================== */
function openProduct(id) {
    selectedProduct = products.find(product => product.id === id);
    if (!selectedProduct) return;

    modalProduct.innerHTML = productArt(selectedProduct);
    modalBrand.textContent = selectedProduct.brand;
    modalTitle.textContent = selectedProduct.name;
    modalDescription.textContent = selectedProduct.description;
    modalPrice.textContent = rupiah(selectedProduct.price);
    modalCategory.textContent = selectedProduct.category;

    document.getElementById("customerName").value = "";
    document.getElementById("quantity").value = "1";

    productModal.classList.add("open");
    document.body.classList.add("no-scroll");
}

function closeModal() {
    productModal.classList.remove("open");
    document.body.classList.remove("no-scroll");
}

/* ==========================================================================
   7. MANAJEMEN EVENT LISTENERS
   ========================================================================== */
function initCardEvents() {
    document.querySelectorAll(".product-card").forEach(card => {
        card.addEventListener("click", () => {
            openProduct(Number(card.dataset.id));
        });
        card.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                openProduct(Number(card.dataset.id));
            }
        });
    });
}

document.querySelectorAll("[data-close='modal']").forEach(element => {
    element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
});

document.querySelector(".filters").addEventListener("click", event => {
    const button = event.target.closest(".filter");
    if (!button) return;

    document.querySelectorAll(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    
    activeFilter = button.dataset.filter;
    renderProducts();
});

search.addEventListener("input", renderProducts);

document.getElementById("checkoutForm").addEventListener("submit", event => {
    event.preventDefault();
    const customerName = document.getElementById("customerName").value.trim();
    const quantity = Number(document.getElementById("quantity").value);
    const total = selectedProduct.price * quantity;

    const message = `Halo RAP, saya ${customerName}.\n\nSaya ingin memesan:\nProduk: ${selectedProduct.name}\nBrand: ${selectedProduct.brand}\nKategori: ${selectedProduct.category}\nJumlah: ${quantity} pcs\nHarga: ${rupiah(selectedProduct.price)}\nTotal: ${rupiah(total)}\n\nMohon info stok dan proses pesanannya.\nTerima kasih.`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

/* ==========================================================================
   8. FITUR TAMBAHAN (THEME & INTERFACE)
   ========================================================================== */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("rap-theme");

// Konfigurasi Tema Awal
if (savedTheme) {
    document.documentElement.dataset.theme = savedTheme;
    themeToggle.textContent = savedTheme === "dark" ? "☀" : "☾";
}

// Event Toggle Tema (Dark/Light)
themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    const nextTheme = isDark ? "light" : "dark";
    
    document.documentElement.dataset.theme = nextTheme;
    themeToggle.textContent = nextTheme === "dark" ? "☀" : "☾";
    localStorage.setItem("rap-theme", nextTheme);
});

// Kontrol Menu Mobile Toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => navMenu.classList.remove("open"));
});

// Tombol Kembali ke Atas (Back to Top)
document.getElementById("backTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Indikator kemajuan halaman dan animasi masuk ringan saat bagian terlihat
const scrollProgress = document.getElementById("scrollProgress");
const updateScrollProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.transform = `scaleX(${progress / 100})`;
};
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(".section-heading, .brand-item, .contact-box, .stats").forEach(element => {
        element.classList.add("reveal-on-scroll");
        revealObserver.observe(element);
    });
}

// Integrasi Link Kontak Dinamis (Fixed Template Literals Bug)
document.getElementById("contactWA").href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Halo RAP, saya ingin bertanya tentang koleksi tas.")}`;
document.getElementById("whatsappLink").href = `https://wa.me/${WA_NUMBER}`;
document.getElementById("instagramLink").href = INSTAGRAM_URL;

/* ==========================================================================
   9. MENJALANKAN APLIKASI PERTAMA KALI & EFEK LOGO
   ========================================================================== */
// Render produk saat halaman dimuat
renderProducts();

// Animasi Interaksi pada Logo dan Footer Logo
document.querySelectorAll('.logo img, .footer-logo img').forEach(img => {
    img.addEventListener('mousedown', () => img.classList.add('logo-active'));
    img.addEventListener('touchstart', () => img.classList.add('logo-active'));

    img.addEventListener('mouseup', () => img.classList.remove('logo-active'));
    img.addEventListener('touchend', () => img.classList.remove('logo-active'));
    img.addEventListener('mouseleave', () => img.classList.remove('logo-active'));
});

/* ==========================================================================
   LOGIKA SPLASH SCREEN DENGAN SISTEM KUNCI SCROLL BAWAAN
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash-screen");
    
    if (splash) {
        // Kunci layar agar tidak bisa di-scroll menggunakan class bawaan CSS Anda
        document.body.classList.add("no-scroll");

        setTimeout(() => {
            // Memicu animasi menghilang (fade-out)
            splash.classList.add("fade-out");
            
            // Buka kembali fungsi scroll setelah transisi visual selesai (600ms)
            setTimeout(() => {
                document.body.classList.remove("no-scroll");
            }, 600);
            
        }, 2200); // Tampil selama 2.2 detik agar animasi pop logo terlihat penuh dan elegan
    }
});
