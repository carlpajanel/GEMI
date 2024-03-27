const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
app.get('/', ( req, res ) => {
  res.send("You're at Home! use /gemini?prompt= for api.")
})
app.get('/gemini', (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env['API_KEY'])
  const prompt = req.query.prompt;
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  async function response(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
  }
  response(prompt);
})
app.listen(5000, () => {
  console.log("Gemini WEBSITE is now Open!")
  
})