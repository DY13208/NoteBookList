import OpenAI from "openai";

export type AiProvider = "openai";

export type AiModel = {
  provider: AiProvider;
  id: string;
  label: string;
  description?: string;
};

export const AI_MODELS: AiModel[] = [
  { provider: "openai", id: "gpt-4o-mini", label: "GPT-4o mini" },
  { provider: "openai", id: "gpt-4o", label: "GPT-4o" },
  { provider: "openai", id: "o4-mini", label: "o4-mini" },
];

export function getModels(provider?: AiProvider) {
  return provider ? AI_MODELS.filter((m) => m.provider === provider) : AI_MODELS;
}

export async function runOpenAIChat({
  apiKey,
  model,
  messages,
  temperature = 0.3,
}: {
  apiKey: string;
  model: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  temperature?: number;
}) {
  const client = new OpenAI({
    apiKey,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });

  const result = await client.chat.completions.create({
    model,
    messages,
    temperature,
  });

  return result.choices[0]?.message?.content?.trim() || "";
}
