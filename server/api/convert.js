import OpenAI from "openai";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);

  const textContent = body.text;

  if (!textContent) {
    throw createError({ statusCode: 400, message: "No text provided" });
  }

  const openai = new OpenAI({
    organization: process.env["OPENAI_API_ORGANIZATION_ID"],
    project: process.env["OPENAI_API_PROJECT_ID"],
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
  });

  try {
    const respons = await openai.chat.completions.create({
      model: "gpt-4o",
      stream: false,

      messages: [
        {
          role: "system",
          content: "Convert the following text to well-formatted Markdown.",
        },
        {
          role: "user",
          content: textContent,
        },
      ],
      temperature: 0.1,
    });

    return respons?.choices?.[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw createError({
      statusCode: 500,
      message: "Markdown conversion failed.",
    });
  }
});
