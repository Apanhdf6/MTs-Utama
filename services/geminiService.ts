import { GoogleGenAI } from "@google/genai";

// Safe access to process.env to prevent "process is not defined" error in browsers
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY;
    }
  } catch (e) {
    // Ignore error
  }
  return '';
};

const ai = new GoogleGenAI({ apiKey: getApiKey() || '' });

export const generateNewsContent = async (topic: string, keywords: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      Buatkan sebuah draf artikel berita sekolah untuk website MTs Utama.
      Topik: ${topic}
      Kata kunci yang harus ada: ${keywords}
      Gaya bahasa: Formal namun ceria, informatif, dan memotivasi siswa.
      Panjang: Sekitar 2-3 paragraf.
      Output: Hanya teks artikelnya saja, tanpa judul atau pembuka 'Berikut adalah artikel...'.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Maaf, gagal menghasilkan konten. Silakan coba lagi.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "Terjadi kesalahan saat menghubungi AI Assistant. Pastikan API Key valid.";
  }
};