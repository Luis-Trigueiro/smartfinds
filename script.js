// Data: replace 'tag=smartfinds4yo-21' with your Amazon UK Associate tag.
// Each product has: id, title, desc, price, rating, category, img, url

// === BOOKS COLLECTION ===
const BOOKS = [
  {
    id: 'b1',
    asin: 'B09LV4R35M', // Atomic Habits
    title: 'Atomic Habits',
    desc: 'Tiny Changes, Remarkable Results — learn how to build better habits and break bad ones in simple, proven ways.',
    img: 'https://m.media-amazon.com/images/I/81wgcld4wxL._SL1500_.jpg',
    url: 'https://amzn.to/4qxCT0q',
    category: 'books',
    rating: '4.8/5'
  },
  {
    id: 'b2',
    asin: '1529158069', // The Mountain Is You
    title: 'The Mountain Is You',
    desc: 'Transforming self-sabotage into self-mastery. A deep and inspiring read for personal growth and awareness.',
    img: 'https://m.media-amazon.com/images/I/71AHFDEpkdL._SL1500_.jpg',
    url: 'https://amzn.to/49k7msk',
    category: 'books',
    rating: '4.7/5'
  },
  {
    id: 'b3',
    asin: '1847941834', // Think Fast and Slow
    title: 'Thinking, Fast and Slow',
    desc: 'Nobel Prize winner Daniel Kahneman explains the two systems that drive the way we think and make decisions.',
    img: 'https://m.media-amazon.com/images/I/71f6DceqZAL._SL1500_.jpg',
    url: 'https://amzn.to/4qpQMxk',
    category: 'books',
    rating: '4.6/5'
  },
  {
    id: 'b4',
    asin: '1785042270', // The Comfort Book
    title: 'The Comfort Book',
    desc: 'A collection of small truths for comfort, healing, and hope. Short, soulful reflections from Matt Haig.',
    img: 'https://m.media-amazon.com/images/I/71qimTEdDpL._SL1500_.jpg',
    url: 'https://amzn.to/4hqcjBY',
    category: 'books',
    rating: '4.7/5'
  },
  {
    id: 'b5',
    asin: '1473684331', // 12 Rules for Life
    title: '12 Rules for Life: An Antidote to Chaos',
    desc: 'Jordan Peterson combines science, philosophy, and psychology to provide a guide to a meaningful life.',
    img: 'https://m.media-amazon.com/images/I/71OVB8HknWL._SL1500_.jpg',
    url: 'https://amzn.to/4nsR4RB',
    category: 'books',
    rating: '4.7/5'
  }
];


// === TECH & GADGETS COLLECTION ===
const TECH = [
  {
    id: 't1',
    asin: 'B0C6P6C8F6', // Echo Pop
    title: 'Echo Pop | Compact Smart Speaker with Alexa',
    desc: 'Smart speaker with Alexa — perfect for music, news, and home control. Compact size, great sound.',
    img: 'https://m.media-amazon.com/images/I/61E4JBlOfzL._AC_SL1000_.jpg',
    url: 'https://amzn.to/4qHcDRg',
    category: 'tech',
    rating: '4.7/5'
  },
  {
    id: 't2',
    asin: 'B0BFCWC9X7', // Fire TV Stick 4K
    title: 'Fire TV Stick 4K with Alexa Voice Remote',
    desc: 'Stream in brilliant 4K UHD and control your TV hands-free with Alexa. Fast, reliable and powerful.',
    img: 'https://m.media-amazon.com/images/I/51uY+-pzJ-L._AC_SL1000_.jpg',
    url: 'https://amzn.to/47Fuwbn',
    category: 'tech',
    rating: '4.8/5'
  },
];

const FITNESS = [
  {
  id: 's1',
  asin: 'B00QWUZJ5I',
  title: 'Wilson Staff Squash Balls – Pack of 2 (Blue)',
  desc: 'High-performance squash balls for experienced players. Designed for speed and durability on court.',
  img: 'https://m.media-amazon.com/images/I/819m845i7OL._AC_SL1500_.jpg',  // verifique se essa URL funciona; ajuste se necessário
  url: 'https://amzn.to/4o4CmBb',
  category: 'fitness',  // ou 'fitness' se já tiver essa categoria
  rating: '4.5/5'
},
]



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
    id: 'p8',
    title: 'Deep Work — Cal Newport',
    desc: 'Rules for focused success in a distracted world.',
    price: '€15.31',
    rating: '4.7/5',
    category: 'books',
    img: 'assets/demo-deepwork.jpg',
    url: 'https://amzn.to/4o3ktCU'
  }, ...BOOKS, ...TECH,...FITNESS
];



// --- Helpers
const grid = document.getElementById('productGrid');
const tpl = document.getElementById('productCardTpl');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

function createCard(p) {
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

function categoryLabel(key) {
  return {
    tech: 'Tech & Gadgets',
    home: 'Home Essentials',
    fitness: 'Fitness & Wellness',
    books: 'Books & Learning'
  }[key] || key;
}

function render(products) {
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  products.forEach(p => frag.appendChild(createCard(p)));
  grid.appendChild(frag);
}

function filterByCategory(cat) {
  const filtered = PRODUCTS.filter(p => p.category === cat);
  render(filtered);
}

function handleNav() {
  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = el.getAttribute('data-filter');
      document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('is-active'));
      document.querySelector('.nav-link[data-filter="' + cat + '"]')?.classList.add('is-active');
      filterByCategory(cat);
      // Close mobile menu
      document.getElementById('nav-menu').classList.remove('open');
      document.querySelector('.nav-toggle').setAttribute('aria-expanded', 'false');
    });
  });
}

function handleSearch() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) { render(PRODUCTS); return; }
  const results = PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.desc.toLowerCase().includes(term) ||
    categoryLabel(p.category).toLowerCase().includes(term)
  );
  render(results);
}

function initNavToggle() {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('nav-menu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// Init
render(PRODUCTS);           // render all on load
//filterByCategory('tech');   // then default to tech tab
handleNav();
initNavToggle();

// Search handlers
searchBtn.addEventListener('click', handleSearch);
clearBtn.addEventListener('click', () => { searchInput.value = ''; render(PRODUCTS); });
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch(); } });
