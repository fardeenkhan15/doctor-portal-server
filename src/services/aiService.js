const openai = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const aiService = {
  getSuggestions: async (text) => {
    const response = await openai.Completion.create({
      engine: 'davinci',
      prompt: text,
      maxTokens: 50,
    });
    return response.choices[0].text.trim();
  },
};

module.exports = aiService;
