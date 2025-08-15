// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = 4000;
const DB_PATH = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());

const workoutPlans = {
    'Weight Loss': [
        'Day 1: 45 min of moderate cardio (jogging, cycling)',
        'Day 2: Full-body strength training (squats, push-ups, rows)',
        'Day 3: 30 min of High-Intensity Interval Training (HIIT)',
        'Day 4: Active Recovery (brisk walking or yoga)',
        'Day 5: Full-body strength training',
        'Day 6: 60 min of low-intensity cardio (swimming, incline walking)',
        'Day 7: Rest'
    ],
    'Weight Gain': [
        'Day 1: Legs & Core (Barbell Squats: 4x8, Romanian Deadlifts: 3x10, Leg Press: 3x12, Hanging Leg Raises: 3x15)',
        'Day 2: Chest & Triceps (Bench Press: 4x8, Incline Dumbbell Press: 3x10, Dips: 3x to failure, Tricep Pushdowns: 3x12)',
        'Day 3: Back & Biceps (Deadlifts: 4x6, Pull-Ups: 3x to failure, Bent-Over Rows: 3x8, Barbell Curls: 3x10)',
        'Day 4: Active Recovery (Light walk, stretching, or yoga)',
        'Day 5: Shoulders (Overhead Press: 4x8, Lateral Raises: 3x15, Face Pulls: 3x15)',
        'Day 6: Full Body (Focus on compound movements you enjoy)',
        'Day 7: Rest'
    ],
    'Stay Fit': [
        'Day 1: Full-body strength training',
        'Day 2: 30 min of moderate cardio',
        'Day 3: Full-body strength training',
        'Day 4: Active Recovery (stretching or a long walk)',
        'Day 5: 30 min of HIIT or a sport you enjoy',
        'Day 6: Rest',
        'Day 7: Rest'
    ]
};

const dietPlans = {
    'Vegetarian': [
        { day: 'Day 1', Breakfast: 'Oatmeal with fruits', Lunch: 'Lentil soup & whole wheat bread', Dinner: 'Paneer and vegetable stir-fry' },
        { day: 'Day 2', Breakfast: 'Greek yogurt with granola', Lunch: 'Chickpea and spinach salad', Dinner: 'Vegetable curry with brown rice' },
        { day: 'Day 3', Breakfast: 'Protein smoothie', Lunch: 'Quinoa bowl with black beans and corn', Dinner: 'Black bean burgers on a whole wheat bun' },
        { day: 'Day 4', Breakfast: 'Avocado toast on whole wheat bread', Lunch: 'Leftover vegetable curry', Dinner: 'Mushroom and spinach risotto' },
        { day: 'Day 5', Breakfast: 'Oatmeal with nuts and seeds', Lunch: 'Tofu and veggie wrap', Dinner: 'Lentil shepherd\'s pie with a side salad' },
        { day: 'Day 6', Breakfast: 'Whole wheat pancakes with berries', Lunch: 'Homemade veggie pizza on a cauliflower crust', Dinner: 'Pasta with a pesto and vegetable sauce' },
        { day: 'Day 7', Breakfast: 'Tofu scramble with turmeric and veggies', Lunch: 'Large mixed green salad with a light vinaigrette', Dinner: 'Three-bean chili with a dollop of yogurt' }
    ],
    'Non-Vegetarian': [
        { day: 'Day 1', Breakfast: 'Scrambled eggs (2) with spinach', Lunch: 'Grilled chicken salad with mixed greens', Dinner: 'Baked salmon with steamed asparagus' },
        { day: 'Day 2', Breakfast: 'Greek yogurt with berries', Lunch: 'Tuna salad sandwich on whole wheat bread', Dinner: 'Lean steak with a side of sweet potato' },
        { day: 'Day 3', Breakfast: 'Oatmeal with a scoop of protein powder', Lunch: 'Leftover steak and sweet potato', Dinner: 'Chicken and vegetable stir-fry' },
        { day: 'Day 4', Breakfast: 'Protein smoothie', Lunch: 'Chicken wrap with lettuce and tomato', Dinner: 'Pork chops with apple sauce and green beans' },
        { day: 'Day 5', Breakfast: 'Avocado toast with a boiled egg', Lunch: 'Shrimp and avocado salad', Dinner: 'Fish tacos with a cabbage slaw' },
        { day: 'Day 6', Breakfast: 'Turkey bacon (2 slices) and an egg', Lunch: 'Lean beef burger without the bun', Dinner: 'Roast chicken with a medley of roasted vegetables' },
        { day: 'Day 7', Breakfast: 'Whole wheat pancakes with fruit', Lunch: 'Leftover roast chicken', Dinner: 'Spaghetti with a lean meat bolognese sauce' }
    ],
    'Vegan': [
        { day: 'Day 1', Breakfast: 'Tofu scramble with nutritional yeast', Lunch: 'Hearty lentil soup', Dinner: 'Chickpea and vegetable curry' },
        { day: 'Day 2', Breakfast: 'Oatmeal with berries and almond milk', Lunch: 'Quinoa salad with edamame and bell peppers', Dinner: 'Beyond Meat burger with a side salad' },
        { day: 'Day 3', Breakfast: 'Smoothie with vegan protein powder', Lunch: 'Leftover chickpea curry', Dinner: 'Black bean tacos with salsa and guacamole' },
        { day: 'Day 4', Breakfast: 'Avocado toast with chili flakes', Lunch: 'Hummus and veggie wrap', Dinner: 'Mushroom pasta with a cashew-based sauce' },
        { day: 'Day 5', Breakfast: 'Chia seed pudding with fruit', Lunch: 'Vegan sushi rolls', Dinner: 'Lentil loaf with mashed potatoes (vegan butter)' },
        { day: 'Day 6', Breakfast: 'Vegan pancakes with maple syrup', Lunch: 'Vegetable stir-fry with tempeh', Dinner: 'Homemade vegan pizza with lots of veggies' },
        { day: 'Day 7', Breakfast: 'Fruit salad with a handful of nuts', Lunch: 'Large kale salad with a lemon-tahini dressing', Dinner: 'Hearty vegetable and bean chili' }
    ]
};

