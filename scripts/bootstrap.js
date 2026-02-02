function showTab(tabId) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.add("hidden"));
  const active = document.getElementById(tabId);
  if (active) active.classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.nav-btn[data-tab="${tabId}"]`)?.classList.add("active");
}

async function boot() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      showTab(tab);

      if (tab === "home") renderHomePage();
      if (tab === "predict") renderPredict();
      if (tab === "cost-calculator") renderCostCalculator();
    });
  });

  renderHomePage();

  console.log('Initializing ML model...');
  const modelLoadSuccess = await loadMLModel();
  if (!modelLoadSuccess) {
    console.warn('ML model not available, using fallback predictions');
  }

  renderPredict();
  renderCostCalculator();

  showTab("home");
}

document.addEventListener("DOMContentLoaded", boot);
