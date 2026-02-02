function renderHome(meals) {
  const s = summarizeMeals(meals);

  const el = document.getElementById("home");
  el.innerHTML = `
    <div class="hero">
      <h1>Smart Kitchen Analytics</h1>
      <p>Track cooking, reduce leftovers, and move towards a zero-waste kitchen using data.</p>
    </div>

    <div class="grid grid-4">
      <div class="card">
        <div class="kpi-label">Total Records</div>
        <div class="kpi-value">${s.total_records.toLocaleString()}</div>
      </div>
      <div class="card">
        <div class="kpi-label">Total Cooked (g)</div>
        <div class="kpi-value">${Math.round(s.cooked_grams).toLocaleString()}</div>
      </div>
      <div class="card">
        <div class="kpi-label">Total Eaten (g)</div>
        <div class="kpi-value">${Math.round(s.eaten_grams).toLocaleString()}</div>
      </div>
      <div class="card">
        <div class="kpi-label">Avg Waste %</div>
        <div class="kpi-value">${s.avg_waste_pct.toFixed(2)}%</div>
      </div>
    </div>

    <div style="height:14px"></div>

    <div class="grid grid-2">
      <div class="card">
        <div class="section-title">Leftovers by Meal Type</div>
        <p class="muted">Where is most waste happening?</p>
        <div style="height:14px"></div>
        <canvas id="home_leftover_by_meal"></canvas>
      </div>

      <div class="card">
        <div class="section-title">Weekend vs Weekday Waste</div>
        <p class="muted">Does weekend cooking create more leftovers?</p>
        <div style="height:14px"></div>
        <canvas id="home_weekend_waste"></canvas>
      </div>
    </div>
  `;

  Charts.destroyAll();

  const byMeal = { breakfast: 0, lunch: 0, dinner: 0 };
  meals.forEach(m => {
    const mt = (m.meal_type || "").toLowerCase();
    if (byMeal[mt] !== undefined) byMeal[mt] += Number(m.leftover_grams) || 0;
  });
  makeBarChart("home_leftover_by_meal",
    Object.keys(byMeal).map(k => k[0].toUpperCase() + k.slice(1)),
    Object.values(byMeal).map(v => Math.round(v)),
    "Leftover grams"
  );

  let weekendLeft = 0, weekdayLeft = 0;
  meals.forEach(m => {
    if (Number(m.is_weekend) === 1) weekendLeft += Number(m.leftover_grams) || 0;
    else weekdayLeft += Number(m.leftover_grams) || 0;
  });
  makeDoughnut("home_weekend_waste",
    ["Weekday", "Weekend"],
    [Math.round(weekdayLeft), Math.round(weekendLeft)],
    "Leftover grams"
  );
}


function renderAnalytics(meals) {
  const el = document.getElementById("analytics");
  el.innerHTML = `
    <div class="grid grid-2">
      <div class="card">
        <div class="section-title">Waste % by Meal Type</div>
        <p class="muted">Lower % = closer to zero waste.</p>
        <div style="height:14px"></div>
        <canvas id="a_waste_pct_meal"></canvas>
      </div>

      <div class="card">
        <div class="section-title">Leftovers vs Total People</div>
        <p class="muted">Shows how leftovers change as family size increases.</p>
        <div style="height:14px"></div>
        <canvas id="a_leftover_people"></canvas>
      </div>
    </div>
  `;

  Charts.destroyAll();

  const mealAgg = { breakfast: { cooked: 0, left: 0 }, lunch: { cooked: 0, left: 0 }, dinner: { cooked: 0, left: 0 } };
  meals.forEach(m => {
    const mt = (m.meal_type || "").toLowerCase();
    if (!mealAgg[mt]) return;
    mealAgg[mt].cooked += Number(m.cooked_grams) || 0;
    mealAgg[mt].left += Number(m.leftover_grams) || 0;
  });

  const labels = Object.keys(mealAgg).map(x => x[0].toUpperCase() + x.slice(1));
  const wastePct = Object.values(mealAgg).map(v => v.cooked ? (v.left / v.cooked * 100) : 0);

  makeBarChart("a_waste_pct_meal", labels, wastePct.map(x => Number(x.toFixed(2))), "Waste %");

  const buckets = {};
  meals.forEach(m => {
    const tp = Number(m.total_people) || 0;
    if (tp <= 0) return;
    if (!buckets[tp]) buckets[tp] = 0;
    buckets[tp] += Number(m.leftover_grams) || 0;
  });
  const x = Object.keys(buckets).map(n => Number(n)).sort((a, b) => a - b);
  const y = x.map(k => Math.round(buckets[k]));

  makeBarChart("a_leftover_people", x, y, "Leftover grams");
}

function renderRecipe() {
  const el = document.getElementById("recipe");
  el.innerHTML = `
    <div class="card">
      <div class="section-title">Recipe</div>
      <p class="muted">This section can be expanded later (you already have recipes-data.js wired).</p>
      <div style="height:12px"></div>
      <ul style="line-height:1.9; padding-left:18px;">
        ${Recipes.map(r => `<li>${r.name}</li>`).join("")}
      </ul>
    </div>
  `;
}
