# Smart Kitchen Analytics 🍳

**AI-Powered Meal Planning & Cost Optimization**

A professional web application that uses machine learning to predict recipe-specific quantities and calculate meal costs based on household composition.

## ✨ Features

### 🤖 AI Quantity Predictor
- **Recipe-Specific Predictions**: Different quantities for different recipes (Biryani vs Dal vs Pasta)
- **Age-Group Aware**: Adjusts for adults, teens, kids, and seniors
- **Meal Type Optimization**: Breakfast, lunch, dinner, and snack variations
- **Weekend Bonus**: Accounts for increased consumption on weekends
- **ML-Powered Algorithm**: Uses recipe-specific patterns and intelligent calculations

### 💰 Smart Cost Calculator
- **Indian Market Prices**: Traditional Indian ingredient prices in ₹
- **Itemized Breakdown**: See cost for each ingredient
- **Total Meal Cost**: Complete cost calculation with per-person breakdown
- **ML Integration**: Uses AI predictions for accurate quantity-based costing

### 🎨 Premium UI/UX
- **Modern Design**: Vibrant gradients and glassmorphism effects
- **Smooth Animations**: Micro-interactions and transitions throughout
- **Google Fonts**: Inter for body, Outfit for headings
- **Fully Responsive**: Works beautifully on all screen sizes
- **Dark Gradient Theme**: Professional color palette with animated backgrounds

### 📊 Analytics Dashboard
- Historical meal data visualization
- Consumption patterns and trends
- Recipe popularity insights

### 📖 Recipe Library
- 17+ Indian recipes with detailed instructions
- Ingredient lists with measurements
- Cooking time estimates

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (Live Server extension for VS Code recommended)

### Installation

1. **Clone or download this repository**

2. **Open with Live Server**
   - If using VS Code, install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"
   - The website will open at `http://localhost:5500` (or similar)

3. **Start using the app!**
   - Navigate through tabs: Home, AI Predict, Cost Calculator, Analytics, Recipes
   - Try different recipes and household compositions
   - See how predictions vary by recipe type

## 📁 Project Structure

```
smart-kitchen-analytics/
├── index.html                      # Main HTML file
├── styles/
│   └── main.css                    # Premium CSS with animations
├── scripts/
│   ├── recipes-data.js             # Recipe database (17+ recipes)
│   ├── ingredient-prices.js        # Indian market pricing data
│   ├── quantity-predictor.js       # ML prediction engine
│   ├── cost-calculator.js          # Cost calculation logic
│   ├── analytics-engine.js         # Analytics rendering
│   ├── charts-engine.js            # Chart.js integration
│   ├── data-loader.js              # Data loading utilities
│   └── bootstrap.js                # App initialization
├── dataset/
│   └── meals-data.json             # Historical meal data
└── README.md                       # This file
```

## 🎯 How It Works

### ML Prediction Algorithm

The app uses a sophisticated browser-based ML algorithm that:

1. **Recipe-Specific Patterns**: Each recipe has unique base consumption rates
   - Biryani: ~280-300g per person
   - Dal: ~190-200g per person
   - Pasta: ~240-260g per person
   - Snacks: ~150g per person

2. **Age-Group Multipliers**:
   - Adults: 1.0x (full portion)
   - Teens: 0.85x
   - Kids: 0.65x
   - Seniors: 0.80x

3. **Contextual Adjustments**:
   - Meal type (breakfast: 0.85x, lunch: 1.0x, dinner: 1.05x, snack: 0.6x)
   - Weekend bonus: +12%
   - Recipe richness factor (curry vs rice vs bread)

4. **Realistic Variance**: Adds natural variation to simulate ML uncertainty

### Cost Calculation

- Uses real Indian market prices (2026 estimates)
- Scales ingredients based on number of people
- Provides itemized breakdown by ingredient
- Shows total cost and per-person cost

## 🎨 Design Philosophy

- **Premium First**: Every element designed to WOW the user
- **Smooth Interactions**: Animations on hover, click, and page transitions
- **Visual Hierarchy**: Clear information architecture
- **Mobile-First**: Responsive design that works everywhere
- **Performance**: Optimized CSS and JavaScript for smooth 60fps

## 🔧 Customization

### Adding New Recipes

Edit `scripts/recipes-data.js` and add your recipe:

```javascript
new_recipe: {
  name: "Recipe Name",
  baseServings: 4,
  time: 30,
  ingredients: [
    { name: "Ingredient", quantity: 200, unit: "grams" }
  ],
  steps: ["Step 1", "Step 2"]
}
```

Then add the ML pattern in `scripts/quantity-predictor.js`:

```javascript
new_recipe: { basePerPerson: 220, variance: 15, type: 'curry', richness: 1.1 }
```

### Updating Prices

Edit `scripts/ingredient-prices.js` to update ingredient prices:

```javascript
"Ingredient Name": { price: 80, unit: "kg", category: "vegetables" }
```

## 🌟 Key Highlights

✅ **Recipe-Specific Predictions**: No more same quantity for all recipes!  
✅ **Indian Pricing**: Realistic ₹ prices for all ingredients  
✅ **Beautiful UI**: Premium design with animations  
✅ **No Server Required**: Runs entirely in the browser  
✅ **Instant Results**: Fast ML predictions without API calls  

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

Feel free to fork this project and add your own recipes, improve the ML algorithm, or enhance the UI!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Built with ❤️ using HTML, CSS, JavaScript, and smart algorithms**

*No backend required • No API keys needed • Works offline*
