/* ─────────────────────────────────────────────────────────────────
   OHANA MENU DATA  — sourced from the actual printed menu (6 pages)
   8 consolidated categories, real items, real prices, real badges
───────────────────────────────────────────────────────────────── */

/* Category cards shown on the main /menu horizontal-scroll gallery */
export const categoryData = [
  {
    slug: 'breakfast-brunch',
    name: 'Breakfast & Brunch',
    tagline: 'The best of all in one platter',
    image: '/images/breakfast.avif',
    accent: '#1D4ED8',
    icon: '🍳',
  },
  {
    slug: 'starters',
    name: 'Starters',
    tagline: 'Soups, salads & bites to begin with',
    image: '/images/appetizers.avif',
    accent: '#4E8F5A',
    icon: '🥗',
  },
  {
    slug: 'street-bites',
    name: 'Street Bites',
    tagline: 'Dumplings, hot dogs & loaded buns',
    image: '/images/dumplings.avif',
    accent: '#1D4ED8',
    icon: '🌭',
  },
  {
    slug: 'mains-pasta',
    name: 'Mains & Pasta',
    tagline: "Italy's gift to the world, Ohana style",
    image: '/images/pasta.avif',
    accent: '#1D4ED8',
    icon: '🍝',
  },
  {
    slug: 'pizza',
    name: 'Pizza',
    tagline: 'The Italian staple, loaded your way',
    image: '/images/pizza.avif',
    accent: '#C8553D',
    icon: '🍕',
  },
  {
    slug: 'steaks-grill',
    name: 'Steaks & Grill',
    tagline: 'Pesto, peri peri & perfectly grilled',
    image: '/images/steak.avif',
    accent: '#1D4ED8',
    icon: '🥩',
  },
  {
    slug: 'dessert',
    name: 'Dessert',
    tagline: 'The sweet ending you planned around',
    image: '/images/brownie.avif',
    accent: '#1D4ED8',
    icon: '🍓',
  },
  {
    slug: 'beverages',
    name: 'Beverages',
    tagline: 'Brews, shakes, mojitos & more',
    image: '/images/coolers.avif',
    accent: '#4E8F5A',
    icon: '🧋',
  },
];

/* Category slug → flip-book spread for deep-links (/menu?flip=N&side=…).
   Matches the printed page where each category starts (spread N shows
   menu pages 2N-1 | 2N). Shared by the home hero, the palate carousel
   and the admin panel. */
export const categoryBookMap = {
  'breakfast-brunch': { flip: 1, side: 'left'  },
  'starters':         { flip: 2, side: 'right' },
  'street-bites':     { flip: 3, side: 'right' },
  'mains-pasta':      { flip: 4, side: 'left'  },
  'pizza':            { flip: 4, side: 'right' },
  'steaks-grill':     { flip: 5, side: 'left'  },
  'dessert':          { flip: 5, side: 'left'  },
  'beverages':        { flip: 6, side: 'left'  },
};

