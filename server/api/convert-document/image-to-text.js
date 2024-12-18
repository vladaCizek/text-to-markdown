import openai from "./openai-client";
import formidable from "formidable";
import fs from "fs-extra";
import path from "path";
import { checkAndCreateFolder } from "../utils/file-utils";

// Temporary directory to store the uploaded image
const TEMPORARY_FOLDER = "tmp";
const uploadDir = path.join(process.cwd(), TEMPORARY_FOLDER);

// Function to encode the image
const encodeImage = async (imagePath) => {
  const imageBuffer = await fs.readFile(imagePath);
  const imageType = path.extname(imagePath).slice(1); // Get extension without dot
  return {
    base64Image: imageBuffer.toString("base64"),
    type: imageType || "jpeg",
  };
};

const transcribeImage = async (base64Image, imageType = "jpeg") => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Please transcribe any text found in the attached image as accurately as possible, including all visible characters, numbers, or symbols, without adding any additional comments, context or information.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/${imageType};base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    // Check multiple potential paths for the response text
    const responseText =
      response.choices[0]?.message?.content ||
      response.choices[0]?.text ||
      "No response received";

    return { text: responseText };
  } catch (error) {
    console.error(
      "Error in OpenAI API call:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  // Ensure the tmp directory exists
  await checkAndCreateFolder(uploadDir);

  const { req } = event.node;

  // Only allow POST requests
  if (req.method.toLowerCase() !== "post") {
    throw createError({ statusCode: 405, message: "Method not allowed" });
  }

  // Parse the form data
  const form = formidable({ keepExtensions: true, uploadDir });
  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });

  const imageFile = files?.image?.[0];

  if (!imageFile || !imageFile.filepath) {
    throw createError({
      statusCode: 400,
      message: "No image provided or invalid file.",
    });
  }

  try {
    const { base64Image, type } = await encodeImage(imageFile.filepath);
    return await transcribeImage(base64Image, type);
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Failed to process the image with OpenAI.",
    });
  } finally {
    try {
      await fs.unlink(imageFile.filepath);
    } catch (cleanupError) {
      console.warn("Failed to clean up temporary file:", cleanupError.message);
    }
  }
});
