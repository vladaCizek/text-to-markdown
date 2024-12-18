import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export default defineEventHandler(async (event) => {
  const form = formidable({ multiples: true });
  const config = useRuntimeConfig();

  const openai = new OpenAI({
    organization: process.env["OPENAI_API_ORGANIZATION_ID"],
    project: process.env["OPENAI_API_PROJECT_ID"],
    apiKey: process.env["OPENAI_API_KEY"],
  });

  form.parse(event.req, async (err, fields, files) => {
    if (err) {
      throw createError({ statusCode: 400, message: "Image upload failed" });
    }

    const imageFile = files.image;
    if (!imageFile) {
      throw createError({ statusCode: 400, message: "No image provided" });
    }

    const imageData = fs.readFileSync(imageFile.filepath);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract text from this image. It must be exact transcript of the content.",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${imageData.toString("base64")}`,
                },
              },
            ],
          },
        ],
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI API Error:", error);
      throw createError({
        statusCode: 500,
        message: "Text extraction failed.",
      });
    }
  });
});
