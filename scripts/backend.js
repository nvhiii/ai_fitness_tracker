const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
//global.fetch = require('node-fetch');

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDf0vX1frSdozgaOtOzmS5tb8ZNtt7T95Q";

async function run() {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const gender = "female";
    const weight_class = "150-180 pounds";
    const age_range = "25-32";
    const height = "5 foot 5 inches";
    const experience = "new to fitness";
    const time_available = "one hour per day";

    const prompt = `Create a strength-training routine for a ${age_range} year-old ${gender} who weighs ${weight_class} and is ${height} tall. They are ${experience} and have ${time_available} to allocate per day.`;
    
    // Streaming
    const result = await model.generateContentStream(prompt);

    let text = '';
    for await (const chunk of result.stream) {
	const chunkText = chunk.text();
	console.log(chunkText);
	text += chunkText;
    }

    // Without streaming
    /*
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    */

}

run();

