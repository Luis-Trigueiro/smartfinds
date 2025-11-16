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
    url: 'https://amzn.to/4o7w9Ez',
    category: 'books',
    rating: '4.8/5'
  },
  {
    id: 'b2',
    asin: '1529158069', // The Mountain Is You
    title: 'The Mountain Is You',
    desc: 'Transforming self-sabotage into self-mastery. A deep and inspiring read for personal growth and awareness.',
    img: 'https://m.media-amazon.com/images/I/71AHFDEpkdL._SL1500_.jpg',
    url: 'https://amzn.to/4o9oEgH',
    category: 'books',
    rating: '4.7/5'
  },
  {
    id: 'b3',
    asin: '1847941834', // Think Fast and Slow
    title: 'Thinking, Fast and Slow',
    desc: 'Nobel Prize winner Daniel Kahneman explains the two systems that drive the way we think and make decisions.',
    img: 'https://m.media-amazon.com/images/I/71f6DceqZAL._SL1500_.jpg',
    url: 'https://amzn.to/3J0cRly',
    category: 'books',
    rating: '4.6/5'
  },
  {
    id: 'b4',
    asin: '1785042270', // The Comfort Book
    title: 'The Comfort Book',
    desc: 'A collection of small truths for comfort, healing, and hope. Short, soulful reflections from Matt Haig.',
    img: 'https://m.media-amazon.com/images/I/71qimTEdDpL._SL1500_.jpg',
    url: 'https://amzn.to/4hyszkG',
    category: 'books',
    rating: '4.7/5'
  },
  {
    id: 'b5',
    asin: '1473684331', // 12 Rules for Life
    title: '12 Rules for Life: An Antidote to Chaos',
    desc: 'Jordan Peterson combines science, philosophy, and psychology to provide a guide to a meaningful life.',
    img: 'https://m.media-amazon.com/images/I/71OVB8HknWL._SL1500_.jpg',
    url: 'https://amzn.to/3WZMT4E',
    category: 'books',
    rating: '4.7/5'
  },
  {
    id: 'b6',
    asin: '0718183533', // The Ladybird Book of the Mid-Life Crisis
    title: 'The Ladybird Book of the Mid-Life Crisis: (Ladybirds for Grown-Ups)',
    desc: 'This delightful book is the latest in the series of Ladybird books which have been specially planned to help grown-ups with the world about them.',
    img: 'https://m.media-amazon.com/images/I/81V2rGRfsiL._SL1500_.jpg',
    url: 'https://amzn.to/43Htt8r',
    category: 'books',
    rating: '4.6/5'
  },
  {
    id: 'b7',
    asin: ' B0FFWHVYPW', // The Ladybird Book of the Mid-Life Crisis
    title: 'Last Samurai Standing 1',
    desc: 'Last Samurai Standing 1',
    img: 'https://m.media-amazon.com/images/I/81KdvFxHkaL._SY425_.jpg',
    url: 'https://amzn.to/48hEVKM',
    category: 'books',
    rating: '5/5'
  },
  {
    id: 'b8',
    asin: ' B0FPGS8K6Z', // The Ladybird Book of the Mid-Life Crisis
    title: 'Last Samurai Standing 2',
    desc: 'Last Samurai Standing 2',
    img: 'https://m.media-amazon.com/images/I/91FEaHMKDIL._SL1500_.jpg',
    url: 'https://amzn.to/4nY4kOi',
    category: 'books',
    rating: '5/5'
  },
  {
    id: 'b9',
    asin: ' B0DWWXT51N', // The Ladybird Book of the Mid-Life Crisis
    title: 'Last Samurai Standing 3',
    desc: 'Last Samurai Standing 3',
    img: 'https://m.media-amazon.com/images/I/91yXtEUlfDL._SY425_.jpg',
    url: 'https://amzn.to/4i4bf79',
    category: 'books',
    rating: '5/5'
  },
  {
    id: 'b10',
    asin: ' B0F4QBJNGD', // The Ladybird Book of the Mid-Life Crisis
    title: 'Last Samurai Standing 4',
    desc: 'Last Samurai Standing 4',
    img: 'https://m.media-amazon.com/images/I/911MrEVqTvL._SY425_.jpg',
    url: 'https://amzn.to/47FYI6s',
    category: 'books',
    rating: '5/5'
  }
];

