
const fs = require('fs');

const RECIPE_IDS = [
    'paneer_butter_masala', 'veg_biryani', 'chicken_biryani', 'rajma', 'dal_makhani',
    'veg_pasta', 'chicken_pasta', 'aloo_paratha', 'masala_dosa', 'egg_curry',
    'chicken_curry', 'chole', 'idli_sambar', 'fried_rice', 'chicken_fried_rice',
    'maggi_masala', 'pav_bhaji', 'fish_curry'
];

const RECIPE_PATTERNS = {
    paneer_butter_masala: { base: 220, variance: 30, type: 'curry' },
    veg_biryani: { base: 280, variance: 40, type: 'rice' },
    chicken_biryani: { base: 300, variance: 45, type: 'rice' },
    rajma: { base: 200, variance: 25, type: 'curry' },
    dal_makhani: { base: 190, variance: 25, type: 'dal' },
    veg_pasta: { base: 240, variance: 35, type: 'pasta' },
    chicken_pasta: { base: 260, variance: 40, type: 'pasta' },
    aloo_paratha: { base: 180, variance: 30, type: 'bread' },
    masala_dosa: { base: 170, variance: 25, type: 'breakfast' },
    egg_curry: { base: 210, variance: 30, type: 'curry' },
    chicken_curry: { base: 240, variance: 35, type: 'curry' },
    chole: { base: 210, variance: 30, type: 'curry' },
    idli_sambar: { base: 200, variance: 30, type: 'breakfast' },
    fried_rice: { base: 250, variance: 35, type: 'rice' },
    chicken_fried_rice: { base: 270, variance: 40, type: 'rice' },
    maggi_masala: { base: 150, variance: 20, type: 'snack' },
    pav_bhaji: { base: 230, variance: 35, type: 'street_food' },
    fish_curry: { base: 230, variance: 35, type: 'curry' }
};

const AGE_MULTIPLIERS = {
    adult: 1.0,
    teen: 0.85,
    kid: 0.65,
    senior: 0.80
};

const MEAL_MULTIPLIERS = {
    breakfast: 0.85,
    lunch: 1.0,
    dinner: 1.05,
    snack: 0.6
};

function randomNormal(mean, stdDev) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSample(recipeId) {
    const pattern = RECIPE_PATTERNS[recipeId];

    const adults = randomInt(1, 6);
    const teens = randomInt(0, 3);
    const kids = randomInt(0, 3);
    const seniors = randomInt(0, 2);

    let mealType;
    if (pattern.type === 'breakfast') {
        mealType = 'breakfast';
    } else if (pattern.type === 'snack') {
        mealType = 'snack';
    } else {
        mealType = Math.random() > 0.5 ? 'lunch' : 'dinner';
    }

    const isWeekend = Math.random() > 0.7 ? 1 : 0;

    let totalQuantity = 0;
    totalQuantity += adults * pattern.base * AGE_MULTIPLIERS.adult;
    totalQuantity += teens * pattern.base * AGE_MULTIPLIERS.teen;
    totalQuantity += kids * pattern.base * AGE_MULTIPLIERS.kid;
    totalQuantity += seniors * pattern.base * AGE_MULTIPLIERS.senior;

    totalQuantity *= MEAL_MULTIPLIERS[mealType];

    if (isWeekend) {
        totalQuantity *= 1.12;
    }

    totalQuantity = randomNormal(totalQuantity, pattern.variance);

    totalQuantity = Math.max(totalQuantity, 100);

    return {
        recipe_id: recipeId,
        adults,
        teens,
        kids,
        seniors,
        meal_type: mealType,
        is_weekend: isWeekend,
        quantity: Math.round(totalQuantity)
    };
}

function generateDataset(totalSamples = 15000) {
    console.log(`Generating ${totalSamples} synthetic training samples...`);

    const dataset = [];
    const samplesPerRecipe = Math.ceil(totalSamples / RECIPE_IDS.length);

    for (const recipeId of RECIPE_IDS) {
        console.log(`  Generating ${samplesPerRecipe} samples for ${recipeId}...`);
        for (let i = 0; i < samplesPerRecipe; i++) {
            dataset.push(generateSample(recipeId));
        }
    }

    for (let i = dataset.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dataset[i], dataset[j]] = [dataset[j], dataset[i]];
    }

    console.log(`\nGenerated ${dataset.length} total samples`);
    console.log(`Sample distribution:`);

    const recipeCounts = {};
    const quantityStats = {};

    dataset.forEach(sample => {
        recipeCounts[sample.recipe_id] = (recipeCounts[sample.recipe_id] || 0) + 1;
        if (!quantityStats[sample.recipe_id]) {
            quantityStats[sample.recipe_id] = [];
        }
        quantityStats[sample.recipe_id].push(sample.quantity);
    });

    RECIPE_IDS.forEach(recipeId => {
        const quantities = quantityStats[recipeId];
        const avg = quantities.reduce((a, b) => a + b, 0) / quantities.length;
        const min = Math.min(...quantities);
        const max = Math.max(...quantities);
        console.log(`  ${recipeId}: ${recipeCounts[recipeId]} samples, avg=${Math.round(avg)}g, range=${min}-${max}g`);
    });

    return dataset;
}

if (require.main === module) {
    const dataset = generateDataset(15000);

    const outputPath = './dataset/training-data.json';
    fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2));
    console.log(`\n✓ Dataset saved to ${outputPath}`);
    console.log(`✓ Total size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
}

module.exports = { generateDataset, RECIPE_IDS };
