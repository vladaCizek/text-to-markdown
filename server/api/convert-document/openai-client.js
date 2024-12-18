import OpenAI from "openai";

const config = useRuntimeConfig();

const openai = new OpenAI({
  organization: config.OPENAI_API_ORGANIZATION_ID,
  project: config.OPENAI_API_PROJECT_ID,
  apiKey: config.OPENAI_API_KEY,
});

export default openai;