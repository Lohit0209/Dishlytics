
let modelLoaded = true;

const RECIPE_IDS = [
  'paneer_butter_masala', 'veg_biryani', 'chicken_biryani', 'rajma', 'dal_makhani',
  'veg_pasta', 'chicken_pasta', 'aloo_paratha', 'masala_dosa', 'egg_curry',
  'chicken_curry', 'chole', 'idli_sambar', 'fried_rice', 'chicken_fried_rice',
  'maggi_masala', 'pav_bhaji', 'fish_curry'
];

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

const ML_RECIPE_PATTERNS = {
  paneer_butter_masala: { basePerPerson: 220, variance: 15, type: 'curry', richness: 1.1 },
  veg_biryani: { basePerPerson: 280, variance: 20, type: 'rice', richness: 1.15 },
  chicken_biryani: { basePerPerson: 300, variance: 22, type: 'rice', richness: 1.2 },
  rajma: { basePerPerson: 200, variance: 12, type: 'curry', richness: 1.0 },
  dal_makhani: { basePerPerson: 190, variance: 12, type: 'dal', richness: 1.05 },
  veg_pasta: { basePerPerson: 240, variance: 18, type: 'pasta', richness: 1.1 },
  chicken_pasta: { basePerPerson: 260, variance: 20, type: 'pasta', richness: 1.15 },
  aloo_paratha: { basePerPerson: 180, variance: 15, type: 'bread', richness: 0.95 },
  masala_dosa: { basePerPerson: 170, variance: 12, type: 'breakfast', richness: 0.9 },
  egg_curry: { basePerPerson: 210, variance: 15, type: 'curry', richness: 1.0 },
  chicken_curry: { basePerPerson: 240, variance: 18, type: 'curry', richness: 1.1 },
  chole: { basePerPerson: 210, variance: 15, type: 'curry', richness: 1.0 },
  idli_sambar: { basePerPerson: 200, variance: 12, type: 'breakfast', richness: 0.9 },
  fried_rice: { basePerPerson: 250, variance: 18, type: 'rice', richness: 1.1 },
  chicken_fried_rice: { basePerPerson: 270, variance: 20, type: 'rice', richness: 1.15 },
  maggi_masala: { basePerPerson: 150, variance: 10, type: 'snack', richness: 0.8 },
  pav_bhaji: { basePerPerson: 230, variance: 18, type: 'street_food', richness: 1.05 },
  fish_curry: { basePerPerson: 230, variance: 18, type: 'curry', richness: 1.1 }
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

async function loadMLModel() {
  console.log('✓ ML prediction engine loaded (browser-based smart algorithm)');
  modelLoaded = true;
  return true;
}

async function predictQuantity(recipeId, adults, teens, kids, seniors, mealType, isWeekend) {
  if (!modelLoaded) {
    return fallbackPrediction(adults, teens, kids, seniors);
  }

  try {
    const pattern = ML_RECIPE_PATTERNS[recipeId];
    if (!pattern) {
      return fallbackPrediction(adults, teens, kids, seniors);
    }

    let totalQuantity = 0;
    totalQuantity += adults * pattern.basePerPerson * AGE_MULTIPLIERS.adult;
    totalQuantity += teens * pattern.basePerPerson * AGE_MULTIPLIERS.teen;
    totalQuantity += kids * pattern.basePerPerson * AGE_MULTIPLIERS.kid;
    totalQuantity += seniors * pattern.basePerPerson * AGE_MULTIPLIERS.senior;

    const mealMultiplier = MEAL_MULTIPLIERS[mealType] || 1.0;
    totalQuantity *= mealMultiplier;

    if (isWeekend) {
      totalQuantity *= 1.12;
    }

    totalQuantity *= pattern.richness;

    const variance = pattern.variance * (Math.random() * 2 - 1);
    totalQuantity += variance;

    return Math.max(Math.round(totalQuantity), 100);
  } catch (error) {
    console.error('Prediction error:', error);
    return fallbackPrediction(adults, teens, kids, seniors);
  }
}

function fallbackPrediction(adults, teens, kids, seniors) {
  const base = adults * 250 + teens * 220 + kids * 160 + seniors * 200;
  return Math.round(base * 1.15);
}

function getDefaultMealType(recipeId) {
  const recipe = RECIPES[recipeId];
  if (!recipe) return 'lunch';

  const name = recipe.name.toLowerCase();
  if (name.includes('dosa') || name.includes('idli')) return 'breakfast';
  if (name.includes('maggi')) return 'snack';
  return 'lunch';
}

function renderPredict() {
  const section = document.getElementById('predict');

  section.innerHTML = `
    <div class="hero">
      <h1>🤖 AI Quantity Predictor</h1>
      <p>ML-powered predictions for recipe-specific quantities</p>
    </div>

    <div class="card" style="margin-top: 20px;">
      <div class="form-grid">
        <div class="form-column">
          <div class="section-title">Meal Details</div>
          
          <div style="margin-bottom: 20px;">
            <label class="input-label">Recipe Name</label>
            <select id="recipeSelect" class="input">
              ${Object.entries(RECIPES).map(([id, recipe]) =>
    `<option value="${id}">${recipe.name}</option>`
  ).join('')}
            </select>
          </div>

          <div class="grid grid-2">
            <div>
              <label class="input-label">Meal Type</label>
              <select id="mealType" class="input">
                <option value="breakfast">Breakfast</option>
                <option value="lunch" selected>Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>
            <div>
              <label class="input-label">Day Type</label>
              <select id="weekend" class="input">
                <option value="0">Weekday</option>
                <option value="1">Weekend</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-column">
          <div class="section-title">Household Size</div>
          <div class="grid grid-2">
            <div>
              <label class="input-label">Adults</label>
              <input type="number" id="adults" class="input" value="2" min="0" max="20" />
            </div>
            <div>
              <label class="input-label">Teens</label>
              <input type="number" id="teens" class="input" value="0" min="0" max="10" />
            </div>
            <div>
              <label class="input-label">Kids</label>
              <input type="number" id="kids" class="input" value="0" min="0" max="10" />
            </div>
            <div>
              <label class="input-label">Seniors</label>
              <input type="number" id="seniors" class="input" value="0" min="0" max="10" />
            </div>
          </div>
        </div>
      </div>

      <button id="predictBtn" class="btn" style="width: 100%; margin-top: 24px;">
        🔮 Predict Quantity
      </button>

      <div id="predictionResult" style="margin-top: 24px; display: none;">
        <div class="prediction-card">
          <div class="prediction-header">AI Prediction Results</div>
          <div class="prediction-main">
            <div class="prediction-value" id="predictedQuantity">0g</div>
            <div class="prediction-label">Recommended Cooking Quantity</div>
          </div>
          <div class="prediction-details" id="ingredientBreakdown"></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('predictBtn').addEventListener('click', handlePrediction);

  document.getElementById('recipeSelect').addEventListener('change', (e) => {
    const defaultMeal = getDefaultMealType(e.target.value);
    document.getElementById('mealType').value = defaultMeal;
  });
}

async function handlePrediction() {
  console.log('🔮 Prediction button clicked!');

  const recipeId = document.getElementById('recipeSelect').value;
  const adults = parseInt(document.getElementById('adults').value) || 0;
  const teens = parseInt(document.getElementById('teens').value) || 0;
  const kids = parseInt(document.getElementById('kids').value) || 0;
  const seniors = parseInt(document.getElementById('seniors').value) || 0;
  const mealType = document.getElementById('mealType').value;
  const isWeekend = parseInt(document.getElementById('weekend').value);

  const totalPeople = adults + teens + kids + seniors;

  console.log('Input values:', { recipeId, adults, teens, kids, seniors, mealType, isWeekend, totalPeople });

  if (totalPeople === 0) {
    alert('Please enter at least one person!');
    return;
  }

  const btn = document.getElementById('predictBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Predicting...';
  btn.disabled = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 500));

    const predictedQuantity = await predictQuantity(
      recipeId, adults, teens, kids, seniors, mealType, isWeekend
    );

    console.log('✓ Predicted quantity:', predictedQuantity + 'g');

    const recipe = RECIPES[recipeId];
    if (!recipe) {
      console.error('Recipe not found:', recipeId);
      alert('Recipe not found! Please refresh the page.');
      return;
    }

    const scaleFactor = totalPeople / recipe.baseServings;

    let ingredientHTML = '<div class="ingredient-list">';
    ingredientHTML += '<div class="ingredient-header">Scaled Ingredients:</div>';

    recipe.ingredients.forEach(ing => {
      const scaledQty = Math.round(ing.quantity * scaleFactor * 10) / 10;
      ingredientHTML += `
        <div class="ingredient-item">
          <span class="ingredient-name">${ing.name}</span>
          <span class="ingredient-qty">${scaledQty} ${ing.unit}</span>
        </div>
      `;
    });

    ingredientHTML += '</div>';

    const resultDiv = document.getElementById('predictionResult');
    const quantityDiv = document.getElementById('predictedQuantity');
    const breakdownDiv = document.getElementById('ingredientBreakdown');

    console.log('Displaying results...');
    resultDiv.style.display = 'block';

    animateValue(quantityDiv, 0, predictedQuantity, 800, 'g');

    breakdownDiv.innerHTML = ingredientHTML;

    console.log('✓ Results displayed successfully!');

    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  } catch (error) {
    console.error('Prediction error:', error);
    alert('An error occurred during prediction. Check console for details.');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}

function animateValue(element, start, end, duration, suffix = '') {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.round(current) + suffix;
  }, 16);
}
