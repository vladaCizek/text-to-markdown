<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Text to Markdown Converter</h1>
    <form @submit.prevent="handleUpload" class="flex flex-col space-y-4">
      <input
        type="file"
        accept=".txt"
        @change="onFileChange"
        class="file-input file-input-bordered file-input-secondary w-full max-w-xs"
      />
      <button type="submit" class="btn btn-primary" :disabled="!file">
        Convert
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const file = ref(null);
const router = useRouter();

const onFileChange = (e) => {
  file.value = e.target.files[0];
};

const handleUpload = () => {
  if (!file.value) {
    alert("Please select a .txt file to upload.");
    return;
  }

  // Placeholder for file upload and conversion logic
  // After conversion, navigate to the result page with the markdown content

  // Example: Navigate with query parameters (for demonstration)
  const markdownContent = "# Sample Markdown\n\nConverted content here...";
  router.push({
    name: "result",
    query: { content: encodeURIComponent(markdownContent) },
  });
};
</script>
