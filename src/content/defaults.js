/* ─────────────────────────────────────────────────────────────────
   DEFAULT CONTENT — the bundled snapshot of everything editable.
   The site renders this instantly, then swaps in the published
   Cloudinary version when available. /admin edits a copy of this shape.
───────────────────────────────────────────────────────────────── */
import { categoryData, menuItems } from '../data/menuData';
import { galleryImages } from '../data/galleryImages';
import { DISHES } from '../data/houseFavourites';

/* Menu-book page images, in order: cover, menu1 … menu13 */
export const defaultMenuPages = [
  '/menu-pages/cover.avif',
  ...Array.from({ length: 13 }, (_, i) => `/menu-pages/menu${i + 1}.avif`),
];

/* ─── Hero "Our Menu" showcase (home, after scroll) ───
   Every slot except the first points at a menu category; the item
   count + "from ₹" price are computed live from the menu data.
   The first slot (coffee) is the scroll-animation anchor — locked.
   Images live at stable public paths (/showcase/*.png) so published
   content never carries local build URLs.
   mob = mobile dish-stage display: width % / height % of the slide,
   x/y shift in % of the slide. */
const DEFAULT_MOB = { w: 100, h: 118, x: 0, y: 0 };
export const defaultShowcase = [
  { id: 'coffee',  name: 'COFFEE',  img: '/showcase/coffee.avif', desc: 'Single origin, poured slow',  locked: true, categorySlug: null,           stats: ['24 items', 'from ₹75'], mob: { ...DEFAULT_MOB } },
  { id: 'burgers', name: 'BURGERS', img: '/showcase/burger.avif', desc: 'Flame-grilled, stacked tall', categorySlug: 'street-bites', mob: { ...DEFAULT_MOB } },
  { id: 'pizzas',  name: 'PIZZAS',  img: '/showcase/pizza.avif',  desc: 'Wood-fired, leopard-spotted', categorySlug: 'pizza',        mob: { ...DEFAULT_MOB } },
  { id: 'pasta',   name: 'PASTA',   img: '/showcase/beans.avif',  desc: 'Rolled into every sauce',     categorySlug: 'mains-pasta',  mob: { w: 75, h: 88, x: 0, y: 0 } },
  { id: 'cakes',   name: 'CAKES',   img: '/showcase/cake.avif',   desc: 'Baked for the sweet tooth',   categorySlug: 'dessert',      mob: { ...DEFAULT_MOB } },
  { id: 'drinks',  name: 'DRINKS',  img: '/showcase/splash.avif', desc: 'Coolers, shakes & brews',     categorySlug: 'beverages',    mob: { w: 55, h: 88, x: 0, y: 0 } },
  { id: 'snacks',  name: 'SNACKS',  img: '/showcase/fries.avif',  desc: 'Small plates, big cravings',  categorySlug: 'starters',     mob: { ...DEFAULT_MOB } },
];

/* ─── Palate showcase — the 3-D category carousel on home ─── */
export const defaultPalate = [
  { key: 'breakfast',  title: 'Breakfast',  sub: 'Early Hours',       categorySlug: 'breakfast-brunch', color: '#E9A23B', colorDark: '#3A2507', image: '/images/breakfast.avif',  copy: 'Our take on the first meal of the day. Exceptional coffee paired with hearty morning plates.' },
  { key: 'appetizers', title: 'Appetizers', sub: 'For the Table',     categorySlug: 'starters',         color: '#4E8F5A', colorDark: '#0F2614', image: '/images/appetizers.avif', copy: 'Small plates designed to be passed around. The best way to kick off an evening on the terrace.' },
  { key: 'burgers',    title: 'Burgers',    sub: 'Between the Buns',  categorySlug: 'street-bites',     color: '#C8553D', colorDark: '#33120B', image: '/images/burger.avif',    copy: 'No shortcuts here. Hand-formed patties, proper cheese, and house sauces piled high on soft brioche.' },
  { key: 'pizza',      title: 'Pizza',      sub: 'Wood Fired',        categorySlug: 'pizza',            color: '#B23A2E', colorDark: '#2E0D0A', image: '/images/pizza.avif',      copy: 'Hand-stretched dough fired until beautifully blistered. Featuring local favorites like our signature ghost pepper chicken.' },
  { key: 'pasta',      title: 'Pasta',      sub: 'Comfort Bowls',     categorySlug: 'mains-pasta',      color: '#D4A017', colorDark: '#352806', image: '/images/pasta.avif',      copy: 'Proper comfort food. Rich sauces, plenty of cheese, and pasta cooked exactly how it should be.' },
  { key: 'beverages',  title: 'Beverages',  sub: 'Pour & Sip',        categorySlug: 'beverages',        color: '#2F6BFF', colorDark: '#0A1A45', image: '/images/coolers.avif',  copy: 'Whether you need a morning caffeine hit or an icy evening mocktail, the bar has you covered.' },
  { key: 'desserts',   title: 'Desserts',   sub: 'To Finish',         categorySlug: 'dessert',          color: '#A24A72', colorDark: '#2B0F1D', image: '/images/brownie.avif',   copy: 'Because there\'s always room. Baked fresh in-house for when you just need something sweet.' },
];

