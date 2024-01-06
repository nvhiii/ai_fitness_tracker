const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");


const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyDf0vX1frSdozgaOtOzmS5tb8ZNtt7T95Q";

async function run() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  prompt = "Make an exercise routine for a female who is 150-180 pounds and ages 25-32 is 5 foot 5 inches. She is new to fitness and has one hour to allocate per day."
  const result = await model.generateContentStream(prompt);

  let text = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    console.log(chunkText);
    text += chunkText;
  }

}

run();

