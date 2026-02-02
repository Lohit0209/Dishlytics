const RECIPES = {
  paneer_butter_masala: {
    name: "Paneer Butter Masala",
    baseServings: 4,
    time: 30,
    ingredients: [
      { name: "Paneer", quantity: 400, unit: "grams" },
      { name: "Butter", quantity: 4, unit: "tablespoons" },
      { name: "Tomato puree", quantity: 2, unit: "cups" },
      { name: "Fresh cream", quantity: 3, unit: "tablespoons" },
      { name: "Garam masala", quantity: 2, unit: "teaspoons" }
    ],
    steps: [
      "Heat butter and oil in a pan",
      "Add tomato puree and cook for 5 minutes",
      "Add spices and mix well",
      "Add paneer cubes and simmer for 10 minutes",
      "Add cream, stir, and serve hot"
    ]
  },

  veg_biryani: {
    name: "Vegetable Biryani",
    baseServings: 4,
    time: 45,
    ingredients: [
      { name: "Basmati rice", quantity: 2, unit: "cups" },
      { name: "Mixed vegetables", quantity: 2, unit: "cups" },
      { name: "Yogurt", quantity: 4, unit: "tablespoons" },
      { name: "Biryani masala", quantity: 2, unit: "teaspoons" },
      { name: "Fried onions", quantity: 1, unit: "handful" }
    ],
    steps: [
      "Wash and soak rice for 20 minutes",
      "Cook vegetables with masala",
      "Layer rice and vegetables in a pot",
      "Add fried onions and ghee",
      "Steam for 15 minutes and serve"
    ]
  },

  chicken_biryani: {
    name: "Chicken Biryani",
    baseServings: 4,
    time: 60,
    ingredients: [
      { name: "Chicken", quantity: 600, unit: "grams" },
      { name: "Basmati rice", quantity: 2, unit: "cups" },
      { name: "Yogurt", quantity: 1, unit: "cup" },
      { name: "Biryani masala", quantity: 3, unit: "tablespoons" },
      { name: "Fried onions", quantity: 1, unit: "cup" }
    ],
    steps: [
      "Marinate chicken with yogurt and spices",
      "Cook rice 70% and keep aside",
      "Layer chicken and rice in a pot",
      "Add fried onions and ghee",
      "Dum cook for 25 minutes"
    ]
  },

  rajma: {
    name: "Rajma Curry",
    baseServings: 4,
    time: 40,
    ingredients: [
      { name: "Rajma (soaked)", quantity: 2, unit: "cups" },
      { name: "Tomato puree", quantity: 2, unit: "cups" },
      { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
      { name: "Ginger garlic paste", quantity: 2, unit: "teaspoons" },
      { name: "Oil", quantity: 2, unit: "tablespoons" }
    ],
    steps: [
      "Pressure cook rajma with salt",
      "Sauté onions and spices",
      "Add tomato puree and cook",
      "Mix cooked rajma and simmer 20 minutes"
    ]
  },

  dal_makhani: {
    name: "Dal Makhani",
    baseServings: 4,
    time: 50,
    ingredients: [
      { name: "Whole urad dal", quantity: 1, unit: "cup" },
      { name: "Rajma", quantity: 4, unit: "tablespoons" },
      { name: "Butter", quantity: 4, unit: "tablespoons" },
      { name: "Tomato puree", quantity: 1, unit: "cup" },
      { name: "Cream", quantity: 4, unit: "tablespoons" }
    ],
    steps: [
      "Soak dal & rajma overnight",
      "Pressure cook until soft",
      "Prepare gravy with tomato & butter",
      "Mix dal and simmer for 30 minutes",
      "Add cream before serving"
    ]
  },

  veg_pasta: {
    name: "Creamy Veg Pasta",
    baseServings: 4,
    time: 25,
    ingredients: [
      { name: "Pasta", quantity: 400, unit: "grams" },
      { name: "Mixed vegetables", quantity: 2, unit: "cups" },
      { name: "Milk", quantity: 1, unit: "cup" },
      { name: "Cheese", quantity: 4, unit: "tablespoons" },
      { name: "Butter", quantity: 2, unit: "tablespoons" }
    ],
    steps: [
      "Boil pasta until al dente",
      "Cook vegetables in butter",
      "Add milk and cheese to form sauce",
      "Mix pasta and simmer briefly"
    ]
  },

  chicken_pasta: {
    name: "Chicken Alfredo Pasta",
    baseServings: 4,
    time: 30,
    ingredients: [
      { name: "Pasta", quantity: 400, unit: "grams" },
      { name: "Chicken", quantity: 400, unit: "grams" },
      { name: "Milk", quantity: 1, unit: "cup" },
      { name: "Cheese", quantity: 4, unit: "tablespoons" },
      { name: "Butter", quantity: 2, unit: "tablespoons" }
    ],
    steps: [
      "Boil pasta and set aside",
      "Cook chicken cubes in butter",
      "Add milk and cheese for sauce",
      "Mix pasta and simmer"
    ]
  },

  aloo_paratha: {
    name: "Aloo Paratha",
    baseServings: 4,
    time: 30,
    ingredients: [
      { name: "Wheat flour", quantity: 2, unit: "cups" },
      { name: "Potatoes (boiled)", quantity: 4, unit: "pieces" },
      { name: "Ghee", quantity: 4, unit: "tablespoons" },
      { name: "Spices", quantity: 1, unit: "teaspoon" }
    ],
    steps: [
      "Knead dough and rest 10 minutes",
      "Prepare potato filling",
      "Roll parathas and stuff filling",
      "Cook with ghee on tawa"
    ]
  },

  masala_dosa: {
    name: "Masala Dosa",
    baseServings: 4,
    time: 20,
    ingredients: [
      { name: "Dosa batter", quantity: 2, unit: "cups" },
      { name: "Potato masala", quantity: 2, unit: "cups" },
      { name: "Oil", quantity: 4, unit: "tablespoons" }
    ],
    steps: [
      "Spread dosa batter on hot tawa",
      "Add potato masala",
      "Fold and cook until crispy"
    ]
  },

  egg_curry: {
    name: "Egg Curry",
    baseServings: 4,
    time: 25,
    ingredients: [
      { name: "Eggs (boiled)", quantity: 8, unit: "pieces" },
      { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
      { name: "Tomato puree", quantity: 1, unit: "cup" },
      { name: "Spices", quantity: 2, unit: "teaspoons" }
    ],
    steps: [
      "Fry boiled eggs lightly",
      "Cook onion–tomato gravy",
      "Add eggs and simmer"
    ]
  },

  chicken_curry: {
    name: "Chicken Curry",
    baseServings: 4,
    time: 45,
    ingredients: [
      { name: "Chicken", quantity: 600, unit: "grams" },
      { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
      { name: "Tomato puree", quantity: 1, unit: "cup" },
      { name: "Spices", quantity: 2, unit: "teaspoons" },
      { name: "Oil", quantity: 3, unit: "tablespoons" }
    ],
    steps: [
      "Sauté onions & spices",
      "Add chicken & cook 10 minutes",
      "Add tomato puree and simmer 20 minutes"
    ]
  },

  chole: {
    name: "Chole (Chickpea Curry)",
    baseServings: 4,
    time: 35,
    ingredients: [
      { name: "Chickpeas (soaked)", quantity: 2, unit: "cups" },
      { name: "Onions (chopped)", quantity: 2, unit: "pieces" },
      { name: "Tomato puree", quantity: 1, unit: "cup" },
      { name: "Chole masala", quantity: 2, unit: "teaspoons" }
    ],
    steps: [
      "Pressure cook chickpeas",
      "Cook onion–tomato gravy",
      "Mix chickpeas and simmer"
    ]
  },

  idli_sambar: {
    name: "Idli Sambar",
    baseServings: 4,
    time: 35,
    ingredients: [
      { name: "Idli batter", quantity: 2, unit: "cups" },
      { name: "Toor dal", quantity: 1, unit: "cup" },
      { name: "Vegetables", quantity: 2, unit: "cups" }
    ],
    steps: [
      "Steam idlis",
      "Cook dal and vegetables",
      "Add tamarind & spices"
    ]
  },

  fried_rice: {
    name: "Veg Fried Rice",
    baseServings: 4,
    time: 20,
    ingredients: [
      { name: "Rice (cooked)", quantity: 3, unit: "cups" },
      { name: "Mixed vegetables", quantity: 2, unit: "cups" },
      { name: "Soy sauce", quantity: 3, unit: "teaspoons" },
      { name: "Oil", quantity: 3, unit: "tablespoons" }
    ],
    steps: [
      "Cook rice & cool completely",
      "Stir fry vegetables",
      "Add rice & sauces"
    ]
  },

  chicken_fried_rice: {
    name: "Chicken Fried Rice",
    baseServings: 4,
    time: 25,
    ingredients: [
      { name: "Rice (cooked)", quantity: 3, unit: "cups" },
      { name: "Chicken", quantity: 400, unit: "grams" },
      { name: "Soy sauce", quantity: 3, unit: "teaspoons" },
      { name: "Oil", quantity: 3, unit: "tablespoons" }
    ],
    steps: [
      "Cook and shred chicken",
      "Stir fry with rice & sauces"
    ]
  },

  maggi_masala: {
    name: "Veg Masala Maggi",
    baseServings: 4,
    time: 10,
    ingredients: [
      { name: "Maggi packets", quantity: 4, unit: "pieces" },
      { name: "Mixed vegetables", quantity: 1, unit: "cup" },
      { name: "Water", quantity: 3, unit: "cups" }
    ],
    steps: [
      "Boil water",
      "Add veggies and noodles",
      "Cook 2–3 minutes"
    ]
  },

  pav_bhaji: {
    name: "Pav Bhaji",
    baseServings: 4,
    time: 30,
    ingredients: [
      { name: "Potatoes (boiled)", quantity: 4, unit: "pieces" },
      { name: "Mixed vegetables", quantity: 2, unit: "cups" },
      { name: "Pav bhaji masala", quantity: 2, unit: "teaspoons" },
      { name: "Butter", quantity: 4, unit: "tablespoons" }
    ],
    steps: [
      "Mash boiled veggies",
      "Cook with butter & masala",
      "Toast pav and serve"
    ]
  },

  fish_curry: {
    name: "Fish Curry",
    baseServings: 4,
    time: 30,
    ingredients: [
      { name: "Fish", quantity: 600, unit: "grams" },
      { name: "Coconut milk", quantity: 1, unit: "cup" },
      { name: "Tamarind", quantity: 2, unit: "teaspoons" },
      { name: "Spices", quantity: 2, unit: "teaspoons" }
    ],
    steps: [
      "Marinate fish",
      "Cook gravy with spices",
      "Add fish & simmer"
    ]
  }
};
