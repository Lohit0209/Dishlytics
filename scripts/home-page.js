
function renderHomePage() {
  const section = document.getElementById('home');

  section.innerHTML = `
    <div class="hero-landing">
      <div class="hero-content">
        <div class="hero-badge"> Zero Food Waste</div>
        <h1 class="hero-title">Dishlytics</h1>
        <p class="hero-subtitle">
          Let's be real—we can't cook. But at least we can use AI to figure out 
          the EXACT amount to make so we're not eating the same dal for 3 days straight! 😅
        </p>
        <div class="hero-buttons">
          <button class="btn-primary" onclick="showTab('predict')">
            Start Predicting
          </button>
          <button class="btn-secondary" onclick="showTab('cost-calculator')">
            Calculate Costs
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-card card-1">
          <div class="stat-icon">🤖</div>
          <div class="stat-text">AI-Powered</div>
        </div>
        <div class="floating-card card-2">
          <div class="stat-icon">💰</div>
          <div class="stat-text">Save Money</div>
        </div>
        <div class="floating-card card-3">
          <div class="stat-icon">♻️</div>
          <div class="stat-text">Zero Waste</div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">The Problem We're Solving</h2>
        <p class="section-description">Because cooking shouldn't feel like rocket science</p>
      </div>

      <div class="problem-grid">
        <div class="problem-card">
          <div class="problem-icon">😅</div>
          <h3>Gen-Z Can't Cook</h3>
          <p>We grew up with food delivery apps, not cooking lessons. Now we're adults wondering why our rice is either soup or cement.</p>
        </div>

        <div class="problem-card">
          <div class="problem-icon">🗑️</div>
          <h3>Massive Food Waste</h3>
          <p>Cooked for 2, made enough for 10. Half goes to waste because "better safe than sorry" is our cooking motto.</p>
        </div>

        <div class="problem-card">
          <div class="problem-icon">💸</div>
          <h3>Money Down the Drain</h3>
          <p>Throwing away food = throwing away money. That leftover dal could've been tomorrow's lunch (and ₹50 saved).</p>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">Our Mission: Zero Waste Kitchen</h2>
        <p class="section-description">Smart predictions, less waste, more savings</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-number">01</div>
          <h3>Recipe-Specific AI Predictions</h3>
          <p>Biryani needs more rice than dal—duh! Our ML algorithm knows this. Get accurate quantities for each recipe based on your family size.</p>
          <div class="feature-tag">Different recipes = Different amounts</div>
        </div>

        <div class="feature-card">
          <div class="feature-number">02</div>
          <h3>Smart Cost Calculator</h3>
          <p>Know exactly how much your meal will cost before you start. Indian market prices, itemized breakdown, zero surprises.</p>
          <div class="feature-tag">Real ₹ prices, not random numbers</div>
        </div>

        <div class="feature-card">
          <div class="feature-number">03</div>
          <h3>Age-Aware Portions</h3>
          <p>Kids eat less than adults, teens eat everything, seniors prefer lighter meals. We calculate portions for everyone.</p>
          <div class="feature-tag">Adults, teens, kids, seniors—all covered</div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">How It Works</h2>
        <p class="section-description">Three simple steps to smarter cooking</p>
      </div>

      <div class="steps-container">
        <div class="step-card">
          <div class="step-number">1</div>
          <h3>Pick Your Recipe</h3>
          <p>Choose from 18+ Indian recipes—from Biryani to Dal Makhani</p>
        </div>

        <div class="step-arrow">→</div>

        <div class="step-card">
          <div class="step-number">2</div>
          <h3>Enter Your Household</h3>
          <p>Tell us how many adults, teens, kids are eating</p>
        </div>

        <div class="step-arrow">→</div>

        <div class="step-card">
          <div class="step-number">3</div>
          <h3>Get Smart Predictions</h3>
          <p>AI tells you exactly how much to cook + total cost</p>
        </div>
      </div>
    </div>

    <div class="stats-banner">
      <div class="stat-item">
        <div class="stat-value">18+</div>
        <div class="stat-label">Indian Recipes</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">60+</div>
        <div class="stat-label">Ingredients Priced</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">ML</div>
        <div class="stat-label">Powered Predictions</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">₹</div>
        <div class="stat-label">Indian Prices</div>
      </div>
    </div>

    <div class="cta-section">
      <h2>Ready to Stop Wasting Food (and Money)?</h2>
      <p>Join the zero-waste kitchen revolution. No more guessing, no more leftovers.</p>
      <div class="cta-buttons">
        <button class="btn-primary" onclick="showTab('predict')">
          Try AI Predictor
        </button>
        <button class="btn-secondary" onclick="showTab('cost-calculator')">
          Calculate Meal Cost
        </button>
      </div>
    </div>
  `;
}
