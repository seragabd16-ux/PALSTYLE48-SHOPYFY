
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Exclusive artifact from the dark archive.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the Lead Copywriter for 'Palstyle48', a high-end dark luxury streetwear brand.
      
      Task: Write a product description for "${productName}" (Category: ${category}).
      
      Brand Guidelines:
      1. Tone: Elusive, cinematic, pitch-black, authoritative.
      2. Vocabulary: Use words like "void", "silence", "armor", "shadow", "legacy", "woven", "eternal".
      3. Prohibition: NEVER use words like "comfortable", "soft", "stylish", "trendy", "perfect for", "nice".
      4. Length: STRICTLY under 30 words.
      5. Format: 2-3 punchy fragments. No hashtags.
      
      Example Output: "Forged in the silence of the underground. Heavyweight armor for those who walk the void."`,
    });
    
    return response.text ? response.text.trim() : "Exclusive artifact from the dark archive.";
  } catch (error) {
    console.error("Gemini Gen Error:", error);
    return "Exclusive streetwear crafted for the bold.";
  }
};

export const generateBrandVideo = async (prompt: string): Promise<string | null> => {
  // 1. Ensure API Key is selected (Veo requires paid/billed project)
  // Casting window to any to avoid type conflict with global AIStudio declaration if present
  const win = window as any;
  if (win.aistudio) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey) {
          await win.aistudio.openSelectKey();
      }
  }

  // 2. Initialize Client with current key
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  
  const ai = new GoogleGenAI({ apiKey });

  try {
    // Veo 3.1 Fast Generate Preview
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: `Cinematic fashion shot, slow motion, dark luxury aesthetic, 4k, high detailed texture: ${prompt}`,
      config: {
        numberOfVideos: 1,
        resolution: '1080p',
        aspectRatio: '16:9'
      }
    });

    // Polling for completion
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    
    if (videoUri) {
        // Append key for download access
        return `${videoUri}&key=${apiKey}`;
    }
    return null;

  } catch (error: any) {
    console.error("Veo Video Gen Error:", error);
    const errorMessage = error.message || JSON.stringify(error);
    
    // Handle "Requested entity was not found" (404) - typically means invalid key for Veo
    if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
        const win = window as any;
        if (win.aistudio) {
            console.log("Triggering API Key selection due to 404/Entity Not Found...");
            await win.aistudio.openSelectKey();
            // Retry the operation with the new key
            return generateBrandVideo(prompt);
        }
    }
    return null;
  }
};

export const generateBrandStory = async (): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Forged in the shadows of history...";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a powerful, poetic brand manifesto for 'Palstyle48', a dark luxury streetwear brand.
      Concept: 'Project Nano'.
      Story: 'Nano Banana' is not a fruit. It is the 'N.B. Protocol' (Nano-Weave / Biometric-Adaptation).
      A secret resistance tech developed by Gaza engineers to weave data into fabric.
      Tone: Cyberpunk, Cryptic, High-Tech, Revolutionary.
      Length: 2 sentences.`,
    });
    
    return response.text ? response.text.trim() : "Forged in the shadows of history...";
  } catch (error) {
    console.error("Gemini Story Error:", error);
    return "Forged in the shadows of history...";
  }
};

export const streamGeminiResponse = async (
    message: string, 
    onChunk: (text: string) => void
): Promise<void> => {
    const ai = getAIClient();
    if (!ai) {
        onChunk("Director Terminal Offline. Check API Key.");
        return;
    }

    try {
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-3-pro-preview',
            contents: [
                {
                    role: 'user',
                    parts: [{ 
                        text: `You are the AI Brand Director for Palstyle48. You are bold, tactical, and data-driven. 
                        Your aesthetic is "Dark Luxury" and "Cyberpunk Resistance".
                        User Query: ${message}
                        
                        Respond as a commander giving a briefing. Short, punchy, strategic.` 
                    }]
                }
            ],
        });

        for await (const chunk of responseStream) {
            if (chunk.text) {
                onChunk(chunk.text);
            }
        }
    } catch (error) {
        console.error("Stream Error:", error);
        onChunk("Connection Interrupted.");
    }
};
