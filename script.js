// Data: replace 'tag=smartfinds4yo-21' with your Amazon UK Associate tag.
// Each product has: id, title, desc, price, rating, category, img, url
const PRODUCTS = [
  {
    id: 'p1',
    title: 'Anker Power Bank (20,000mAh)',
    desc: 'Slim portable charger with fast USB-C input/output — perfect for travel.',
    price: '£39.99',
    rating: '4.6/5',
    category: 'tech',
    img: 'assets/demo-powerbank.jpg',
    url: 'https://amzn.to/43o53kj'
  },
  {
    id: 'p2',
    title: 'Sony WH-CH720N Noise Cancelling Headphones',
    desc: 'Lightweight wireless over-ears with long battery life and great ANC.',
    price: '€86.00',
    rating: '4.5/5',
    category: 'tech',
    img: 'assets/demo-headphones.jpg',
    url: 'https://amzn.to/4nnZNEI'
  },
  {
    id: 'p3',
    title: 'Shark Cordless Vacuum',
    desc: 'Powerful suction for carpets & hard floors, easy to store.',
    price: '€177.00',
    rating: '4.4/5',
    category: 'home',
    img: 'assets/demo-vacuum.jpg',
    url: 'https://amzn.to/4hgUc1v'
  },
  {
    id: 'p4',
    title: 'Philips Hue Smart Plug',
    desc: 'Smart control for lamps & appliances via app and voice assistants.',
    price: '€33.02',
    rating: '4.7/5',
    category: 'home',
    img: 'assets/demo-smartplug.jpg',
    url: 'https://amzn.to/48x8iJI'
  },
  {
    id: 'p6',
    title: 'Yoga Mat — Non‑Slip',
    desc: 'Comfortable, durable mat with carrying strap.',
    price: '€29.48',
    rating: '4.6/5',
    category: 'fitness',
    img: 'assets/demo-yogamat.jpg',
    url: 'https://amzn.to/4qjsC7G'
  },
  {
    id: 'p7',
    title: 'Atomic Habits — James Clear',
    desc: 'Tiny changes, remarkable results. A modern classic on habit building.',
    price: '€14.95',
    rating: '4.8/5',
    category: 'books',
    img: 'assets/demo-atomic.jpg',
    url: 'https://amzn.to/47klOhC'
  },
  {
    id: 'p8',
    title: 'Deep Work — Cal Newport',
    desc: 'Rules for focused success in a distracted world.',
    price: '€15.31',
    rating: '4.7/5',
    category: 'books',
    img: 'assets/demo-deepwork.jpg',
    url: 'https://amzn.to/4o3ktCU'
  }
];

// --- Helpers
const grid = document.getElementById('productGrid');
const tpl = document.getElementById('productCardTpl');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

function createCard(p){
  const node = tpl.content.firstElementChild.cloneNode(true);
  node.dataset.category = p.category;
  node.querySelector('.card-image').src = p.img;
  node.querySelector('.card-image').alt = p.title;
  node.querySelector('.card-image-link').href = p.url;
  node.querySelector('.card-category').textContent = categoryLabel(p.category);
  node.querySelector('.card-title').textContent = p.title;
  node.querySelector('.card-desc').textContent = p.desc;
  node.querySelector('.price').textContent = p.price;
  node.querySelector('.rating').textContent = p.rating;
  node.querySelector('.buy-btn').href = p.url;
  return node;
}

function categoryLabel(key){
  return {
    tech: 'Tech & Gadgets',
    home: 'Home Essentials',
    fitness: 'Fitness & Wellness',
    books: 'Books & Learning'
  }[key] || key;
}

function render(products){
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  products.forEach(p => frag.appendChild(createCard(p)));
  grid.appendChild(frag);
}

function filterByCategory(cat){
  const filtered = PRODUCTS.filter(p => p.category === cat);
  render(filtered);
}

function handleNav(){
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = el.getAttribute('data-filter');
      document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('is-active'));
      document.querySelector('.nav-link[data-filter="'+cat+'"]')?.classList.add('is-active');
      filterByCategory(cat);
      // Close mobile menu
      document.getElementById('nav-menu').classList.remove('open');
      document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
    });
  });
}

function handleSearch(){
  const term = searchInput.value.trim().toLowerCase();
  if(!term){ render(PRODUCTS); return; }
  const results = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.desc.toLowerCase().includes(term) ||
    categoryLabel(p.category).toLowerCase().includes(term)
  );
  render(results);
}

function initNavToggle(){
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Init
render(PRODUCTS);           // render all on load
filterByCategory();   // then default to tech tab
handleNav();
initNavToggle();

// Search handlers
searchBtn.addEventListener('click', handleSearch);
clearBtn.addEventListener('click', () => { searchInput.value=''; render(PRODUCTS); });
searchInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ e.preventDefault(); handleSearch(); } });
