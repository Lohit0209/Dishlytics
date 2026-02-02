
const INGREDIENT_PRICES = {
    "Paneer": { price: 80, unit: "100g", category: "dairy" },
    "Butter": { price: 60, unit: "100g", category: "dairy" },
    "Fresh cream": { price: 45, unit: "100ml", category: "dairy" },
    "Milk": { price: 60, unit: "liter", category: "dairy" },
    "Yogurt": { price: 50, unit: "500g", category: "dairy" },
    "Cheese": { price: 120, unit: "100g", category: "dairy" },
    "Ghee": { price: 90, unit: "100g", category: "dairy" },

    "Chicken": { price: 180, unit: "kg", category: "meat" },
    "Fish": { price: 350, unit: "kg", category: "seafood" },
    "Eggs (boiled)": { price: 8, unit: "piece", category: "protein" },

    "Basmati rice": { price: 120, unit: "kg", category: "grains" },
    "Rice (cooked)": { price: 60, unit: "kg", category: "grains" },
    "Wheat flour": { price: 40, unit: "kg", category: "grains" },

    "Whole urad dal": { price: 140, unit: "kg", category: "lentils" },
    "Rajma": { price: 120, unit: "kg", category: "lentils" },
    "Rajma (soaked)": { price: 120, unit: "kg", category: "lentils" },
    "Chickpeas (soaked)": { price: 100, unit: "kg", category: "lentils" },
    "Toor dal": { price: 130, unit: "kg", category: "lentils" },

    "Mixed vegetables": { price: 40, unit: "kg", category: "vegetables" },
    "Potatoes (boiled)": { price: 30, unit: "kg", category: "vegetables" },
    "Onions (chopped)": { price: 35, unit: "kg", category: "vegetables" },
    "Vegetables": { price: 45, unit: "kg", category: "vegetables" },

    "Tomato puree": { price: 25, unit: "200ml", category: "sauces" },
    "Coconut milk": { price: 80, unit: "400ml", category: "sauces" },

    "Garam masala": { price: 200, unit: "100g", category: "spices" },
    "Biryani masala": { price: 180, unit: "100g", category: "spices" },
    "Chole masala": { price: 160, unit: "100g", category: "spices" },
    "Pav bhaji masala": { price: 150, unit: "100g", category: "spices" },
    "Ginger garlic paste": { price: 120, unit: "200g", category: "spices" },
    "Spices": { price: 150, unit: "100g", category: "spices" },
    "Tamarind": { price: 100, unit: "100g", category: "spices" },

    "Oil": { price: 180, unit: "liter", category: "oils" },
    "Soy sauce": { price: 120, unit: "200ml", category: "condiments" },

    "Fried onions": { price: 300, unit: "kg", category: "prepared" },
    "Dosa batter": { price: 40, unit: "kg", category: "prepared" },
    "Potato masala": { price: 50, unit: "kg", category: "prepared" },
    "Idli batter": { price: 35, unit: "kg", category: "prepared" },

    "Pasta": { price: 120, unit: "kg", category: "pasta" },
    "Maggi packets": { price: 12, unit: "piece", category: "noodles" },

    "Water": { price: 0, unit: "liter", category: "misc" }
};

const UNIT_CONVERSIONS = {
    "cups": 240,
    "tablespoons": 15,
    "teaspoons": 5,
    "handful": 30,

    "grams": 1,
    "kg": 1000,

    "ml": 1,
    "liter": 1000,

    "piece": 1,
    "pieces": 1
};

function calculateIngredientCost(ingredientName, quantity, unit) {
    const priceData = INGREDIENT_PRICES[ingredientName];

    if (!priceData) {
        console.warn(`Price not found for ingredient: ${ingredientName}`);
        return { cost: 0, pricePerUnit: 0, unit: unit };
    }

    let quantityInBaseUnit = quantity;
    if (UNIT_CONVERSIONS[unit]) {
        quantityInBaseUnit = quantity * UNIT_CONVERSIONS[unit];
    }

    let pricePerBaseUnit = priceData.price;
    const priceUnit = priceData.unit;

    if (priceUnit.includes('kg')) {
        pricePerBaseUnit = priceData.price / 1000;
    } else if (priceUnit.includes('g')) {
        const grams = parseInt(priceUnit);
        pricePerBaseUnit = priceData.price / grams;
    } else if (priceUnit === 'liter') {
        pricePerBaseUnit = priceData.price / 1000;
    } else if (priceUnit.includes('ml')) {
        const ml = parseInt(priceUnit);
        pricePerBaseUnit = priceData.price / ml;
    } else if (priceUnit === 'piece') {
        pricePerBaseUnit = priceData.price;
        quantityInBaseUnit = quantity;
    }

    const totalCost = quantityInBaseUnit * pricePerBaseUnit;

    return {
        cost: Math.round(totalCost * 100) / 100,
        pricePerUnit: pricePerBaseUnit,
        baseUnit: priceUnit.includes('g') || priceUnit === 'kg' ? 'g' :
            priceUnit.includes('ml') || priceUnit === 'liter' ? 'ml' : 'piece',
        category: priceData.category
    };
}

function calculateRecipeCost(recipe, servings) {
    const baseServings = recipe.baseServings || 4;
    const scaleFactor = servings / baseServings;

    let totalCost = 0;
    const itemizedCosts = [];

    recipe.ingredients.forEach(ingredient => {
        const scaledQuantity = ingredient.quantity * scaleFactor;
        const costData = calculateIngredientCost(
            ingredient.name,
            scaledQuantity,
            ingredient.unit
        );

        itemizedCosts.push({
            name: ingredient.name,
            quantity: Math.round(scaledQuantity * 10) / 10,
            unit: ingredient.unit,
            cost: costData.cost,
            category: costData.category
        });

        totalCost += costData.cost;
    });

    return {
        totalCost: Math.round(totalCost * 100) / 100,
        itemizedCosts,
        costPerServing: Math.round((totalCost / servings) * 100) / 100
    };
}

function getIngredientPrice(ingredientName) {
    return INGREDIENT_PRICES[ingredientName] || null;
}

function getIngredientsByCategory(category) {
    return Object.entries(INGREDIENT_PRICES)
        .filter(([_, data]) => data.category === category)
        .map(([name, data]) => ({ name, ...data }));
}
