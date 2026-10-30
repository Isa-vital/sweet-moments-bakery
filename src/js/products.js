import hero from '../assets/images/hero-celebration.webp';
import breads from '../assets/images/artisan-breads.webp';
import cupcakes from '../assets/images/cupcakes-muffins.webp';
import pastries from '../assets/images/pastries-assortment.webp';

export const categories = [
  { id: 'all', label: 'All treats' },
  { id: 'cakes', label: 'Celebration cakes' },
  { id: 'bread', label: 'Fresh bread' },
  { id: 'small-bakes', label: 'Small bakes' },
  { id: 'pastries', label: 'Pastries & snacks' },
  { id: 'business', label: 'Business orders' }
];

export const products = [
  { id: 'loaf-of-bread', name: 'Loaf of Bread', price: 5000, category: 'bread', image: breads, alt: 'Illustrative assortment of golden bread loaves', description: 'A versatile everyday loaf for breakfast, lunch or sharing at home.' },
  { id: 'birthday-cake', name: 'Birthday Cake', price: 60000, category: 'cakes', image: hero, alt: 'Illustrative blush celebration cake with delicate decoration', description: 'A celebration centrepiece proposed for birthdays and joyful milestones.' },
  { id: 'cupcake', name: 'Cupcake', price: 2000, category: 'small-bakes', image: cupcakes, alt: 'Illustrative selection of blush and chocolate cupcakes', description: 'A single, easy-to-share bake suited to treats, gifts and small gatherings.' },
  { id: 'doughnuts', name: 'Doughnuts (2 Pieces)', price: 3000, category: 'small-bakes', image: pastries, alt: 'Illustrative glazed doughnuts and pastries', description: 'Two sweet doughnuts for a simple break-time or after-meal treat.' },
  { id: 'cookies', name: 'Cookies (Small Pack)', price: 5000, category: 'small-bakes', image: pastries, alt: 'Illustrative plate of assorted small cookies', description: 'A convenient small pack for sharing, gifting or enjoying with a drink.' },
  { id: 'chocolate-cake', name: 'Chocolate Cake', price: 50000, category: 'cakes', image: cupcakes, alt: 'Illustrative chocolate bakes and cupcakes', description: 'A rich-looking cake concept for chocolate lovers and special gatherings.' },
  { id: 'wedding-cake', name: 'Wedding Cake', price: 250000, category: 'cakes', image: hero, alt: 'Illustrative elegant celebration cake with flowers', description: 'A proposed wedding cake starting point, with final design and availability to be confirmed.' },
  { id: 'muffins', name: 'Muffins (2 Pieces)', price: 5000, category: 'small-bakes', image: cupcakes, alt: 'Illustrative bakery muffins in a bright studio setting', description: 'A pair of soft-looking muffins for breakfast, meetings or an afternoon pause.' },
  { id: 'pastry-pack', name: 'Pastry Pack', price: 10000, category: 'pastries', image: pastries, alt: 'Illustrative assortment of pastries, cookies and doughnuts', description: 'A mixed pastry option proposed for sharing at home, school or work.' },
  { id: 'office-snack-box', name: 'Office Snack Box', price: 25000, category: 'business', image: pastries, alt: 'Illustrative bakery assortment suitable for a snack box', description: 'A proposed mixed snack box for workplace meetings and team occasions.' }
];

export const formatUGX = (amount) => `UGX ${new Intl.NumberFormat('en-UG').format(amount)}`;
