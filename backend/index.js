require("dotenv").config();

const {GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require("@google/generative-ai");

const MODEL_NAME = "gemini-pro";

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.get('/',  (req, res) => {
  generateWorkoutPlan(req.query).then((body) => res.send(body));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/**
 * Calls API to generate workout plan based on user input.
 * @param user_input - User demographic information
 * @return Promise that resolves to generated workout plan
 */
async function generateWorkoutPlan(user_input) {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({model: MODEL_NAME});

    // user_input.type

    const prompt = `Create a strength-training routine for a ${user_input.age_range} year-old ${user_input.gender} who weighs ${user_input.weight_class} and is ${user_input.height} tall. They are ${user_input.experience}.`;

    // Without streaming
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

    // Streaming
    /*
    const result = await model.generateContentStream(prompt);
    let workout_plan = '';

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      workout_plan += chunkText;
    }
    return workout_plan;
  } catch (error) {
    console.error("Error generating workout plan:", error.message);
    res.end();
    throw error;
  }*/
}


// Example user input
/*
const user_input = {
    gender: "female",
    weight_class: "150-180 pounds",
    age_range: "25-32",
    height: "5 foot 5 inches",
    experience: "new to fitness",
};*/
/*
// Calling the generate function with user input
generateWorkoutPlan(user_input)
    .then((workout_plan) => {
  console.log("Your Workout Plan:");
  console.log(workout_plan);
    })
    .catch((error) => {
  console.error("Error:", error.message);
    });
	*/