/* ─── Our Story numbers (home) ─── */
export const defaultStory = { guests: '2K+', rating: '4.8', years: '3yr' };

/* ─── Ohana Experience panels (home) ─── */
export const defaultExperiences = [
  { id: '01', title: 'Terrace\nDining',      tag: 'Signature Experience', description: 'Open skies, warm lights, evenings worth staying for. Our rooftop terrace is where Jorhat unwinds.', image: '/images/terrace.avif',   accent: '#FF9F0A' },
  { id: '02', title: 'Coffee\nMoments',      tag: 'All Day',              description: 'Slow pours, rich aromas, and conversations that stretch past noon.',                                  image: '/images/coffee.avif',   accent: '#FF9F0A' },
  { id: '03', title: 'House\nFavourites',    tag: 'Most Ordered',         description: 'Tandoori pizza to fiery wings — the dishes guests order again and again.',                            image: '/images/tandoori.avif', accent: '#FF9F0A' },
  { id: '04', title: 'Gatherings\n& Groups', tag: 'Celebrations',         description: 'The perfect backdrop for long celebrations and even longer conversations.',                           image: '/images/spread.avif',       accent: '#FF9F0A' },
  { id: '05', title: 'Night\nAtmosphere',    tag: 'After Sunset',         description: 'Warm lights, cooler air, city below. The terrace transforms after dark.',                             image: '/images/night.avif', accent: '#FF9F0A' },
];

/* ─── Guest reviews (home) — real Google reviews for Ohana ─── */
export const defaultReviews = [
  { quote: 'Relaxing and stylish interiors, flavorful food, and great music create such an amazing vibe. Shroomz Pizza is truly top-notch, and the chicken burgers are delicious too.', author: 'Jyotishman Saikia', visit: 'Brunch · Google review', rating: 5 },
  { quote: 'We were a group of 12 travelling for a Kaziranga safari trip. Fantastic service from Meghali and Smiti, delicious food and ambience. Would definitely recommend.', author: 'Karteek H', visit: 'Group lunch · Google review', rating: 5 },
  { quote: 'Best food in the city. I recommend this place for the food, ambience and service.', author: 'Shantanu Borgohain', visit: 'Lunch · Google review', rating: 5 },
  { quote: 'Had the peri peri chicken steak, fish steak, waffle and fruit cream. The food is really great in taste and the portion size is amazing. Our waitress was really pleasant.', author: 'Michelle Mathew', visit: 'Dinner · Google review', rating: 5 },
  { quote: 'A fantastic spot to hang out with friends and family. The ambiance here is truly unique in Jorhat, with vibrant decor and a welcoming atmosphere.', author: 'Hridoy Saikia', visit: 'Dinner · Google review', rating: 5 },
  { quote: 'Food was amazing, the service was very fast and the staff very polite. Price was justified by the food quality. The rooftop space is perfect for a meal with a view.', author: 'Simran S', visit: 'Rooftop dinner · Google review', rating: 5 },
  { quote: 'The place is very soothing and comfortable, the staff are well mannered, and the cafe is themed like Santorini, Greece. The paneer Ohana pizza and chicken a la kiev were great.', author: 'Risa Kalita', visit: 'Dine in · Google review', rating: 5 },
  { quote: 'One of the places everyone has highly spoken about — and it did not disappoint at all. The food options were great and the continental quality is one of the best I have had.', author: 'Ankur Jyoti Sharma', visit: 'Dinner · Google review', rating: 5 },
];

/* ─── Menu page hero stats ─── */
export const defaultMenuStats = [
  { n: '8',    l: 'Categories' },
  { n: '130+', l: 'Dishes' },
  { n: '4.8★', l: 'Avg Rating' },
  { n: 'Daily', l: 'Open 11AM–10PM' },
];

export const defaultContent = {
  version: 2,
  menu: {
    categories: categoryData,
    items: menuItems,
  },
  gallery: galleryImages,
  houseFavs: DISHES,
  menuPages: defaultMenuPages,
  showcase: defaultShowcase,
  palate: defaultPalate,
  story: defaultStory,
  experiences: defaultExperiences,
  reviews: defaultReviews,
  menuStats: defaultMenuStats,
};
