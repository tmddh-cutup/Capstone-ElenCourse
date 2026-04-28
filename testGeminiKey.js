import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
console.log("DEFAULT_AI_PROVIDER:", process.env.DEFAULT_AI_PROVIDER);