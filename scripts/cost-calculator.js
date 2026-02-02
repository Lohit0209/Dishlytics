
function renderCostCalculator() {
  const section = document.getElementById('cost-calculator');

  section.innerHTML = `
    <div class="hero">
      <h1>💰 Smart Cost Calculator</h1>
      <p>Calculate meal costs with AI-powered quantity predictions</p>
    </div>

    <div class="card" style="margin-top: 20px;">
      <div class="form-grid">
        <div class="form-column">
          <div class="section-title">Recipe Details</div>
          <div style="margin-bottom: 20px;">
            <label class="input-label">Recipe Selection</label>
            <select id="costRecipeSelect" class="input">
              ${Object.entries(RECIPES).map(([id, recipe]) =>
    `<option value="${id}">${recipe.name}</option>`
  ).join('')}
            </select>
          </div>
          <p style="font-size: 13px; color: var(--text-muted);">
            AI will calculate ingredients based on regional market prices in India.
          </p>
        </div>

        <div class="form-column">
          <div class="section-title">Household Size</div>
          <div class="grid grid-2">
            <div>
              <label class="input-label">Adults</label>
              <input type="number" id="costAdults" class="input" value="3" min="0" max="20" />
            </div>
            <div>
              <label class="input-label">Teens</label>
              <input type="number" id="costTeens" class="input" value="1" min="0" max="10" />
            </div>
            <div>
              <label class="input-label">Kids</label>
              <input type="number" id="costKids" class="input" value="1" min="0" max="10" />
            </div>
            <div>
              <label class="input-label">Seniors</label>
              <input type="number" id="costSeniors" class="input" value="0" min="0" max="10" />
            </div>
          </div>
        </div>
      </div>

      <button id="calculateCostBtn" class="btn" style="width: 100%; margin-top: 24px;">
        💵 Calculate Cost
      </button>

      <div id="costResult" style="margin-top: 24px; display: none;">
        <div class="cost-summary-card">
          <div class="cost-header">Cost Breakdown</div>
          
          <div class="cost-main-stats">
            <div class="cost-stat-item">
              <div class="cost-stat-label">Total People</div>
              <div class="cost-stat-value" id="totalPeopleDisplay">0</div>
            </div>
            <div class="cost-stat-item">
              <div class="cost-stat-label">Predicted Quantity</div>
              <div class="cost-stat-value" id="totalQuantityDisplay">0g</div>
            </div>
          </div>

          <div class="cost-total-section">
            <div class="cost-total-label">Total Meal Cost</div>
            <div class="cost-total-value" id="totalCostDisplay">₹0.00</div>
            <div class="cost-per-person" id="costPerPersonDisplay">₹0.00 per person</div>
          </div>

          <div class="ingredient-cost-list" id="ingredientCostList"></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('calculateCostBtn').addEventListener('click', handleCostCalculation);
}

async function handleCostCalculation() {
  const recipeId = document.getElementById('costRecipeSelect').value;
  const adults = parseInt(document.getElementById('costAdults').value) || 0;
  const teens = parseInt(document.getElementById('costTeens').value) || 0;
  const kids = parseInt(document.getElementById('costKids').value) || 0;
  const seniors = parseInt(document.getElementById('costSeniors').value) || 0;

  const totalPeople = adults + teens + kids + seniors;

  if (totalPeople === 0) {
    alert('Please enter at least one person!');
    return;
  }

  const btn = document.getElementById('calculateCostBtn');
  const originalText = btn.innerHTML;
  btn.innerHTML = '⏳ Calculating...';
  btn.disabled = true;

  const mealType = getDefaultMealType(recipeId);
  const isWeekend = 0;

  const predictedQuantity = await predictQuantity(
    recipeId, adults, teens, kids, seniors, mealType, isWeekend
  );

  const recipe = RECIPES[recipeId];
  const scaleFactor = totalPeople / recipe.baseServings;

  let totalCost = 0;
  const ingredientCosts = [];

  recipe.ingredients.forEach(ingredient => {
    const scaledQuantity = ingredient.quantity * scaleFactor;
    const costData = calculateIngredientCost(
      ingredient.name,
      scaledQuantity,
      ingredient.unit
    );

    ingredientCosts.push({
      name: ingredient.name,
      quantity: Math.round(scaledQuantity * 10) / 10,
      unit: ingredient.unit,
      cost: costData.cost,
      category: costData.category || 'misc'
    });

    totalCost += costData.cost;
  });

  ingredientCosts.sort((a, b) => b.cost - a.cost);

  const costPerPerson = totalCost / totalPeople;

  document.getElementById('totalPeopleDisplay').textContent = totalPeople;
  document.getElementById('totalQuantityDisplay').textContent = predictedQuantity + 'g';

  const totalCostEl = document.getElementById('totalCostDisplay');
  animateValue(totalCostEl, 0, totalCost, 1000, '', '₹', 2);

  const costPerPersonEl = document.getElementById('costPerPersonDisplay');
  setTimeout(() => {
    animateValue(costPerPersonEl, 0, costPerPerson, 800, ' per person', '₹', 2);
  }, 300);

  const ingredientListHTML = ingredientCosts.map(item => `
    <div class="ingredient-cost-item">
      <div class="ingredient-cost-info">
        <div class="ingredient-cost-name">${item.name}</div>
        <div class="ingredient-cost-qty">${item.quantity} ${item.unit}</div>
      </div>
      <div class="ingredient-cost-price">₹${item.cost.toFixed(2)}</div>
    </div>
  `).join('');

  document.getElementById('ingredientCostList').innerHTML = `
    <div class="ingredient-cost-header">Itemized Costs</div>
    ${ingredientListHTML}
  `;

  document.getElementById('costResult').style.display = 'block';

  btn.innerHTML = originalText;
  btn.disabled = false;
}

function animateValue(element, start, end, duration, suffix = '', prefix = '', decimals = 0) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = prefix + current.toFixed(decimals) + suffix;
  }, 16);
}
