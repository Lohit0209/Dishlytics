
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

const RECIPE_IDS = [
    'paneer_butter_masala', 'veg_biryani', 'chicken_biryani', 'rajma', 'dal_makhani',
    'veg_pasta', 'chicken_pasta', 'aloo_paratha', 'masala_dosa', 'egg_curry',
    'chicken_curry', 'chole', 'idli_sambar', 'fried_rice', 'chicken_fried_rice',
    'maggi_masala', 'pav_bhaji', 'fish_curry'
];

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'];

function loadData(filepath) {
    console.log('Loading training data...');
    const rawData = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    console.log(`Loaded ${rawData.length} samples`);

    const features = [];
    const labels = [];

    rawData.forEach(sample => {
        const recipeOneHot = new Array(RECIPE_IDS.length).fill(0);
        const recipeIdx = RECIPE_IDS.indexOf(sample.recipe_id);
        if (recipeIdx !== -1) {
            recipeOneHot[recipeIdx] = 1;
        }

        const mealOneHot = new Array(MEAL_TYPES.length).fill(0);
        const mealIdx = MEAL_TYPES.indexOf(sample.meal_type);
        if (mealIdx !== -1) {
            mealOneHot[mealIdx] = 1;
        }

        const featureVector = [
            ...recipeOneHot,
            ...mealOneHot,
            sample.adults,
            sample.teens,
            sample.kids,
            sample.seniors,
            sample.is_weekend
        ];

        features.push(featureVector);
        labels.push(sample.quantity);
    });

    return { features, labels };
}

function createModel(inputShape) {
    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [inputShape],
        units: 128,
        activation: 'relu',
        kernelInitializer: 'heNormal'
    }));

    model.add(tf.layers.dropout({ rate: 0.2 }));

    model.add(tf.layers.dense({
        units: 64,
        activation: 'relu',
        kernelInitializer: 'heNormal'
    }));

    model.add(tf.layers.dropout({ rate: 0.15 }));

    model.add(tf.layers.dense({
        units: 32,
        activation: 'relu',
        kernelInitializer: 'heNormal'
    }));

    model.add(tf.layers.dense({
        units: 1,
        activation: 'linear'
    }));

    model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'meanSquaredError',
        metrics: ['mae']
    });

    return model;
}

async function trainModel() {
    console.log('\n=== ML Model Training ===\n');

    const { features, labels } = loadData('./dataset/training-data.json');

    const featureTensor = tf.tensor2d(features);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    const { mean, variance } = tf.moments(featureTensor, 0);
    const normalizedFeatures = featureTensor.sub(mean).div(variance.sqrt().add(1e-7));

    console.log(`Feature shape: ${normalizedFeatures.shape}`);
    console.log(`Label shape: ${labelTensor.shape}`);

    const inputShape = features[0].length;
    const model = createModel(inputShape);

    console.log('\nModel Architecture:');
    model.summary();

    console.log('\nTraining model...');
    const history = await model.fit(normalizedFeatures, labelTensor, {
        epochs: 100,
        batchSize: 32,
        validationSplit: 0.2,
        shuffle: true,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                if ((epoch + 1) % 10 === 0) {
                    console.log(
                        `Epoch ${epoch + 1}/100 - ` +
                        `loss: ${logs.loss.toFixed(4)}, ` +
                        `mae: ${logs.mae.toFixed(2)}, ` +
                        `val_loss: ${logs.val_loss.toFixed(4)}, ` +
                        `val_mae: ${logs.val_mae.toFixed(2)}`
                    );
                }
            }
        }
    });

    const modelPath = 'file://./trained-model';
    await model.save(modelPath);
    console.log(`\n✓ Model saved to ${modelPath}`);

    const normParams = {
        mean: await mean.array(),
        variance: await variance.array(),
        recipeIds: RECIPE_IDS,
        mealTypes: MEAL_TYPES
    };

    fs.writeFileSync(
        './trained-model/normalization.json',
        JSON.stringify(normParams, null, 2)
    );
    console.log('✓ Normalization parameters saved');

    console.log('\n=== Sample Predictions ===');
    await testPredictions(model, normalizedFeatures, labelTensor, features, labels);

    featureTensor.dispose();
    labelTensor.dispose();
    normalizedFeatures.dispose();
    mean.dispose();
    variance.dispose();

    console.log('\n✓ Training complete!');
}

async function testPredictions(model, normalizedFeatures, labelTensor, rawFeatures, rawLabels) {
    const testIndices = [0, 100, 500, 1000, 5000];

    for (const idx of testIndices) {
        const input = normalizedFeatures.slice([idx, 0], [1, -1]);
        const prediction = model.predict(input);
        const predValue = (await prediction.data())[0];
        const actualValue = rawLabels[idx];
        const error = Math.abs(predValue - actualValue);
        const errorPercent = ((error / actualValue) * 100).toFixed(1);

        const recipeOneHot = rawFeatures[idx].slice(0, RECIPE_IDS.length);
        const recipeIdx = recipeOneHot.indexOf(1);
        const recipeName = RECIPE_IDS[recipeIdx];

        console.log(
            `${recipeName}: Predicted=${Math.round(predValue)}g, ` +
            `Actual=${Math.round(actualValue)}g, ` +
            `Error=${Math.round(error)}g (${errorPercent}%)`
        );

        input.dispose();
        prediction.dispose();
    }
}

if (require.main === module) {
    trainModel().catch(console.error);
}

module.exports = { trainModel };
