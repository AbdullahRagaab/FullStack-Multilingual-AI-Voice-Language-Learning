const axios = require('axios');

(async () => {
  const model = 'meta-llama/Llama-2-7b-chat-hf';
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const prompt = "Say hello in a friendly way.";

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    console.log(response.data[0].generated_text);
  } catch (err) {
    console.error(err.response?.status, err.message);
  }
})();
