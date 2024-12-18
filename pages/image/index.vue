<template>
  <div class="min-h-screen flex flex-col mx-auto p-4 text-center">
    <h1 class="text-2xl font-bold mb-4">Image to Text Converter</h1>

    <div class="flex items-center justify-center flex-grow">
      <form @submit.prevent="handleUpload" class="flex flex-col space-y-4">
        <input
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
        />
        <div class="text-center">
          <button
            type="submit"
            class="btn btn-primary btn-lg"
            :class="[isLoading ? 'loading loading-dots loading-xs' : '']"
            :disabled="!file"
          >
            Convert
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null);
const snackbar = useSnackbar();

const isLoading = ref(false);

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];

const onFileChange = (e) => {
  const selectedFile = e.target.files[0];
  file.value = selectedFile;

  const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    snackbar.add({
      type: "error",
      text: "Please select a valid image file (jpg, jpeg, png, gif, bmp, webp).",
    });
    file.value = null;
    return;
  }
};

const handleUpload = async () => {
  if (!file.value) {
    snackbar.add({ type: "error", text: "Please select an image file." });
    return;
  }

  const formData = new FormData();
  formData.append("image", file.value);

  isLoading.value = true;

  try {
    const response = await fetch("/api/convert-document/image-to-text", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      snackbar.add({
        type: "error",
        text: errorData.message || "Failed to process the image.",
      });
      return;
    }

    const { text } = await response.json();

    snackbar.add({
      type: "success",
      text: "Text extracted successfully.",
    });

    // Display or save the text (optional)
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.value.name.replace(/\.[^/.]+$/, ".txt");
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Upload Error:", error.message);
    snackbar.add({
      type: "error",
      text: "An error occurred during upload.",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>