/* ─────────────────────────────────────────────────────────────────
   ALL MENU ITEMS — real items from 6 printed menu pages
   Fields:
     category    — matches categoryData slug
     subcategory — shown as section headers within the page
     title       — exact name from menu
     description — description from menu (may be generated if not present)
     price       — number or string like "100/120" for veg/non-veg split
     isSpicy     — 🌶
     isOhanaSpecial — ★ Ohana Special (★ symbol on menu)
     containsPork   — 🐷
     isNew          — NEW badge
     isVeg          — (VEG) label
     isNonVeg       — (NON VEG) label
───────────────────────────────────────────────────────────────── */
export const menuItems = [

  // ══════════════════════════════════════════════
  // BREAKFAST & BRUNCH
  // ══════════════════════════════════════════════

  // — All Day Breakfast Combos —
  {
    category: 'breakfast-brunch',
    subcategory: 'All Day Breakfast Combos',
    title: 'The Full English',
    description: '2 breakfast sausages, 2 fried eggs, baked beans, grilled tomatoes, 2 toasts',
    price: 279,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'All Day Breakfast Combos',
    title: 'Veggie Breakfast',
    description: 'Sautéed mushrooms & onions, 2 hash browns, baked beans, grilled tomatoes, 2 toasts',
    price: 259,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'All Day Breakfast Combos',
    title: 'Carnivores Plate',
    description: 'Pork bacon rashers, 2 breakfast sausages, 2 fried eggs, grilled tomatoes, 2 toasts',
    price: 289,
    isNonVeg: true,
    containsPork: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'All Day Breakfast Combos',
    title: 'Bangers & Mash',
    description: '2 chicken frankfurters tossed in house made BBQ sauce placed on a bed of mashed potatoes with a side of green peas',
    price: 289,
    isNonVeg: true,
  },

  // — Sandwiches —
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Peanut Butter & Jelly Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 149,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Cucumber Tomato Cheese Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 179,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Cheese & Corn Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 179,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Peppy Paneer Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 179,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Mayo Chicken Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 199,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Sandwiches',
    title: 'Chicken Club Sandwich',
    description: 'Served with a side of wafers & ketchup',
    price: 229,
    isNonVeg: true,
  },

  // — Omelettes —
  {
    category: 'breakfast-brunch',
    subcategory: 'Omelettes',
    title: 'Masala Omelette',
    description: 'Served with a side of toast & ketchup',
    price: 149,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Omelettes',
    title: 'Cheese Omelette',
    description: 'Served with a side of toast & ketchup',
    price: 149,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Omelettes',
    title: 'Spanish Omelette',
    description: 'Served with a side of toast & ketchup',
    price: 169,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Omelettes',
    title: 'Mushroom Omelette',
    description: 'Served with a side of toast & ketchup',
    price: 189,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Omelettes',
    title: 'Chicken Sausage Omelette',
    description: 'Served with a side of toast & ketchup',
    price: 189,
    isNonVeg: true,
  },

  // — Add-Ons —
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Extra Toast',
    description: 'Served with breakfast & combos only',
    price: 20,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Hash Brown',
    description: 'Served with breakfast & combos only',
    price: 30,
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Boiled Eggs',
    description: 'Served with breakfast & combos only',
    price: 30,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Sunny Side Up',
    description: 'Served with breakfast & combos only',
    price: 40,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Scrambled Eggs',
    description: 'Served with breakfast & combos only',
    price: 75,
    priceLabel: '75/Portion',
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Baked Beans',
    description: 'Served with breakfast & combos only',
    price: 40,
    priceLabel: '40/Portion',
    isVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Breakfast Sausages (2 pcs)',
    description: 'Served with breakfast & combos only',
    price: 80,
    priceLabel: '80/Portion',
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Chicken Frankfurter',
    description: 'Served with breakfast & combos only',
    price: 80,
    isNonVeg: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Pork Frankfurter',
    description: 'Served with breakfast & combos only',
    price: 90,
    isNonVeg: true,
    containsPork: true,
  },
  {
    category: 'breakfast-brunch',
    subcategory: 'Add-Ons',
    title: 'Fried Bacon (4 Strips)',
    description: 'Served with breakfast & combos only',
    price: 80,
    isNonVeg: true,
    containsPork: true,
  },

  // ══════════════════════════════════════════════
  // STARTERS
  // ══════════════════════════════════════════════

  // — Soups —
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Cream of Tomato Soup',
    description: 'Single portion soup, rich and velvety',
    price: 100,
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Tomato Egg Drop Soup',
    description: 'Single portion, silky egg ribbons in tomato broth',
    price: 120,
    isNonVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Sweet Corn Soup',
    description: 'Single portion, available in veg or chicken',
    price: '100/120',
  },
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Lemon Coriander Soup',
    description: 'Bright, citrusy, light and cleansing',
    price: '100/120',
  },
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Hot & Sour Soup',
    description: 'Classic Indo-Chinese, bold flavours',
    price: '100/120',
    isSpicy: true,
  },
  {
    category: 'starters',
    subcategory: 'Soups',
    title: 'Thai Tom Yum Soup',
    description: 'Fragrant lemongrass broth with mushrooms and galangal',
    price: '120/150',
    isSpicy: true,
  },

  // — Salads —
  {
    category: 'starters',
    subcategory: 'Salads',
    title: 'Summer Watermelon Feta Salad',
    description: 'Seasonal salad from the Ohana Signature Collection',
    price: 200,
    isVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Salads',
    title: 'Caesar Salad',
    description: 'Ohana Signature Collection — crispy romaine, croutons, parmesan',
    price: '250/300',
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Salads',
    title: 'Greek Horiatiki Salad',
    description: 'Ohana Signature Collection — tomato, cucumber, olives, feta',
    price: '250/300',
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Salads',
    title: 'Vietnamese Chicken Salad',
    description: 'Ohana Signature Collection — fresh herbs, shredded chicken, tangy dressing',
    price: 300,
    isOhanaSpecial: true,
    isNonVeg: true,
  },

  // — Appetizers (Veg) —
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'French Fries — Classic / Peri-Peri',
    description: 'Where it all starts',
    price: '170/180',
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Texan Onion Rings',
    description: 'Never thought onions could taste this good. Served with our in-house dip sauce',
    price: 180,
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Chilli Cheese Triangles',
    description: 'Toasts topped with molten mozzarella and a whole lot of zing. Served with our in-house dip sauce',
    price: 200,
    isSpicy: true,
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Veg Bullet',
    description: 'Small vegetable bullets that have a burst of flavours paired with ketchup',
    price: 230,
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Crispy Chilli Sweet Corn',
    description: "The town's hottest selling snack — Ohana Style",
    price: 230,
    isSpicy: true,
    isVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Honey Chilli Potato',
    description: 'When you are spicy and sweet, timeless potato classic',
    price: 230,
    isVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Crispy Veg Salt & Pepper',
    description: "OHANA's hot favourite — Asian style veggies, crispy, spicy and a lot tasty",
    price: 230,
    isVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Veg)',
    title: 'Falafel with Hummus',
    description: "EGYPT's famous chickpeas based tikkis married to the ISRAELI dip — hummus",
    price: 230,
    isVeg: true,
  },

  // — Appetizers (Non-Veg) —
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Panko Chicken Strips',
    description: 'Juicy & tender chicken strips breaded and fried served with peri-peri dip sauce',
    price: 250,
    isNonVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Chilly Chicken Chunks',
    description: 'A time defying Asian classic',
    price: 250,
    isNonVeg: true,
    isSpicy: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Chicken Corn Dogs',
    description: 'Sausages batter fired on a stick. Close to a non veg lollipop, served with our in-house dip sauce',
    price: 250,
    isNonVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'BBQ Chicken Wings',
    description: "OHANA's hot favourite — chicken whole wings tossed in BBQ sauce. Succulent, sweet & spicy at the same time",
    price: 270,
    isNonVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Dragon Fiery Chicken Wings',
    description: 'Our hottest dish on the menu — chicken whole wings tossed in our in-house Asian styled fiery sauce',
    price: 270,
    isNonVeg: true,
    isSpicy: true,
    isOhanaSpecial: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Fish Finger',
    description: 'Basa fish rolled in bread crumbs served with freshly made tartar dip sauce',
    price: 300,
    isNonVeg: true,
  },
  {
    category: 'starters',
    subcategory: 'Appetizers (Non-Veg)',
    title: 'Fried Calamari',
    description: 'Classic batter fried squid rings served with freshly made tartar dip sauce',
    price: 330,
    isNonVeg: true,
  },

  // ══════════════════════════════════════════════
  // STREET BITES
  // ══════════════════════════════════════════════

  // — Hawker Style Steamed Dumplings —
  {
    category: 'street-bites',
    subcategory: 'Hawker Style Dumplings',
    title: 'Veg Dumplings',
    description: 'Served with in-house spicy dip',
    price: 190,
    isVeg: true,
  },
  {
    category: 'street-bites',
    subcategory: 'Hawker Style Dumplings',
    title: 'Chicken Dumplings',
    description: 'Served with in-house spicy dip',
    price: 210,
    isNonVeg: true,
  },
  {
    category: 'street-bites',
    subcategory: 'Hawker Style Dumplings',
    title: 'Pork Dumplings',
    description: 'Served with in-house spicy dip',
    price: 230,
    isNonVeg: true,
    containsPork: true,
  },

  // — Hot Dogs (American Comfort) —
  {
    category: 'street-bites',
    subcategory: 'Hot Dogs',
    title: 'Classic Chicken Hot Dog',
    description: 'Topped with in-house sauces',
    price: 250,
    isNonVeg: true,
  },
  {
    category: 'street-bites',
    subcategory: 'Hot Dogs',
    title: 'Tandoori Twist Hot Dog',
    description: 'Topped with in-house sauces',
    price: 250,
    isNonVeg: true,
  },
  {
    category: 'street-bites',
    subcategory: 'Hot Dogs',
    title: 'Indie Mint Hot Dog',
    description: 'Topped with in-house sauces',
    price: 250,
    isNonVeg: true,
  },

  // ══════════════════════════════════════════════
  // MAINS & PASTA
  // ══════════════════════════════════════════════

  // — Pasta & Spaghetti —
  {
    category: 'mains-pasta',
    subcategory: 'Pasta & Spaghetti',
    title: 'Penne Arabiatta',
    description: "Red sauce made with tomatoes, garlic and Italian herbs",
    price: '300/325',
    isOhanaSpecial: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Pasta & Spaghetti',
    title: 'Penne Alfredo',
    description: 'White sauce made with butter, cream garlic and lots of parmesan cheese',
    price: '300/325',
    isOhanaSpecial: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Pasta & Spaghetti',
    title: 'Spaghetti Aglio Olio',
    description: 'Tossed in olive oil, garlic, basil and black olives',
    price: '325/350',
    isOhanaSpecial: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Pasta & Spaghetti',
    title: 'Spaghetti Carbonara',
    description: 'Traditional spaghetti with bacon, parmesan cheese, egg yolk, parsley and garlic',
    price: 375,
    containsPork: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Pasta & Spaghetti',
    title: "Fisherman's Penne Pasta",
    description: 'Penne pasta tossed in Ohana signature orange sauce with prawns',
    price: 400,
    isNonVeg: true,
  },

  // — Mains (Single Portion Meals) —
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Mongolian Vegetables with Rice',
    description: 'A OHANA speciality — Asian vegetables tossed in tangy, sweet yet spicy Mongolian sauce served on steamed rice',
    price: '350/400',
    isOhanaSpecial: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Thai Red Curry with Rice',
    description: 'Asian greens, flavoured with lemongrass and tossed in Thai red curry paste served on steamed rice',
    price: '350/400',
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Thai Green Curry with Rice',
    description: 'Asian greens, flavoured with lemongrass and tossed in Thai green curry paste served on steamed rice',
    price: '350/400',
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Louisiana Cajun Chicken',
    description: 'Chicken breast rubbed in cajun spice and oven-baked. Served with grilled veggies & peri-peri mayo',
    price: 400,
    isNonVeg: true,
    isSpicy: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'English Fish & Chips',
    description: 'A classic from the streets of London — fish fillets butter fried with a side of classic french fries and tartar dip sauce',
    price: 400,
    isNonVeg: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Chicken A-La-Kiev',
    description: 'A OHANA speciality — watch the goodness of butter ooze out of stuffed panko crusted chicken breast. Served with a side of grilled veggies & creamy mashed potatoes',
    price: 420,
    isNonVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Orange Sauce Prawns with Herbed Rice',
    description: 'Prawns tossed in our in-house orange sauce served with a side of buttery green peas on a bed of herbed rice',
    price: 450,
    isNonVeg: true,
  },
  {
    category: 'mains-pasta',
    subcategory: 'Mains',
    title: 'Asian Slow Cooked Pork on Rice',
    description: 'A OHANA speciality of slow roasted pork cooked with Asian greens in dark soy served on a bed of herbed rice',
    price: 450,
    isNonVeg: true,
    containsPork: true,
    isOhanaSpecial: true,
    isSpicy: true,
  },

  // ══════════════════════════════════════════════
  // PIZZA
  // ══════════════════════════════════════════════
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Classic Margherita',
    description: 'A lot of house made pizza sauce topped with mozzarella & cheddar cheese with basil leaves',
    price: 350,
    isVeg: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'The Vegetable Garden',
    description: 'House made pizza sauce topped with bell pepper, onion, sweet corn, tomato & mozzarella & cheddar',
    price: 370,
    isVeg: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Paneer Ohana Pizza',
    description: 'House made pizza sauce topped with paneer, olive, jalepeno, bell pepper, onion & mozzarella & cheddar',
    price: 390,
    isVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Shroomz Pizza',
    description: 'A Mushroom loaded pizza topped with house made Pizza Sauce, Olive Oil, Onion, Parsley and Mozzarella Cheddar Cheese',
    price: 400,
    isVeg: true,
    isNew: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Roasted Exotic Veggie Pizza',
    description: 'Featured Green & Yellow Zucchini, Red Yellow Green Bell Peppers, Black Olives, Brocolli, Grilled Onions on house made Pizza Sauce topped with Mozarella & Cheddar cheese',
    price: 420,
    isVeg: true,
    isNew: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Peri Peri Chicken Pizza',
    description: 'Peri peri chicken, jalepeno, bell pepper, cherry tomato, onion & mozzarella & cheddar',
    price: 390,
    isNonVeg: true,
    isSpicy: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'The Ghost Pepper Chicken Pizza',
    description: "OHANA's signature red hot pizza with chicken toppings & the pride of Assam",
    price: 400,
    isNonVeg: true,
    isSpicy: true,
    isOhanaSpecial: true,
    isNew: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Tandoori Chicken Sausage Pizza',
    description: 'House made Pizza Sauce topped with Chicken Sausage, Tandoori Sauce, Bell Peppers and Mozarella & Cheddar cheese',
    price: 400,
    isNonVeg: true,
    isOhanaSpecial: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Chicken Overload Pizza',
    description: 'Peri Peri Chicken, Chicken sausage, Roasted chicken rashers on house made Pizza Sauce topped with Mozarella & Cheddar cheese',
    price: 450,
    isNonVeg: true,
    isSpicy: true,
    isNew: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Pork Pepperoni Pizza',
    description: 'House made pizza sauce topped with mozarella & cheddar cheese & pork pepperoni',
    price: 420,
    isNonVeg: true,
    containsPork: true,
  },
  {
    category: 'pizza',
    subcategory: 'Pizza',
    title: 'Pork Bacon & Sausage Pizza',
    description: "Pork lovers choice",
    price: 500,
    isNonVeg: true,
    containsPork: true,
  },

  // ══════════════════════════════════════════════
  // STEAKS & GRILL
  // ══════════════════════════════════════════════
  {
    category: 'steaks-grill',
    subcategory: 'Steaks',
    title: 'Pesto Vegetable Steak',
    description: 'Vegetable Steak topped with Pesto Sauce & served with a side of grilled vegetables',
    price: 400,
    isVeg: true,
    isNew: true,
    isOhanaSpecial: true,
  },
  {
    category: 'steaks-grill',
    subcategory: 'Steaks',
    title: 'Peri-Peri Vegetable Steak',
    description: 'Vegetable Steak topped with Peri – Peri Sauce & served with a side of grilled vegetables',
    price: 400,
    isVeg: true,
    isNew: true,
    isOhanaSpecial: true,
    isSpicy: true,
  },
  {
    category: 'steaks-grill',
    subcategory: 'Steaks',
    title: 'Pesto Chicken Steak',
    description: 'Chicken breast seasoned with oregano & olive oil served with pesto sauce and grilled vegetables',
    price: 450,
    isNonVeg: true,
    isNew: true,
    isOhanaSpecial: true,
  },
  {
    category: 'steaks-grill',
    subcategory: 'Steaks',
    title: 'Peri-Peri Chicken Steak',
    description: 'Chicken breast seasoned with peri peri mix, olive oil served with peri – peri sauce and grilled vegetables',
    price: 450,
    isNonVeg: true,
    isNew: true,
    isOhanaSpecial: true,
    isSpicy: true,
  },
  {
    category: 'steaks-grill',
    subcategory: 'Steaks',
    title: 'Fish Steak with Creamy Sauce',
    description: 'Grilled Fish Fillet topped with creamy garlic sauce served with a side of grilled vegetables',
    price: 500,
    isNonVeg: true,
    isNew: true,
    isOhanaSpecial: true,
  },

  // ══════════════════════════════════════════════
  // DESSERT
  // ══════════════════════════════════════════════
  {
    category: 'dessert',
    subcategory: 'Dessert',
    title: 'Fresh Fruits & Cream',
    description: 'Seasonal fresh fruits served with fresh whipped cream',
    price: 220,
    isVeg: true,
  },

  // ══════════════════════════════════════════════
  // BEVERAGES
  // ══════════════════════════════════════════════

  // — Hot Brews —
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Espresso Shot',
    description: 'Bold, short, perfectly pulled',
    price: 80,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Americano',
    description: 'Espresso diluted with hot water, clean and bold',
    price: 90,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Cappuccino',
    description: 'Velvety steamed milk, espresso shot',
    price: 140,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Café Latte',
    description: 'Smooth espresso with lots of steamed milk',
    price: 140,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Mochaccino',
    description: 'Chocolate espresso delight',
    price: 160,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Macchiato',
    description: 'Espresso marked with a dollop of froth',
    price: 160,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Caramel Cappuccino',
    description: 'Cappuccino with a caramel twist',
    price: 160,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Vietnamese Coffee',
    description: 'Strong drip coffee with condensed milk',
    price: 160,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Irish Coffee',
    description: 'Bold coffee with a warm Irish twist',
    price: 190,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Hot Chocolate',
    description: 'Rich, cozy, whipped cream finish',
    price: 160,
  },
  {
    category: 'beverages',
    subcategory: 'Hot Brews',
    title: 'Peanut Butter Hot Chocolate',
    description: 'Rich hot chocolate with peanut butter swirl',
    price: 190,
  },

  // — Cold Brews —
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Iced Americano',
    description: 'Chilled espresso over ice',
    price: 140,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Iced Latte',
    description: 'Milk, espresso, chilled over ice',
    price: 170,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Classic Cold Coffee',
    description: 'Chilled blended coffee, smooth and cold',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Hazelnut Frappe',
    description: 'Blended frappe with hazelnut syrup',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Caramel Frappe',
    description: 'Sweet caramel blended frappe',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Mocha Frappe',
    description: 'Chocolate mocha blended frappe',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Cold Brews',
    title: 'Vietnamese Iced Coffee',
    description: 'Drip coffee over ice with condensed milk',
    price: 220,
  },

  // — Tea —
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'English Breakfast Tea',
    description: 'Classic robust breakfast blend',
    price: 75,
  },
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'Earl Grey Tea',
    description: 'Bergamot-infused classic tea',
    price: 75,
  },
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'Lemon Tea',
    description: 'Zesty and refreshing',
    price: 75,
  },
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'Assam Tea',
    description: 'Bold and malty, straight from Assam',
    price: 75,
  },
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'Green Tea',
    description: 'Light, clean, antioxidant-rich',
    price: 85,
  },
  {
    category: 'beverages',
    subcategory: 'Tea',
    title: 'Honey Ginger Tea',
    description: 'Warming ginger with a honey sweetness',
    price: 120,
  },

  // — Mojitos & Coolers —
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Classic Mojito',
    description: 'Mint, lime, fizzy refreshment',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Watermelon Mojito',
    description: 'Sweet watermelon meets classic mojito',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Strawberry Mojito',
    description: 'Fruity strawberry twist on the classic',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Blueberry Mojito',
    description: 'Bright blueberry with sparkling mint',
    price: 180,
    isNew: true,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Moroccan Squash',
    description: 'Exotic North African inspired cooler',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Watermelon Sparkler',
    description: 'Sparkling watermelon refresher',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Green Apple Sparkler',
    description: 'Tart green apple with bubbles',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Classic Lemonade',
    description: 'Fresh squeezed lemonade, house style',
    price: 140,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Masala Lemonade',
    description: 'Spiced lemonade with Indian masala',
    price: 150,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Lemon Iced Tea',
    description: 'Chilled black tea with a lemon twist',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Peach Iced Tea',
    description: 'Chilled black tea with peach nectar',
    price: 180,
  },
  {
    category: 'beverages',
    subcategory: 'Mojitos & Coolers',
    title: 'Red Ruby',
    description: 'A mysterious Ohana house cooler',
    price: 180,
    isNew: true,
  },

  // — Shakes —
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Mango Burst Shake',
    description: 'Thick mango milkshake, tropical and sweet',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Choco Banana Shake',
    description: 'Rich chocolate with ripe banana',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Strawberry Milk Shake',
    description: 'Fresh strawberry, creamy and cold',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Blueberry Pie Shake',
    description: 'Blueberry with a pie-like richness',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Oreo Dark Chocolate Shake',
    description: 'Oreo cookies blended with dark chocolate',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Kit Kat Shake',
    description: 'Kit Kat blended into a thick shake',
    price: 220,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Ohana Chunky Brownie Shake',
    description: 'Thick, cold, devastating — Ohana signature',
    price: 240,
    isOhanaSpecial: true,
  },
  {
    category: 'beverages',
    subcategory: 'Shakes',
    title: 'Arctic Ice Shake',
    description: 'A chilling new Ohana creation',
    price: 240,
    isNew: true,
  },

  // — Juices —
  {
    category: 'beverages',
    subcategory: 'Juices',
    title: 'Fresh Seasonal Juice',
    description: 'Whatever the season brings, freshly pressed',
    price: 150,
  },
  {
    category: 'beverages',
    subcategory: 'Juices',
    title: 'Apple Juice',
    description: 'Crisp and clean apple juice',
    price: 150,
  },
  {
    category: 'beverages',
    subcategory: 'Juices',
    title: 'Orange Juice',
    description: 'Freshly squeezed sunrise orange',
    price: 150,
  },
  {
    category: 'beverages',
    subcategory: 'Juices',
    title: 'Pineapple Juice',
    description: 'Tropical pineapple, chilled and fresh',
    price: 150,
  },
  {
    category: 'beverages',
    subcategory: 'Juices',
    title: 'Mixed Fruit Juice',
    description: 'Seasonal fruit medley, chilled and bright',
    price: 150,
  },

  // — Others —
  {
    category: 'beverages',
    subcategory: 'Others',
    title: 'Coca Cola',
    description: 'The classic',
    price: 80,
  },
  {
    category: 'beverages',
    subcategory: 'Others',
    title: 'Coke Zero',
    description: 'Zero sugar, full taste',
    price: 80,
  },
  {
    category: 'beverages',
    subcategory: 'Others',
    title: 'Sprite',
    description: 'Crisp and cool lemon-lime fizz',
    price: 80,
  },
  {
    category: 'beverages',
    subcategory: 'Others',
    title: 'Red Bull',
    description: 'Energy drink',
    price: 200,
  },
  {
    category: 'beverages',
    subcategory: 'Others',
    title: 'Mineral Water',
    description: 'Still or sparkling',
    price: 'MRP',
  },

  // — Ohana Summer Selections —
  {
    category: 'beverages',
    subcategory: 'Ohana Summer Selections',
    title: 'Tropical Spice',
    description: 'A bold tropical summer creation by Ohana',
    price: 200,
    isOhanaSpecial: true,
  },
  {
    category: 'beverages',
    subcategory: 'Ohana Summer Selections',
    title: 'Bombay Kala Khatta',
    description: 'Street-style tangy Kala Khatta, Ohana edition',
    price: 200,
    isOhanaSpecial: true,
  },
  {
    category: 'beverages',
    subcategory: 'Ohana Summer Selections',
    title: 'Cucumber Mint Julep',
    description: 'Cool cucumber with fresh mint, summer in a glass',
    price: 200,
    isOhanaSpecial: true,
  },
];