const weightGainDietPlans = {
    'Non-Vegetarian': Array.from({ length: 7 }, (_, i) => ({
        day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i],
        'Breakfast': '4 whole eggs scrambled, 2 slices of whole wheat toast with 1 tbsp of butter, 1 glass of whole milk.',
        'Morning Snack': '1 scoop of whey protein with 250ml of whole milk, 1 banana.',
        'Lunch': '200g grilled chicken breast, 1.5 cups of white rice, 1 cup of steamed broccoli.',
        'Evening Snack': '1 large handful of almonds (30g), 1 apple.',
        'Dinner': '150g salmon fillet, 1 large sweet potato, a large portion of green salad with olive oil dressing.',
        'Late Snack': '1 cup of Greek yogurt with 1 tbsp of honey.'
    })),
    // ... vegetarian and vegan plans
};


app.post('/api/generate-plan', async (req, res) => {
    const { name, email, phone, weight, height, age, goal, dietType } = req.body;

    if (!name || !email || !phone || !weight || !height || !age || !goal || !dietType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    const workoutPlan = workoutPlans[goal] || workoutPlans['Stay Fit'];
    let dietPlan;

    if (goal === 'Weight Gain') {
        dietPlan = weightGainDietPlans[dietType] || weightGainDietPlans['Vegetarian'];
    } else {
        dietPlan = dietPlans[dietType] || dietPlans['Vegetarian'];
    }
    
    const generatedPlan = {
        bmi: bmi,
        workoutPlan: workoutPlan,
        dietPlan: dietPlan
    };

    const newUserRecord = {
        id: Date.now().toString(),
        name: name,
        email: email,
        phone: phone,
        weight: weight,
        height: height,
        age: age,
        goal: goal,
        dietType: dietType,
        submittedAt: new Date().toISOString(),
        plan: generatedPlan
    };

    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        const database = JSON.parse(data);
        database.push(newUserRecord);
        await fs.writeFile(DB_PATH, JSON.stringify(database, null, 2));
        
        res.json(generatedPlan);

    } catch (error) {
        console.error("Error writing to database:", error);
        return res.status(500).json({ error: 'Could not save plan data.' });
    }
});

app.get('/api/get-plan', async (req, res) => {
    const { email } = req.query; 

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        const database = JSON.parse(data);

        const userRecords = database.filter(record => record.email.toLowerCase() === email.toLowerCase());
        const lastRecord = userRecords.pop();

        if (lastRecord) {
            res.json(lastRecord);
        } else {
            res.status(404).json({ error: 'No plan found for this email address' });
        }
    } catch (error) {
        console.error("Error reading from database:", error);
        return res.status(500).json({ error: 'Could not retrieve plan data.' });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});