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
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const file = ref(null);
const router = useRouter();

const isLoading = ref(false);

const onFileChange = (e) => {
  file.value = e.target.files[0];
};

const handleUpload = async () => {
  if (!file.value) {
    alert("Please select a .txt file to upload.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const textContent = reader.result;
    isLoading.value = true;
    try {

      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Conversion failed.");
        return;
      }

      const readerStream = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let done = false;
      let markdown = "";

      while (!done) {
        const { value, done: doneReading } = await readerStream.read();
        done = doneReading;
        if (value) {
          markdown += decoder.decode(value, { stream: true });
        }
      }

      // Display the Markdown (you can adjust this as needed)
      router.push({
        name: "result",
        query: { content: encodeURIComponent(markdown) },
      });
    } catch (error) {
      console.error("error: ", error);
      alert("An error occurred during conversion.");
    } finally {
      isLoading.value = false;
    }
  };
  reader.readAsText(file.value);
};
</script>
