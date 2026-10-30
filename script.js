const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const productGrid = document.querySelector('#product-grid');
const products = [
  { name: 'Samsung Galaxy S Series', brand: 'SAMSUNG', category: 'phones', type: 'PHONE', tag: 'FLAGSHIP FAVORITE', detail: 'Powerful cameras and a vivid display.', image: 'photo-1706372201245-1f62a39e8d59', alt: 'Modern Samsung style smartphone' },
  { name: 'iPhone Collection', brand: 'APPLE', category: 'phones', type: 'PHONE', tag: 'APPLE PICKS', detail: 'Smooth performance, made simple.', image: 'photo-1695048133142-1a20484d2569', alt: 'Modern iPhone style smartphone' },
  { name: 'Android Phones', brand: 'MORE BRANDS', category: 'phones', type: 'PHONE', tag: 'GREAT EVERYDAY PICKS', detail: 'Explore options for every budget.', image: 'photo-1598327105666-5b89351aff97', alt: 'Smartphone with bright screen' },
  { name: 'Wireless Earbuds', brand: 'AUDIO', category: 'audio', type: 'AUDIO', tag: 'SOUND ON', detail: 'Your music, calls, and podcasts.', image: 'photo-1606220945770-b5b6c2c55bf1', alt: 'Wireless earbuds' },
  { name: 'Smart Watches', brand: 'WEARABLES', category: 'accessories', type: 'WATCH', tag: 'ON THE GO', detail: 'A handy everyday companion.', image: 'photo-1523275335684-37898b6baf30', alt: 'Smart watch' },
  { name: 'Phone Cases', brand: 'PROTECTION', category: 'accessories', type: 'CASE', tag: 'MAKE IT YOURS', detail: 'Everyday protection in your style.', image: 'photo-1601593346740-925612772716', alt: 'Mobile phone case' },
  { name: 'Chargers & Cables', brand: 'POWER UP', category: 'accessories', type: 'CHARGER', tag: 'DAILY ESSENTIAL', detail: 'Charging essentials for home and travel.', image: 'photo-1583863788434-e58a36330cf0', alt: 'Phone charging accessories' },
  { name: 'Power Banks', brand: 'POWER UP', category: 'accessories', type: 'POWER BANK', tag: 'READY WHEN YOU ARE', detail: 'Extra power for busy days out.', image: 'photo-1609091839311-d5365f9ff1c5', alt: 'Portable power bank' }
];
let activeFilter = 'all';

function renderProducts() {
  const query = document.querySelector('#product-search').value.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesFilter = activeFilter === 'all' || product.category === activeFilter;
    const matchesSearch = `${product.name} ${product.brand} ${product.detail}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });
  productGrid.innerHTML = visibleProducts.length ? visibleProducts.map((product, index) => {
    const imageUrl = `https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`;
    const message = encodeURIComponent(`Hi Malak Mobile Zone, I'm interested in the ${product.name}. Please share availability and price.`);
    return `<article class="product-card ${['card-lilac', 'card-peach', 'card-blue'][index % 3]}">
      <div class="product-top"><span class="product-tag">${product.tag}</span><span class="product-kind">${product.type}</span></div>
      <div class="product-image"><img src="${imageUrl}" alt="${product.alt}" loading="lazy"><span class="image-orb"></span></div>
      <div class="product-info"><div><span class="product-category">${product.brand}</span><h3>${product.name}</h3><p>${product.detail}</p></div></div>
      <div class="product-buy"><span>Ask for today's price</span><a class="buy-button" href="https://wa.me/923095650719?text=${message}" target="_blank" rel="noopener noreferrer">Order on WhatsApp <b>↗</b></a></div>
    </article>`;
  }).join('') : '<p class="no-products">No matches yet. Try another search.</p>';
}

renderProducts();
document.querySelectorAll('.filter-button').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter-button').forEach((filter) => filter.classList.toggle('active', filter === button));
    renderProducts();
  });
});
document.querySelector('#product-search').addEventListener('input', renderProducts);

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    const saved = button.classList.toggle('saved');
    button.textContent = saved ? '♥' : '♡';
    button.setAttribute('aria-pressed', String(saved));
  });
});

const revealItems = document.querySelectorAll('.product-card, .story-visual, .story-copy, .contact-card');
revealItems.forEach((item) => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