const BEAUTY = [
  {
    id: 'b1',
    asin: '‎B08XC54CW5',
    title: 'CeraVe Hydrating Hyaluronic Acid Serum',
    desc: 'NEW CeraVe Hydrating Hyaluronic Acid Serum is a lightweight serum that provides 24 hour hydration and moisture to the skin.',
    img: 'https://m.media-amazon.com/images/I/616Sd5+yYrL._AC_SL1200_.jpg',
    url: 'https://amzn.to/485cRJq',
    category: 'beauty',
    rating: '4.7/5'
  },
  {
    id: 'b2',
    asin: 'B011EE9ONO',
    title: 'HAIR LIGHTENING LOTION',
    desc: 'Brightens hair and restores natural blonde tone',
    img: 'https://m.media-amazon.com/images/I/71CIT6d5r0L._AC_SL1500_.jpg',
    url: 'https://amzn.to/4oTeKzZ',
    category: 'beauty',
    rating: '4.6/5'
  },
  {
    id: 'b3',
    asin: '‎B0051PQY72',
    title: `Camomila Intea Children's Shampoo Blonde Highlights 250 ml`,
    desc: 'Shampoos specially designed for the care and washing of blonde hair, whether natural, dyed or lightened with our products. ',
    img: 'https://m.media-amazon.com/images/I/61a1Emaa9vL._AC_SL1500_.jpg',
    url: 'https://amzn.to/3K677Hd',
    category: 'beauty',
    rating: '4.8/5'
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
    url: 'https://amzn.to/4qrWOh1',
    category: 'tech',
    rating: '4.7/5'
  },
  {
    id: 't2',
    asin: 'B0BFCWC9X7', // Fire TV Stick 4K
    title: 'Fire TV Stick 4K with Alexa Voice Remote',
    desc: 'Stream in brilliant 4K UHD and control your TV hands-free with Alexa. Fast, reliable and powerful.',
    img: 'https://m.media-amazon.com/images/I/51uY+-pzJ-L._AC_SL1000_.jpg',
    url: 'https://amzn.to/4o6bxMV',
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
  {
    id: 's2',
    asin: 'B07XJ16ZH3',
    title: 'Wilson Triniti Tennis Balls – Pack of 3 (Yellow)',
    desc: 'Premium tennis balls for all court surfaces. Consistent bounce and durability for competitive play.',
    img: 'https://m.media-amazon.com/images/I/31rJGXPebDL._AC_SL1002_.jpg',  // verifique se essa URL funciona; ajuste se necessário
    url: 'https://amzn.to/3WoUIAM',
    category: 'fitness',  // ou 'fitness' se já tiver essa categoria
    rating: '4.5/5'
  },
  {
    id: 's3',
    asin: 'B0BWGK67NZ',
    title: 'Dunlop Squash Racket SONIC LITE TI Grey/Blue',
    desc: `The Lite TI is a perfect racket for you if you're a beginner or recreational player. It's the perfect companion to your first on-court steps. Welcome to the Court.`,
    img: 'https://m.media-amazon.com/images/I/51dYPeOKNwL._AC_SL1500_.jpg',  // verifique se essa URL funciona; ajuste se necessário
    url: 'https://amzn.to/47QSnoI',
    category: 'fitness',  // ou 'fitness' se já tiver essa categoria
    rating: '4.6/5'
  },
  {
    id: 's4',
    asin: 'B0CHVDYS1P',
    title: 'Pregnancy Seat Belt,Bump Strap,Protects Unborn Baby,Maternity Belt for Car',
    desc: `A Must Have Bump Belt for Expectant Mothers Anti-extrusion Belt for Pregnant Women's Belly Comfortable Driving for Expectant Mothers - Protects the Unborn Baby.
    It is easy to install and does not require extra time to unfasten and retie, making it more practical for daily use.
    For anyone who has had abdominal or stomach surgery,a C-section can help reduce discomfort and pain safely.`,
    img: 'https://m.media-amazon.com/images/I/61EYpoIYuIL._AC_SX425_.jpg',  // verifique se essa URL funciona; ajuste se necessário
    url: 'https://amzn.to/3LF22WU',
    category: 'fitness',  // ou 'fitness' se já tiver essa categoria
    rating: '4.5/5'
  },

]

const HOME = [
  {
    id: 'h1',
    asin: 'B099NQM99M',
    title: 'Philips Hue Smart Bulb White & Color Ambiance',
    desc: 'Control your home lighting with voice or app — 16 million colors and dimming options to set the perfect mood.',
    img: 'https://m.media-amazon.com/images/I/71A9nTHrYjL._AC_SL1500_.jpg',
    url: 'https://amzn.to/43BWmms',
    category: 'home',
    rating: '4.7/5'
  },
  {
    id: 'h2',
    asin: 'B0B8QZB93K',
    title: 'Levoit Core 300 Air Purifier',
    desc: 'Breathe cleaner air with HEPA filtration — perfect for bedrooms, removing dust, smoke, and allergens quietly.',
    img: 'https://m.media-amazon.com/images/I/71t-9BTIg9L._AC_SL1500_.jpg',
    url: 'https://amzn.to/3WqsEgy',
    category: 'home',
    rating: '4.8/5'
  },
  {
    id: 'h3',
    asin: 'B07CNCNYG9',
    title: 'Joseph Joseph Nest 9 Plus Food Storage Set',
    desc: 'Stackable, colorful food containers that save space in your kitchen — BPA-free and microwave safe.',
    img: 'https://m.media-amazon.com/images/I/81AVt+R-ZdL._AC_SL1500_.jpg',
    url: 'https://amzn.to/4oaiAEt',
    category: 'home',
    rating: '4.6/5'
  },
  {
    id: 'h4',
    asin: 'B0928WBZVM',
    title: 'Amazon Basics Rectangular Recycling Rubbish Bin with 2 Compartments, 60 Litres, Silver',
    desc: 'Amazon Basics offers everyday items for your home, office, garden and more. With a selection that continues to grow, the Amazon Basics brand is set to become a part of your daily convenience for electronics products and lifestyle.',
    img: 'https://m.media-amazon.com/images/I/71tDtDSZOtL._SL1500_.jpg',
    url: 'https://amzn.to/4qsT9j9',
    category: 'home',
    rating: '4.8/5'
  },
  {
    id: 'h5',
    asin: 'B0DT9RGKC2',
    title: 'Tefal Easy Fry Dual Zone Digital Air Fryer',
    desc: 'Tefal Easy Fry Dual Zone Digital Air Fryer, 2 Drawers, 8.3L, 8in1, Air Fry, Extra Crisp, Roast, Bake, Reheat, Dehydrate, 6 Portions, Non-Stick, Dishwasher Safe Baskets, Grey EY901HG0',
    img: 'https://m.media-amazon.com/images/I/715EdCgIhxL._AC_SL1500_.jpg',
    url: 'https://amzn.to/3L9eYEk',
    category: 'home',
    rating: '4.7/5'
  }
];




const PRODUCTS = [
  {
    id: 'p1',
    title: 'Anker Power Bank (20,000mAh)',
    desc: 'Slim portable charger with fast USB-C input/output — perfect for travel.',
    rating: '4.6/5',
    category: 'tech',
    img: 'assets/demo-powerbank.jpg',
    url: 'https://amzn.to/49nFeVl'
  },
  {
    id: 'p2',
    title: 'Sony WH-CH720N Noise Cancelling Headphones',
    desc: 'Lightweight wireless over-ears with long battery life and great ANC.',
    rating: '4.5/5',
    category: 'tech',
    img: 'assets/demo-headphones.jpg',
    url: 'https://amzn.to/47rCkfJ'
  },
  {
    id: 'p3',
    title: 'Shark Cordless Vacuum',
    desc: 'Powerful suction for carpets & hard floors, easy to store.',
    rating: '4.4/5',
    category: 'home',
    img: 'assets/demo-vacuum.jpg',
    url: 'https://amzn.to/4hgUc1v'
  },
  {
    id: 'p4',
    title: 'Philips Hue Smart Plug',
    desc: 'Smart control for lamps & appliances via app and voice assistants.',
    rating: '4.7/5',
    category: 'home',
    img: 'assets/demo-smartplug.jpg',
    url: 'https://amzn.to/48x8iJI'
  },
  {
    id: 'p6',
    title: 'Yoga Mat — Non‑Slip',
    desc: 'Comfortable, durable mat with carrying strap.',
    rating: '4.6/5',
    category: 'fitness',
    img: 'assets/demo-yogamat.jpg',
    url: 'https://amzn.to/3J3q2Ch'
  },
  {
    id: 'p8',
    title: 'Deep Work — Cal Newport',
    desc: 'Rules for focused success in a distracted world.',
    rating: '4.7/5',
    category: 'books',
    img: 'assets/demo-deepwork.jpg',
    url: 'https://amzn.to/43D0FOp'
  }, ...BOOKS, ...TECH, ...FITNESS, ...HOME, ...BEAUTY
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
    books: 'Books & Learning',
    beauty: 'Beauty & Personal Care'
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