/* Homepage featured picks */
export const signatureDishes = [
  {
    name: 'Dragon Fiery Chicken Wings',
    description: "OHANA's hottest — whole wings in fiery Asian sauce",
    price: 270,
    badge: '🌶 Spicy · ★ Ohana Special',
  },
  {
    name: 'Tandoori Chicken Sausage Pizza',
    description: 'Tandoor meets Naples, Ohana style',
    price: 400,
    badge: '★ Ohana Special',
  },
  {
    name: 'Ohana Chunky Brownie Shake',
    description: 'Thick, cold, devastating',
    price: 240,
    badge: '★ Ohana Special',
  },
  {
    name: 'Chicken A-La-Kiev',
    description: 'Butter-oozing panko crusted chicken breast',
    price: 420,
    badge: '★ Ohana Special',
  },
  {
    name: 'Ghost Pepper Chicken Pizza',
    description: "The pride of Assam on a pizza",
    price: 400,
    badge: '🌶 Spicy · ★ New',
  },
  {
    name: 'Crispy Chilli Sweet Corn',
    description: "The town's hottest selling snack",
    price: 230,
    badge: '🌶 Spicy · ★ Ohana Special',
  },
];

export const menuSummary = {
  homepageCategories: [
    { name: 'Breakfast & Brunch', tagline: 'Sunrise plates to wake up right', slug: 'breakfast-brunch', image: '/images/breakfast.avif' },
    { name: 'Starters', tagline: 'Soups, salads & bites to begin with', slug: 'starters', image: '/images/appetizers.avif' },
    { name: 'Street Bites', tagline: 'Dumplings, hot dogs & loaded buns', slug: 'street-bites', image: '/images/dumplings.avif' },
    { name: 'Mains & Pasta', tagline: 'Sauces that hug every strand', slug: 'mains-pasta', image: '/images/pasta.avif' },
    { name: 'Pizza', tagline: 'The Italian staple, loaded your way', slug: 'pizza', image: '/images/pizza.avif' },
    { name: 'Steaks & Grill', tagline: 'Pesto, peri peri & perfectly grilled', slug: 'steaks-grill', image: '/images/steak.avif' },
    { name: 'Dessert', tagline: 'Sweet endings worth saving room for', slug: 'dessert', image: '/images/brownie.avif' },
    { name: 'Beverages', tagline: 'Brews, shakes, mojitos & more', slug: 'beverages', image: '/images/coolers.avif' },
  ],
};
