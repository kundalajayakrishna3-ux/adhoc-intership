let chart;

// Save Fitness Data
async function saveFitnessData() {

    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value;
    const calories = document.getElementById("calories").value;
    const water = document.getElementById("water").value;
    const activity = document.getElementById("activity").value;

    if (!weight || !height || !calories || !water) {
        alert("Please fill all fields");
        return;
    }

    // BMI Calculation
    const bmi = (
        weight / Math.pow(height / 100, 2)
    ).toFixed(2);

    document.getElementById("bmiValue").innerText = bmi;
    document.getElementById("calorieDisplay").innerText = calories;
    document.getElementById("weightDisplay").innerText = weight + " kg";
    document.getElementById("waterDisplay").innerText = water + " L";

    try {

        const response = await fetch(
            "http://localhost:5000/api/fitness",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    weight,
                    height,
                    calories,
                    water,
                    activity
                })
            }
        );

        const result = await response.json();

        console.log(result);

        alert("Fitness Data Saved Successfully!");

        loadWeightChart();

    } catch (error) {

        console.error(error);

        alert("Error Saving Data");
    }
}

// Load Weight Chart
async function loadWeightChart() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/fitness"
        );

        const data = await response.json();

        const labels = [];
        const weights = [];

        data.forEach(item => {

            labels.push(
                new Date(item.date).toLocaleDateString()
            );

            weights.push(item.weight);
        });

        const ctx = document
            .getElementById("weightChart")
            .getContext("2d");

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: "line",

            data: {
                labels: labels,

                datasets: [{
                    label: "Weight Progress",
                    data: weights,
                    borderWidth: 3,
                    tension: 0.3
                }]
            },

            options: {
                responsive: true
            }
        });

    } catch (error) {

        console.error(error);
    }
}

// Workout Generator
function generateWorkout() {

    const goal =
        document.getElementById("goal").value;

    let workout = "";

    if (goal === "Weight Loss") {

        workout = `
🏃 Running - 30 Minutes
🔥 Jump Rope - 10 Minutes
💪 Pushups - 20 Reps
🦵 Squats - 20 Reps
🧘 Stretching - 10 Minutes
`;

    }

    else if (goal === "Muscle Gain") {

        workout = `
🏋 Bench Press - 4 Sets
🏋 Deadlift - 4 Sets
💪 Pull Ups - 3 Sets
🦵 Squats - 4 Sets
🥚 High Protein Diet
`;

    }

    else {

        workout = `
🚶 Walking - 30 Minutes
🧘 Yoga - 20 Minutes
🤸 Stretching - 15 Minutes
💧 Drink 3 Litres Water
`;

    }

    document.getElementById(
        "workoutResult"
    ).innerHTML = `<pre>${workout}</pre>`;
}

// Load Chart When Page Opens
window.onload = function () {
    loadWeightChart();
};