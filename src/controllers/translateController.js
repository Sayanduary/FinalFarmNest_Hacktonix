import { translateText } from '../utils/translate.js';

export const translateHandler = async (req, res) => {
  const { text, lang } = req.body;

  if (!text || !lang) {
    return res.status(400).json({ error: 'Text and language are required.' });
  }

  try {
    const translated = await translateText(text, lang);
    res.json({ translatedText: translated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
