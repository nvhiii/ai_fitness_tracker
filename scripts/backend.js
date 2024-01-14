const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
//global.fetch = require('node-fetch');

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDf0vX1frSdozgaOtOzmS5tb8ZNtt7T95Q";

// modified code and removed the hardcoded parameters, now 
async function run(gender, weightClass, ageRange, height, experience, timeAvailable) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const prompt = `Create a strength-training routine for a ${ageRange} year-old ${gender} who weighs ${weightClass} and is ${height} tall. They are ${experience} and have ${timeAvailable} to allocate per day.`;

    try {
        const result = await model.generateContentStream(prompt);

        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log(chunkText);
            text += chunkText;
        }

        console.log("Generated Workout:", text);

        // Update the generated-text element with the result
        updateGeneratedText(text);
        
    } catch (error) {
        console.error("Error generating content:", error.message);
    }
}

// Example usage:
// run("female", "150-180 pounds", "25-32", "5 foot 5 inches", "new to fitness", "one hour per day");


