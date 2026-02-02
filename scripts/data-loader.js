const DataStore = { meals: [], loaded: false };

async function loadMealsData() {
  const url = "dataset/meals-data.json";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url} (HTTP ${res.status})`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("meals-data.json must be an array of objects");
  DataStore.meals = data;
  DataStore.loaded = true;
  return data;
}

function getNum(m, ...keys) {
  for (const k of keys) {
    const v = m?.[k];
    if (v !== undefined && v !== null && v !== "") return Number(v) || 0;
  }
  return 0;
}
function getStr(m, ...keys) {
  for (const k of keys) {
    const v = m?.[k];
    if (v !== undefined && v !== null) return String(v);
  }
  return "";
}

function summarizeMeals(meals) {
  const total_people = meals.reduce((s,m)=> s + getNum(m, "totalPeople", "total_people"), 0);
  const cooked_grams = meals.reduce((s,m)=> s + getNum(m, "cooked", "cooked_grams"), 0);
  const eaten_grams  = meals.reduce((s,m)=> s + getNum(m, "eaten", "eaten_grams"), 0);
  const leftover_grams = meals.reduce((s,m)=> s + getNum(m, "leftover", "leftover_grams"), 0);

  const avgWastePct = cooked_grams > 0 ? (leftover_grams / cooked_grams) * 100 : 0;

  return {
    total_records: meals.length,
    total_people,
    cooked_grams,
    eaten_grams,
    leftover_grams,
    avg_waste_pct: avgWastePct
  };
}

window.__mealGetNum = getNum;
window.__mealGetStr = getStr;
