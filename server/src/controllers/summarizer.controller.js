import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const summarize = async (req,res)=>{
    const { content } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0' });

    const result = await model.generateContent([
      { role: 'user', parts: [`Please summarize the following note:\n\n${content}`] }
    ]);

    const summary = result.response.text().trim();
    return res.status(200).json({ summary });
  } catch (error) {
    console.error('Gemini summarization error:', error);
    return res.status(500).json({ error: 'An error occurred while summarizing the note.' });
  }
}

