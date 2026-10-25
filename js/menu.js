/*
 * Fazari menu data. Edit this file to update the menu on the site.
 *
 * - category: must match one of the category ids below
 * - veg:      true shows the green veg mark, false the non-veg mark
 * - price:    in rupees, e.g. 280. Leave as null to hide the price.
 * - favourite: true adds a "Guest favourite" tag
 * - image:    optional photo, e.g. 'assets/images/menu/chicken-mandi.jpg'
 */
window.FAZARI_MENU = {
  categories: [
    { id: 'mandi-biryani', name: 'Mandi & Biryani' },
    { id: 'grills', name: 'Grills & Tandoor' },
    { id: 'shawarma', name: 'Shawarma' },
    { id: 'curries-breads', name: 'Curries & Breads' }
  ],

  items: [
    {
      name: 'Chicken Mandi',
      category: 'mandi-biryani',
      description: 'Fragrant mandi rice with tender, slow-cooked chicken.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'BBQ Biryani',
      category: 'mandi-biryani',
      description: 'Biryani layered with smoky barbecued chicken.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'Full Tandoori',
      category: 'grills',
      description: 'Whole chicken, marinated and roasted in the tandoor.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'BBQ Kebab Platter',
      category: 'grills',
      description: 'An assortment of charcoal-grilled kebabs for the table.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'Grilled Chicken',
      category: 'grills',
      description: 'Spiced chicken grilled over open flame.',
      veg: false,
      price: null,
      favourite: false
    },
    {
      name: 'Tandoori Prawns',
      category: 'grills',
      description: 'Prawns in a bold tandoori marinade.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'Mexican Shawarma Plate',
      category: 'shawarma',
      description: 'Shawarma with a spicy Mexican-style twist, served plated.',
      veg: false,
      price: null,
      favourite: true
    },
    {
      name: 'Chicken Shawarma Roll',
      category: 'shawarma',
      description: 'Classic shawarma wrapped and rolled to go.',
      veg: false,
      price: null,
      favourite: false
    },
    {
      name: 'Chicken Butter Masala',
      category: 'curries-breads',
      description: 'Chicken in a rich, buttery tomato gravy.',
      veg: false,
      price: null,
      favourite: false
    },
    {
      name: 'Butter Naan',
      category: 'curries-breads',
      description: 'Soft tandoor naan brushed with butter.',
      veg: true,
      price: null,
      favourite: false
    },
    {
      name: 'Onion Naan',
      category: 'curries-breads',
      description: 'Naan stuffed with onion and baked in the tandoor.',
      veg: true,
      price: null,
      favourite: false
    },
    {
      name: 'Roti',
      category: 'curries-breads',
      description: 'Whole-wheat tandoor roti.',
      veg: true,
      price: null,
      favourite: false
    }
  ]
};
