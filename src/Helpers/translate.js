import axios from 'axios';

export const translateText = async (text, targetLang = 'bn') => {
  try {
    const response = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: 'en',
        target: targetLang,
        format: 'text',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data.translatedText;
  } catch (err) {
    console.error('Translation failed:', err.message);
    throw new Error('Translation service error');
  }
};
